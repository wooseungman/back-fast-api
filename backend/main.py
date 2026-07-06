from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Optional

app = FastAPI(
    title="Sample FastAPI App",
    description="FastAPI backend for the monorepo sample (with Swagger UI)",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# 개발용 CORS 설정: Vite dev 서버를 허용
origins = [
    "http://localhost",
    "http://localhost:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Item(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: float

fake_db = {}

@app.get("/api/hello")
async def hello():
    return {"message": "Hello from FastAPI backend"}

@app.get("/api/items/{item_id}")
async def read_item(item_id: int):
    item = fake_db.get(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@app.post("/api/items/", status_code=201)
async def create_item(item: Item, background_tasks: BackgroundTasks):
    fake_db[item.id] = item.dict()
    background_tasks.add_task(lambda i: print(f"Background: created {i}"), item.id)
    return item


# Production: serve built frontend if available
try:
    app.mount("/", StaticFiles(directory="../frontend/dist", html=True), name="frontend")
except Exception:
    # If dist doesn't exist during development, ignore mount error
    pass
