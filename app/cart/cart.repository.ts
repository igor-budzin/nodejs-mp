import { v4 as generateUuid } from 'uuid';
import { Cart, ExternalCart } from './cart'
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
    return this.#excludeSystemFields(cart);
  }

  find(userId: UUID) {
    const cart = this.#carts.find((c) => {
      return c.userId === userId && !c.isDeleted
    });

    if (!cart) {
      return;
    }

    return this.#excludeSystemFields(cart);
  }

  findById(id: UUID) {
    const cart = this.#carts.find((c) => {
      return c.id === id && !c.isDeleted
    });

    if (!cart) {
      return;
    }

    return this.#excludeSystemFields(cart);
  }

  isExist(userId: UUID) {
    return this.#carts.some((c) => {
      return c.userId === userId && !c.isDeleted;
    });
  }

  delete(userId: UUID) {
    const cartIndex = this.#carts.findIndex((c) => c.userId === userId);

    if (cartIndex === -1) {
      return;
    }

    this.#carts[cartIndex].isDeleted = true;
  }

  addProductToCart(id: UUID, product: Product, count: number) {
    const cart = this.findById(id) as ExternalCart;
    cart?.items.push({ count, product });
    return cart;
  }

  updateProductInCart(id: UUID, product: Product, count: number) {
    const cart = this.findById(id) as ExternalCart;

    const productIndex = cart?.items.findIndex((p) => p.product.id === product.id);
    cart.items[productIndex].count = count;

    return cart;
  }

  deleteProductFromCart(id: UUID, productId: UUID) {
    const cart = this.findById(id) as ExternalCart;
    cart.items = cart.items.filter((i) => i.product.id !== productId);
    return cart;
  }

  #excludeSystemFields(cart: Cart) {
    const { isDeleted, ...rest } = cart;
    return rest;
  }
}
