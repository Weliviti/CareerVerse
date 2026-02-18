# CareerVerse API Reference (Sprint 3)

This document provides a detailed reference for all API endpoints implemented during Sprint 3. The base URL for all requests is `http://<host>:<port>/api`.

## Authentication

Authentication is handled via Firebase. Most protected endpoints require a valid Firebase ID Token passed in the `Authorization` header as a Bearer token.

---

## Session Management

### 1. Start Session
Starts a new simulation session for the authenticated user.

- **URL:** `/sessions/start`
- **Method:** `POST`
- **Auth Required:** Yes
- **Request Body:**
  ```json
  {
    "simulation_type": "string" // e.g., "doctor", "teacher", "lawyer"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "session_id": "session_12345",
      "status": "active",
      "initial_message": "Hello doctor, I'm feeling..."
    },
    "message": "Session started successfully"
  }
  ```

### 2. End Session
Marks a simulation session as completed and calculates duration.

- **URL:** `/sessions/{session_id}/end`
- **Method:** `POST`
- **Auth Required:** Yes
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "session_id": "session_12345",
      "status": "completed",
      "duration": 15,
      "end_time": "2025-02-15T21:20:00Z"
    },
    "message": "Session ended successfully"
  }
  ```

---

## Persona Interactions

### 1. Persona Chat
Sends a message to an AI-powered persona during an active session and receives a response in character.

- **URL:** `/persona/chat`
- **Method:** `POST`
- **Auth Required:** Yes
- **Request Body:**
  ```json
  {
    "session_id": "string",
    "message": "string",
    "persona_type": "string",
    "history": [
      {
        "role": "user",
        "content": "string"
      },
      {
        "role": "assistant",
        "content": "string"
      }
    ]
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "response": "Persona's reply...",
      "emotion": "calm",
      "session_id": "session_12345"
    },
    "message": "Persona response generated successfully"
  }
  ```

---

## Evaluation

### 1. Evaluate Session
Generates an AI-powered evaluation and scores for a completed simulation session.

- **URL:** `/evaluate/session`
- **Method:** `POST`
- **Auth Required:** No (Internal/Triggered after end)
- **Request Body:**
  ```json
  {
    "session_id": "string"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "total_score": 85,
      "feedback": "Great empathy showed, but missed family history...",
      "breakdown": {
        "empathy": 90,
        "logic": 75,
        "communication": 85
      }
    },
    "message": "Session evaluated successfully"
  }
  ```

---

## Scores

### 1. Get User Scores
Retrieves a list of scores for a specific user.

- **URL:** `/scores/user/{uid}`
- **Method:** `GET`
- **Auth Required:** Yes
- **Query Parameters:**
  - `limit`: (optional) Number of records (default 10)
  - `cursor`: (optional) For pagination
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "scores": [
        {
          "score_id": "score_98765",
          "session_id": "session_12345",
          "total_score": 85,
          "simulation_type": "doctor",
          "timestamp": "2025-02-15T21:25:00Z"
        }
      ],
      "next_cursor": "score_id_xyz"
    },
    "message": "User scores retrieved successfully"
  }
  ```
