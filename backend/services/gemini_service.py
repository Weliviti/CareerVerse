import os
import google.generativeai as genai
import asyncio
import json
from config import settings

class GeminiService:
    """
    Gemini AI service with mandatory exponential backoff and 
    stable model selection to avoid 429 quota errors.
    """

    def __init__(self, purpose: str = "personas"):
        self.purpose = purpose
        api_key = settings.get_gemini_key(purpose)
        genai.configure(api_key=api_key)
        
        # Use 2.5-flash for production stability and higher free-tier quotas
        self.model_name = "gemini-1.5-flash" 

    async def generate_response(self, prompt: str) -> str:
        """
        Generate a response with mandatory exponential backoff (Rule: 5 retries).
        """
        retries = 5
        delays = [1, 2, 4, 8, 16]

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
                # Check if it's a rate limit error (429)
                if "429" in error_msg or "quota" in error_msg.lower():
                    if i < retries - 1:
                        # Wait and retry (Exponential Backoff)
                        await asyncio.sleep(delays[i])
                        continue
                
                # If we're out of retries or it's a different error, raise it
                raise Exception(f"Gemini API error after {i+1} attempts: {error_msg}")

    async def evaluate_transcript(self, transcript: list, rubric: str) -> dict:
        """
        Evaluates a session transcript with automatic JSON cleaning.
        """
        try:
            formatted_transcript = "\n".join([
                f"{msg.get('role', 'unknown')}: {msg.get('content', '')}"
                for msg in transcript
            ])

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