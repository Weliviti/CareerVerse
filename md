# CareerVerse: 10-Day Completion Plan

> **Start date:** 2026-02-19  
> **Target finish:** 2026-02-28  
> **Team size:** 6 Members (M1–M6)  
> **Simulations:** 2 (Teacher + Doctor) — no Lawyer game

---

## What Has Been Completed ✅

### Sprint 1 — Foundation & Setup (Days 1–5 of 40-Day Plan)
- [x] React + Vite project with Tailwind CSS, folder structure (pages, components, hooks, services, context, layouts)
- [x] FastAPI backend with CORS, health endpoint, rate limiting (`slowapi`)
- [x] Firebase project created, Auth enabled, Admin SDK configured
- [x] Firestore schema designed (`docs/CareerVerse_Firestore_Schema.md`)
- [x] Gemini API access — `GeminiService` class with `generate_response()` and `evaluate_transcript()`
- [x] GitHub repo + CI workflows (`frontend-ci.yml`, `backend-ci.yml`)
- [x] UI Components: `Button`, `Input`, `Card`, `Modal`, `Loading`, `ErrorBoundary`, `ErrorAlert`, `ErrorDisplay`
- [x] Pydantic Models: `User`, `Session`, `Score`
- [x] Docker configuration (`Dockerfile`, `docker-compose.yml`)
- [x] ESLint, Prettier, Husky, Black, Pytest configured

### Sprint 2 — Authentication System (Days 6–10)
- [x] Login page with form validation, loading states, error toasts (`react-hot-toast`)
- [x] Signup page with password strength indicator
- [x] Firebase `signInWithEmailAndPassword` & `createUserWithEmailAndPassword`
- [x] `AuthContext` + `useAuth` hook + `AuthProvider`
- [x] Backend: `/auth/register`, `/auth/login`, `/auth/verify-token` endpoints
- [x] Auth middleware (`middleware/auth.py` — `verify_token`)
- [x] `ProtectedRoute` component + React Router setup
- [x] Navbar with dynamic auth-state buttons
- [x] `user_service.py` — create/fetch/update user in Firestore
- [x] Firestore security rules (`firestore.rules`)
- [x] Rate limiting on auth endpoints

### Sprint 3 — Core Backend APIs (Days 11–15)
- [x] `api.js` (axios client with auth interceptor)
- [x] Persona chat endpoint (`POST /api/persona/chat`) with prompt loading, conversation history, emotion extraction
- [x] 3 Patient persona prompts (anxious, hiding symptoms, elderly)
- [x] 2 Persona templates (`patient_anxious`, `patient_hiding` under `prompts/personas/`)
- [x] Student persona prompts (`prompts/students.py`)
- [x] `PromptManager` / `PromptTemplate` service
- [x] Profile page with edit form, avatar upload, simulation history list
- [x] `session_service.py` — start, end, append transcript, get session
- [x] Evaluator endpoint (`POST /api/evaluate/session`) + `evaluation_service.py`
- [x] Doctor rubric (`prompts/rubrics/doctor.txt`, `doctor_rubric.txt`)
- [x] Teacher rubric (`prompts/rubrics/teacher.txt`, `teacher_rubric.txt`)
- [x] `score_service.py` — save score, get paginated user scores
- [x] Scores endpoint (`GET /api/scores/user/{uid}`)
- [x] `useScore` hook + `useSimulation` hook
- [x] Tests: `test_persona.py`, `test_evaluator.py`, `test_scores.py`, `test_e2e_flow.py`, `test_health.py`

### Sprint 4 — Simulation Hub & Dashboard (Days 16–20) — *Partially Done*
- [x] SimulationHub page layout with simulation cards (Educator, Diagnostician) — *Advocate card to be removed*
- [x] Stats summary cards (hardcoded values: Completed/Avg Score/Total Time)
- [x] Simulation launch endpoint (`POST /api/simulations/launch`)
- [x] Dashboard page with RadarChart, CareerCard, SessionHistoryItem components
- [ ] **NOT DONE:** Stats cards use **hardcoded** data, not fetched from API
- [ ] **NOT DONE:** Launch buttons are **not wired** to anything (no Unity/WebGL open)
- [ ] **NOT DONE:** Dashboard data endpoints (`/dashboard/stats`, `/dashboard/skills`) **not created**
- [ ] **NOT DONE:** Real-time dashboard updates
- [ ] **NOT DONE:** Skill averages calculation service

