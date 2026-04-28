"""Pydantic data models for Vanguard Combat REST API."""
from typing import Dict, List, Optional
from pydantic import BaseModel, Field

class SportSchema(BaseModel):
    id: str = Field(..., description="Unique sport identifier (e.g. mma, boxing)")
    name: str = Field(..., description="Display name")
    fullName: str = Field(..., description="Full official title of the sport")
    icon: str = Field(..., description="Emoji/icon representing the discipline")
    color: str = Field(..., description="Hex color code")
    gradient: str = Field(..., description="CSS gradient string")
    description: str = Field(..., description="Discipline overview")
    fighterCount: Optional[int] = Field(default=0, description="Cached count of active athletes")

class FighterFinishes(BaseModel):
    ko: int = Field(default=0, description="Knockout wins")
    sub: int = Field(default=0, description="Submission wins")
    dec: int = Field(default=0, description="Decision wins")

class FighterSchema(BaseModel):
    id: int
    name: str
    sport: str
    nickname: Optional[str] = None
    country: Optional[str] = "Global"
    weightClass: Optional[str] = "Open"
    wins: int = 0
    losses: int = 0
    draws: int = 0
    age: Optional[str] = "N/A"
    height: Optional[str] = "N/A"
    reach: Optional[str] = "N/A"
    stance: Optional[str] = "Orthodox"
    status: Optional[str] = "Active"
    ranking: Optional[int] = None
    finishes: Optional[FighterFinishes] = None
    bio: Optional[str] = None
    wiki_bio: Optional[str] = None
    image_url: Optional[str] = None

class FightSchema(BaseModel):
    id: int
    event: str
    date: str
    sport: str
    fighter1: str
    fighter2: str
    result: str
    description: str
    highlight_url: Optional[str] = None

class SkillSchema(BaseModel):
    id: str
    name: str
    sport: str
    category: str
    difficulty: str
    description: str
    key_points: List[str] = []
