from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from utils.responses import success_response, error_response, setup_exception_handlers
from routes.auth import router as auth_router
from routes.evaluator import router as evaluator_router

# Initialize rate limiter
limiter = Limiter(key_func=get_remote_address)

app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Setup global exception handlers
setup_exception_handlers(app)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(evaluator_router, prefix="/api/evaluate", tags=["Evaluation"])


@app.get("/")
def read_root():
    """Root endpoint demonstrating success_response usage."""
    return success_response(
        data={"message": "CareerVerse API Running"},
        message="Welcome to CareerVerse API",
    )


@app.get("/health")
def health_check():
    """Health check endpoint demonstrating success_response usage."""
    return success_response(data={"status": "healthy"}, message="Service is healthy")
