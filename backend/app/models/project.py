from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(datetime.now().timestamp()))
    title: str
    brief_description: str
    full_description: str
    technologies: List[str]  # List of framework/technology names
    technology_icons: List[str]  # List of URLs to technology icons
    images: List[str] = []  # List of URLs to project screenshots
    learned: Optional[str] = None  # What was learned from the project
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)
    order: int = 0  # For ordering projects in the gallery

    class Config:
        json_schema_extra = {
            "example": {
                "title": "E-Commerce Platform",
                "brief_description": "A full-stack e-commerce solution with real-time inventory",
                "full_description": "Built a comprehensive e-commerce platform featuring real-time inventory management, secure payment processing, and an admin dashboard for analytics.",
                "technologies": ["React", "Node.js", "MongoDB", "Stripe"],
                "technology_icons": [
                    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                ],
                "images": ["https://example.com/screenshot1.png"],
                "learned": "Learned about payment gateway integration and real-time data synchronization",
                "github_url": "https://github.com/user/project",
                "live_url": "https://project.com",
                "order": 1
            }
        }