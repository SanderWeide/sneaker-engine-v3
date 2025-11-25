from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from models.proposition import OfferType, PropositionStatus


class PropositionBase(BaseModel):
    sneaker_id: str
    offer_type: OfferType
    offer_price: Optional[float] = None
    offer_sneaker_id: Optional[str] = None
    message: Optional[str] = None


class PropositionCreate(PropositionBase):
    pass


class ProposerInfo(BaseModel):
    id: str
    username: str

    class Config:
        from_attributes = True


class SneakerInfo(BaseModel):
    id: str
    name: str
    brand: str
    size: str
    price: float

    class Config:
        from_attributes = True


class PropositionResponse(PropositionBase):
    id: str
    proposer_id: str
    proposer: Optional[ProposerInfo] = None
    sneaker: Optional[SneakerInfo] = None
    offer_sneaker: Optional[SneakerInfo] = None
    status: PropositionStatus
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