### Sprint 5 — Career Recommendation Engine (Days 21–25) — *Not Done*
- [ ] `/recommend/careers` endpoint
- [ ] Career profile definitions (Doctor/Teacher scoring formulas)
- [ ] Recommendation service with weighted scoring
- [ ] Career detail modal
- [ ] Personalized career advice via LLM
- [ ] PDF export

### Sprint 6 — Admin Panel (Days 26–30) — *Partially Done*
- [x] Admin layout with sidebar (`AdminLayout.jsx`, `AdminSidebar.jsx`)
- [x] Admin Dashboard page (`pages/admin/Dashboard.jsx`)
- [x] User Management page with search, pagination, status filters
- [x] Simulation Logs page + AI Evaluation Logs page
- [x] Settings page (basic)
- [x] Admin route protection
- [x] `GET /api/admin/users` endpoint with pagination + admin role check
- [ ] **NOT DONE:** `/admin/stats` endpoint (admin metric cards use mock data)
- [ ] **NOT DONE:** Admin settings storage & persistence
- [ ] **NOT DONE:** Logging service for events

### Sprint 7 — Unity Integration & Polish (Days 31–35) — *Not Done*
- [ ] Unity WebGL embed / new-tab launch component
- [ ] Unity ↔ React communication (postMessage or API callbacks)
- [ ] Score synchronization from Unity
- [ ] Footer component ✅ (already done)
- [ ] About page ✅ (already done)
- [ ] UI polish, page transitions, micro-interactions

### Sprint 8 — Testing & Deployment (Days 36–40) — *Not Done*
- [ ] Comprehensive testing
- [ ] Deployment to Render/Vercel
- [ ] Production Firebase configuration

---

## What Remains — Organized Into 10 Days

### API Key Strategy (3 Separate API Keys)

| API Key | Purpose | Used By |
|---------|---------|---------|
| **`GEMINI_KEY_PERSONAS`** | Powers student/patient AI agent conversations during simulations | `GeminiService` when called from persona chat & Unity simulation agent endpoints |
| **`GEMINI_KEY_SCORING`** | Real-time scoring & analysis of gameplay/simulation transcripts | `EvaluationService` and new live-scoring service |
| **`GEMINI_KEY_CAREERS`** | Career recommendation generation from aggregated scores | New `RecommendationService` and career advice endpoint |

> [!NOTE]
> Using separate API keys lets you:
> - Track cost per feature independently
> - Apply different rate limits per key
> - Disable one without affecting others
> - Use different Gemini model tiers/versions per task if needed

---

## 6-Member Team Roles (Updated)

| ID | Primary Role | Focus Area |
|----|-------------|------------|
| **M1** | Frontend Lead | Unity WebGL integration, simulation pages |
| **M2** | Backend Lead | API endpoints, services |
| **M3** | Auth & Profiles | Dashboard data, career UI |
| **M4** | Database & State | Firestore queries, aggregation services |
| **M5** | AI Engines | Prompt engineering, recommendation algorithm |
| **M6** | Testing & DevOps | Integration testing, deployment |

---

## Day 1 — Unity Teacher Simulation Integration (Frontend)

> **Focus:** Get the Teacher (Educator) Unity WebGL game playable from the web app.

