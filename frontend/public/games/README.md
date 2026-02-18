# Unity WebGL Game Builds

Place Unity WebGL build folders here. Each game should be in its own subdirectory.

## Expected Structure

```
games/
├── teacher-sim/          ← Teacher (Educator) simulation
│   ├── index.html
│   ├── Build/
│   │   ├── teacher-sim.data
│   │   ├── teacher-sim.framework.js
│   │   ├── teacher-sim.loader.js
│   │   └── teacher-sim.wasm
│   └── TemplateData/
│       └── ...
│
├── doctor-sim/           ← Doctor (Diagnostician) simulation
│   ├── index.html
│   ├── Build/
│   │   ├── doctor-sim.data
│   │   ├── doctor-sim.framework.js
│   │   ├── doctor-sim.loader.js
│   │   └── doctor-sim.wasm
│   └── TemplateData/
│       └── ...
│
└── README.md             ← This file
```

## How It Works

1. Unity exports a WebGL build as a folder.
2. Drop the exported folder into this `games/` directory.
3. Vite serves everything in `public/` as static files.
4. The React app loads the game via an `<iframe>` pointing to `/games/{sim-name}/index.html`.

## Auth Token Passing

When launching a simulation, React appends the Firebase auth token as a URL param:

```
/games/teacher-sim/index.html?token=<firebase_id_token>&session_id=<session_id>
```

The Unity game reads `token` and `session_id` from the URL and uses them for:
- `Authorization: Bearer <token>` header on all API calls
- `session_id` to identify the current simulation session

## API Endpoints Used by Unity

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/simulation/agent/chat` | POST | Get AI agent response (student/patient) |
| `/api/simulation/score/live` | POST | Get mid-game scoring feedback (optional) |
| `/api/simulation/complete` | POST | End game & trigger final evaluation |
