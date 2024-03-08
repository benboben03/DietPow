from mongodb_connection import client
from models import Activities, EachActivity, ActivityTrack
from typing import List
from datetime import datetime
from fastapi import HTTPException


database = client.UserInfo
collection = database.activity_track

async def add_activity(email: str, activity: EachActivity):
    day_key = activity.time.strftime("%Y-%m-%d")
    activity_dict = activity.model_dump() 
    
    # Try to append the activity to the existing list for the day or create a new entry
    result = await collection.update_one(
        {"email": email},
        {"$push": {f"activities_done.{day_key}": activity_dict}},
        upsert=True
    )

    if result.modified_count == 0 and not result.upserted_id:
        raise HTTPException(status_code=500, detail="Failed to add activity.")
    
    # Retrieve and return the updated document
    updated_doc = await collection.find_one({"email": email})
    if updated_doc:
        return ActivityTrack(**updated_doc)
    else:
        raise HTTPException(status_code=404, detail="User not found.")
    
async def get_activities_by_date(email: str, date: datetime):
    day_key = date.strftime("%Y-%m-%d")
    document = await collection.find_one({"email": email}, {"activities_done." + day_key: 1})

    if not document or day_key not in document.get("activities_done", {}):
        raise HTTPException(status_code=404, detail="No activities found for this date.")

    activities = document["activities_done"][day_key]
    return [EachActivity(**activity) for activity in activities]