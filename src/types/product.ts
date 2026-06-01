/**
 * Product Types
 */

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  emoji: string;
  badge?: string;
  description?: string;
}

export interface CartProduct extends Product {
  quantity: number;
}

export type Category = 'All' | 'Electronics' | 'Footwear' | 'Accessories' | 'Kitchen' | 'Sports';
