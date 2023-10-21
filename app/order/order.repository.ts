import { CartMeta } from '../cart/cart';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { ORDER_STATUS } from './order';

export class OrderRepository {
  #repository: Repository<Order>;

  constructor(repository: Repository<Order>) {
    this.#repository = repository;
  }

  create(cartMeta: CartMeta) {
    return this.#repository.save({
      comments: "test comment",
      items: cartMeta.cart.items,
      total: cartMeta.total,
      status: ORDER_STATUS.CREATED,
      userId: cartMeta.cart.userId
    });
  }
}