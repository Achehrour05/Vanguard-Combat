# 🥊 Vanguard Combat — Elite Combat Sports Intelligence Platform

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![React](https://img.shields.io/badge/React-19.0-blue?logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?logo=fastapi)
![Vite](https://img.shields.io/badge/Vite-7.0-646CFF?logo=vite)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss)

**Vanguard Combat** is a sophisticated, full-stack combat sports intelligence hub designed for tracking elite athletes across five major disciplines:
- 🥊 **MMA (Mixed Martial Arts)**
- 🥊 **Boxing**
- 🥋 **Kickboxing & Muay Thai**
- 🥋 **Brazilian Jiu-Jitsu (BJJ)**
- 🤼 **Olympic & Freestyle Wrestling**

---

## ✨ Features

* **Multi-Sport Aggregation:** Live athlete data collected dynamically from Octagon API, TheSportsDB, and Wikipedia.
* **Fighter Intel & Analytics:** Records, win distributions (KO, Submissions, Decisions), physical dimensions, and career bios.
* **Pound-for-Pound Rankings:** Visual leaderboards comparing top combatants across weight classes.
* **The Combat Arsenal:** Interactive technique library explaining strikes, takedowns, submissions, and defenses with animations.
* **AI Combat Strategist:** Embedded chatbot with tactical insights and intelligent fallback knowledge engine.
* **Glassmorphic Cyber-Dark UI:** Modern, responsive interface with tilt animations and high-contrast dark aesthetic.

---

## 🏗️ Architecture

```
Vanguard-Combat/
├── app/                  # Frontend Application
│   ├── src/
│   │   ├── components/   # Navbar, Footer, FighterCard, ChatBot, LoadingSpinner
│   │   ├── pages/        # Home, Sport, Fighter, Fights, Arsenal, Rankings
│   │   └── lib/          # Utilities and Tailwind helpers
│   └── package.json
├── backend/              # Python FastAPI Server
│   ├── main.py           # REST API routes and lifespan loader
│   ├── chat_bot.py       # Strategic intelligence engine
│   ├── external_apis.py  # Data fetchers for Wikipedia, Octagon, SportsDB
│   ├── fights.py         # Curated famous fight encounters
│   ├── skills.py         # Technical martial arts catalog
│   ├── schemas.py        # Pydantic validation models
│   └── requirements.txt
├── docs/                 # Documentation & API specs
└── .github/              # CI/CD Workflows
```

---

## 🚀 Quickstart Guide

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --port 8000 --reload
```
API docs available at: `http://127.0.0.1:8000/docs`

### 2. Frontend Setup
```bash
cd app
npm install
npm run dev
```
Client available at: `http://localhost:5173`

---

## 🧪 Testing

Run backend automated unit tests:
```bash
python -m unittest backend/test_api_endpoints.py
```

---

## 📄 License
This project is open-source under the MIT License.
