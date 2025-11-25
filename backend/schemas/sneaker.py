from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from models.sneaker import SneakerCondition


class SneakerBase(BaseModel):
    name: str
    brand: str
    size: str
    condition: SneakerCondition
    price: float
    description: Optional[str] = None
    image_url: Optional[str] = None


class SneakerCreate(SneakerBase):
    pass


class SneakerUpdate(BaseModel):
    name: Optional[str] = None
    brand: Optional[str] = None
    size: Optional[str] = None
    condition: Optional[SneakerCondition] = None
    price: Optional[float] = None
    description: Optional[str] = None
    image_url: Optional[str] = None


class SneakerOwner(BaseModel):
    id: str
    username: str

    class Config:
        from_attributes = True


class SneakerResponse(SneakerBase):
    id: str
    owner_id: str
    owner: Optional[SneakerOwner] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
