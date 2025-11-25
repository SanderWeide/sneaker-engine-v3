export interface Sneaker {
  id: string;
  name: string;
  brand: string;
  size: string;
  condition: 'new' | 'like_new' | 'good' | 'fair' | 'worn';
  price: number;
  description: string;
  image_url?: string;
  owner_id: string;
  owner?: {
    id: string;
    username: string;
  };
  created_at: string;
  updated_at: string;
}

export interface CreateSneakerRequest {
  name: string;
  brand: string;
  size: string;
  condition: 'new' | 'like_new' | 'good' | 'fair' | 'worn';
  price: number;
  description: string;
  image_url?: string;
}
