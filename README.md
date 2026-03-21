# 🎮 CareerVerse — AI-Powered Career Simulation Platform

CareerVerse is an interactive educational platform that bridges the gap between academic learning and real-world job experience. Students explore diverse careers (teaching, medicine, law, and more) through **AI-driven simulations**, receive **instant data-driven feedback**, and track their growth over time.

> **Live Site:** [careerverse.lk](https://careerverse.lk)

---

## ✨ Features

- **Hyper-Realistic Career Simulations** — Unity WebGL simulations embedded in the browser for immersive role-play scenarios across multiple professions.
- **AI-Powered Persona Chat** — Gemini AI generates dynamic, context-aware student/patient/client agents that respond realistically during simulations.
- **Real-Time Scoring & Evaluation** — AI evaluates transcripts against rubrics, scoring both soft and technical skills in real time.
- **Career Recommendations** — Data-driven career suggestions based on simulation performance and skill profiles.
- **User Dashboard** — Track scores, view session history, and visualize skill growth with interactive Radar & Bar charts.
- **Profile Management** — Editable user profiles with avatar upload (Firebase Storage).
- **Admin Panel** — Full administrative dashboard with user management, AI evaluation logs, simulation logs, and platform settings.
- **Community & Team Pages** — Showcase the development team and community highlights.
- **Privacy & Terms** — Dedicated Privacy Policy and Terms of Service pages.

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite, TailwindCSS 4, React Router 7 |
| **Backend** | Python 3.9, FastAPI, Uvicorn |
| **AI Engine** | Google Gemini 2.5 Flash (via `google-generativeai`) |
| **Database & Auth** | Firebase (Firestore, Authentication, Storage) |
| **Simulations** | Unity (WebGL export) |
| **CI/CD** | GitHub Actions (backend lint + tests, frontend lint) |
| **Deployment** | Vercel (frontend), Docker (backend) |
| **Code Quality** | ESLint, Prettier, Husky, Black, Pytest |

---

## 📁 Project Structure

```
CareerVerse/
├── backend/                  # FastAPI backend
│   ├── main.py               # App entry point & route registration
│   ├── config.py             # Settings (Gemini keys, Firebase, env)
│   ├── routes/               # API route handlers
│   │   ├── auth.py           #   Authentication (signup, login, token)
│   │   ├── persona.py        #   AI persona chat endpoints
│   │   ├── sessions.py       #   Simulation session management
│   │   ├── scores.py         #   Score retrieval & storage
│   │   ├── evaluation.py     #   AI-powered transcript evaluation
│   │   ├── simulations.py    #   Simulation type listings
│   │   ├── admin.py          #   Admin-only management endpoints
│   │   └── feedback.py       #   User feedback collection
│   ├── services/             # Business logic & external integrations
│   │   ├── gemini_service.py #   Gemini AI wrapper (3-key support)
│   │   ├── firebase_admin_service.py
│   │   ├── session_service.py
│   │   ├── score_service.py
│   │   ├── evaluation_service.py
│   │   └── user_service.py
│   ├── models/               # Pydantic data models
│   ├── middleware/            # Auth token verification
│   ├── prompts/              # AI prompt templates
│   ├── tests/                # Pytest test suite
│   ├── Dockerfile            # Container image definition
│   └── requirements.txt      # Python dependencies
│
├── frontend/                 # React SPA
│   ├── src/
│   │   ├── App.jsx           # Root component & route definitions
│   │   ├── pages/            # Page-level components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx / Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── SimulationHub.jsx
│   │   │   ├── SimulationPlayer.jsx
│   │   │   ├── SimulationResults.jsx
│   │   │   ├── Community.jsx / OurTeam.jsx / About.jsx
│   │   │   ├── PrivacyPolicy.jsx / TermsOfService.jsx
│   │   │   └── admin/        # Admin sub-pages
│   │   ├── components/       # Reusable UI components
│   │   ├── services/         # API client, Firebase config, auth helpers
│   │   ├── context/          # React Context (AuthContext)
│   │   ├── hooks/            # Custom React hooks
│   │   └── layouts/          # Layout wrappers (AdminLayout)
│   ├── public/               # Static assets (images, Unity builds)
│   ├── package.json
│   └── vite.config.js
│
├── firebase/                 # Firebase configuration
│   ├── firestore.rules       # Firestore security rules
│   ├── storage.rules         # Cloud Storage security rules
│   └── firebase.json         # Firebase project config
│
├── .github/workflows/        # CI pipelines
│   ├── backend-ci.yml        # Lint (Black) + test (Pytest)
│   └── frontend-ci.yml       # Lint (ESLint)
│
├── docker-compose.yml        # Container orchestration
└── .env.example              # Environment variable template
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18 & **npm**
- **Python** 3.9+
- **Firebase** project with Firestore, Authentication, and Storage enabled
- **Google Gemini API** key(s)

### 1. Clone the Repository

```bash
git clone https://github.com/Weliviti/CareerVerse.git
cd CareerVerse
```

### 2. Environment Variables

Copy the example env files and fill in your credentials:

```bash
# Root level
cp .env.example .env

# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

**Required variables:**

| Variable | Description |
|---|---|
| `VITE_FIREBASE_*` | Firebase web app config values |
| `GEMINI_API_KEY` | Fallback Gemini API key |
| `GEMINI_KEY_PERSONAS` | Gemini key for AI persona conversations |
| `GEMINI_KEY_SCORING` | Gemini key for scoring & evaluation |
| `GEMINI_KEY_CAREERS` | Gemini key for career recommendations |

### 3. Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux
pip install -r requirements.txt
uvicorn main:app --reload --port 5000
```

The API will be available at `http://localhost:5000`. Docs at `/docs`.

### 4. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

### 5. Docker (Optional)

```bash
docker-compose up --build
```

---

## 🧪 Testing & Code Quality

```bash
# Backend — lint + test
black --check backend/
pytest backend/

# Frontend — lint + format
cd frontend
npm run lint
npm run format
```

CI pipelines run automatically on pushes/PRs to `main` and `develop`.

---

## 📡 API Overview

| Prefix | Tag | Description |
|---|---|---|
| `/api/auth` | Authentication | Signup, login, token refresh |
| `/api/persona` | Persona Chat | AI-powered role-play conversations |
| `/api/sessions` | Sessions | Create, manage, end simulation sessions |
| `/api/scores` | Scores | Retrieve and store user scores |
| `/api/simulations` | Simulations | List available simulation types |
| `/api/evaluate` | Evaluation | AI transcript evaluation & scoring |
| `/api/admin` | Admin | User management, logs, settings |
| `/api/feedback` | Feedback | User feedback submission |
| `/health` | Health | Service status check |

---

## 🛡️ Security

- **Firebase Authentication** — JWT-based token verification on all protected endpoints.
- **Admin Role Guard** — Admin-only routes verified server-side.
- **Rate Limiting** — SlowAPI rate limiter to prevent abuse.
- **Firestore & Storage Rules** — Fine-grained access control at the database level.
- **CORS** — Restricted to `careerverse.lk` and `localhost:5173`.

---

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m "Add amazing feature"`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is developed as part of the SDGP (Software Development Group Project) module.

---

<p align="center">Built with ❤️ by the CareerVerse Team</p>
