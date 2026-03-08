"""
Persona chat endpoint for CareerVerse NPC interactions.

This module provides the chat endpoint that handles conversations with
AI-powered personas (patients, students, etc.) using Gemini LLM.
"""

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from typing import Optional, List
from middleware.auth import verify_token
from services.gemini_service import GeminiService
from services.prompt_template import PromptManager
from utils.responses import success_response, error_response

router = APIRouter()


class Message(BaseModel):
    """Individual message in conversation history."""

    role: str = Field(..., description="Either 'user' or 'assistant'")
    content: str = Field(..., description="Message content")


class ChatRequest(BaseModel):
    """Request model for persona chat endpoint."""

    session_id: str = Field(..., description="Unique session identifier")
    message: str = Field(..., description="User's message to the persona")
    persona_type: str = Field(
        ...,
        description="Type of persona (e.g., 'patient_anxious', 'student_disruptor')",
    )
    history: Optional[List[Message]] = Field(
        default=[], description="Previous conversation messages"
    )


class ChatResponse(BaseModel):
    """Response model for persona chat endpoint."""

    response: str = Field(..., description="Persona's reply to the user")
    emotion: str = Field(..., description="Detected emotion of the persona")
    session_id: str = Field(..., description="Session identifier")


@router.post("/chat", response_model=ChatResponse)
async def persona_chat(request: ChatRequest, user=Depends(verify_token)):
    """
    Handle chat interaction with AI persona.

    This endpoint:
    1. Loads the appropriate persona prompt template
    2. Builds conversation context with history
    3. Sends to Gemini LLM for response generation
    4. Extracts response and emotion
    5. Returns formatted response

    Args:
        request: ChatRequest containing message, persona type, and history
        user: Verified user from Firebase token (injected by middleware)

    Returns:
        ChatResponse with persona's reply and detected emotion

    Raises:
        400: If persona type not found or invalid
        500: If LLM generation fails
    """
    try:
        # Initialize services (lazy initialization to avoid import-time errors)
        gemini_service = GeminiService(purpose="personas")
        prompt_manager = PromptManager()

        # Step 1: Load persona prompt template
        try:
            template_path = f"personas/{request.persona_type}"
            print(f"DEBUG - Incoming persona_type from Unity: '{request.persona_type}'")
            print(f"DEBUG - Trying to load template: '{template_path}'")

            persona_prompt = prompt_manager.load_template(
                template_name=template_path,
                variables={"user_message": request.message},
            )
        except FileNotFoundError:
            return error_response(
                message=f"Persona type '{request.persona_type}' not found",
                code=400,
                error_details="Invalid persona_type. Check available persona templates.",
            )

        # Step 2: Build conversation context
        conversation_history = ""
        if request.history:
            for msg in request.history:
                role_label = "Student" if msg.role == "user" else "Persona"
                conversation_history += f"{role_label}: {msg.content}\n"

        # Step 3: Construct full prompt with history and current message
        full_prompt = f"""{persona_prompt}

CONVERSATION SO FAR:
{conversation_history if conversation_history else "[No previous messages]"}

CURRENT MESSAGE FROM STUDENT:
{request.message}

INSTRUCTIONS:
Respond in character as the persona described above.
At the end of your response, add a line "EMOTION: <emotion>" where <emotion> is one of: 
calm, nervous, anxious, frustrated, happy, confused, angry, sad, relieved

YOUR RESPONSE:"""

        # Step 4: Generate response using Gemini
        try:
            llm_response = await gemini_service.generate_response(full_prompt)
        except Exception as e:
            return error_response(
                message="Failed to generate persona response",
                code=500,
                error_details=str(e),
            )

        # Step 5: Extract emotion from response
        emotion = "calm"  # Default emotion
        response_text = llm_response

        # Parse emotion if present
        if "EMOTION:" in llm_response:
            parts = llm_response.split("EMOTION:")
            response_text = parts[0].strip()
            emotion = parts[1].strip().lower() if len(parts) > 1 else "calm"

        # Step 6: Return formatted response
        return success_response(
            data={
                "response": response_text,
                "emotion": emotion,
                "session_id": request.session_id,
            },
            message="Persona response generated successfully",
        )

    except Exception as e:
        return error_response(
            message="Unexpected error in persona chat",
            code=500,
            error_details=str(e),
        )
