from fastapi import APIRouter, HTTPException, Body
from models import User
from typing import List
from user_database import fetch_one_user, create_user, fetch_all_users, update_user, remove_user

router = APIRouter()

@router.get("/users/", response_model=List[User])
async def read_users():
    users = await fetch_all_users()
    return users

@router.get("/user/{email}", response_model=User)
async def read_user(email: str):
    user = await fetch_one_user(email)
    if user:
        return user
    raise HTTPException(status_code=404, detail="User not found")

@router.post("/user/", response_model=User)
async def add_user(user: User):
    try:
        created_user = await create_user(user.model_dump())
        return created_user
    except HTTPException as e:
        raise e

@router.put("/user/{email}", response_model=User)
async def update_user_data(email: str, user_update: User):
    updated_user = await update_user(email, user_update.model_dump(exclude_unset=True))
    if updated_user:
        return updated_user
    raise HTTPException(status_code=404, detail="User not found")

@router.delete("/user/{email}", response_model=dict)
async def delete_user(email: str):
    deleted = await remove_user(email)
    if deleted:
        return {"detail": "User successfully deleted"}
    raise HTTPException(status_code=404, detail="User not found")
