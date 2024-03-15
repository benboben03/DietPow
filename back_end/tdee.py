from gpt_connection import client
import random

def calculate_tdee(weight, height, age, gender, activity_level):
    # Calculate BMR based on gender
    if gender.lower() == 'male':
        bmr = 10 * weight + 6.25 * height - 5 * age + 5
    else:
        bmr = 10 * weight + 6.25 * height - 5 * age - 161
    
    # Adjust BMR based on activity level
    if activity_level == 'sedentary':
        tdee = bmr * 1.2
    elif activity_level == 'lightly active':
        tdee = bmr * 1.375
    elif activity_level == 'moderately active':
        tdee = bmr * 1.55
    elif activity_level == 'very active':
        tdee = bmr * 1.725
    else:  # extra active
        tdee = bmr * 1.9

    return round(tdee, 2)
