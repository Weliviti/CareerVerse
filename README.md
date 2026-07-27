CareerVerse - AI-Powered Career Simulation Platform
====================================================================

[![Backend CI](https://github.com/Weliviti/CareerVerse/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/Weliviti/CareerVerse/actions/workflows/backend-ci.yml)
[![Frontend CI](https://github.com/Weliviti/CareerVerse/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/Weliviti/CareerVerse/actions/workflows/frontend-ci.yml)

---

An interactive educational game platform that bridges the gap between academic learning and real-world job experience. Using AI-driven simulations, students can explore diverse careers (such as teaching, medicine, and law), engage with dynamic role-play scenarios, and receive instant, data-driven feedback on their skills and job suitability.

---

## Built With

|Technology|Purpose|
-------|-------|
|- **Frontend**: React 19, Vite, Tailwind CSS|Web dashboard|
|- *Game Engine*: Unity (WebGL)|Career simulations|
|- **Backend**: Python/FastAPI|AI evaluation & REAST
- *Auth & DA*: Firebase Auth + Firestore|User sessions & real-time data|
|- **Deploy**: Vercel (frontend), Render (backend)|Hosting|

---

## Features

⛇ AI-powered simulations across multiple professions (teaching, medicine, law)
✇ Dynamic role-play scenarios with USC characters
✇ Real-time scoring on soft and technical skills
✇ 2FA authentication for secure access
⛇ Interactive 3D environments built in Unity
◇ Collaborative team project (547 commits, 11 contributors)

---

## Quick Start

```bash
git clone https://github.com/Weliviti/CareerVerse.git
cd CareerVerse
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn run api.py
```

---

## License

This project is built for educational purposes. 
