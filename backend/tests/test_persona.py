"""
Tests for the Persona Chat API endpoint.

This test suite validates the /api/persona/chat endpoint functionality
with mocked Gemini service to avoid external API calls during testing.
"""

from unittest.mock import patch, AsyncMock, MagicMock
from fastapi.testclient import TestClient
import pytest
import importlib.util

# Check if persona module exists
persona_module_exists = importlib.util.find_spec("routes.persona") is not None
skip_if_no_persona = pytest.mark.skipif(
    not persona_module_exists,
    reason="Persona endpoint not yet merged. Tests will run after feature/day11-persona-endpoint is merged.",
)


# Mock dependencies before importing main
@pytest.fixture(autouse=True)
def mock_firebase_and_gemini():
    """Mock Firebase Admin and Gemini service to avoid initialization errors."""
    with (
        patch("services.firebase_admin_service.firebase_admin"),
        patch("services.gemini_service.genai"),
    ):
        yield


@pytest.fixture
def client():
    """Create a FastAPI test client with dependency overrides."""
    from main import app
    from middleware.auth import verify_token

    # Override the verify_token dependency to bypass authentication
    def override_verify_token():
        return {"uid": "test_user_123", "email": "test@example.com"}

    app.dependency_overrides[verify_token] = override_verify_token

    test_client = TestClient(app)
    yield test_client

    # Clean up
    app.dependency_overrides.clear()


@pytest.fixture
def valid_chat_request():
    """Fixture providing a valid chat request payload."""
    return {
        "session_id": "test_session_123",
        "message": "Hello doctor, I have chest pain",
        "persona_type": "patients/patient_anxious",
        "history": [],
    }


@pytest.fixture
def mock_gemini_response():
    """Fixture providing a mocked Gemini API response."""
    return "Hello! I'm really worried about this pain. It's been going on for three days now and I can't stop thinking about it. What if it's something serious? EMOTION: anxious"


class TestPersonaChatEndpoint:
    """Test suite for the /api/persona/chat endpoint."""

    @skip_if_no_persona
    @patch("routes.persona.GeminiService")
    @patch("routes.persona.PromptManager")
    def test_persona_chat_success(
        self,
        mock_prompt_manager,
        mock_gemini_service,
        client,
        valid_chat_request,
        mock_gemini_response,
    ):
        """
        Test successful persona chat with valid data.

        Expected: 200 OK with response, emotion, and session_id fields.
        """
        # Setup mocks
        mock_prompt_instance = MagicMock()
        mock_prompt_instance.load_template.return_value = (
            "You are an anxious patient..."
        )
        mock_prompt_manager.return_value = mock_prompt_instance

        mock_gemini_instance = MagicMock()
        mock_gemini_instance.generate_response = AsyncMock(
            return_value=mock_gemini_response
        )
        mock_gemini_service.return_value = mock_gemini_instance

        # Make request
        response = client.post("/api/persona/chat", json=valid_chat_request)

        # Assertions
        assert response.status_code == 200

        response_data = response.json()
        assert response_data["success"] is True
        assert "data" in response_data

        data = response_data["data"]
        assert "response" in data
        assert "emotion" in data
        assert "session_id" in data
        assert data["session_id"] == "test_session_123"
        assert data["emotion"] == "anxious"
        assert len(data["response"]) > 0

    @skip_if_no_persona
    def test_missing_session_id(self, client, valid_chat_request):
        """
        Test request with missing session_id field.

        Expected: 422 Unprocessable Entity (Pydantic validation error).
        """
        # Remove session_id from request
        invalid_request = valid_chat_request.copy()
        del invalid_request["session_id"]

        # Make request
        response = client.post("/api/persona/chat", json=invalid_request)

        # Assertions
        assert response.status_code == 422
        response_data = response.json()
        assert "detail" in response_data

    @skip_if_no_persona
    def test_missing_message(self, client, valid_chat_request):
        """
        Test request with missing message field.

        Expected: 422 Unprocessable Entity (Pydantic validation error).
        """
        # Remove message from request
        invalid_request = valid_chat_request.copy()
        del invalid_request["message"]

        # Make request
        response = client.post("/api/persona/chat", json=invalid_request)

        # Assertions
        assert response.status_code == 422
        response_data = response.json()
        assert "detail" in response_data

    @skip_if_no_persona
    def test_missing_persona_type(self, client, valid_chat_request):
        """
        Test request with missing persona_type field.

        Expected: 422 Unprocessable Entity (Pydantic validation error).
        """
        # Remove persona_type from request
        invalid_request = valid_chat_request.copy()
        del invalid_request["persona_type"]

        # Make request
        response = client.post("/api/persona/chat", json=invalid_request)

        # Assertions
        assert response.status_code == 422
        response_data = response.json()
        assert "detail" in response_data

    @skip_if_no_persona
    @patch("routes.persona.GeminiService")
    @patch("routes.persona.PromptManager")
    def test_invalid_persona_type(
        self, mock_prompt_manager, mock_gemini_service, client, valid_chat_request
    ):
        """
        Test request with invalid/non-existent persona_type.

        Expected: 400 Bad Request (persona template not found).
        """
        # Setup mocks - PromptManager raises FileNotFoundError for invalid template
        mock_prompt_instance = MagicMock()
        mock_prompt_instance.load_template.side_effect = FileNotFoundError(
            "Prompt template 'invalid_persona' not found"
        )
        mock_prompt_manager.return_value = mock_prompt_instance

        # Modify request with invalid persona type
        invalid_request = valid_chat_request.copy()
        invalid_request["persona_type"] = "invalid_persona"

        # Make request
        response = client.post("/api/persona/chat", json=invalid_request)

        # Assertions
        assert response.status_code == 400
        response_data = response.json()
        assert response_data["success"] is False
        assert (
            "Persona type" in response_data["message"]
            or "not found" in response_data["message"].lower()
        )

    @skip_if_no_persona
    @patch("routes.persona.GeminiService")
    @patch("routes.persona.PromptManager")
    def test_persona_chat_with_conversation_history(
        self,
        mock_prompt_manager,
        mock_gemini_service,
        client,
        valid_chat_request,
        mock_gemini_response,
    ):
        """
        Test persona chat with previous conversation history.

        Expected: 200 OK with response including conversation context.
        """
        # Setup mocks
        mock_prompt_instance = MagicMock()
        mock_prompt_instance.load_template.return_value = (
            "You are an anxious patient..."
        )
        mock_prompt_manager.return_value = mock_prompt_instance

        mock_gemini_instance = MagicMock()
        mock_gemini_instance.generate_response = AsyncMock(
            return_value=mock_gemini_response
        )
        mock_gemini_service.return_value = mock_gemini_instance

        # Add conversation history
        request_with_history = valid_chat_request.copy()
        request_with_history["history"] = [
            {"role": "user", "content": "Hello"},
            {"role": "assistant", "content": "Hi there!"},
        ]

        # Make request
        response = client.post("/api/persona/chat", json=request_with_history)

        # Assertions
        assert response.status_code == 200
        response_data = response.json()
        assert response_data["success"] is True
        assert "data" in response_data
        assert "response" in response_data["data"]
