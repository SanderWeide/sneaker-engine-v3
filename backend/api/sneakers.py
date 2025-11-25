from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from models.sneaker import Sneaker
from schemas.sneaker import SneakerCreate, SneakerUpdate, SneakerResponse
from auth import get_current_user

router = APIRouter()


@router.get("", response_model=List[SneakerResponse])
def get_sneakers(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    skip: int = 0,
    limit: int = 100
):
    """Get all sneakers"""
    sneakers = db.query(Sneaker).offset(skip).limit(limit).all()
    return sneakers


@router.get("/{sneaker_id}", response_model=SneakerResponse)
def get_sneaker(
    sneaker_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific sneaker by ID"""
    sneaker = db.query(Sneaker).filter(Sneaker.id == sneaker_id).first()
    
    if not sneaker:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sneaker not found"
        )
    
    return sneaker


@router.post("", response_model=SneakerResponse, status_code=status.HTTP_201_CREATED)
def create_sneaker(
    sneaker_data: SneakerCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new sneaker"""
    new_sneaker = Sneaker(
        **sneaker_data.model_dump(),
        owner_id=current_user.id
    )
    
    db.add(new_sneaker)
    db.commit()
    db.refresh(new_sneaker)
    
    return new_sneaker


@router.put("/{sneaker_id}", response_model=SneakerResponse)
def update_sneaker(
    sneaker_id: str,
    sneaker_data: SneakerUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update a sneaker"""
    sneaker = db.query(Sneaker).filter(Sneaker.id == sneaker_id).first()
    
    if not sneaker:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sneaker not found"
        )
    
    if sneaker.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this sneaker"
        )
    
    # Update only provided fields
    update_data = sneaker_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(sneaker, field, value)
    
    db.commit()
    db.refresh(sneaker)
    
    return sneaker


@router.delete("/{sneaker_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_sneaker(
    sneaker_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a sneaker"""
    sneaker = db.query(Sneaker).filter(Sneaker.id == sneaker_id).first()
    
    if not sneaker:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sneaker not found"
        )
    
    if sneaker.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this sneaker"
        )
    
    db.delete(sneaker)
    db.commit()
    
    return None
