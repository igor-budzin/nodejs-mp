import { NotFoundError } from '../exceptions/NotFound';
import { ProductsRepository } from './products.repository';

export class ProductsService {
  repository: ProductsRepository;

  constructor(repository: ProductsRepository) {
    this.repository = repository;
  }

  findMany() {
    return this.repository.findMany();
  }

  findOne(id: UUID) {
    const product = this.repository.findOne(id);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product;
  }
}