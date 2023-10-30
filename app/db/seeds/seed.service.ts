import { DataSource } from 'typeorm';
import { Product } from '../../products/product.entity';
import { User } from '../../user/user.entity';
import products from './data/products.json';
import users from './data/users.json';

export class SeedService {
  dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async run() {
    const productRepository = this.dataSource.getRepository(Product);
    const userRepository = this.dataSource.getRepository(User);

    const productsCount = await productRepository.count();
    const usersCount = await userRepository.count();

    if (productsCount === 0) {
      await this.dataSource.getRepository(Product).insert(products);
    }

    if (usersCount === 0) {
      await this.dataSource.getRepository(User).insert(users);
    }
  }
}