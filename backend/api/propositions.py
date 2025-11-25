from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from models.proposition import Proposition, PropositionStatus
from models.sneaker import Sneaker
from schemas.proposition import PropositionCreate, PropositionResponse
from auth import get_current_user

router = APIRouter()


@router.get("", response_model=List[PropositionResponse])
def get_propositions(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    skip: int = 0,
    limit: int = 100
):
    """Get all propositions for the current user (sent and received)"""
    # Get propositions where user is the proposer or the owner of the sneaker
    propositions = db.query(Proposition).join(
        Sneaker, Proposition.sneaker_id == Sneaker.id
    ).filter(
        (Proposition.proposer_id == current_user.id) | (Sneaker.owner_id == current_user.id)
    ).offset(skip).limit(limit).all()
    
    return propositions


@router.get("/{proposition_id}", response_model=PropositionResponse)
def get_proposition(
    proposition_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific proposition by ID"""
    proposition = db.query(Proposition).filter(Proposition.id == proposition_id).first()
    
    if not proposition:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Proposition not found"
        )
    
    # Check authorization
    sneaker = db.query(Sneaker).filter(Sneaker.id == proposition.sneaker_id).first()
    if proposition.proposer_id != current_user.id and sneaker.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to view this proposition"
        )
    
    return proposition


@router.post("", response_model=PropositionResponse, status_code=status.HTTP_201_CREATED)
def create_proposition(
    proposition_data: PropositionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new proposition"""
    # Check if sneaker exists
    sneaker = db.query(Sneaker).filter(Sneaker.id == proposition_data.sneaker_id).first()
    if not sneaker:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sneaker not found"
        )
    
    # Can't propose on your own sneaker
    if sneaker.owner_id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot propose on your own sneaker"
        )
    
    new_proposition = Proposition(
        **proposition_data.model_dump(),
        proposer_id=current_user.id
    )
    
    db.add(new_proposition)
    db.commit()
    db.refresh(new_proposition)
    
    return new_proposition


@router.put("/{proposition_id}/accept", response_model=PropositionResponse)
def accept_proposition(
    proposition_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Accept a proposition"""
    proposition = db.query(Proposition).filter(Proposition.id == proposition_id).first()
    
    if not proposition:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Proposition not found"
        )
    
    # Only the sneaker owner can accept
    sneaker = db.query(Sneaker).filter(Sneaker.id == proposition.sneaker_id).first()
    if sneaker.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to accept this proposition"
        )
    
    proposition.status = PropositionStatus.ACCEPTED
    db.commit()
    db.refresh(proposition)
    
    return proposition


@router.put("/{proposition_id}/reject", response_model=PropositionResponse)
def reject_proposition(
    proposition_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Reject a proposition"""
    proposition = db.query(Proposition).filter(Proposition.id == proposition_id).first()
    
    if not proposition:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Proposition not found"
        )
    
    # Only the sneaker owner can reject
    sneaker = db.query(Sneaker).filter(Sneaker.id == proposition.sneaker_id).first()
    if sneaker.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to reject this proposition"
        )
    
    proposition.status = PropositionStatus.REJECTED
    db.commit()
    db.refresh(proposition)
    
    return proposition


@router.delete("/{proposition_id}", status_code=status.HTTP_204_NO_CONTENT)
def cancel_proposition(
    proposition_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Cancel/delete a proposition (only by proposer)"""
    proposition = db.query(Proposition).filter(Proposition.id == proposition_id).first()
    
    if not proposition:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Proposition not found"
        )
    
    # Only the proposer can cancel
    if proposition.proposer_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to cancel this proposition"
        )
    
    db.delete(proposition)
    db.commit()
    
    return None
