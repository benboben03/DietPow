from mongodb_connection import client
from models import User
from fastapi import HTTPException
from pymongo.results import InsertOneResult

database = client.UserInfo
collection = database.user
# collection.create_index([("email", pymongo.ASCENDING)], unique=True)

async def user_exists(email):
    existing_user = await collection.find_one({"email": email})
    return existing_user

async def fetch_one_user(email):
    document = await collection.find_one({"email": email})
    return document

async def fetch_all_users():
    users = []
    cursor = collection.find({})
    async for document in cursor:
        users.append(User(**document))
    return users


async def create_user(user: dict) -> User:
    if await user_exists(user["email"]) is None:
        result: InsertOneResult = await collection.insert_one(user)
        if result.acknowledged:
            created_user = await fetch_one_user(user["email"])
            if created_user:
                return User(**created_user)
            else:
                raise HTTPException(status_code=500, detail="User created but cannot be fetched")
    else:
        raise HTTPException(status_code=400, detail="Email already exists.")


async def update_user(current_email, new_email, **kwargs):
    if new_email != current_email:
        kwargs['email'] = new_email
    update_result = await collection.update_one({"email": current_email}, {"$set": kwargs})
    if update_result.matched_count == 0:
        return None
    document = await collection.find_one({"email": new_email})
    return document


async def remove_user(email):
    if await user_exists(email):
        await collection.delete_one({"email": email})
        return True
    else:
        raise HTTPException(status_code=404, detail="User not found")