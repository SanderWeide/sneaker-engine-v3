import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, Text, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from database import Base
import enum


class OfferType(str, enum.Enum):
    BUY = "buy"
    TRADE = "trade"
    SWAP = "swap"


class PropositionStatus(str, enum.Enum):
    PENDING = "pending"
    ACCEPTED = "accepted"
    REJECTED = "rejected"
    CANCELLED = "cancelled"


class Proposition(Base):
    __tablename__ = "propositions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    sneaker_id = Column(String, ForeignKey("sneakers.id"), nullable=False)
    proposer_id = Column(String, ForeignKey("users.id"), nullable=False)
    offer_type = Column(Enum(OfferType), nullable=False)
    offer_price = Column(Float)
    offer_sneaker_id = Column(String, ForeignKey("sneakers.id"))
    status = Column(Enum(PropositionStatus), default=PropositionStatus.PENDING)
    message = Column(Text)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationships
    sneaker = relationship("Sneaker", foreign_keys=[sneaker_id], back_populates="propositions")
    proposer = relationship("User", back_populates="propositions")
    offer_sneaker = relationship("Sneaker", foreign_keys=[offer_sneaker_id])
