import os

from fastapi import FastAPI, BackgroundTasks, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from typing import Optional
from database import APP_ENV, engine, get_db, Base

app = FastAPI(
    title="Sample FastAPI App",
    description="FastAPI backend for the monorepo sample (with Swagger UI)",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

try:
    Base.metadata.create_all(bind=engine)
except SQLAlchemyError as exc:
    print(f"Database initialization skipped: {exc}")

origins = [
    origin.strip()
    for origin in os.getenv(
        "CORS_ORIGINS",
        "http://localhost,http://localhost:5173,http://127.0.0.1:5173",
    ).split(",")
    if origin.strip()
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

@app.get("/api/config")
async def config_info():
    return {"app_env": APP_ENV}

@app.get("/api/db/health")
async def db_health(db: Session = Depends(get_db)):
    try:
        result = db.execute(text("SELECT DATABASE() AS database_name, VERSION() AS version"))
        row = result.mappings().one()

        return {
            "status": "ok",
            "database": row["database_name"],
            "version": row["version"],
        }
    except SQLAlchemyError as exc:
        raise HTTPException(status_code=503, detail=f"Database connection failed: {exc}") from exc

@app.get("/api/db/tables")
async def db_tables(db: Session = Depends(get_db)):
    try:
        result = db.execute(text("SHOW TABLES"))
        tables = [value for row in result for value in row]

        return {"tables": tables}
    except SQLAlchemyError as exc:
        raise HTTPException(status_code=503, detail=f"Database query failed: {exc}") from exc

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
