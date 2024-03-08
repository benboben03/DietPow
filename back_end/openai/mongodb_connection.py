from dotenv import load_dotenv, find_dotenv
import os
from pymongo import MongoClient
load_dotenv(find_dotenv())

password = os.environ.get("MONGODB_PWD")
uri = f"mongodb+srv://benboben03:{password}@dietpow.duheyjf.mongodb.net/?retryWrites=true&w=majority&appName=DietPow"
# uri = "mongodb://localhost:27017/"
client = MongoClient(uri)

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

