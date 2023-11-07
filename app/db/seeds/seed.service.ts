import { ProductModel } from '../../products/product.entity';
import { UserModel } from '../../user/user.entity';
import products from './data/products.json';
import users from './data/users.json';

export class SeedService {
  async run() {
    products.forEach(async (p) => {
      const product = new ProductModel(p);
      await product.save();
    });

    users.forEach(async (u) => {
      const user = new UserModel(u);
      await user.save();
    });
  }
}