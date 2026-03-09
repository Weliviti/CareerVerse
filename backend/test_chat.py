import requests
import sys

url = "http://127.0.0.1:8000/api/persona/chat"
headers = {"Content-Type": "application/json"}
data = {
    "session_id": "test_session_123",
    "message": "Hello, how are you feeling today?",
    "persona_type": "patient_anxious",
    "history": [],
}
if __name__ == "__main__":
    url = "http://127.0.0.1:8000/api/persona/chat"
    headers = {"Content-Type": "application/json"}
    data = {
        "session_id": "test_session_123",
        "message": "Hello, how are you feeling today?",
        "persona_type": "patient_anxious",
        "history": [],
    }

    # Add dummy token to bypass auth temporarily or test if the backend fails with what code
    print(f"Testing {url} with persona_type='{data['persona_type']}'")
    response = requests.post(url, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
