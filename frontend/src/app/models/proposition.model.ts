export interface Proposition {
  id: string;
  sneaker_id: string;
  sneaker?: {
    id: string;
    name: string;
    brand: string;
    size: string;
    price: number;
  };
  proposer_id: string;
  proposer?: {
    id: string;
    username: string;
  };
  offer_type: 'buy' | 'trade' | 'swap';
  offer_price?: number;
  offer_sneaker_id?: string;
  offer_sneaker?: {
    id: string;
    name: string;
    brand: string;
    size: string;
  };
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  message?: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePropositionRequest {
  sneaker_id: string;
  offer_type: 'buy' | 'trade' | 'swap';
  offer_price?: number;
  offer_sneaker_id?: string;
  message?: string;
}
