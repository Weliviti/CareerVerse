from fastapi.testclient import TestClient
from unittest.mock import patch
from main import app

client = TestClient(app)


@patch("services.evaluation_service.evaluation_service.evaluate_session")
def test_evaluate_session_success(mock_evaluate):
    """Test the /api/evaluate/session endpoint returns correct evaluation."""

    async def mock_evaluate_async(session_id):
        return {
            "total_score": 85,
            "feedback": "Good job",
            "session_id": session_id,
        }

    mock_evaluate.side_effect = mock_evaluate_async

    response = client.post(
        "/api/evaluate/session", json={"session_id": "test_session_123"}
    )

    assert response.status_code == 200
    response_data = response.json()
    assert response_data["success"] is True
    assert "data" in response_data

    data = response_data["data"]
    assert "total_score" in data
    assert "feedback" in data
    assert data["total_score"] == 85
    assert data["feedback"] == "Good job"


@patch("services.evaluation_service.evaluation_service.evaluate_session")
def test_evaluate_session_not_found(mock_evaluate):
    """Test the endpoint returns 404 when session doesn't exist."""

    async def mock_evaluate_async(session_id):
        raise ValueError(f"Session {session_id} not found")

    mock_evaluate.side_effect = mock_evaluate_async

    response = client.post(
        "/api/evaluate/session", json={"session_id": "nonexistent_session"}
    )

    assert response.status_code == 404
    body = response.json()
    # Global exception handler wraps as {success, message, error}
    assert (
        "not found" in body.get("error", "").lower()
        or "not found" in body.get("detail", "").lower()
    )


@patch("services.evaluation_service.evaluation_service.evaluate_session")
def test_evaluate_session_no_transcript(mock_evaluate):
    """Test the endpoint returns 400 when session has no transcript."""

    async def mock_evaluate_async(session_id):
        raise ValueError(f"Session {session_id} has no transcript to evaluate")

    mock_evaluate.side_effect = mock_evaluate_async

    response = client.post(
        "/api/evaluate/session", json={"session_id": "test_session_empty"}
    )

    assert response.status_code == 400
    body = response.json()
    assert (
        "no transcript" in body.get("error", "").lower()
        or "no transcript" in body.get("detail", "").lower()
    )


@patch("services.evaluation_service.evaluation_service.evaluate_session")
def test_evaluate_session_with_markdown_json(mock_evaluate):
    """Test the endpoint handles evaluation result correctly."""

    async def mock_evaluate_async(session_id):
        return {
            "total_score": 75,
            "feedback": "Needs improvement",
            "session_id": session_id,
        }

    mock_evaluate.side_effect = mock_evaluate_async

    response = client.post(
        "/api/evaluate/session", json={"session_id": "test_session_md"}
    )

    assert response.status_code == 200
    data = response.json()["data"]
    assert data["total_score"] == 75
    assert data["feedback"] == "Needs improvement"
