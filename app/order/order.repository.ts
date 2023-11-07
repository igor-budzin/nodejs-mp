import { Model } from 'mongoose';
import { CartMeta } from '../cart/cart';
import { OrderType } from './order.entity';
import { ORDER_STATUS } from './order';

export class OrderRepository {
  #repository: Model<OrderType>;

  constructor(repository: Model<OrderType>) {
    this.#repository = repository;
  }

  create(cartMeta: CartMeta) {
    return this.#repository.create({
      comments: "test comment",
      items: cartMeta.cart.items,
      total: cartMeta.total,
      status: ORDER_STATUS.CREATED,
      userId: cartMeta.cart.user
    });
  }
}