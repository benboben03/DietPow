from fastapi import APIRouter, HTTPException, Body
from models import TrackedWeight, UserGoalTrack
from typing import List
from datetime import datetime
from weight_track_db import add_weight_track, fetch_all_users_weight, fetch_one_user_weight, fetch_user_weight_by_date

router = APIRouter()

@router.get("/users-weight-track/", response_model=List[UserGoalTrack])
async def read_users_weight():
    users = await fetch_all_users_weight()
    return users

@router.get("/user-weight-track/{email}", response_model=UserGoalTrack)
async def read_user_weight(email: str):
    user = await fetch_one_user_weight(email)
    if user:
        return user
    raise HTTPException(status_code=404, detail="User not found")

@router.get("/user-weight-track-by-date/{email}", response_model=UserGoalTrack)
async def read_user_weight_by_date(email: str, date: datetime):
    user = await fetch_user_weight_by_date(email, date)
    if user:
        return user
    raise HTTPException(status_code=404, detail="User not found")

@router.post("/weight-track/", response_model=UserGoalTrack)
async def add_weight_tracking(email: str, tracked_weight: TrackedWeight = Body(...)):
    try:
        result = await add_weight_track(email, tracked_weight)
        return result
    except HTTPException as e:
        raise e