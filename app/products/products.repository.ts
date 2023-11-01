import { Repository, getManager } from 'typeorm';
import {  ProductType } from './product.entity';
import mongoose, { Model } from 'mongoose';

export class ProductsRepository {
  #repository: Model<ProductType>;

  constructor(repository: Model<ProductType>) {
    this.#repository = repository;
  }

  findMany() {
    return this.#repository.find();
  }

  findOne(id: UUID) {
    return this.#repository.findById(id);
  }
}