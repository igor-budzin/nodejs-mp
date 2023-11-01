import { DataSource } from 'typeorm';
import { ProductModel } from '../../products/product.entity';
import { User } from '../../user/user.entity';
import products from './data/products.json';
import users from './data/users.json';


export class SeedService {
  async run() {
    products.map(async (p, index) => {
      const product = new ProductModel(p);
      await product.save();
    });
  }
}