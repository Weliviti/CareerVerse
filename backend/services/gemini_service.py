import os
import google.generativeai as genai
import asyncio
import json
from config import settings


class GeminiService:
    """
    Gemini AI service with automatic API key rotation and
    exponential backoff to handle 429 quota errors seamlessly.
    """

    # Class-level state to share the current working key across all instances
    _keys: list[str] = []
    _current_key_index: int = 0
    _is_initialized: bool = False

    def __init__(self, purpose: str = "personas"):
        self.purpose = purpose

        # Initialize keys list once
        if not GeminiService._is_initialized:
            GeminiService._keys = settings.get_all_gemini_keys()
            GeminiService._is_initialized = True

        self._configure_current_key()

        # gemini-1.5-flash: fast, reliable, high free-tier quota
        self.model_name = "gemini-3.1-flash-lite-preview"

    def _configure_current_key(self):
        """Configures the Gemini SDK with the current active key."""
        current_key = self._keys[self._current_key_index]
        genai.configure(api_key=current_key)

    def _rotate_key(self):
        """Moves to the next key in the rotation."""
        num_keys = len(self._keys)
        if num_keys <= 1:
            print("[GEMINI] Only 1 key available. Cannot rotate.")
            return False

        old_index = self._current_key_index
        self._current_key_index = (self._current_key_index + 1) % num_keys
        print(
            f"[GEMINI] Key quota exceeded. Rotating from key slot {old_index + 1} to {self._current_key_index + 1}."
        )
        self._configure_current_key()
        return True

    async def generate_response(self, prompt: str) -> str:
        """
        Generate a response with automatic key rotation and exponential backoff.
        """
        retries = len(self._keys) * 2  # Allow enough retries to try all keys twice
        delays = [1, 2, 2, 4, 4]  # Keep delays short since rotation solves 429s

        for i in range(retries):
            try:
                model = genai.GenerativeModel(self.model_name)
                # Use the non-streaming generate_content
                response = await model.generate_content_async(prompt)

                if not response.text:
                    raise Exception("Empty response from Gemini")

                return response.text

            except Exception as e:
                error_msg = str(e)
                # Check if it's a rate limit / quota error (429)
                is_quota_error = (
                    "429" in error_msg
                    or "quota" in error_msg.lower()
                    or "ResourceExhausted" in error_msg
                )

                if is_quota_error:
                    # Immediately rotate keys, no need to wait long
                    rotated = self._rotate_key()
                    if rotated and i < retries - 1:
                        continue  # Retry immediately with new key

                if i < retries - 1:
                    # For other transient errors, or if rotation failed, wait and retry
                    delay = delays[i] if i < len(delays) else 8
                    print(
                        f"[GEMINI] API error (attempt {i+1}). Retrying in {delay}s..."
                    )
                    await asyncio.sleep(delay)
                    continue

                # If we're out of retries, raise it
                raise Exception(f"Gemini API error after {i+1} attempts: {error_msg}")

    async def evaluate_transcript(self, transcript: list, rubric: str) -> dict:
        """
        Evaluates a session transcript with automatic JSON cleaning.
        """
        try:
            formatted_transcript = "\n".join(
                [
                    f"{msg.get('role', 'unknown')}: {msg.get('content', '')}"
                    for msg in transcript
                ]
            )

            prompt = f"""
            You are an expert evaluator. Evaluate this transcript based on the rubric.
            
            RUBRIC:
            {rubric}
            
            TRANSCRIPT:
            {formatted_transcript}
            
            RETURN ONLY VALID JSON:
            {{
                "scores": {{ "communication": 0-100, "empathy": 0-100, "logic": 0-100, "total_score": 0-100 }},
                "feedback": "...",
                "summary": "..."
            }}
            """

            response_text = await self.generate_response(prompt)

            # Mandatory JSON cleaning to prevent parsing errors
            clean_text = response_text.replace("```json", "").replace("```", "").strip()
            return json.loads(clean_text)

        except Exception as e:
            raise Exception(f"Evaluation failed: {str(e)}")
