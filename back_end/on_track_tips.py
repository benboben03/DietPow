from gpt_connection import client
import random
from tdee import calculate_tdee
from on_track_tips_db import get_user_info, get_current_weight, get_meals
from fastapi import APIRouter

router = APIRouter()

# Assuming the existence of 'client' as part of an external library to communicate with an AI model.

def tip_prompts(health_level, name, gender, age, activity_level):
    #bullet point less than 15 words or less and add extra print line
    #more prompts at least 5 
    #comvert prompts to f strings such that I can use data reported in the database for that particular user to get more 
    #personalized tips from the AI model
    if health_level == "You're on track!":
        return f"Great job{name}. as a {gender} of age {age} with {activity_level} activity level, you are doing well maintaining your health goals. Can I offer a tip to keep it up? In 3 bullet point format, no numbered bullet points, have only dashed bullets. Make the tips between 12 to 18 words each. Make it personalized to the user and their current health goals"
    elif health_level == "You're not on track!":
        return f"Terrible job{name}. as a {gender} of age {age} with {activity_level} activity level, you are not doing well maintaining your health goals. Can I offer a tip to improve yourself and your lifestyle? In 3 bullet point format, no numbered bullet points, have only dashed bullets. Make the tips between 12 to 18 words each. Make it personalized to the user and their current health goals"
    else:
        return "Great job staying on track with your health goals! Here's a tip to keep you motivated. in 3 bullet point format 15 words or less"


def get_health_tip(current_intake, weight, height, age, gender, activity_level, name):
    global used_tips
    tdee = calculate_tdee(weight, height, age, gender, activity_level)
    
    # Determine health level based on current intake and TDEE
    health_level = "You're on track!" if abs(current_intake - tdee) <= tdee * 0.1 else "You're not on track!"
    print(health_level)
    
    selected_prompt = tip_prompts(health_level, name, gender, age, activity_level)
    # Simulate a completion request to an AI model
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": selected_prompt}]
    )
    tip = completion.choices[0].message.content.strip()
    return health_level, tip
        

def estimate_days_to_goal(current_weight, target_weight, current_intake, weight, height, age, gender, activity_level):
    # Calculate TDEE
    tdee = calculate_tdee(weight, height, age, gender, activity_level)
    
    # Calculate daily calorie deficit or surplus
    daily_calorie_difference = current_intake - tdee
    
    # Convert calorie difference to weight change per day (in kg)
    # Note: 7,700 calories = 1 kg of body weight change, approximated from 3,500 calories per pound
    daily_weight_change = daily_calorie_difference / 7700
    
    # Calculate total desired weight change (in kg)
    total_weight_change = target_weight - current_weight
    
    # Estimate days to reach goal
    if daily_weight_change == 0:
        return "With your current calorie intake, your weight will remain stable. Adjust your intake to reach your goal."
    else:
        days_to_goal = abs(total_weight_change / daily_weight_change)
        return round(days_to_goal)
    


@router.get("/health-tip")
async def health_tip(email: str):
    # Retrieve user information from the database
    user_info = get_user_info(email)
    if user_info is None:
        return {"error": "User not found"}

    name, gender, activity_level, height, weight, target_weight, age = user_info

    # Retrieve current weight from the database
    current_weight = get_current_weight(email)
    if current_weight is None:
        return {"error": "Current weight not found"}

    # Retrieve current calorie intake from the database
    current_intake = get_meals(email)
    if current_intake is None:
        return {"error": "Current intake not found"}

    # Get a health tip based on the user's information
    health_level, tip = get_health_tip(current_intake, weight, height, age, gender, activity_level, name)
    return {"tip": tip, "health_level": health_level}

@router.get("/days-to-goal/")
async def days_to_goal(email: str):
    # Retrieve user information from the database
    user_info = get_user_info(email)
    if user_info is None:
        return {"error": "User not found"}

    name, gender, activity_level, height, weight, target_weight, age = user_info

    # Retrieve current weight from the database
    current_weight = get_current_weight(email)
    if current_weight is None:
        return {"error": "Current weight not found"}

    # Retrieve current calorie intake from the database
    current_intake = get_meals(email)
    if current_intake is None:
        return {"error": "Current intake not found"}

    # Estimate days to reach goal based on user's information
    day_count = estimate_days_to_goal(current_weight, target_weight, current_intake, weight, height, age, gender, activity_level)
    return {"days_to_goal": day_count}

    