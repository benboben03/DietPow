from gpt_connection import client
from random import choice

quotes = [
    "Provide me with a quote of the day to improve my body and set a goal for myself. Ensure that it is written by a credible source and a real person and not unknown.",
    "Provide me with a quote of the day to improve my health. Ensure that it is written by a credible source and a real person and not unknown."
]

used_quotes = set()

def quote_of_the_day():
    global used_quotes
    while True:
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": choice(quotes)}]
        )
        response = completion.choices[0].message.content.strip()
        if response not in used_quotes:
            print(response)
            used_quotes.add(response)
            break  # Exit loop after finding a new quote

quote_of_the_day()
