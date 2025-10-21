from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

try:
    DATABASE_CONNECTION = os.getenv("DATABASE_URL")
    engine = create_engine(DATABASE_CONNECTION)
    connection = engine.connect()
    print("Database connected ✅")
except Exception as e:
    print("❌ Database connection failed:", e)

engine = create_engine(DATABASE_CONNECTION, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
