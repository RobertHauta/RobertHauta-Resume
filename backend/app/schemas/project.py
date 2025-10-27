from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class ProjectBase(BaseModel):
    title: str
    brief_description: str
    full_description: str
    technologies: List[str]
    technology_icons: List[str]
    images: List[str] = []
    learned: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    order: int = 0


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    brief_description: Optional[str] = None
    full_description: Optional[str] = None
    technologies: Optional[List[str]] = None
    technology_icons: Optional[List[str]] = None
    images: Optional[List[str]] = None
    learned: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    order: Optional[int] = None


class ProjectResponse(ProjectBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True