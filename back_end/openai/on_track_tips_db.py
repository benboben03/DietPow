from mongodb_connection import client

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
    