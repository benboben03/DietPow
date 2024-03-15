from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from user_info.user_operations import router as user_router
from user_info.weight_track_operation import router as weight_track_router
from activities.activities_track_operations import router as activities_router
from quote_day import router as quote_router
from meals.meal_track_operations import router as meals_router


'''
To check FastAPI pip install uvicorn, go to this directory (cd back_end/database)
run: uvicorn fast_api_connection:app --reload
add /docs to localhost link
'''

app = FastAPI()

origins = ['http://192.168.100.83:8081', 'http://127.0.0.1:8000' ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(user_router, prefix="/api")
app.include_router(weight_track_router, prefix="/api")
app.include_router(activities_router, prefix="/api")
app.include_router(meals_router, prefix="/api")
app.include_router(quote_router, prefix="/api")


@app.get("/")
def read_root():
    return {"Diet": "Pow!"}