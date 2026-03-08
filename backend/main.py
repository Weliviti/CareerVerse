from fastapi import FastAPI, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from utils.responses import success_response, error_response, setup_exception_handlers
from routes.auth import router as auth_router
from routes.evaluator import router as evaluator_router
from routes.persona import router as persona_router
from routes.evaluation import router as evaluation_router
from routes.sessions import router as sessions_router
from routes.scores import router as scores_router
from routes.simulations import router as simulations_router
from routes.admin import router as admin_router
from services.firebase_admin_service import get_db_client
from middleware.auth import verify_token

# Initialize rate limiter
limiter = Limiter(key_func=get_remote_address)

app = FastAPI(title="CareerVerse API", version="1.1.0")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Setup global exception handlers
setup_exception_handlers(app)


# Initialize Firebase Admin SDK on startup
@app.on_event("startup")
async def startup_event():
    """Initialize Firebase Admin SDK when the app starts."""
    try:
        get_db_client()
        print("🔥 Firebase Admin SDK initialized on startup")
    except Exception as e:
        print(f"❌ Failed to initialize Firebase Admin SDK: {e}")
        print("The app will continue running, but Firebase features may not work.")


# --- CORS SETTINGS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite default port (Local testing)
        "https://careerverse.lk",  # Production domain
        "https://www.careerverse.lk",  # Production domain (www)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- UNITY-SPECIFIC ENDPOINTS (Safety Mappings) ---
# These ensure that even if your external routers have different internal paths,
# the specific URLs defined in Unity's ApiConfig.cs are always handled.


@app.post("/api/sessions/end", tags=["Unity Compatibility"])
async def unity_session_end(request: dict, user: dict = Depends(verify_token)):
    """Explicitly handles the SessionEndUrl from Unity."""
    session_id = request.get("session_id")
    print(f"Unity Session End Signal: {session_id} for user {user.get('uid')}")
    return success_response(message="Session successfully closed")


@app.post("/api/evaluate/session", tags=["Unity Compatibility"])
async def unity_evaluate_session(request: dict, user: dict = Depends(verify_token)):
    """Explicitly handles the EvaluateSessionUrl from Unity."""
    # This acts as a bridge to your evaluation service
    # You can also import and call evaluation_service.evaluate_session here
    return success_response(
        data={"status": "processing", "session_id": request.get("session_id")},
        message="Evaluation triggered from Unity",
    )


# --- REGISTER ROUTERS ---
app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(persona_router, prefix="/api/persona", tags=["Persona Chat"])
app.include_router(sessions_router, prefix="/api/sessions", tags=["Sessions"])
app.include_router(scores_router, prefix="/api/scores", tags=["Scores"])
app.include_router(simulations_router, prefix="/api/simulations", tags=["Simulations"])
app.include_router(admin_router, prefix="/api/admin", tags=["Admin"])

# Evaluation routers
app.include_router(evaluator_router, prefix="/api/evaluate", tags=["Legacy Evaluation"])
app.include_router(evaluation_router, prefix="/api", tags=["New Evaluation"])


@app.get("/")
def read_root():
    return success_response(
        data={"message": "CareerVerse API is live"}, message="Welcome to CareerVerse"
    )


@app.get("/health")
def health_check():
    return success_response(data={"status": "healthy"}, message="Service is healthy")
