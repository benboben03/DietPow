from gpt_connection import client as gpt_client
from random import choice
from mongodb_connection_sync import client as mongodb_client
import hashlib
from fastapi import APIRouter, HTTPException
from datetime import datetime

router = APIRouter()

database = mongodb_client.NotificationQuotes
collection = database.quote_day

quotes = [
    "Provide me with a quote of the day to improve my body and set a goal for myself. Ensure that it is written by a credible source and a real person and not unknown, in 20 words or less.",
    "Provide me with a quote of the day to improve my health. Ensure that it is written by a credible source and a real person and not unknown, in 20 words or less.",
    "Share a quote that inspires daily exercise and commitment to fitness by a renowned athlete. Ensure that it is written by a credible source and a real person and not unknown, in 20 words or less.",
    "What's a motivational saying about the importance of nutrition in overall health from a well-respected dietitian? Ensure that it is written by a credible source and a real person and not unknown, in 20 words or less.",
    "Provide a quote on the mental benefits of regular physical activity from a sports psychologist Ensure that it is written by a credible source and a real person and not unknown, in 20 words or less.",
    "Share wisdom on the power of persistence in fitness goals from a celebrated personal trainer. Ensure that it is written by a credible source and a real person and not unknown, in 20 words or less.",
    "What is an encouraging phrase about overcoming challenges in health and fitness from an inspirational speaker? Ensure that it is written by a credible source and a real person and not unknown, in 20 words or less.",
    "Provide a quote that emphasizes the joy and fulfillment found in healthy living from a happiness researcher. Ensure that it is written by a credible source and a real person and not unknown, in 20 words or less.",
    "What's a motivational quote on the importance of balance in diet and exercise from a holistic health coach? Ensure that it is written by a credible source and a real person and not unknown, in 20 words or less.",
    "Share an inspirational saying on the transformational power of making healthy choices from a life coach. Ensure that it is written by a credible source and a real person and not unknown, in 20 words or less."

]

def normalize_quote(quote):
    return ' '.join(quote.lower().split())

def quote_hash(quote):
    # Generate a hash
    normalized_quote = normalize_quote(quote)
    return hashlib.md5(normalized_quote.encode('utf-8')).hexdigest()

def quote_of_the_day():
    # Delete all quotes from database after 100 quotes are in collection
    document_count = collection.count_documents({})
    if document_count >= 100:
        collection.delete_many({})
    
    while True:
        completion = gpt_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": choice(quotes)}]
        )
        response = completion.choices[0].message.content.strip()
        response_hash = quote_hash(response)
        
        # Prevent duplicate quotes
        if collection.find_one({"hash": response_hash}) is None and collection.find_one({"quote": response}) is None:
            print(response)
            return {"quote": response, "hash": response_hash}
            

@router.get("/quote-of-the-day/")
async def get_quote_of_the_day():
    # Find a quote that has today's date or create a new one if it doesn't exist
    today = datetime.now().date()
    quote_document = collection.find_one({"date": today.isoformat()})

    if quote_document:
        return {"quote": quote_document["quote"]}
    else:
        # Here you should insert your logic to select a new quote and add it to the database
        # This is where you'd use your `quote_of_the_day` function or similar logic
        # For simplicity, this example won't implement the complete logic of selecting a new quote
        new_quote = "This is a new quote. Actual quote selection not implemented in this example."
        new_quote_hash = quote_hash(new_quote)
        collection.insert_one({"quote": new_quote, "hash": new_quote_hash, "date": today.isoformat()})
        return {"quote": new_quote}


if __name__ == "__main__":
    for i in range(1, 120):
        quote_of_the_day()
