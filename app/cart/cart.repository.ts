import { Model } from 'mongoose';
import { CartType } from './cart.entity';
import { ProductType } from '../products/product.entity';
import { CartItemType } from './cartItem.entity';

export class CartRepository {
  #cartRepository: Model<CartType>;
  #itemsRepository: Model<CartItemType>;

  constructor(
    cartRepository: Model<CartType>,
    cartItemRepository: Model<CartItemType>
  ) {
    this.#cartRepository = cartRepository;
    this.#itemsRepository = cartItemRepository;
  }

  async create(userId: UUID) {
    const { id } = await this.#cartRepository.create({
      user: userId,
      items: [],
    })

    return this.#cartRepository.findById(id).select('-isDeleted') as unknown as CartType;
  }

  find(userId: UUID) {
    return this.#cartRepository.findOne()
      .where({
        user: userId,
        isDeleted: false,
      })
      .select('-isDeleted')
      .populate<{ items: CartItemType[] }>('items')
      .exec();
  }

  findById(id: UUID) {
    return this.#cartRepository.findById(id)
      .populate<{ items: CartItemType[] }>('items')
      .exec();
  }

  isExist(userId: UUID) {
    return this.#cartRepository.count().where({ user: userId });
  }

  async delete(userId: UUID) {
    await this.#cartRepository.findOneAndUpdate({ user: userId }, { isDeleted: true });
  }

  async addProductToCart(id: UUID, product: ProductType, count: number) {
    const cartItem = await this.#itemsRepository.create({
      product: product,
      count
    });

    const cart = await this.#cartRepository.findByIdAndUpdate(id, {
      $push: {
        items: cartItem.id
      }
    });

    return this.find(cart!.user as unknown as string);
  }

  async updateProductInCart(id: UUID, product: ProductType, count: number) {
    const cart = await this.#cartRepository.findById(id).populate('items');
    const item = cart?.items.find((i: any) => i.product.toString() === (product as any).id);
    await this.#itemsRepository.findByIdAndUpdate(item!.id, {
      count
    });

    return this.find(cart!.user as unknown as string);
  }

  async deleteProductFromCart(id: UUID, productId: UUID) {
    const cart = await this.#cartRepository.findById(id).populate('items');
    const item = cart?.items.find((i: any) => i.product.toString() === productId);

    if (!item) {
      return;
    }

    await this.#itemsRepository.findByIdAndDelete(item.id);
    return this.find(cart!.user as unknown as string);
  }
}
