import bcrypt from 'bcryptjs';
import { ProductModel } from '../../products/product.entity';
import { UserModel } from '../../user/user.entity';
import products from './data/products.json';
import users from './data/users.json';

export class SeedService {
  async run() {
    const promises: Promise<any>[] = [];

    products.forEach(async (p) => {
      const product = new ProductModel(p);
      promises.push(product.save());
    });

    users.forEach(async (u) => {
      const saltLength = 10;
      const encryptedPassword = await bcrypt.hash(u.password, saltLength);

      const user = new UserModel({
        ...u,
        password: encryptedPassword
      });

      promises.push(user.save());
    });

    return Promise.all(promises);
  }
}