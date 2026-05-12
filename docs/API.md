# 🥊 Vanguard Combat - REST API Specification

The Vanguard Combat backend is built with FastAPI and aggregates real-time athlete information, rankings, technique tutorials, and intelligent combat analyses.

Base URL: `http://127.0.0.1:8000`

---

## 📡 Endpoints

### 1. System Health
* **Endpoint:** `GET /api/health`
* **Description:** Check service availability and status of cached fighter data.
* **Response:**
  ```json
  {
    "status": "healthy",
    "service": "Combat Sports Dynamic API",
    "version": "1.0.0",
    "total_fighters": 50,
    "sport_distribution": {
      "mma": 36,
      "boxing": 3,
      "kickboxing": 3,
      "bjj": 8,
      "wrestling": 6
    }
  }
  ```

---

### 2. Sports Disciplines
* **Endpoint:** `GET /api/sports`
* **Description:** List all 5 covered combat disciplines along with athlete counts.

* **Endpoint:** `GET /api/sports/{sport_id}`
* **Parameters:** `sport_id` (e.g. `mma`, `boxing`, `kickboxing`, `bjj`, `wrestling`)
* **Description:** Retrieve details for a specific sport.

---

### 3. Fighters & Athletes
* **Endpoint:** `GET /api/fighters`
* **Description:** Returns all cached dynamic fighter profiles.

* **Endpoint:** `GET /api/fighters/{fighter_id}`
* **Parameters:** `fighter_id` (integer)
* **Description:** Retrieve full details, records, finishes, and bio for a specific athlete.

* **Endpoint:** `GET /api/sports/{sport_id}/fighters`
* **Parameters:** `sport_id` (string)
* **Description:** Filter athletes by sport discipline.

---

### 4. Famous Fights
* **Endpoint:** `GET /api/fights`
* **Description:** Curated and dynamically integrated legendary matchups and highlights.

---

### 5. Combat Arsenal & Techniques
* **Endpoint:** `GET /api/skills`
* **Description:** Technique encyclopedia including Jabs, Roundhouse Kicks, Armbars, and Takedowns.

---

### 6. Combat AI Chatbot
* **Endpoint:** `POST /api/chat`
* **Request Body:**
  ```json
  {
    "message": "Explain Islam Makhachev's grappling style",
    "history": []
  }
  ```
* **Response:**
  ```json
  {
    "response": "Islam Makhachev is the current UFC P4P leader..."
  }
  ```
