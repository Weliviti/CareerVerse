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

    async def generate_career_recommendations(self, scores_history: list) -> list:
        """
        Analyzes a history of user simulation scores to generate personalized career recommendations.
        """
        try:
            # Format the score history for the prompt
            history_text = ""
            if not scores_history:
                history_text = "No simulation history available yet. Provide general career recommendations based on foundational skills."
            else:
                for idx, score in enumerate(scores_history):
                    history_text += f"\n--- Simulation {idx + 1} ({score.get('simulation_type', 'Unknown')} Role) ---\n"
                    history_text += f"Total Score: {score.get('total_score', 'N/A')}\n"
                    history_text += f"Skills: {json.dumps(score.get('skills', {}))}\n"

            prompt = f"""
            You are an expert, empathetic career counselor AI.
            Analyze the following history of a user's performance across various virtual simulations.
            Based on their demonstrated strengths in different skills (e.g., communication, empathy, problem-solving, logic, classroom management, etc.) across ALL their simulations, 
            recommend 3 highly suitable career paths.

            USER SIMULATION HISTORY:
            {history_text}

            You must return EXACTLY 3 career recommendations. 
            For the 'colorClass', choose one of these TailWind CSS background colors to fit the career vibe:
            'bg-teal-500', 'bg-blue-500', 'bg-purple-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-indigo-500'

            RETURN ONLY VALID JSON EXACTLY MATCHING THIS ARRAY STRUCTURE, WITH NO MARKDOWN BLOCK OR OTHER TEXT:
            [
              {{
                "rank": 1,
                "title": "Job Title",
                "matchPercentage": 95,
                "description": "Short, personalized explanation of why this fits based on their specific skills shown across the simulations.",
                "skills": ["Their Top Skill 1", "Their Top Skill 2", "Relevant Skill 3"],
                "colorClass": "bg-teal-500"
              }}, 
              ... (total 3 items)
            ]
            """

            response_text = await self.generate_response(prompt)

            # Mandatory JSON cleaning
            clean_text = response_text.replace("```json", "").replace("```", "").strip()
            recommendations = json.loads(clean_text)
            
            # Ensure it's a list even if model returns dict {"recommendations": [...]}
            if isinstance(recommendations, dict) and "recommendations" in recommendations:
                recommendations = recommendations["recommendations"]
                
            return recommendations

        except Exception as e:
            print(f"Career recommendation generation failed: {e}")
            raise Exception(f"Recommendation generation failed: {str(e)}")
