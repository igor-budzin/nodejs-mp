import { CartController } from './cart/cart.controller';
import { CartModel } from './cart/cart.entity';
import { CartItemModel } from './cart/cartItem.entity';
import { CartRepository } from './cart/cart.repository';
import { CartService } from './cart/cart.service';
import { OrderController } from './order/order.controller';
import { OrderModel } from './order/order.entity';
import { OrderRepository } from './order/order.repository';
import { OrderService } from './order/order.service';
import { ProductModel } from './products/product.entity';
import { ProductsController } from './products/products.controller';
import { ProductsRepository } from './products/products.repository';
import { ProductsService } from './products/products.service';
import { UserModel } from './user/user.entity';
import { UsersRepository } from './user/users.repository';
import { UsersService } from './user/users.service';
import { UserController } from './user/user.controller';

const productRepository = new ProductsRepository(ProductModel);
const cartRepository = new CartRepository(CartModel, CartItemModel);
const orderRepository = new OrderRepository(OrderModel);
const userRepository = new UsersRepository(UserModel);

const productService = new ProductsService(productRepository);
const cartService = new CartService(cartRepository, productService);
const orderService = new OrderService(orderRepository, cartService);
const userService = new UsersService(userRepository);

const productsController = new ProductsController(productService);
const cartController = new CartController(cartService);
const orderController = new OrderController(orderService);
const userController = new UserController(userService);

export {
  productRepository,
  cartRepository,
  userRepository,
  orderRepository,

  productService,
  cartService,
  orderService,
  userService,

  productsController,
  cartController,
  orderController,
  userController
}