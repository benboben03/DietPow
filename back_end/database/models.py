from pydantic import BaseModel, EmailStr
from typing import List, Dict
from datetime import datetime, date
from enum import Enum

# Track User Info
class ActivityLevels(str, Enum):
    SEDENTARY = 'sedentary'
    LIGHTLY_ACTIVE = 'lightly active'
    MODERATELY_ACTIVE = 'moderately active'
    VERY_ACTIVE = 'very active'
    EXTRA_ACTIVE = 'extra active'

class Genders(str, Enum):
    MALE = "male"
    FEMALE = "female"

class Goals(str, Enum):
    LOSE = "lose"
    GAIN = "gain"
    MAINTAIN = "maintain"

class User(BaseModel):
    email: EmailStr
    name: str
    age: int
    weight: float
    height: float
    gender: Genders
    activity_level: ActivityLevels
    goal: Goals
    target_weight: float

class TrackedWeight(BaseModel):
    t_date: datetime
    current_weight: float

class UserGoalTrack(BaseModel):
    email: EmailStr
    tracked_weights: List[TrackedWeight] = []


# Track meals
class MealTime(str, Enum):
    BREAKFAST = 'Breakfast'
    LUNCH = 'Lunch'
    DINNER = 'Dinner'
    SNACKS = 'Snacks'

class EachFood(BaseModel):
    meal_time: MealTime
    description: str
    calorie_count: int

class FoodTrack(BaseModel):
    email: EmailStr
    eaten_food: Dict[datetime, List[EachFood]] = {}


# Track activites
class Activities(str, Enum):
    RUN = "run"
    BIKE = "bike"
    WALK = "walk"
    BASKETBALL = "basketball"
    SOCCER = "soccer"
    WEIGHT_LIFT = "weight lift"
    TENNIS = "tennis"
    SWIM = "swim"
    FOOTBALL = "football"
    BASEBALL = "baseball"
    HIKE = "hike"
    VOLLEYBALL = "volleyball"
    GOLF = "golf"
    HIIT = "high intensity interval training"
    SKATING = "skating"
    DANCING = "dance"

class EachActivity(BaseModel):
    time: datetime
    type: Activities
    duration: float
    distance: float

class ActivityTrack(BaseModel):
    email: EmailStr
    activities_done: Dict[datetime, List[EachActivity]] = {}
