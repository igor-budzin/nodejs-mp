import { Cart } from './cart/cart.entity';
import { CartRepository } from './cart/cart.repository';
import { CartService } from './cart/cart.service';
import { CartItem } from './cart/cartItem.entity';
import { AppDataSource } from './db/data-source';
import { OrderRepository } from './order/order.repository';
import { OrderService } from './order/order.service';
import { Product } from './products/product.entity';
import { ProductsRepository } from './products/products.repository';
import { ProductsService } from './products/products.service';
import { User } from './user/user.entity';
import { UsersRepository } from './user/users.repository';
import { UsersService } from './user/users.service';

const productRepository = new ProductsRepository(AppDataSource.getRepository(Product));
const cartRepository = new CartRepository(
  AppDataSource.getRepository(Cart),
  AppDataSource.getRepository(CartItem)
);
const orderRepository = new OrderRepository();
const userRepository = new UsersRepository(AppDataSource.getRepository(User));

const productService = new ProductsService(productRepository);
const cartService = new CartService(cartRepository, productService);
const orderService = new OrderService(orderRepository, cartService);
const userService = new UsersService(userRepository);

export {
  productRepository,
  cartRepository,
  userRepository,

  productService,
  cartService,
  orderService,
  userService
}