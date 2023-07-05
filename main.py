from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import random
app = FastAPI()
answer = ["TRAIN", "APPLE", "RESET", "TOWEL", "HOTEL", "SUPER"];
@app.get('/answer')
def get_answer():
    return {'answer' : answer[int(random.uniform(0, 5))]}
app.mount("/", StaticFiles(directory="static", html=True), name="static")


