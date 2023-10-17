import { CartRepository } from './cart/cart.repository';
import { CartService } from './cart/cart.service';
import { OrderRepository } from './order/order.repository';
import { OrderService } from './order/order.service';
import { ProductsRepository } from './products/products.repository';
import { ProductsService } from './products/products.service';

const productRepository = new ProductsRepository();
const cartRepository = new CartRepository();
const orderRepository = new OrderRepository();

const productService = new ProductsService(productRepository);
const cartService = new CartService(cartRepository, productService);
const orderService = new OrderService(orderRepository, cartService);

export {
  productRepository,
  cartRepository,

  productService,
  cartService,
  orderService
}