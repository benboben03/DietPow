from openai import OpenAI
from dotenv import load_dotenv, find_dotenv
import os
load_dotenv(find_dotenv())

API_KEY = os.environ.get("GPT_KEY")

client = OpenAI(api_key=API_KEY)


# test_msg = "What is the fastest car in the world?"
# completion = client.chat.completions.create(model = "gpt-3.5-turbo",
# messages = [{"role": "user", "content": test_msg}])

# print(completion.choices[0].message.content)


#main gpt connnection file
# have to have one module where its the quote of the day with the author name
# have to have motivation and reminders to work out and eat healthy
# have to have a module for tips if you are on track or falling behind personalized on your goals


