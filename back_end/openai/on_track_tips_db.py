from mongodb_connection import client
from datetime import datetime

user_database = client.UserInfo
user_collection = user_database.user
current_weight_collection = user_database.user_track_weight
meals_collection = user_database.meal_track

database = client.NotificationQuotes
collection = database.on_track_tips


def get_user_info(email: str):
    user = user_collection.find_one({"email": email})
    if user:
        name = user["name"]
        gender = user["gender"]
        activity_level = user["activity_level"]
        height = user["height"]
        weight = user["weight"]
        target_weight = user["target_weight"]
        age = user["age"]


        return name, gender, activity_level, height, weight, target_weight, age
    else:
        return None
    
def get_current_weight(email: str):
    user = current_weight_collection.find_one({"email": email})
    if user and "tracked_weights" in user:
        tracked_weights_sorted = sorted(user['tracked_weights'], key=lambda x: x['t_date'], reverse=True)
        if tracked_weights_sorted:
            current_weight = tracked_weights_sorted[0]['current_weight'] 
            return current_weight
    return None
    
def get_meals(email: str, date: str = None):
    if date is None:
        date = datetime.now().strftime("%Y-%m-%d")
        print(date)

    meals_record = meals_collection.find_one({"email": email})

    if meals_record and "eaten_food" in meals_record:
        total_calories = 0
        date_meals = meals_record.get("eaten_food", {}).get(date,[])
        for meal in date_meals:
            if "calorie_count" in meal:
                total_calories += meal["calorie_count"]
        return total_calories
    else:
        return 0
    