from gpt_connection import client
import random
from tdee import calculate_tdee

# Assuming the existence of 'client' as part of an external library to communicate with an AI model.

tip_prompts = {
    #bullet point less than 15 words or less and add extra print line
    #more prompts at least 5 

    "on track": [
        "Great job staying on track with your health goals! Here's a tip to keep you motivated. in 3 bullet point format",
        "You're doing well maintaining your health goals. Can I offer a tip to keep it up? in 3 bullet point format"
    ],
    "needs motivation": [
        "It looks like you might need some extra motivation to reach your health goals. Here's a tip for you.in 3 bullet point format",
        "Staying motivated can be challenging. Here's a health tip to help you get back on track.in 3 bullet point format"
    ]
}


used_tips = set()

def get_health_tip(current_intake, weight, height, age, gender, activity_level):
    global used_tips
    tdee = calculate_tdee(weight, height, age, gender, activity_level)
    
    # Determine health level based on current intake and TDEE
    health_level = "on track" if abs(current_intake - tdee) <= tdee * 0.1 else "needs motivation"
    
    while True:
        selected_prompt = random.choice(tip_prompts[health_level])
        # Simulate a completion request to an AI model
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": selected_prompt}]
        )
        tip = completion.choices[0].message.content.strip()
        if tip not in used_tips:
            used_tips.add(tip)
            return tip
        

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

# Example usage
current_weight = 70  # kg, current weight
target_weight = 65  # kg, goal weight
current_intake = 2500  # calories, current daily intake
weight = 70  # kg, for TDEE calculation
height = 175  # cm, for TDEE calculation
age = 25  # years, for TDEE calculation
gender = 'male'
activity_level = 'moderately active'

day_count = estimate_days_to_goal(current_weight, target_weight, current_intake, weight, height, age, gender, activity_level)


# Example usage
#get logged in calorie intake data
current_intake = 2500  # Example calorie intake
#current user weight data
weight = 70  # kg
#curent height from profile hopefully doesn't change
height = 175  # cm
#current age from profile
age = 25  # years
#gender from profile
gender = 'male'
#activity level from profile
activity_level = 'moderately active'
tip = get_health_tip(current_intake, weight, height, age, gender, activity_level)

print("Today's health tip:", tip)
print("Estimated days to reach goal:", day_count)
