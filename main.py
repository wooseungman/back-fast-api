from fastapi import FastAPI, BackgroundTasks, HTTPException
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="Sample FastAPI App")

class Item(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: float
    tax: Optional[float] = None

fake_db = {}

@app.get("/")
async def read_root():
    return {"message": "Hello, FastAPI!"}

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    item = fake_db.get(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@app.post("/items/", status_code=201)
async def create_item(item: Item, background_tasks: BackgroundTasks):
    fake_db[item.id] = item.dict()
    background_tasks.add_task(notify_new_item, item.id)
    return item

def notify_new_item(item_id: int):
    # 간단한 백그라운드 작업 예시
    print(f"Background task: item {item_id} created")
