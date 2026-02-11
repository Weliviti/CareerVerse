# Persona Chat API

This document details the API endpoint for interacting with AI personas in CareerVerse simulations.

## Endpoint

**POST** `/api/persona/chat`

## Description

Sends a message to a specific AI persona and receives a response along with the persona's current emotional state. This endpoint simulates a conversation with a patient (Doctor Simulation) or a student (Teacher Simulation).

## Request

### Headers
- `Authorization`: Bearer `<firebase_id_token>` (Required)
- `Content-Type`: `application/json`

### Body Parameters

| Field | Type | Required | Description |
|---|---|---|---|
| `session_id` | string | Yes | Unique identifier for the current simulation session. |
| `message` | string | Yes | The user's message to the persona. |
| `persona_type` | string | Yes | The specific variant of the persona to interact with. See [Available Variants](#available-variants) below. |
| `history` | array | No | List of previous messages in the conversation to maintain context. |

### `history` Object Structure

| Field | Type | Description |
|---|---|---|
| `role` | string | The sender of the message. Values: `'user'` or `'assistant'`. |
| `content` | string | The text content of the message. |

### Example Request

```json
{
  "session_id": "sess_abc12345",
  "message": "Hello, how are you feeling today?",
  "persona_type": "patient_anxious",
  "history": [
    {
      "role": "assistant",
      "content": "I... I don't know why I'm here really. I just feel weird."
    },
    {
      "role": "user",
      "content": "Can you tell me more about what you're feeling?"
    }
  ]
}
```

## Response

### Success (200 OK)

| Field | Type | Description |
|---|---|---|
| `response` | string | The persona's reply to the user's message. |
| `emotion` | string | The detected emotion of the persona (e.g., `calm`, `anxious`, `angry`). |
| `session_id` | string | The session identifier returned for confirmation. |

### Example Response

```json
{
  "response": "My chest... it feels tight. Is that bad? Am I having a heart attack?",
  "emotion": "anxious",
  "session_id": "sess_abc12345"
}
```

### Error Responses

- **400 Bad Request**: Invalid `persona_type` or missing required fields.
- **401 Unauthorized**: Missing or invalid Firebase token.
- **500 Internal Server Error**: Issues with LLM generation or server processing.

## Available Variants

Use these values for the `persona_type` field to select the specific character variant.

### Doctor Simulation (Patients)
- `patient_anxious`: A nervous patient who needs reassurance.
- `patient_hiding`: A patient concealing lifestyle habits or symptoms.
- `patient_elderly`: An older patient who may be confused or hard of hearing.

### Teacher Simulation (Students)
- `disruptive`: Liam (15). Class clown, makes jokes, challenges authority.
- `quiet`: Sarah (15). Terrified of speaking up, very shy.
- `bored`: Alex (15). Smart but disengaged and apathetic.
