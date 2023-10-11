import { ProductsRepository } from '../products/products.repository';
import { ProductsService } from '../products/products.service';
import { CartRepository } from './cart.repository';
import { UpdateCartDto } from './updateCart.dto';

export class CartService {
  cartRepository: CartRepository;
  // productRepository: ProductsRepository;
  productService: ProductsService;

  constructor(
    cartRepository: CartRepository,
    productService: ProductsService
  ) {
    this.cartRepository = cartRepository;
    this.productService = productService;
  }

  findOne(userId: UUID) {
    const cart = this.cartRepository.find(userId);

    if (cart) {
      return cart;
    }

    return this.create(userId);
  }

  create(userId: UUID) {
    return this.cartRepository.create(userId);
  }

  delete(userId: UUID) {
    return this.cartRepository.delete(userId);
  }

  update(userId: UUID, dto: UpdateCartDto) {
    const cart = this.findOne(userId);
    const product = this.productService.findOne(dto.productId);

    const isProductExistInCart = cart.items.some((p) => p.product.id === dto.productId);

    // console.log(cart)

    if (!isProductExistInCart) {
      if (dto.count > 0) {
        return this.cartRepository.addProductToCart(cart.id, product, dto.count);
      }
      else {
        return cart;
      }
    }

    if (dto.count === 0) {
      return this.cartRepository.deleteProductFromCart(cart.id, product.id);
    }

    return this.cartRepository.updateProductInCart(cart.id, product, dto.count)
  }
}
