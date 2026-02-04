from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from utils.responses import success_response, error_response, setup_exception_handlers
from routes.auth import router as auth_router

app = FastAPI()

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