| Member | Task | Details | Deliverable |
|--------|------|---------|-------------|
| **M1** | Create simulation launcher page | Build `pages/SimulationPlayer.jsx` that opens the Unity WebGL build in a full-screen iframe or new tab. Receive `simulation_type` from route params. | `pages/SimulationPlayer.jsx` + route `/simulation/play/:type` |
| **M2** | Update `GeminiService` to support 3 API keys | Refactor `GeminiService` to accept a `purpose` param (`persona` / `scoring` / `career`) and use the correct API key from `.env` | Updated `services/gemini_service.py` |
| **M3** | Wire SimulationHub launch buttons | Connect "Launch Simulation" buttons in `SimulationHub.jsx` to call `POST /api/simulations/launch` and then navigate to the player page | Launch flow working |
| **M4** | Create `simulations.json` config | Define metadata for 2 simulations — Teacher and Doctor (title, description, skills, duration, difficulty, WebGL URL) | `data/simulations.json` |
| **M5** | Create Teacher persona agent prompt | Write a sophisticated prompt for the AI student agents that the Teacher interacts with inside the Unity game. Optimise for realistic classroom behaviour. | `prompts/agents/teacher_student.txt` |
| **M6** | Setup `.env` with 3 API keys | Add `GEMINI_KEY_PERSONAS`, `GEMINI_KEY_SCORING`, `GEMINI_KEY_CAREERS` to `.env.example`, update `config.py` | Updated `.env.example` and `config.py` |

---

## Day 2 — Unity Teacher Game ↔ Backend Connection

> **Focus:** Connect Teacher Unity WebGL game to backend APIs for real-time agent communication.

| Member | Task | Details | Deliverable |
|--------|------|---------|-------------|
| **M1** | Build Unity WebGL embed component | Create `components/UnityEmbed.jsx` — iframe wrapper with loading screen, full-screen toggle, error handling | `components/UnityEmbed.jsx` |
| **M2** | Create `/api/simulation/agent/chat` endpoint | New endpoint that the Unity game calls to get AI student responses. Uses `GEMINI_KEY_PERSONAS`. Appends to session transcript. | `POST /api/simulation/agent/chat` |
| **M3** | Build simulation loading screen | Full-screen loading UI while Unity WebGL bundle downloads | Loading screen component |
| **M4** | Create Unity callback receiver | `POST /api/unity/callback` — receives events from Unity (session start, message, session end) and stores in Firestore | `routes/unity.py` |
| **M5** | Create Doctor patient agent prompt | Write prompt for the AI patient agent the Doctor interacts with. 3 variants: anxious, elderly, hiding symptoms. | `prompts/agents/doctor_patient.txt` |
| **M6** | Test Teacher simulation launch flow | Write integration test: launch → get session ID → verify session in Firestore → simulate agent chat call | `tests/test_simulation_launch.py` |

---

## Day 3 — Doctor Simulation Integration + Live Scoring

> **Focus:** Integrate Doctor Unity WebGL game and build the live scoring infrastructure.

| Member | Task | Details | Deliverable |
|--------|------|---------|-------------|
| **M1** | Add Doctor simulation to player | Ensure `SimulationPlayer.jsx` can load both Teacher and Doctor WebGL builds based on type | Both simulations launchable |
| **M2** | Create `/api/simulation/score/live` endpoint | Endpoint called periodically during gameplay to get live partial scores. Uses `GEMINI_KEY_SCORING`. | `POST /api/simulation/score/live` |
| **M3** | Build live score overlay / HUD | Floating component that shows real-time scoring feedback during simulation (partial score, tips) | `components/LiveScoreHUD.jsx` |
| **M4** | Create live scoring service | `services/live_scoring_service.py` — takes partial transcript, returns interim scores + coaching tips | `services/live_scoring_service.py` |
| **M5** | Write live scoring prompts | Prompt template for mid-session evaluation. Must return quick, actionable feedback in JSON format. | `prompts/live_scoring.txt` |
| **M6** | Test agent chat API under load | Load test the `/simulation/agent/chat` endpoint — 20 concurrent sessions | Load test results documented |

---

## Day 4 — Simulation Completion & Final Scoring

> **Focus:** Handle simulation end, trigger full AI evaluation, display results.

| Member | Task | Details | Deliverable |
|--------|------|---------|-------------|
| **M1** | Build simulation complete screen | Full-screen results page after simulation ends. Shows total score, category breakdown, feedback. | `pages/SimulationResults.jsx` |
| **M2** | Create `/api/simulation/complete` endpoint | Called when Unity game ends. Triggers full evaluation via `GEMINI_KEY_SCORING`, saves score to Firestore. | `POST /api/simulation/complete` |
| **M3** | Build score breakdown chart | Bar/radar chart comparing scores across rubric categories (e.g., Empathy: 85, Logic: 72) | Chart component in results page |
| **M4** | Create full evaluation + score save service | Orchestrate: end session → run `evaluation_service` → save via `score_service` → return results | `services/simulation_orchestrator.py` |
| **M5** | Refine Doctor & Teacher evaluation rubrics | Update `prompts/rubrics/doctor.txt` and `teacher.txt` for more granular, skill-specific scoring | Updated rubric files |
| **M6** | Test full simulation flow E2E | Test: launch → agent chat (5 messages) → complete → evaluate → verify score in Firestore | `tests/test_full_simulation.py` |

