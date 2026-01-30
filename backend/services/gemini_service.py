import os
import google.generativeai as genai


class GeminiService:
    def __init__(self):
        """Initialize Gemini API with API key from environment variables."""
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")
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
            model = genai.GenerativeModel("gemini-1.5-flash")
            response = await model.generate_content_async(prompt)
            return response.text
        except Exception as e:
            raise Exception(f"Gemini API error: {str(e)}")
