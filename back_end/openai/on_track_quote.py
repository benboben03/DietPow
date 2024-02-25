from gpt_connection import client

tip_prompts = [
    "Provide me with a tip to stay on track with my health goals.",
    "I need some motivation to help me reach my health goals. Can you provide a tip?"
]

used_tips = set()

def get_health_tip():
    global used_tips
    while True:
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": (tip_prompts)}]
        )
        tip = completion.choices[0].message.content.strip()
        if tip not in used_tips:
            used_tips.add(tip)
            return tip

# Example usage
tip = get_health_tip()
print("Today's health tip:", tip)
