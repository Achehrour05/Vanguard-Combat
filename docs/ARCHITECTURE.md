# 🏛️ Vanguard Combat — Technical Architecture

This document outlines the high-level architecture, module breakdown, data pipelines, and design decisions behind Vanguard Combat.

---

## 1. System Overview

```
                      ┌──────────────────────┐
                      │   React 19 Frontend  │
                      │  (Vite + Tailwind)   │
                      └──────────┬───────────┘
                                 │ HTTP / JSON
                                 ▼
                      ┌──────────────────────┐
                      │   FastAPI Backend    │
                      │   (Uvicorn Engine)   │
                      └──────────┬───────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│   Octagon API    │    │  TheSportsDB     │    │  Wikipedia API   │
│  (MMA Athletes)  │    │ (Boxing/Striking)│    │ (Biographies)    │
└──────────────────┘    └──────────────────┘    └──────────────────┘
```

---

## 2. Backend Design

- **Lifespan Loader:** Pre-populates dynamic athlete pools during startup to ensure sub-millisecond route response latency.
- **Resilient Fallback:** Integrated fallback maps for athletes, Wikipedia images, and combat strategies in case external REST endpoints experience network degradation.
- **Strategic AI Engine:** Dual-mode combat bot utilizing keyword-context heuristics for low-resource environments and deep transformer adapters for neural reasoning.

---

## 3. Frontend Architecture

- **Glassmorphic Cyber Aesthetic:** Designed with translucent layer depth, Oswald athletic typography, and vibrant discipline accent gradients.
- **Route Modularization:** Clear domain separation between disciplines, detailed fighter profiles, fight encounters, technique arsenals, and user bookmarks.
