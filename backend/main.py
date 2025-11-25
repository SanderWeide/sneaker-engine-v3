from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import auth, sneakers, propositions
from database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Sneaker Engine API",
    description="A sneaker marketplace with proposition-based trading",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "http://127.0.0.1:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(sneakers.router, prefix="/api/sneakers", tags=["Sneakers"])
app.include_router(propositions.router, prefix="/api/propositions", tags=["Propositions"])


@app.get("/")
def read_root():
    return {"message": "Welcome to Sneaker Engine API"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
