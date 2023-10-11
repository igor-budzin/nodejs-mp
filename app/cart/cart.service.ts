import { ProductsService } from '../products/products.service';
import { Cart, ExternalCart } from './cart';
import { CartRepository } from './cart.repository';
import { UpdateCartDto } from './updateCart.dto';

export class CartService {
  cartRepository: CartRepository;
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
      return this.#withTotal(cart);
    }

    return this.create(userId);
  }

  create(userId: UUID) {
    return this.#withTotal(
      this.cartRepository.create(userId)
    );
  }

  delete(userId: UUID) {
    this.cartRepository.delete(userId);
  }

  update(userId: UUID, dto: UpdateCartDto) {
    const { cart } = this.findOne(userId);
    const product = this.productService.findOne(dto.productId);

    const isProductExistInCart = cart.items.some((p) => p.product.id === dto.productId);

    if (!isProductExistInCart) {
      if (dto.count > 0) {
        return this.#withTotal(
          this.cartRepository.addProductToCart(cart.id, product, dto.count)
        );
      }
      else {
        return this.#withTotal(cart);
      }
    }

    if (dto.count === 0) {
      return this.#withTotal(
        this.cartRepository.deleteProductFromCart(cart.id, product.id)
      );
    }

    return this.#withTotal(
      this.cartRepository.updateProductInCart(cart.id, product, dto.count)
    );
  }

  #withTotal(cart: ExternalCart) {
    const total = cart.items.reduce((accum, value) => {
      return accum + (value.product.price * value.count);
    }, 0);

    return {
      cart,
      total,
    }
  }
}
