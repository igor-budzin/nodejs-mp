import products from './dataStub.json';
import { Product } from './product';

export class ProductsRepository {
  #products: Product[];

  constructor() {
    this.#products = products;
  }

  findMany() {
    return this.#products;
  }

  findOne(id: UUID) {
    return this.#products.find((p) => p.id === id);
  }
}