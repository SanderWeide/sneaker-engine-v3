import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, Text, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from database import Base
import enum


class SneakerCondition(str, enum.Enum):
    NEW = "new"
    LIKE_NEW = "like_new"
    GOOD = "good"
    FAIR = "fair"
    WORN = "worn"


class Sneaker(Base):
    __tablename__ = "sneakers"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    brand = Column(String, nullable=False)
    size = Column(String, nullable=False)
    condition = Column(Enum(SneakerCondition), nullable=False)
    price = Column(Float, nullable=False)
    description = Column(Text)
    image_url = Column(String)
    owner_id = Column(String, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    owner = relationship("User", back_populates="sneakers")
    propositions = relationship("Proposition", back_populates="sneaker", cascade="all, delete-orphan")
