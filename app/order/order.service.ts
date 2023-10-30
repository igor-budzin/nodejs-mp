import { CartService } from '../cart/cart.service'
import { OrderRepository } from './order.repository';

export class OrderService {
  cartService: CartService;
  orderRepository: OrderRepository;

  constructor(
    orderRepository: OrderRepository,
    cartService: CartService
  ) {
    this.orderRepository = orderRepository;
    this.cartService = cartService;
  }

  async create(userId: UUID) {
    const cartMeta = await this.cartService.findOne(userId);
    return this.orderRepository.create(cartMeta);
  }
}