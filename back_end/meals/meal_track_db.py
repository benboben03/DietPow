from mongodb_connection import client
from models import MealTime, EachFood, FoodTrack
from typing import List
from datetime import datetime, timedelta
from fastapi import HTTPException

database = client.UserInfo
collection = database.meal_track


async def add_meal(email: str, each_food: EachFood, date: datetime):
    start_of_day = datetime.combine(date, datetime.min.time())
    meal_dict = each_food.model_dump()
    meal_dict['date'] = start_of_day

    user_meal_track = await collection.find_one({"email": email})
    if user_meal_track:
        updated = False
        # Check each day of collection eaten_food
        for day in user_meal_track.get("eaten_food", {}).keys():
            day_date = datetime.strptime(day, "%Y-%m-%d")
            # Add meal to day food was eaten
            if start_of_day == day_date:
                await collection.update_one({"email": email, f"eaten_food.{day}": {"$exists": True}},{"$push": {f"eaten_food.{day}": meal_dict}})
                updated = True
                break
        # If day does not exist, create a new entry
        if not updated:
            day_key = start_of_day.strftime("%Y-%m-%d")
            await collection.update_one({"email": email}, {"$set": {f"eaten_food.{day_key}": [meal_dict]}})
    else:
        # Create new meal track if user does not exist in collection
        day_key = start_of_day.strftime("%Y-%m-%d")
        await collection.insert_one({"email": email, "eaten_food": {day_key: [meal_dict]}})
    
    # Return updatyed document with added meal
    updated_doc = await collection.find_one({"email": email})
    if updated_doc:
        return updated_doc
    else:
        raise HTTPException(status_code=500, detail="Failed to update user's meal track.")
    
async def get_meals_by_day(email: str, date: datetime):
    start_of_day = datetime.combine(date, datetime.min.time())
    day_key = start_of_day.strftime("%Y-%m-%d")

    document = await collection.find_one({"email": email, f"eaten_food.{day_key}": {"$exists": True}})
    
    if document and day_key in document['eaten_food']:
        meals = document['eaten_food'][day_key]
        return meals
    else:
        raise HTTPException(status_code=500, detail="No meals found for the specified date.")
    

async def get_meal_by_date_and_type(email: str, date: datetime, meal_type: MealTime):
    start_of_day = datetime.combine(date, datetime.min.time())
    day_key = start_of_day.strftime("%Y-%m-%d")

    document = await collection.find_one({"email": email}, {"eaten_food." + day_key: 1})

    if not document or day_key not in document.get("eaten_food", {}):
        raise HTTPException(status_code=404, detail="No meals found for this date.")

    # Filter meals by the specified type.
    meals_of_type = [
        EachFood(**meal) for meal in document['eaten_food'][day_key]
        if meal['meal_time'] == meal_type.value
    ]

    if not meals_of_type:
        raise HTTPException(status_code=404, detail=f"No meals of type {meal_type.value} eaten on this date.")
    return meals_of_type
