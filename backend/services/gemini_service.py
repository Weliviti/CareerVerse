import os
import google.generativeai as genai
from config import settings


class GeminiService:
    """
    Gemini AI service with purpose-based API key selection.

    Supports 3 separate API keys for different purposes:
    - 'personas': AI agent conversations (student/patient agents)
    - 'scoring': Real-time scoring and final session evaluation
    - 'careers': Career recommendation generation

    Falls back to the legacy GEMINI_API_KEY if specific keys are not set.
    """

    def __init__(self, purpose: str = "personas"):
        """
        Initialize Gemini API with the appropriate key for the given purpose.

        Args:
            purpose: One of 'personas', 'scoring', or 'careers'
        """
        self.purpose = purpose
        api_key = settings.get_gemini_key(purpose)
        genai.configure(api_key=api_key)

    async def generate_response(self, prompt: str) -> str:
        """
        Generate a response using Gemini 1.5 Flash model.

        Args:
            prompt: The input prompt for the model

        Returns:
            The generated text response

        Raises:
            Exception: If API call fails
        """
        try:
            model = genai.GenerativeModel("gemini-2.5-flash")

            # Disable safety settings that might block the "disruptive" persona
            safety_settings = [
                {
                    "category": "HARM_CATEGORY_HARASSMENT",
                    "threshold": "BLOCK_NONE",
                },
                {
                    "category": "HARM_CATEGORY_HATE_SPEECH",
                    "threshold": "BLOCK_NONE",
                },
                {
                    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    "threshold": "BLOCK_NONE",
                },
                {
                    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                    "threshold": "BLOCK_NONE",
                },
            ]

            response = await model.generate_content_async(
                prompt, safety_settings=safety_settings
            )
            return response.text
        except Exception as e:
            raise Exception(f"Gemini API error ({self.purpose}): {str(e)}")

    async def evaluate_transcript(self, transcript: list, rubric: str) -> dict:
        """
        Evaluates a session transcript using a provided rubric.

        Args:
            transcript: List of message dictionaries containing role and content
            rubric: The evaluation criteria string

        Returns:
            Dictionary containing the evaluation results (scores and feedback)
        """
        try:
            # Format transcript for the prompt
            formatted_transcript = "\n".join(
                [
                    f"{msg.get('role', 'unknown')}: {msg.get('content', '')}"
                    for msg in transcript
                ]
            )

            prompt = f"""
            You are an expert evaluator for a career simulation. 
            
            RUBRIC:
            {rubric}
            
            TRANSCRIPT:
            {formatted_transcript}
            
            INSTRUCTIONS:
            Evaluate the user's performance in the transcript based strictly on the rubric provided.
            Provide the output in valid JSON format with the following structure:
            {{
                "scores": {{
                    "category_name": score,
                    ...
                }},
                "total_score": number,
                "feedback": "Overall qualitative feedback...",
                "improvements": ["point 1", "point 2", ...]
            }}
            Do not include any markdown formatting (like ```json) in your response, just the raw JSON string.
            """

            response_text = await self.generate_response(prompt)

            # Basic cleanup if model wraps in markdown
            clean_text = response_text.replace("```json", "").replace("```", "").strip()

            # Simple parsing (in a real app, use a robust parser or schema enforcement)
            import json

            return json.loads(clean_text)

        except Exception as e:
            raise Exception(f"Evaluation failed ({self.purpose}): {str(e)}")
