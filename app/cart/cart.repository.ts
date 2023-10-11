import { v4 as generateUuid } from 'uuid';
import { Cart } from './cart'
import { UpdateCartDto } from './updateCart.dto';
import { Product } from '../products/product';

export class CartRepository {
  #carts: Cart[];

  constructor() {
    this.#carts = [];
  }

  create(userId: UUID) {
    const cart: Cart = {
      id: generateUuid(),
      userId,
      items: [],
      isDeleted: false,
    };

    this.#carts.push(cart);
    return cart;
  }

  find(userId: UUID) {
    return this.#carts.find((c) => c.userId === userId);
  }

  isExist(userId: UUID) {
    return this.#carts.some((c) => c.userId === userId);
  }

  delete(userId: UUID) {
    this.#carts = this.#carts.filter((c) => c.userId !== userId);
  }

  addProductToCart(id: UUID, product: Product, count: number) {
    const cart = this.#carts.find((c) => c.id === id);
    cart?.items.push({ count, product });
    return cart;
  }

  updateProductInCart(id: UUID, product: Product, count: number) {
    const cart = this.#carts.find((c) => c.id === id) as Cart;

    const productIndex = cart?.items.findIndex((p) => p.product.id === product.id);
    cart.items[productIndex].count = count;

    return cart;
  }

  deleteProductFromCart(id: UUID, productId: UUID) {
    const cart = this.#carts.find((c) => c.id === id) as Cart;
    cart.items = cart.items.filter((i) => i.product.id !== productId);
    return cart;
  }
}