---

## Day 5 — Dashboard: Real Data + Stats Endpoints

> **Focus:** Replace all hardcoded dashboard data with real Firestore data via API.

| Member | Task | Details | Deliverable |
|--------|------|---------|-------------|
| **M1** | Connect Dashboard to real API data | Update `Dashboard.jsx` to fetch from `/dashboard/stats` and `/dashboard/skills`. Remove all mock data. | Dashboard shows real data |
| **M2** | Create `GET /api/dashboard/stats` endpoint | Return: total simulations, average score, total time invested, completion rate for a user | `routes/dashboard.py` |
| **M3** | Connect SimulationHub stats to real API | Update hardcoded "3 completed", "86%", "57m" to use real data from `/dashboard/stats` | Real stats on SimulationHub |
| **M4** | Create `GET /api/dashboard/skills` endpoint | Return averaged skill scores for radar chart (Empathy, Logic, Persuasion, Clarity, Problem Solving, Stress Handling) | Skills endpoint |
| **M5** | Create `dashboard_service.py` | Service to aggregate: total simulations, avg score, total time, skill averages from Firestore | `services/dashboard_service.py` |
| **M6** | Test dashboard endpoints | Write tests for `/dashboard/stats` and `/dashboard/skills` with sample data | `tests/test_dashboard.py` |

---

## Day 6 — Career Recommendation Engine

> **Focus:** Build the career recommendation system using `GEMINI_KEY_CAREERS`.

| Member | Task | Details | Deliverable |
|--------|------|---------|-------------|
| **M1** | Build Career Recommendations panel on Dashboard | Right-side panel showing top 3 career matches with rank badge, match %, skill tags | Recommendations panel UI |
| **M2** | Create `GET /api/recommend/careers` endpoint | Takes user ID, returns top 3 career matches with percentages. Uses `GEMINI_KEY_CAREERS`. | `routes/recommend.py` |
| **M3** | Build Career Detail Modal | Modal with career description, skill breakdown chart, strengths, areas to improve, personalized advice | `components/CareerDetailModal.jsx` |
| **M4** | Define career profiles + scoring formulas | `data/career_profiles.json` with weighted formulas: Doctor (Empathy×0.4 + Logic×0.4 + Stress×0.2), Teacher (Communication×0.5 + Patience×0.3 + Empathy×0.2) | `data/career_profiles.json` |
| **M5** | Create `recommendation_service.py` | Calculate career scores from user's skill averages, sort, return top 3 with match %. Optionally call Gemini for personalized advice. | `services/recommendation_service.py` |
| **M6** | Test recommendation accuracy | Verify scoring formulas with sample data sets, edge cases (no data, single simulation) | `tests/test_recommendations.py` |

---

## Day 7 — Admin Panel Real Data + Polish

> **Focus:** Connect admin panel to real backend data, polish existing pages.

| Member | Task | Details | Deliverable |
|--------|------|---------|-------------|
| **M1** | Connect Admin Dashboard to `/admin/stats` | Replace mock metrics in `pages/admin/Dashboard.jsx` with real API data | Admin dashboard live |
| **M2** | Create `GET /api/admin/stats` endpoint | Return: total users, total simulations, avg skill score, system status, recent activity | `routes/admin.py` (add endpoint) |
| **M3** | Connect Simulation Logs to real data | Fetch actual simulation sessions from Firestore, display in `SimulationLogs.jsx` | Logs showing real data |
| **M4** | Create admin aggregation service | `services/admin_service.py` — total users, total simulations, avg scores, system health | `services/admin_service.py` |
| **M5** | Connect AI Evaluation Logs to real data | Fetch evaluation records with scores, display in `AIEvaluationLogs.jsx` | AI logs showing real data |
| **M6** | Create `GET /api/admin/logs/simulations` and `GET /api/admin/logs/evaluations` endpoints | Paginated log endpoints | Log endpoints working |

