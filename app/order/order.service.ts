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

  create(userId: UUID) {
    const cartMeta = this.cartService.findOne(userId);
    // TODO: fix
    return this.orderRepository.create(cartMeta as any);
  }
}