from mongodb_connection import client
from models import UserGoalTrack, TrackedWeight
from typing import List
from fastapi import HTTPException
from datetime import datetime, timedelta

database = client.UserInfo
collection = database.user_track_weight

async def fetch_all_users_weight():
    users = []
    cursor = collection.find({})
    async for document in cursor:
        users.append(UserGoalTrack(**document))
    return users


async def fetch_one_user_weight(email):
    document = await collection.find_one({"email": email})
    return document


async def fetch_user_weight_by_date(email: str, date: datetime):
    start_of_day = datetime.combine(date, datetime.min.time())
    end_of_day = start_of_day + timedelta(days=1)
    
    document = await collection.find_one(
        {"email": email, "tracked_weights.t_date": {"$gte": start_of_day, "$lt": end_of_day}}
    )
    
    if document:
        # Extract and return the specific day's weight record
        tracked_weights = [weight for weight in document['tracked_weights'] if start_of_day <= weight['t_date'] < end_of_day]
        return UserGoalTrack(email=email, tracked_weights=tracked_weights)
    else:
        raise HTTPException(status_code=404, detail="Weight record not found for the specified date.")



async def add_weight_track(email: str, tracked_weight: TrackedWeight):
    # Calculate start and end of the day
    start_of_day = datetime.combine(tracked_weight.t_date, datetime.min.time())
    end_of_day = start_of_day + timedelta(days=1)

    # Update or add the tracked weight for user
    user_goal_track = await collection.find_one({"email": email})
    if user_goal_track:
        # Check if there's already a weight tracked for the given date
        for weight in user_goal_track.get("tracked_weights", []):
            if start_of_day <= weight["t_date"] < end_of_day:
                # Update existing weight for the date
                await collection.update_one(
                    {"_id": user_goal_track["_id"], "tracked_weights.t_date": weight["t_date"]},
                    {"$set": {"tracked_weights.$.current_weight": tracked_weight.current_weight}}
                )
                break
        else:
            # Add new tracked weight for the date if not found
            await collection.update_one(
                {"_id": user_goal_track["_id"]},
                {"$push": {"tracked_weights": tracked_weight.dict()}}
            )
    else:
        # If no goal track found for the user, create a new document
        await collection.insert_one({"email": email, "tracked_weights": [tracked_weight.dict()]})
    
    updated_doc = await collection.find_one({"email": email})
    if updated_doc:
        return UserGoalTrack(**updated_doc)
    else:
        raise HTTPException(status_code=500, detail="Failed to update user's tracked weight.")