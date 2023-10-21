import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { CartItem } from './cartItem.entity';
import { Product } from '../products/product.entity';

export class CartRepository {
  #cartRepository: Repository<Cart>;
  #itemsRepository: Repository<CartItem>;

  constructor(
    cartRepository: Repository<Cart>,
    itemsRepository: Repository<CartItem>
  ) {
    this.#cartRepository = cartRepository;
    this.#itemsRepository = itemsRepository;
  }

  async create(userId: UUID) {
    await this.#cartRepository.insert({ userId });
    const cart = await this.find(userId) as Cart;
    return cart;
  }

  find(userId: UUID) {
    return this.#cartRepository.findOne({
      where: { userId },
      relations: ['items', 'items.product']
    });
  }

  findById(id: UUID) {
    return this.#cartRepository.findOne({
      where: { id },
      relations: ['items', 'items.product']
    });
    // return this.cartRepository.findOneBy({ id });
  }

  isExist(userId: UUID) {
    return this.#cartRepository.exist({ where: { userId } });
  }

  async delete(userId: UUID) {
    await this.#cartRepository.softDelete({ userId });
  }

  async addProductToCart(id: UUID, product: Product, count: number) {
    await this.#itemsRepository.insert({
      cartId: id,
      product,
      count
    });

    return this.findById(id);
  }

  async updateProductInCart(id: UUID, product: Product, count: number) {
    const item = await this.#itemsRepository.findOneBy({ cartId: id, product });

    await this.#itemsRepository.save({
      ...item,
      count
    });

    return this.findById(id);
  }

  async deleteProductFromCart(id: UUID, productId: UUID) {
    const cart = await this.findById(id);
    const cartItemId = cart?.items.find((i) => i.id === productId)?.id;

    if (!cartItemId) {
      return;
    }

    await this.#itemsRepository.delete({ id: cartItemId });
    return this.findById(id);
  }
}