---

## Day 8 — PDF Export + Session History

> **Focus:** Build PDF report generation and flesh out session history display.

| Member | Task | Details | Deliverable |
|--------|------|---------|-------------|
| **M1** | Build Export Report button + loading state | Add working "Export PDF" button on Dashboard, show progress indicator | Export button functional |
| **M2** | Create `POST /api/report/generate` endpoint | Generate PDF with user stats, radar chart data, session history, career recommendations. Return PDF file. | Report endpoint |
| **M3** | Build session history on Profile page with real data | Connect `SimulationHistoryList` to fetch from `/scores/user/{uid}`, show real simulation results | Profile history real data |
| **M4** | Implement PDF generation service | Use `reportlab` or `weasyprint` to generate a branded PDF report | `services/report_service.py` |
| **M5** | Write career advice prompt | Prompt for generating personalized career advice text to include in PDF report. Uses `GEMINI_KEY_CAREERS`. | `prompts/career_advice.txt` |
| **M6** | Test PDF generation | Verify PDF generates correctly, includes all sections, downloads properly | PDF E2E test |

---

## Day 9 — UI Polish, Responsiveness & Bug Fixes

> **Focus:** Polish the entire application for production readiness.

| Member | Task | Details | Deliverable |
|--------|------|---------|-------------|
| **M1** | Add page transitions & micro-interactions | Smooth fade/slide transitions between pages, hover effects on cards, button animations | Polished UX |
| **M2** | Add API error handling & fallbacks | Retry logic, Gemini fallback responses, graceful degradation when services are down | Robust error handling |
| **M3** | Responsive design fixes | Test all pages on mobile/tablet/desktop. Fix any layout issues. Hamburger menu polish. | All pages responsive |
| **M4** | Optimize Firestore queries | Add composite indexes, reduce reads, batch queries where possible | Performance improved |
| **M5** | Final prompt refinement | Review all prompts (persona, scoring, career) for quality, accuracy, token efficiency | Prompts finalized |
| **M6** | Fix all known bugs | Address any bugs found during development, CI failures, console errors | Bug-free app |

---

## Day 10 — Testing, Deployment & Launch 🚀

> **Focus:** Final testing, deploy to production, and prepare for demo.

| Member | Task | Details | Deliverable |
|--------|------|---------|-------------|
| **M1** | Final frontend smoke test | Test all pages, all flows (auth, simulation, dashboard, admin) on production build | Frontend verified |
| **M2** | Deploy backend to Render | Configure Render for FastAPI, set environment variables, verify endpoints | Backend deployed |
| **M3** | Deploy frontend to Vercel | Configure Vercel, connect to GitHub, verify deployment | Frontend deployed |
| **M4** | Configure production Firebase | Production Firestore, update security rules, add composite indexes | Production DB ready |
| **M5** | Configure production API keys | Set up production Gemini keys (all 3), verify rate limits | Production AI ready |
| **M6** | Setup monitoring + final E2E test | Configure Sentry error tracking, run full E2E flow on production | Monitoring active |

---

## Priority Order (What To Implement First)

```
Day 1-2: Teacher Unity WebGL → Frontend integration (HIGHEST PRIORITY) — only 2 games (Teacher + Doctor)
    ↓
Day 3:   Doctor Unity WebGL → Frontend integration
    ↓
Day 3-4: Live scoring + Final scoring pipeline
    ↓
Day 5:   Dashboard real data connections
    ↓
Day 6:   Career recommendation engine
    ↓
Day 7:   Admin panel real data
    ↓
Day 8:   PDF export
    ↓
Day 9:   Polish & bug fixes
    ↓
Day 10:  Deploy & launch 🚀
```

---

## Unity WebGL Integration Architecture

