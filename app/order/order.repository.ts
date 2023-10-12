import { v4 as generateUuid } from 'uuid';
import { CartMeta } from '../cart/cart';
import { Order } from './order';

export class OrderRepository {
  #orders: Order[];

  constructor() {
    this.#orders = [];
  }

  create(cartMeta: CartMeta) {
    const order: Order = {
      id: generateUuid(),
      userId: cartMeta.cart.userId,
      cartId: cartMeta.cart.id,
      items: [...cartMeta.cart.items],
      payment: {
        type: 'paypal',
        address: 'London',
        creditCard: '1234-1234-1234-1234'
      },
      delivery: {
        type: 'post',
        address: 'London'
      },
      comments: '',
      status: "created",
      total: cartMeta.total
    };

    this.#orders.push(order);

    return order;
  }
}