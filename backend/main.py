from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from external_apis import fetch_external_sport_api
from constants import SPORTS_LIST
from fights import get_famous_fights
from skills import get_all_skills
from chat_bot import generate_combat_response
from pydantic import BaseModel
from typing import List, Optional
sports_list = SPORTS_LIST
_cached_fighters = []
_sport_counts = { 'mma': 0, 'boxing': 0, 'kickboxing': 0, 'bjj': 0, 'wrestling': 0}
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("API Booting: Integrating with distinct Live External REST APIs...")
    global _cached_fighters, _sport_counts
    _cached_fighters = []
    for k in _sport_counts.keys(): _sport_counts[k] = 0
    base_id = 1
    for sport_id in ["mma", "boxing", "kickboxing", "bjj", "wrestling"]:
        fighters = fetch_external_sport_api(sport_id, start_index=base_id)
        _sport_counts[sport_id] = len(fighters)
        _cached_fighters.extend(fighters)
        base_id += len(fighters)
    print(f"Success! Booted with {len(_cached_fighters)} dynamic fighters from multiple External APIs.")
    yield
app = FastAPI(title="Combat Sports Dynamic API", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/api/sports")
def get_sports():
    res = []
    for s in sports_list:
        s_copy = s.copy()
        s_copy["fighterCount"] = _sport_counts.get(s["id"], 0)
        res.append(s_copy)
    return res
@app.get("/api/sports/{sport_id}")
def get_sport(sport_id: str):
    sport = next((s for s in sports_list if s["id"] == sport_id), None)
    return {"sport": sport} if sport else {"error": "Sport not found"}
@app.get("/api/sports/{sport_id}/fighters")
def get_sport_fighters(sport_id: str):
    return [f for f in _cached_fighters if f["sport"] == sport_id]
@app.get("/api/fighters/{fighter_id}")
def get_fighter(fighter_id: int):
    fighter = next((f for f in _cached_fighters if f["id"] == fighter_id), None)
    if fighter:
        return fighter
    return {"error": "Fighter not found"}
@app.get("/api/fighters")
def get_all_fighters():
    return _cached_fighters
from fights import get_famous_fights
from skills import get_all_skills
from chat_bot import generate_combat_response
from pydantic import BaseModel
from typing import List, Optional
class ChatMessage(BaseModel):
    role: str
    content: str
class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []
@app.post("/api/chat")
async def chat_with_bot(request: ChatRequest):
    try:
        response_text = generate_combat_response(request.message, request.history)
        return {"response": response_text}
    except Exception as e:
        print(f"Chat API Error: {e}")
        return {"error": "The Combat AI model is currently training or warming up. Please try again in a few moments."}
@app.get("/api/fights")
def get_fights():
    return get_famous_fights()
@app.get("/api/skills")
def get_skills():
    return get_all_skills()
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)