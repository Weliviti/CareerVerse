from fastapi.testclient import TestClient
from unittest.mock import patch
from main import app

client = TestClient(app)


@patch("services.score_service.score_service.get_user_scores")
def test_get_user_scores_success(mock_get):
    """Test GET /api/scores/user/{uid} returns scores with next_cursor."""

    async def mock_async(uid, limit=10, cursor=None):
        return {
            "scores": [
                {
                    "score_id": "score_001",
                    "user_id": uid,
                    "session_id": "session_abc",
                    "simulation_type": "doctor",
                    "total_score": 85,
                    "feedback": "Great job",
                    "created_at": "2026-02-13T10:00:00",
                }
            ],
            "next_cursor": "score_001",
        }

    mock_get.side_effect = mock_async

    response = client.get("/api/scores/user/test_uid_123?limit=1")

    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert len(data["data"]["scores"]) == 1
    assert data["data"]["next_cursor"] == "score_001"
    assert data["data"]["scores"][0]["total_score"] == 85


@patch("services.score_service.score_service.get_user_scores")
def test_get_user_scores_empty(mock_get):
    """Test endpoint returns empty list when user has no scores."""

    async def mock_async(uid, limit=10, cursor=None):
        return {"scores": [], "next_cursor": None}

    mock_get.side_effect = mock_async

    response = client.get("/api/scores/user/user_no_scores")

    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["scores"] == []
    assert data["data"]["next_cursor"] is None


@patch("services.score_service.score_service.get_user_scores")
def test_get_user_scores_with_cursor(mock_get):
    """Test endpoint passes cursor to service for pagination."""

    async def mock_async(uid, limit=10, cursor=None):
        return {
            "scores": [
                {
                    "score_id": "score_002",
                    "user_id": uid,
                    "total_score": 72,
                    "feedback": "Good effort",
                    "created_at": "2026-02-12T10:00:00",
                }
            ],
            "next_cursor": None,
        }

    mock_get.side_effect = mock_async

    response = client.get("/api/scores/user/test_uid?limit=5&cursor=score_001")

    assert response.status_code == 200
    # Verify the mock was called with correct cursor
    mock_get.assert_called_once_with(uid="test_uid", limit=5, cursor="score_001")


@patch("services.score_service.score_service.get_user_scores")
def test_get_user_scores_service_error(mock_get):
    """Test endpoint returns 500 when service raises an exception."""

    async def mock_async(uid, limit=10, cursor=None):
        raise Exception("Firestore connection failed")

    mock_get.side_effect = mock_async

    response = client.get("/api/scores/user/test_uid")

    assert response.status_code == 500
    data = response.json()
    assert data["success"] is False
    assert "Failed to retrieve scores" in data["message"]
