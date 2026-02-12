from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from main import app

client = TestClient(app)


@patch("routes.evaluator.session_service.get_session")
@patch("routes.evaluator.gemini_service.generate_response")
def test_evaluate_session_success(mock_gemini, mock_get_session):
    """Test the /api/evaluate/session endpoint returns correct evaluation."""

    # Create async mock functions
    async def mock_get_session_async(*args, **kwargs):
        return {
            "session_id": "test_session_123",
            "user_id": "user_456",
            "simulation_type": "doctor",
            "transcript": [
                {"role": "npc", "message": "Hello doctor, I have chest pain."},
                {
                    "role": "user",
                    "message": "I'm sorry to hear that. How long have you been experiencing this?",
                },
                {"role": "npc", "message": "For about 2 days now."},
            ],
            "status": "completed",
        }

    async def mock_gemini_async(*args, **kwargs):
        return '{"total_score": 85, "feedback": "Good job"}'

    # Assign async mocks
    mock_get_session.side_effect = mock_get_session_async
    mock_gemini.side_effect = mock_gemini_async

    # Make request to evaluate endpoint
    response = client.post(
        "/api/evaluate/session", json={"session_id": "test_session_123"}
    )

    # Assert response status
    assert response.status_code == 200

    # Assert response structure
    response_data = response.json()
    assert response_data["success"] is True
    assert "data" in response_data

    # Assert required keys exist
    data = response_data["data"]
    assert "total_score" in data
    assert "feedback" in data
    assert data["total_score"] == 85
    assert data["feedback"] == "Good job"


@patch("routes.evaluator.session_service.get_session")
def test_evaluate_session_not_found(mock_get_session):
    """Test the endpoint returns 404 when session doesn't exist."""

    # Mock session not found
    async def mock_get_session_async(*args, **kwargs):
        return None

    mock_get_session.side_effect = mock_get_session_async

    # Make request
    response = client.post(
        "/api/evaluate/session", json={"session_id": "nonexistent_session"}
    )

    # Assert 404 status
    assert response.status_code == 404
    assert "not found" in response.json()["detail"].lower()


@patch("routes.evaluator.session_service.get_session")
def test_evaluate_session_no_transcript(mock_get_session):
    """Test the endpoint returns 400 when session has no transcript."""

    # Mock session with empty transcript
    async def mock_get_session_async(*args, **kwargs):
        return {
            "session_id": "test_session_empty",
            "user_id": "user_456",
            "simulation_type": "doctor",
            "transcript": [],
            "status": "active",
        }

    mock_get_session.side_effect = mock_get_session_async

    # Make request
    response = client.post(
        "/api/evaluate/session", json={"session_id": "test_session_empty"}
    )

    # Assert 400 status
    assert response.status_code == 400
    assert "no transcript" in response.json()["detail"].lower()


@patch("routes.evaluator.session_service.get_session")
@patch("routes.evaluator.gemini_service.generate_response")
def test_evaluate_session_with_markdown_json(mock_gemini, mock_get_session):
    """Test the endpoint handles Gemini responses wrapped in markdown code blocks."""

    # Mock session data
    async def mock_get_session_async(*args, **kwargs):
        return {
            "session_id": "test_session_md",
            "user_id": "user_789",
            "simulation_type": "doctor",
            "transcript": [
                {"role": "npc", "message": "I feel dizzy."},
                {"role": "user", "message": "When did this start?"},
            ],
            "status": "completed",
        }

    # Mock Gemini response with markdown wrapper
    async def mock_gemini_async(*args, **kwargs):
        return '```json\n{"total_score": 75, "feedback": "Needs improvement"}\n```'

    mock_get_session.side_effect = mock_get_session_async
    mock_gemini.side_effect = mock_gemini_async

    # Make request
    response = client.post(
        "/api/evaluate/session", json={"session_id": "test_session_md"}
    )

    # Assert successful parse
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["total_score"] == 75
    assert data["feedback"] == "Needs improvement"
