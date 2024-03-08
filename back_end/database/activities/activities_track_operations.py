from fastapi import APIRouter, HTTPException
from models import Activities, EachActivity, ActivityTrack
from typing import List

router = APIRouter()