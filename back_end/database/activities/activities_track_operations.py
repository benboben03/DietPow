from fastapi import APIRouter, HTTPException, Body
from models import Activities, EachActivity, ActivityTrack
from typing import List
from activities.activities_track_db import add_activity, get_activities_by_date
from datetime import datetime

router = APIRouter()

@router.post("/activity-track/", response_model=dict)
async def add_activity_tracking(email: str, activity: EachActivity = Body(...)):
    try:
        result = await add_activity(email, activity)
        return {"message": "Activity added successfully"}
    except HTTPException as e:
        raise e
    

@router.get("/activities/{email}/{date}", response_model=List[EachActivity])
async def fetch_activities_by_date(email: str, date: str):
    date_parsed = datetime.strptime(date, "%Y-%m-%d")
    try:
        activities = await get_activities_by_date(email, date_parsed)
        return activities
    except HTTPException as e:
        raise e
