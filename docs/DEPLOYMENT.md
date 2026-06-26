# 🚀 Deployment Guide — Vanguard Combat

This document details deployment strategies for containerized and cloud platforms.

---

## 1. Environment Variables

Create `.env` in both `backend/` and `app/` based on their respective `.env.example` templates.

### Backend (`backend/.env`):
```ini
HOST=0.0.0.0
PORT=8000
DEBUG=False
CORS_ORIGINS=https://vanguard-combat.vercel.app,http://localhost:5173
```

### Frontend (`app/.env`):
```ini
VITE_API_BASE_URL=https://api.vanguard-combat.com
```

---

## 2. Docker Deployment

### Start with Docker Compose:
```bash
docker-compose up --build -d
```

Verify services:
```bash
docker-compose ps
```

---

## 3. Cloud Platforms

- **Frontend:** Vercel, Netlify, or Cloudflare Pages.
  - Root directory: `app`
  - Build command: `npm run build`
  - Output directory: `dist`
- **Backend:** Render, Fly.io, or AWS ECS.
  - Root directory: `backend`
  - Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
