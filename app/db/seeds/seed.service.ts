import bcrypt from 'bcryptjs';
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
      const saltLength = 10;
      const encryptedPassword = await bcrypt.hash(u.password, saltLength);

      const user = new UserModel({
        ...u,
        password: encryptedPassword
      });

      await user.save();
    });
  }
}