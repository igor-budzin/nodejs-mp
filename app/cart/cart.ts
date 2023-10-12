import { Product } from '../products/product';

export interface CartItem {
  product: Product;
  count: number;
}

export interface Cart {
  id: UUID;
  userId: string;
  isDeleted: boolean;
  items: CartItem[];
}

export interface ExternalCart extends Omit<Cart, 'isDeleted'> { }

export interface CartMeta {
  cart: ExternalCart;
  total: number;
}