```
┌─────────────────────────────────────────────────────┐
│  Frontend (React)                                    │
│                                                      │
│  SimulationHub.jsx                                   │
│       │ click "Launch"                               │
│       ▼                                              │
│  POST /api/simulations/launch  →  session_id         │
│       │                                              │
│       ▼                                              │
│  SimulationPlayer.jsx                                │
│       │ opens Unity WebGL in iframe / new tab         │
│       ▼                                              │
│  ┌──────────────────────────────────────────┐        │
│  │  Unity WebGL Game (Teacher / Doctor)      │        │
│  │                                           │        │
│  │  Calls POST /api/simulation/agent/chat    │        │
│  │       → Gets AI student/patient response  │        │
│  │       → Uses GEMINI_KEY_PERSONAS          │        │
│  │                                           │        │
│  │  Optionally calls                         │        │
│  │  POST /api/simulation/score/live          │        │
│  │       → Gets mid-game scoring feedback    │        │
│  │       → Uses GEMINI_KEY_SCORING           │        │
│  │                                           │        │
│  │  On game end, calls                       │        │
│  │  POST /api/simulation/complete            │        │
│  │       → Full evaluation triggered         │        │
│  │       → Uses GEMINI_KEY_SCORING           │        │
│  └──────────────────────────────────────────┘        │
│       │                                              │
│       ▼                                              │
│  SimulationResults.jsx                               │
│       │ shows scores, feedback                       │
│       ▼                                              │
│  Dashboard.jsx                                       │
│       │ fetches from /dashboard/stats + /skills      │
│       ▼                                              │
│  GET /api/recommend/careers                          │
│       → Uses GEMINI_KEY_CAREERS                      │
│       → Returns career matches                       │
└─────────────────────────────────────────────────────┘
```

---

## Questions & Suggestions Before We Start

### Questions:
1. **Where are the Unity WebGL build files?** Are they hosted somewhere (e.g., a CDN, GitHub release, separate server) or will they be placed inside the `frontend/public/` folder? I need the exact URL/path to embed them.
2. **How does the Unity game communicate with the backend?** Does the Unity game make HTTP calls directly to your FastAPI backend? Or does it use `window.postMessage` to talk to the React parent, which then relays to the API?
3. **Lawyer simulation** — is there a Unity game for Lawyer too, or just Doctor and Teacher for now?

### Suggestions on API Key Strategy:

> [!IMPORTANT]
> **I agree with using 3 separate API keys**, but want to highlight some refinements:

1. **`GEMINI_KEY_PERSONAS` (Agent Conversations)**
   - Used when the Unity game calls `/api/simulation/agent/chat`
   - This is the highest-traffic key — every in-game conversation turn = 1 API call
   - **Suggestion:** Consider using `gemini-1.5-flash` (faster, cheaper) for this key

2. **`GEMINI_KEY_SCORING` (Live + Final Evaluation)**
   - Used for mid-game coaching (`/simulation/score/live`) and end-game evaluation (`/simulation/complete`)
   - Moderate traffic — once per few minutes during gameplay + once at end
   - **Suggestion:** Can also use `gemini-1.5-flash`. Consider `gemini-1.5-pro` only if scoring accuracy is critical.

3. **`GEMINI_KEY_CAREERS` (Career Recommendations + Advice)**
   - Used for `/recommend/careers` and PDF report personalized advice
   - Lowest traffic — only called when viewing dashboard or generating reports
   - **Suggestion:** `gemini-1.5-pro` is fine here since it's infrequent and quality matters more

---

## Git Workflow for 10 Days

### Branch Naming
```
feature/day{N}-m{M}-{description}

Examples:
feature/day1-m1-simulation-player
feature/day2-m2-agent-chat-endpoint
feature/day6-m5-recommendation-service
```

### Daily Process
1. **Morning:** Pull latest `develop`, create feature branch
2. **During day:** Commit frequently
3. **End of day:** Push, create PR to `develop`, get 1 review
4. **Merge:** Squash merge after approval

### Merge Schedule
| Day | Action |
|-----|--------|
| Day 2 | Merge develop → main (Teacher simulation release) |
| Day 4 | Merge develop → main (Both simulations + scoring) |
| Day 6 | Merge develop → main (Dashboard + recommendations) |
| Day 8 | Merge develop → main (Admin + PDF export) |
| Day 10 | Merge develop → main (Final release) 🚀 |

---

**Let's build CareerVerse! 🎯**
