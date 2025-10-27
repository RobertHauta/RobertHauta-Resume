from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.project import ProjectResponse, ProjectCreate, ProjectUpdate
from app.core.database import get_database
from bson import ObjectId

router = APIRouter()


@router.get("", response_model=List[ProjectResponse])
async def get_projects():
    """Get all projects, ordered by the order field"""
    db = get_database()
    projects = await db.projects.find().sort("order", 1).to_list(100)

    # Convert MongoDB _id to string id
    for project in projects:
        project["id"] = str(project["_id"])
        del project["_id"]

    return projects


@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(project_id: str):
    """Get a single project by ID"""
    db = get_database()

    try:
        project = await db.projects.find_one({"_id": ObjectId(project_id)})
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid project ID")

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    project["id"] = str(project["_id"])
    del project["_id"]

    return project


@router.post("", response_model=ProjectResponse, status_code=201)
async def create_project(project: ProjectCreate):
    """Create a new project"""
    db = get_database()

    project_dict = project.model_dump()
    from datetime import datetime
    project_dict["created_at"] = datetime.now()

    result = await db.projects.insert_one(project_dict)
    created_project = await db.projects.find_one({"_id": result.inserted_id})

    created_project["id"] = str(created_project["_id"])
    del created_project["_id"]

    return created_project


@router.put("/{project_id}", response_model=ProjectResponse)
async def update_project(project_id: str, project: ProjectUpdate):
    """Update a project"""
    db = get_database()

    try:
        object_id = ObjectId(project_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid project ID")

    # Only update fields that are provided
    update_data = {k: v for k, v in project.model_dump().items() if v is not None}

    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")

    result = await db.projects.update_one(
        {"_id": object_id},
        {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")

    updated_project = await db.projects.find_one({"_id": object_id})
    updated_project["id"] = str(updated_project["_id"])
    del updated_project["_id"]

    return updated_project


@router.delete("/{project_id}", status_code=204)
async def delete_project(project_id: str):
    """Delete a project"""
    db = get_database()

    try:
        object_id = ObjectId(project_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid project ID")

    result = await db.projects.delete_one({"_id": object_id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")

    return None