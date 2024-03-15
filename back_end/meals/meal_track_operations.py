from fastapi import APIRouter, HTTPException, Body
from models import MealTime, FoodTrack, EachFood
from typing import List
from meals.meal_track_db import add_meal, get_meals_by_day, get_meal_by_date_and_type
from datetime import datetime


router = APIRouter()

@router.post("/meal-track/", response_model=FoodTrack)
async def add_meal_tracking(email: str, each_food: EachFood = Body(...), date: datetime = Body(...)):
    try:
        result = await add_meal(email, each_food, date)
        return FoodTrack(**result)
    except HTTPException as e:
        raise e
    
@router.get("/meals/{email}/{date}", response_model=List[EachFood])
async def fetch_meals_by_date(email: str, date: datetime):
    try:
        meals = await get_meals_by_day(email, date)
        return meals
    except HTTPException as e:
        raise e

@router.get("/meals/{email}/{date}/{meal_type}", response_model=List[EachFood])
async def fetch_meals_by_date_and_type(email: str, date: str, meal_type: MealTime):
    date_parsed = datetime.strptime(date, "%Y-%m-%d")
    meals = await get_meal_by_date_and_type(email, date_parsed, meal_type)
    return meals
