from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from typing import Optional, List
from firebase_admin import firestore
from middleware.auth import verify_token
from services.firebase_admin_service import get_db_client
from services.gemini_service import GeminiService
from services.prompt_template import PromptManager
from utils.responses import success_response, error_response

router = APIRouter()


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    session_id: str
    message: str
    persona_type: str
    history: Optional[List[Message]] = []


@router.post("/chat")
async def persona_chat(request: ChatRequest, user=Depends(verify_token)):
    try:
        # 1. Initialize AI Services
        gemini_service = GeminiService(purpose="personas")
        prompt_manager = PromptManager()

        # 2. Setup Persona Prompt
        try:
            template_path = f"personas/{request.persona_type}"
            persona_prompt = prompt_manager.load_template(
                template_name=template_path,
                variables={"user_message": request.message},
            )
        except FileNotFoundError:
            return error_response(
                message=f"Persona '{request.persona_type}' not found", code=400
            )

        # 3. Build AI Context
        history_text = "\n".join(
            [
                f"{'Student' if m.role == 'user' else 'Persona'}: {m.content}"
                for m in request.history
            ]
        )
        full_prompt = f"{persona_prompt}\n\nHistory:\n{history_text}\n\nInput: {request.message}\n\nResponse (End with EMOTION: <tag>):"

        # 4. Get AI Response
        llm_response = await gemini_service.generate_response(full_prompt)

        # 5. Extract Text and Emotion
        emotion = "calm"
        response_text = llm_response
        if "EMOTION:" in llm_response:
            parts = llm_response.split("EMOTION:")
            response_text = parts[0].strip()
            emotion = parts[1].strip().lower()

        # 6. SAVE TO FIRESTORE (Crucial for Evaluation)
        try:
            db = get_db_client()
            app_id = "sdgp-careerverse-2026"  # Use your consistent App ID

            # Use Rule 1 Pathing
            session_ref = (
                db.collection("artifacts")
                .document(app_id)
                .collection("public")
                .document("data")
                .collection("sessions")
                .document(request.session_id)
            )

            sim_type = (
                "doctor" if "patient" in request.persona_type.lower() else "teacher"
            )

            session_ref.set(
                {
                    "transcript": firestore.ArrayUnion(
                        [
                            {
                                "role": "user",
                                "content": request.message,
                                "timestamp": firestore.SERVER_TIMESTAMP,
                            },
                            {
                                "role": "assistant",
                                "content": response_text,
                                "emotion": emotion,
                                "timestamp": firestore.SERVER_TIMESTAMP,
                            },
                        ]
                    ),
                    "simulation_type": sim_type,
                    "user_id": user.get("uid"),
                    "status": "active",
                    "updated_at": firestore.SERVER_TIMESTAMP,
                },
                merge=True,
            )
        except Exception as fe:
            print(f"Firestore Sync Warning: {fe}")

        return success_response(
            data={
                "response": response_text,
                "emotion": emotion,
                "session_id": request.session_id,
            }
        )

    except Exception as e:
        return error_response(message="AI Chat failed", code=500, error_details=str(e))
