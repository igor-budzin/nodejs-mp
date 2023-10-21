import { Repository, getManager } from 'typeorm';
import { Product } from './product.entity';
import { AppDataSource } from '../db/data-source';

export class ProductsRepository {
  #repository: Repository<Product>;

  constructor(repository: Repository<Product>) {
    this.#repository = repository;
  }

  findMany() {
    return this.#repository.find();
  }

  findOne(id: UUID) {
    return this.#repository.findOne({ where: { id } });
  }
}