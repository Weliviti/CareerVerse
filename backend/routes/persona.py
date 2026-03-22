from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, timezone
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
    print(
        f"\n[CHAT] session_id={request.session_id}, persona={request.persona_type}, user={user.get('uid')}"
    )
    try:
        # 1. Initialize AI Services
        gemini_service = GeminiService(purpose="personas")
        prompt_manager = PromptManager()

        # 2. Setup Persona Prompt
        print(f"[CHAT] Loading persona template: personas/{request.persona_type}")
        try:
            template_path = f"personas/{request.persona_type}"
            persona_prompt = prompt_manager.load_template(
                template_name=template_path,
                variables={"user_message": request.message},
            )
        except FileNotFoundError:
            print(f"[CHAT] ERROR: Persona file not found: {request.persona_type}")
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
        print(f"[CHAT] Calling Gemini AI...")
        llm_response = await gemini_service.generate_response(full_prompt)
        print(f"[CHAT] Gemini response received ({len(llm_response)} chars)")

        # 5. Extract Text and Emotion
        emotion = "calm"
        response_text = llm_response
        if "EMOTION:" in llm_response:
            parts = llm_response.split("EMOTION:")
            response_text = parts[0].strip()
            emotion = parts[1].strip().lower()

        # 6. SAVE TO FIRESTORE — root /sessions/ collection (matches evaluation_service.py)
        print(f"[CHAT] Saving transcript to Firestore /sessions/{request.session_id}")
        try:
            db = get_db_client()

            # Use the ROOT /sessions/ collection — same place evaluation_service reads from
            session_ref = db.collection("sessions").document(request.session_id)

            sim_type = (
                "doctor" if "patient" in request.persona_type.lower() else "teacher"
            )

            now = datetime.now(timezone.utc)
            session_ref.set(
                {
                    "transcript": firestore.ArrayUnion(
                        [
                            {
                                "role": "user",
                                "content": request.message,
                                "timestamp": now,
                            },
                            {
                                "role": "assistant",
                                "content": response_text,
                                "emotion": emotion,
                                "timestamp": now,
                            },
                        ]
                    ),
                    "simulation_type": sim_type,
                    "user_id": user.get("uid"),
                    "session_id": request.session_id,
                    "status": "active",
                    "updated_at": firestore.SERVER_TIMESTAMP,  # OK here — outside array
                },
                merge=True,
            )
            print(f"[CHAT] Firestore save OK ✅ — /sessions/{request.session_id}")
        except Exception as fe:
            print(f"[CHAT] Firestore WARNING: {fe}")

        return success_response(
            data={
                "response": response_text,
                "emotion": emotion,
                "session_id": request.session_id,
            }
        )

    except Exception as e:
        import traceback

        print(f"[CHAT] CRITICAL ERROR: {str(e)}")
        print(traceback.format_exc())
        return error_response(message="AI Chat failed", code=500, error_details=str(e))
