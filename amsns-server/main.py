from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from config.settings import get_settings
from config.database import db
from routes import auth, kyc, dashboard

settings = get_settings()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await db.connect_to_database()
    yield
    # Shutdown
    await db.close_database_connection()

app = FastAPI(
    title=settings.app_name,
    debug=settings.debug,
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins.split(",") if settings.allowed_origins else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    max_age=3600,
)

app.include_router(auth.router)
app.include_router(kyc.router)
app.include_router(dashboard.router)

@app.get("/")
async def health_check():
    return {"status": "ok"}

