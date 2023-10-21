import { ProductsService } from '../products/products.service';
import { Cart } from './cart.entity';
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

  async findOne(userId: UUID) {
    const cart = await this.cartRepository.find(userId);

    if (cart) {
      return this.#withTotal(cart);
    }

    return this.create(userId);
  }

  async create(userId: UUID) {
    return this.#withTotal(
      await this.cartRepository.create(userId)
    );
  }

  async delete(userId: UUID) {
    await this.cartRepository.delete(userId);
  }

  async update(userId: UUID, dto: UpdateCartDto) {
    const { cart } = await this.findOne(userId);
    const product = await this.productService.findOne(dto.productId);

    const isProductExistInCart = cart.items.some((p) => p.product.id === dto.productId);

    if (!isProductExistInCart) {
      if (dto.count > 0) {
        const updatedCart = await this.cartRepository
          .addProductToCart(cart.id, product, dto.count)
        return this.#withTotal(updatedCart!);
      }
      else {
        return this.#withTotal(cart);
      }
    }

    if (dto.count === 0) {
      const updatedCart = await this.cartRepository
        .deleteProductFromCart(cart.id, (product as any).id);

      return this.#withTotal(updatedCart!);
    }

    const updatedCart = await this.cartRepository
      .updateProductInCart(cart.id, product, dto.count);

    return this.#withTotal(updatedCart!);
  }

  #withTotal(cart: Cart) {
    const total = cart.items?.reduce((accum, value) => {
      return accum + (value.product.price * value.count);
    }, 0);

    return {
      cart,
      total,
    }
  }
}
