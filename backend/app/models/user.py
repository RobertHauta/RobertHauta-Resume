from datetime import datetime, timezone
from typing import Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from app.core.security import get_password_hash, verify_password


class UserModel:
    """User model for database operations."""

    collection_name = "users"

    @staticmethod
    async def create(db: AsyncIOMotorDatabase, email: str, password: str, full_name: Optional[str] = None) -> dict:
        """Create a new user."""
        user_dict = {
            "email": email,
            "hashed_password": get_password_hash(password),
            "full_name": full_name,
            "is_active": True,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        }
        result = await db[UserModel.collection_name].insert_one(user_dict)
        user_dict["_id"] = str(result.inserted_id)
        return user_dict

    @staticmethod
    async def get_by_email(db: AsyncIOMotorDatabase, email: str) -> Optional[dict]:
        """Get user by email."""
        user = await db[UserModel.collection_name].find_one({"email": email})
        if user:
            user["_id"] = str(user["_id"])
        return user

    @staticmethod
    async def get_by_id(db: AsyncIOMotorDatabase, user_id: str) -> Optional[dict]:
        """Get user by ID."""
        try:
            user = await db[UserModel.collection_name].find_one({"_id": ObjectId(user_id)})
            if user:
                user["_id"] = str(user["_id"])
            return user
        except Exception:
            return None

    @staticmethod
    async def authenticate(db: AsyncIOMotorDatabase, email: str, password: str) -> Optional[dict]:
        """Authenticate user."""
        user = await UserModel.get_by_email(db, email)
        if not user:
            return None
        if not verify_password(password, user["hashed_password"]):
            return None
        return user

    @staticmethod
    async def update(db: AsyncIOMotorDatabase, user_id: str, update_data: dict) -> Optional[dict]:
        """Update user."""
        update_data["updated_at"] = datetime.now(timezone.utc)
        try:
            result = await db[UserModel.collection_name].update_one(
                {"_id": ObjectId(user_id)},
                {"$set": update_data}
            )
            if result.modified_count:
                return await UserModel.get_by_id(db, user_id)
            return None
        except Exception:
            return None