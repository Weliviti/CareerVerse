# 🎮 CareerVerse — Unity Teacher Simulation: Complete Setup Guide

> **Purpose:** This guide gives you every C# script, exact step-by-step order, and Animator setup instructions needed to build the Teacher simulation in Unity **before** you make a WebGL build. All scripts are written to match your **existing** FastAPI backend API contracts.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Scene Hierarchy Setup](#2-scene-hierarchy-setup)
3. [C# Script #1 — `ApiConfig.cs`](#3-c-script-1--apiconfigcs)
4. [C# Script #2 — `ApiManager.cs`](#4-c-script-2--apimanagercs)
5. [C# Script #3 — `StudentAgent.cs`](#5-c-script-3--studentagentcs)
6. [C# Script #4 — `ClassroomManager.cs`](#6-c-script-4--classroommanagercs)
7. [C# Script #5 — `ChatUIManager.cs`](#7-c-script-5--chatuimanagercs)
8. [C# Script #6 — `SessionManager.cs`](#8-c-script-6--sessionmanagercs)
9. [Animator Setup for Student Emotions](#9-animator-setup-for-student-emotions)
10. [Unity UI Canvas Setup](#10-unity-ui-canvas-setup)
11. [Wiring Everything in the Inspector](#11-wiring-everything-in-the-inspector)
12. [WebGL Build Settings](#12-webgl-build-settings)
13. [Pasting into React Frontend](#13-pasting-into-react-frontend)
14. [Testing Checklist](#14-testing-checklist)

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│  React Frontend                                              │
│                                                              │
│  SimulationHub.jsx  ──(click Launch)──►  POST /api/simulations/launch
│       │                                  Returns: session_id │
│       ▼                                                      │
│  Opens iframe / new tab:                                     │
│  /games/teacher-sim/index.html?token=XXX&session=YYY         │
│                                                              │
│  ┌────────────────────────────────────────────────────┐      │
│  │           UNITY WebGL GAME                         │      │
│  │                                                    │      │
│  │  1. Reads ?token=XXX&session=YYY from URL         │      │
│  │  2. Player types message → Send button             │      │
│  │  3. POST /api/persona/chat  ────────────►  FastAPI │      │
│  │     Body: {session_id, message, persona_type,      │      │
│  │            history: [...]}                         │      │
│  │     Response: {success, data: {                    │      │
│  │       response: "...", emotion: "angry",           │      │
│  │       session_id: "..."                            │      │
│  │     }}                                             │      │
│  │  4. Show reply on correct student (Liam/Sarah/Alex)│      │
│  │  5. Trigger emotion animation                      │      │
│  │  6. On "End Simulation" → call complete endpoint   │      │
│  └────────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### Your Backend API Response Format

All API responses use this wrapper:
```json
{
    "success": true,
    "message": "Persona response generated successfully",
    "data": {
        "response": "Whatever, this is so boring...",
        "emotion": "frustrated",
        "session_id": "session_abc123"
    },
    "error": null
}
```

### Your 3 Student Personas (from `students.py`)

| Key          | Name    | Personality                        |
|--------------|---------|-------------------------------------|
| `disruptive` | **Liam** | Class clown, challenges authority   |
| `quiet`      | **Sarah**| Shy, anxious, short sentences       |
| `bored`      | **Alex** | Smart but disengaged, apathetic     |

### Emotions Your Backend Can Return

`calm`, `nervous`, `anxious`, `frustrated`, `happy`, `confused`, `angry`, `sad`, `relieved`

---

## 2. Scene Hierarchy Setup

Set up your Unity Hierarchy **exactly** like this before building:

```
📂 Classroom (Scene)
│
├── 🎮 GameManager          (Empty GameObject — holds scripts)
│
├── 🧑 Liam                  (3D Student Model — the disruptive one)
│   ├── ChatBubble           (World-space Canvas for speech bubble)
│   └── Animator             (with emotion triggers)
│
├── 👩 Sarah                 (3D Student Model — the quiet one)
│   ├── ChatBubble
│   └── Animator
│
├── 🧑 Alex                  (3D Student Model — the bored one)
│   ├── ChatBubble
│   └── Animator
│
├── 🎥 Main Camera
├── 💡 Directional Light
│
└── 📱 Canvas (Screen Space) (UI for chat input/output)
    ├── ChatPanel
    │   ├── ScrollView
    │   │   └── ChatContent  (Vertical Layout Group)
    │   ├── InputField       (TMP_InputField)
    │   ├── SendButton       (Button)
    │   └── EndSimButton     (Button)
    ├── StudentSelector      (3 buttons to pick who you talk to)
    │   ├── BtnLiam
    │   ├── BtnSarah
    │   └── BtnAlex
    └── StatusText           (TextMeshProUGUI — "Connecting...", etc.)
```

> **CRITICAL:** The 3D student GameObjects MUST be named **exactly** `Liam`, `Sarah`, `Alex` — these names are used by `GameObject.Find()` to locate the right student.

---

## 3. C# Script #1 — `ApiConfig.cs`

> Static config — stores the backend URL and holds the token/session extracted from the browser URL.

Create: **Right-click Project > Create > C# Script > Name: `ApiConfig`**

```csharp
// ApiConfig.cs — Static configuration for API communication
using UnityEngine;

public static class ApiConfig
{
    // ── CHANGE THIS to your Render URL when deploying ──
    // For local testing, keep localhost:
    public static string BackendBaseUrl = "http://localhost:8000";

    // These are populated at runtime from the browser URL
    public static string AuthToken = "";
    public static string SessionId = "";

    // ── API Endpoint Paths (matching your FastAPI routes) ──
    public static string PersonaChatUrl => BackendBaseUrl + "/api/persona/chat";
    public static string SimulationLaunchUrl => BackendBaseUrl + "/api/simulations/launch";
    public static string EvaluateSessionUrl => BackendBaseUrl + "/api/evaluate/session";
    public static string SessionEndUrl => BackendBaseUrl + "/api/sessions/end";

    /// <summary>
    /// Extract ?token=X&session=Y from the browser URL (WebGL only).
    /// Call this once in your first scene's Start().
    /// </summary>
    public static void ExtractUrlParameters()
    {
        if (Application.platform == RuntimePlatform.WebGLPlayer)
        {
            string url = Application.absoluteURL;
            Debug.Log("[ApiConfig] Full URL: " + url);

            if (url.Contains("?"))
            {
                string queryString = url.Split('?')[1];
                string[] parameters = queryString.Split('&');

                foreach (string param in parameters)
                {
                    string[] keyValue = param.Split('=');
                    if (keyValue.Length == 2)
                    {
                        if (keyValue[0] == "token") AuthToken = keyValue[1];
                        if (keyValue[0] == "session") SessionId = keyValue[1];
                    }
                }
            }

            Debug.Log("[ApiConfig] Token: " + AuthToken.Substring(0, Mathf.Min(10, AuthToken.Length)) + "...");
            Debug.Log("[ApiConfig] Session: " + SessionId);
        }
        else
        {
            // Unity Editor fallback for testing
            AuthToken = "test_editor_token";
            SessionId = "test_session_editor";
            Debug.Log("[ApiConfig] Running in Editor — using test credentials");
        }
    }
}
```

---

## 4. C# Script #2 — `ApiManager.cs`

> Handles ALL HTTP communication with your FastAPI backend using `UnityWebRequest`. This is the ONLY way to do HTTP in WebGL.

Create: **Right-click Project > Create > C# Script > Name: `ApiManager`**

```csharp
// ApiManager.cs — Handles all HTTP calls to the CareerVerse FastAPI backend
using System;
using System.Collections;
using System.Text;
using UnityEngine;
using UnityEngine.Networking;

public class ApiManager : MonoBehaviour
{
    public static ApiManager Instance { get; private set; }

    void Awake()
    {
        // Singleton pattern — only one ApiManager in the scene
        if (Instance == null)
        {
            Instance = this;
        }
        else
        {
            Destroy(gameObject);
        }
    }

    // ══════════════════════════════════════════════════
    //  PERSONA CHAT — POST /api/persona/chat
    // ══════════════════════════════════════════════════
    /// <summary>
    /// Send the player's message to a specific student persona.
    /// </summary>
    /// <param name="message">What the player typed</param>
    /// <param name="personaType">One of: "disruptive", "quiet", "bored"</param>
    /// <param name="history">Previous conversation messages (JSON array string)</param>
    /// <param name="onSuccess">Callback with (responseText, emotion)</param>
    /// <param name="onError">Callback with error message</param>
    public void SendChat(string message, string personaType, string historyJson,
                         Action<string, string> onSuccess, Action<string> onError)
    {
        // Build JSON body matching your ChatRequest Pydantic model
        string jsonBody = "{" +
            "\"session_id\":\"" + EscapeJson(ApiConfig.SessionId) + "\"," +
            "\"message\":\"" + EscapeJson(message) + "\"," +
            "\"persona_type\":\"" + EscapeJson(personaType) + "\"," +
            "\"history\":" + (string.IsNullOrEmpty(historyJson) ? "[]" : historyJson) +
        "}";

        StartCoroutine(PostRequest(ApiConfig.PersonaChatUrl, jsonBody, (json) =>
        {
            // Parse the wrapper: { success, message, data: { response, emotion, session_id } }
            ApiResponse wrapper = JsonUtility.FromJson<ApiResponse>(json);
            if (wrapper.success && wrapper.data != null)
            {
                onSuccess?.Invoke(wrapper.data.response, wrapper.data.emotion);
            }
            else
            {
                onError?.Invoke("API returned success=false: " + wrapper.message);
            }
        }, onError));
    }

    // ══════════════════════════════════════════════════
    //  END SIMULATION — Signal backend to end session
    // ══════════════════════════════════════════════════
    public void EndSimulation(Action<string> onSuccess, Action<string> onError)
    {
        string jsonBody = "{\"session_id\":\"" + EscapeJson(ApiConfig.SessionId) + "\"}";

        StartCoroutine(PostRequest(ApiConfig.SessionEndUrl, jsonBody, (json) =>
        {
            onSuccess?.Invoke("Session ended");
        }, onError));
    }

    // ══════════════════════════════════════════════════
    //  TRIGGER EVALUATION — POST /api/evaluate/session
    // ══════════════════════════════════════════════════
    public void TriggerEvaluation(Action<string> onSuccess, Action<string> onError)
    {
        string jsonBody = "{\"session_id\":\"" + EscapeJson(ApiConfig.SessionId) + "\"}";

        StartCoroutine(PostRequest(ApiConfig.EvaluateSessionUrl, jsonBody, (json) =>
        {
            onSuccess?.Invoke(json);
        }, onError));
    }

    // ══════════════════════════════════════════════════
    //  GENERIC POST REQUEST
    // ══════════════════════════════════════════════════
    private IEnumerator PostRequest(string url, string jsonBody,
                                     Action<string> onSuccess, Action<string> onError)
    {
        Debug.Log("[ApiManager] POST " + url);
        Debug.Log("[ApiManager] Body: " + jsonBody);

        using (UnityWebRequest request = new UnityWebRequest(url, "POST"))
        {
            byte[] bodyRaw = Encoding.UTF8.GetBytes(jsonBody);
            request.uploadHandler = new UploadHandlerRaw(bodyRaw);
            request.downloadHandler = new DownloadHandlerBuffer();

            // Headers — must match what FastAPI expects
            request.SetRequestHeader("Content-Type", "application/json");
            request.SetRequestHeader("Authorization", "Bearer " + ApiConfig.AuthToken);

            yield return request.SendWebRequest();

            if (request.result == UnityWebRequest.Result.Success)
            {
                Debug.Log("[ApiManager] Response: " + request.downloadHandler.text);
                onSuccess?.Invoke(request.downloadHandler.text);
            }
            else
            {
                string errorMsg = request.error + " | " + request.downloadHandler.text;
                Debug.LogError("[ApiManager] Error: " + errorMsg);
                onError?.Invoke(errorMsg);
            }
        }
    }

    /// <summary>
    /// Escape special characters for JSON strings.
    /// </summary>
    private string EscapeJson(string input)
    {
        if (string.IsNullOrEmpty(input)) return "";
        return input
            .Replace("\\", "\\\\")
            .Replace("\"", "\\\"")
            .Replace("\n", "\\n")
            .Replace("\r", "\\r")
            .Replace("\t", "\\t");
    }
}

// ══════════════════════════════════════════════════
//  JSON DATA CLASSES
//  These match YOUR FastAPI response wrapper format
// ══════════════════════════════════════════════════

[Serializable]
public class ApiResponse
{
    public bool success;
    public string message;
    public ChatData data;
    public string error;
}

[Serializable]
public class ChatData
{
    public string response;
    public string emotion;
    public string session_id;
}
```

---

## 5. C# Script #3 — `StudentAgent.cs`

> Attach this to each student 3D model (Liam, Sarah, Alex). It holds the student's persona settings and controls their chat bubble + animations.

Create: **Right-click Project > Create > C# Script > Name: `StudentAgent`**

```csharp
// StudentAgent.cs — Attach to each student 3D model (Liam, Sarah, Alex)
using System.Collections;
using UnityEngine;
using TMPro;

public class StudentAgent : MonoBehaviour
{
    [Header("Persona Settings")]
    [Tooltip("Must match the keys in your backend students.py: disruptive, quiet, bored")]
    public string personaType;  // Set in Inspector: "disruptive" for Liam, etc.

    [Tooltip("Display name shown in chat")]
    public string studentName;  // Set in Inspector: "Liam", "Sarah", "Alex"

    [Header("Chat Bubble")]
    [Tooltip("The TextMeshPro text inside the world-space ChatBubble canvas")]
    public TextMeshProUGUI chatBubbleText;

    [Tooltip("The ChatBubble parent object (enable/disable to show/hide)")]
    public GameObject chatBubbleObject;

    [Header("Animation")]
    public Animator studentAnimator;

    private string currentEmotion = "calm";

    void Start()
    {
        // Hide chat bubble initially
        if (chatBubbleObject != null)
            chatBubbleObject.SetActive(false);

        // Auto-find animator if not assigned
        if (studentAnimator == null)
            studentAnimator = GetComponent<Animator>();
    }

    /// <summary>
    /// Called when the backend returns a response for this student.
    /// Shows the chat bubble and triggers the emotion animation.
    /// </summary>
    public void ShowResponse(string responseText, string emotion)
    {
        // Update chat bubble
        if (chatBubbleText != null)
        {
            chatBubbleText.text = responseText;
        }

        if (chatBubbleObject != null)
        {
            chatBubbleObject.SetActive(true);
            // Auto-hide after 8 seconds
            StopCoroutine("HideBubbleAfterDelay");
            StartCoroutine(HideBubbleAfterDelay(8f));
        }

        // Trigger emotion animation
        SetEmotion(emotion);
    }

    /// <summary>
    /// Fire the emotion trigger on the Animator.
    /// The trigger name MUST match what you create in the Animator window.
    /// </summary>
    public void SetEmotion(string emotion)
    {
        currentEmotion = emotion;

        if (studentAnimator != null)
        {
            // Reset previous triggers to avoid conflicts
            studentAnimator.ResetTrigger("calm");
            studentAnimator.ResetTrigger("nervous");
            studentAnimator.ResetTrigger("anxious");
            studentAnimator.ResetTrigger("frustrated");
            studentAnimator.ResetTrigger("happy");
            studentAnimator.ResetTrigger("confused");
            studentAnimator.ResetTrigger("angry");
            studentAnimator.ResetTrigger("sad");
            studentAnimator.ResetTrigger("relieved");

            // Fire the new emotion trigger
            studentAnimator.SetTrigger(emotion);
            Debug.Log($"[{studentName}] Emotion → {emotion}");
        }
    }

    public string GetPersonaType() => personaType;
    public string GetStudentName() => studentName;

    private IEnumerator HideBubbleAfterDelay(float delay)
    {
        yield return new WaitForSeconds(delay);
        if (chatBubbleObject != null)
            chatBubbleObject.SetActive(false);
    }
}
```

### Inspector Settings for Each Student:

| Student Model | `personaType` | `studentName` |
|--------------|---------------|---------------|
| Liam          | `disruptive`  | `Liam`        |
| Sarah         | `quiet`       | `Sarah`       |
| Alex          | `bored`       | `Alex`        |

---

## 6. C# Script #4 — `ClassroomManager.cs`

> The main controller. Manages which student is selected, sends messages, and coordinates responses. Attach to the `GameManager` object.

Create: **Right-click Project > Create > C# Script > Name: `ClassroomManager`**

```csharp
// ClassroomManager.cs — Main controller for the Teacher simulation
using System;
using System.Collections.Generic;
using UnityEngine;

public class ClassroomManager : MonoBehaviour
{
    [Header("Student References")]
    public StudentAgent liam;
    public StudentAgent sarah;
    public StudentAgent alex;

    // Currently selected student to talk to
    private StudentAgent selectedStudent;

    // Conversation history per student (for context)
    private Dictionary<string, List<HistoryMessage>> histories
        = new Dictionary<string, List<HistoryMessage>>();

    void Start()
    {
        // Default: select Liam
        SelectStudent("Liam");

        // Init empty histories
        histories["disruptive"] = new List<HistoryMessage>();
        histories["quiet"] = new List<HistoryMessage>();
        histories["bored"] = new List<HistoryMessage>();
    }

    /// <summary>
    /// Called by the student selector buttons in the UI.
    /// </summary>
    public void SelectStudent(string studentName)
    {
        switch (studentName)
        {
            case "Liam": selectedStudent = liam; break;
            case "Sarah": selectedStudent = sarah; break;
            case "Alex": selectedStudent = alex; break;
            default:
                Debug.LogWarning("Unknown student: " + studentName);
                selectedStudent = liam;
                break;
        }

        Debug.Log("[ClassroomManager] Selected: " + studentName);

        // Notify UI
        if (ChatUIManager.Instance != null)
            ChatUIManager.Instance.UpdateSelectedStudent(studentName);
    }

    /// <summary>
    /// Called by ChatUIManager when the player clicks Send.
    /// </summary>
    public void SendMessageToStudent(string playerMessage)
    {
        if (selectedStudent == null)
        {
            Debug.LogError("No student selected!");
            return;
        }

        string persona = selectedStudent.GetPersonaType();
        string studentName = selectedStudent.GetStudentName();

        // Build history JSON for this student
        string historyJson = BuildHistoryJson(persona);

        // Show "thinking..." in UI
        if (ChatUIManager.Instance != null)
            ChatUIManager.Instance.SetThinking(true, studentName);

        // Send to backend
        ApiManager.Instance.SendChat(
            message: playerMessage,
            personaType: persona,
            historyJson: historyJson,
            onSuccess: (responseText, emotion) =>
            {
                // Add to history
                histories[persona].Add(new HistoryMessage { role = "user", content = playerMessage });
                histories[persona].Add(new HistoryMessage { role = "assistant", content = responseText });

                // Update the 3D student
                selectedStudent.ShowResponse(responseText, emotion);

                // Update the chat UI
                if (ChatUIManager.Instance != null)
                {
                    ChatUIManager.Instance.SetThinking(false, studentName);
                    ChatUIManager.Instance.AddMessage(studentName, responseText, emotion);
                }
            },
            onError: (error) =>
            {
                Debug.LogError("[ClassroomManager] Chat error: " + error);
                if (ChatUIManager.Instance != null)
                {
                    ChatUIManager.Instance.SetThinking(false, studentName);
                    ChatUIManager.Instance.AddSystemMessage("⚠ Error connecting to AI. Try again.");
                }
            }
        );
    }

    /// <summary>
    /// Build the JSON array of history messages for the /persona/chat endpoint.
    /// Matches your backend's Message model: { role: "user"|"assistant", content: "..." }
    /// </summary>
    private string BuildHistoryJson(string personaKey)
    {
        List<HistoryMessage> hist = histories[personaKey];
        if (hist.Count == 0) return "[]";

        // Build JSON array manually (no external JSON lib needed in WebGL)
        string json = "[";
        for (int i = 0; i < hist.Count; i++)
        {
            json += "{\"role\":\"" + hist[i].role + "\",\"content\":\"" +
                    ApiManager.Instance.GetType()
                        .GetMethod("EscapeJson", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)
                        == null
                    ? hist[i].content.Replace("\"", "\\\"").Replace("\n", "\\n")
                    : hist[i].content.Replace("\"", "\\\"").Replace("\n", "\\n")
                    + "\"}";
            if (i < hist.Count - 1) json += ",";
        }
        json += "]";
        return json;
    }
}

[Serializable]
public class HistoryMessage
{
    public string role;    // "user" or "assistant"
    public string content;
}
```

---

## 7. C# Script #5 — `ChatUIManager.cs`

> Controls the entire chat panel UI — displays messages, handles input, shows thinking indicator.

Create: **Right-click Project > Create > C# Script > Name: `ChatUIManager`**

```csharp
// ChatUIManager.cs — Manages the chat UI panel
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class ChatUIManager : MonoBehaviour
{
    public static ChatUIManager Instance { get; private set; }

    [Header("Chat Elements")]
    public TMP_InputField chatInput;
    public Button sendButton;
    public TextMeshProUGUI chatHistoryText;
    public ScrollRect chatScrollRect;

    [Header("Student Selector Buttons")]
    public Button btnLiam;
    public Button btnSarah;
    public Button btnAlex;

    [Header("Status")]
    public TextMeshProUGUI statusText;
    public TextMeshProUGUI selectedStudentLabel;

    [Header("End Simulation")]
    public Button endSimButton;

    [Header("References")]
    public ClassroomManager classroomManager;

    private string currentStudent = "Liam";

    void Awake()
    {
        if (Instance == null) Instance = this;
        else Destroy(gameObject);
    }

    void Start()
    {
        // Wire button clicks
        sendButton.onClick.AddListener(OnSendClicked);
        btnLiam.onClick.AddListener(() => classroomManager.SelectStudent("Liam"));
        btnSarah.onClick.AddListener(() => classroomManager.SelectStudent("Sarah"));
        btnAlex.onClick.AddListener(() => classroomManager.SelectStudent("Alex"));
        endSimButton.onClick.AddListener(OnEndSimulation);

        // Allow Enter key to send
        chatInput.onSubmit.AddListener((text) => OnSendClicked());

        // Init
        chatHistoryText.text = "";
        statusText.text = "Connected ✓";
        UpdateSelectedStudent("Liam");
    }

    void OnSendClicked()
    {
        string message = chatInput.text.Trim();
        if (string.IsNullOrEmpty(message)) return;

        // Show player's message in chat
        AddPlayerMessage(message);
        chatInput.text = "";
        chatInput.ActivateInputField();

        // Send to the backend via ClassroomManager
        classroomManager.SendMessageToStudent(message);
    }

    public void AddPlayerMessage(string text)
    {
        chatHistoryText.text += "\n<color=#0d9488><b>You:</b></color> " + text;
        ScrollToBottom();
    }

    public void AddMessage(string studentName, string text, string emotion)
    {
        string emotionEmoji = GetEmotionEmoji(emotion);
        chatHistoryText.text += $"\n<color=#374151><b>{studentName} {emotionEmoji}:</b></color> {text}";
        ScrollToBottom();
    }

    public void AddSystemMessage(string text)
    {
        chatHistoryText.text += "\n<color=#9ca3af><i>" + text + "</i></color>";
        ScrollToBottom();
    }

    public void SetThinking(bool isThinking, string studentName)
    {
        statusText.text = isThinking
            ? $"{studentName} is thinking..."
            : "Connected ✓";
    }

    public void UpdateSelectedStudent(string name)
    {
        currentStudent = name;
        if (selectedStudentLabel != null)
            selectedStudentLabel.text = "Talking to: " + name;
    }

    void OnEndSimulation()
    {
        statusText.text = "Ending simulation...";
        sendButton.interactable = false;
        chatInput.interactable = false;

        // Call SessionManager to end the session + trigger evaluation
        if (SessionManager.Instance != null)
            SessionManager.Instance.EndAndEvaluate();
    }

    private string GetEmotionEmoji(string emotion)
    {
        switch (emotion)
        {
            case "happy": return "😊";
            case "angry": return "😠";
            case "frustrated": return "😤";
            case "sad": return "😢";
            case "nervous": return "😰";
            case "anxious": return "😟";
            case "confused": return "😕";
            case "relieved": return "😌";
            default: return "😐"; // calm
        }
    }

    void ScrollToBottom()
    {
        Canvas.ForceUpdateCanvases();
        if (chatScrollRect != null)
            chatScrollRect.verticalNormalizedPosition = 0f;
    }
}
```

---

## 8. C# Script #6 — `SessionManager.cs`

> Handles the simulation lifecycle: init on start, end session, trigger evaluation, and redirect back to React.

Create: **Right-click Project > Create > C# Script > Name: `SessionManager`**

```csharp
// SessionManager.cs — Simulation lifecycle (start, end, evaluate, redirect)
using System.Runtime.InteropServices;
using UnityEngine;

public class SessionManager : MonoBehaviour
{
    public static SessionManager Instance { get; private set; }

    // JavaScript function to redirect back to React (WebGL only)
    [DllImport("__Internal")]
    private static extern void RedirectToResults(string url);

    void Awake()
    {
        if (Instance == null) Instance = this;
        else Destroy(gameObject);
    }

    void Start()
    {
        // Step 1: Extract token + session from the browser URL
        ApiConfig.ExtractUrlParameters();

        Debug.Log("[SessionManager] Simulation started. Session: " + ApiConfig.SessionId);

        // Show welcome message
        if (ChatUIManager.Instance != null)
        {
            ChatUIManager.Instance.AddSystemMessage(
                "Welcome to the Teacher Simulation! You are teaching a 10th-grade English class. " +
                "Select a student to talk to and manage your classroom. Good luck!"
            );
        }
    }

    /// <summary>
    /// Called when the player clicks "End Simulation".
    /// 1. Ends the session on the backend
    /// 2. Triggers AI evaluation
    /// 3. Redirects back to React results page
    /// </summary>
    public void EndAndEvaluate()
    {
        Debug.Log("[SessionManager] Ending simulation...");

        // Step 1: End the session
        ApiManager.Instance.EndSimulation(
            onSuccess: (msg) =>
            {
                Debug.Log("[SessionManager] Session ended: " + msg);

                // Step 2: Trigger evaluation
                ApiManager.Instance.TriggerEvaluation(
                    onSuccess: (evalJson) =>
                    {
                        Debug.Log("[SessionManager] Evaluation complete: " + evalJson);

                        // Step 3: Redirect back to React
                        RedirectBackToReact();
                    },
                    onError: (error) =>
                    {
                        Debug.LogError("[SessionManager] Evaluation error: " + error);
                        // Still redirect — React can handle the error
                        RedirectBackToReact();
                    }
                );
            },
            onError: (error) =>
            {
                Debug.LogError("[SessionManager] End session error: " + error);
                RedirectBackToReact();
            }
        );
    }

    void RedirectBackToReact()
    {
        string resultsUrl = "/simulation/results/" + ApiConfig.SessionId;

        if (Application.platform == RuntimePlatform.WebGLPlayer)
        {
            // Use JavaScript to redirect
            Application.ExternalEval("window.location.href = '" + resultsUrl + "';");
        }
        else
        {
            Debug.Log("[SessionManager] Would redirect to: " + resultsUrl);
        }
    }
}
```

### JavaScript Plugin for WebGL (Optional)

If `Application.ExternalEval` doesn't work in your Unity version, create this file:

**Create file**: `Assets/Plugins/WebGL/WebGLPlugins.jslib`

```javascript
mergeInto(LibraryManager.library, {
    RedirectToResults: function(url) {
        window.location.href = UTF8ToString(url);
    }
});
```

---

## 9. Animator Setup for Student Emotions

You must do this **manually** in Unity for each student (Liam, Sarah, Alex):

### Step-by-Step:

1. **Click** on the student 3D model (e.g., `Liam`) in the Hierarchy
2. Open **Window > Animation > Animator**
3. Click the **Parameters** tab (left side of Animator)
4. Click **+** > **Trigger** and add these **9 triggers** (one by one):

| Trigger Name | Maps To |
|-------------|---------|
| `calm`       | Default idle |
| `nervous`    | Fidgeting animation |
| `anxious`    | Looking around nervously |
| `frustrated` | Crossing arms |
| `happy`      | Nodding / smiling |
| `confused`   | Scratching head |
| `angry`      | Arms crossed, leaning back |
| `sad`        | Looking down |
| `relieved`   | Relaxing posture |

5. **Drag** your animation clips into the Animator to create States
6. From **"Any State"** → **Right-click** → **Make Transition** → click your animation state
7. Click the **transition arrow** → In the Inspector, scroll to **Conditions** → click **+** → select the matching trigger

> **Repeat** for Sarah and Alex. If you don't have 9 different animations, you can reuse some (e.g., `nervous` and `anxious` can use the same fidgeting clip). At minimum, set up `calm`, `angry`, `happy`, and `frustrated`.

---

## 10. Unity UI Canvas Setup

### Chat Panel Setup:

1. **Create** → UI → Canvas (Screen Space - Overlay)
2. Inside Canvas, create a **Panel** (ChatPanel) — anchor bottom, 400px tall, full width
3. Inside ChatPanel:
   - **ScrollView** — auto-fill, add Vertical Layout Group to Content
     - Inside Content: Add **TextMeshProUGUI** (this is `chatHistoryText`)
       - Set Font Size: 14, Alignment: Top Left, Enable Rich Text: ✅
   - **TMP_InputField** — at the bottom of the panel
     - Placeholder: "Type your message..."
   - **Button (Send)** — next to input field, label: "Send"
   - **Button (EndSim)** — top-right corner, label: "End Simulation", red color

### Student Selector:

1. Create 3 **UI Buttons** (BtnLiam, BtnSarah, BtnAlex)
2. Labels: "Liam", "Sarah", "Alex"
3. Place them above the chat panel or on the side

### Status Text:

- A small **TextMeshProUGUI** at the top showing "Connected ✓" or "Liam is thinking..."

### Chat Bubbles (3D World Space):

For each student model:
1. Create **UI → Canvas** (set to **World Space**)
2. Make it a **child** of the student model
3. Position it above the student's head
4. Add a **TextMeshProUGUI** inside
5. Add a **Panel background** with rounded corners
6. This is what you drag into the `chatBubbleText` and `chatBubbleObject` slots on `StudentAgent`

---

## 11. Wiring Everything in the Inspector

### GameManager Object:

| Script | Slot | Drag In |
|--------|------|---------|
| `ApiManager` | *(no slots, it's a singleton)* | — |
| `SessionManager` | *(no slots, it's a singleton)* | — |
| `ClassroomManager` | `liam` | The `Liam` 3D model |
| | `sarah` | The `Sarah` 3D model |
| | `alex` | The `Alex` 3D model |
| `ChatUIManager` | `chatInput` | The TMP InputField |
| | `sendButton` | The Send Button |
| | `chatHistoryText` | The TextMeshPro text inside ScrollView |
| | `chatScrollRect` | The ScrollRect component |
| | `btnLiam` | The Liam selector button |
| | `btnSarah` | The Sarah selector button |
| | `btnAlex` | The Alex selector button |
| | `statusText` | The status TextMeshPro |
| | `selectedStudentLabel` | The "Talking to:" TextMeshPro |
| | `endSimButton` | The End Simulation button |
| | `classroomManager` | The GameManager itself |

### Each Student Model (Liam, Sarah, Alex):

| Script | Slot | Value |
|--------|------|-------|
| `StudentAgent` | `personaType` | `disruptive` / `quiet` / `bored` |
| | `studentName` | `Liam` / `Sarah` / `Alex` |
| | `chatBubbleText` | The TMP text inside their world-space ChatBubble |
| | `chatBubbleObject` | The ChatBubble Canvas parent |
| | `studentAnimator` | Their Animator component (or leave empty for auto-detect) |

---

## 12. WebGL Build Settings

Before clicking "Build":

1. **File → Build Settings**
2. Select **WebGL**, click **Switch Platform**
3. Click **Player Settings** (bottom-left):
   - **Publishing Settings**:
     - ☑ **Decompression Fallback**: Enabled
     - **Compression Format**: **Disabled** (important for local testing!)
   - **Resolution**:
     - Default Canvas Width: `1280`
     - Default Canvas Height: `720`
4. Click **Build**
5. Save to a folder called `teacher-build` on your Desktop

---

## 13. Pasting into React Frontend

```
frontend/
  public/
    games/
      teacher-sim/          ← Create this folder
        index.html           ← From your teacher-build
        Build/               ← From your teacher-build
          teacher-build.data
          teacher-build.framework.js
          teacher-build.loader.js
          teacher-build.wasm
        TemplateData/        ← (optional, Unity branding stuff)
```

### CORS Fix

Your backend currently allows only `http://localhost:5173`. Since Unity WebGL runs **inside** React, it will use the same origin — this should work. But if you host the WebGL files separately, you need to add that origin to the CORS config in `main.py`:

```python
allow_origins=["http://localhost:5173", "YOUR_WEBGL_HOST_URL"],
```

---

## 14. Testing Checklist

Run through this **before** considering it done:

- [ ] **Scene Setup**: Liam, Sarah, Alex named correctly in Hierarchy
- [ ] **Animator**: At least 4 emotion triggers created (calm, angry, happy, frustrated) on each student
- [ ] **UI**: Input field, Send button, chat text, student buttons all visible
- [ ] **Scripts**: All 6 scripts created and attached to GameManager / student models
- [ ] **Inspector**: All slots filled (see Section 11)
- [ ] **WebGL Settings**: Compression = Disabled, Decompression Fallback = Enabled
- [ ] **Build**: WebGL build completes without errors
- [ ] **Frontend Paste**: Files copied to `frontend/public/games/teacher-sim/`
- [ ] **Local Test**: Run FastAPI backend + React frontend, launch simulation, verify chat works
- [ ] **Persona Test**: Talk to each student (Liam, Sarah, Alex) — verify different personalities
- [ ] **Emotion Test**: Verify animations trigger based on API emotion response
- [ ] **End Simulation**: Click "End Simulation" → session ends → evaluation triggers → redirects

---

## Quick Reference: Script → File Mapping

| Script File | Attach To | Purpose |
|-------------|-----------|---------|
| `ApiConfig.cs` | *(static, no attach)* | Stores URLs, token, session |
| `ApiManager.cs` | GameManager | All HTTP calls to FastAPI |
| `StudentAgent.cs` | Liam, Sarah, Alex | Per-student chat bubble + emotions |
| `ClassroomManager.cs` | GameManager | Orchestrates sending messages |
| `ChatUIManager.cs` | GameManager | UI input/output management |
| `SessionManager.cs` | GameManager | Lifecycle: start → end → evaluate → redirect |

---

**🎯 Once you complete this guide, build your WebGL, paste it into `frontend/public/games/teacher-sim/`, and your Teacher simulation will be live on the web!**
