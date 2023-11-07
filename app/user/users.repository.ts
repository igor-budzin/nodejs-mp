import { UserType } from './user.entity';
import { Model } from 'mongoose';

interface CreateUser {
  email: string;
  password: string;
}

export class UsersRepository {
  #repository: Model<UserType>;

  constructor(repository: Model<UserType>) {
    this.#repository = repository;
  }

  findOne(id: UUID) {
    return this.#repository.findById(id);
  }

  findOneByEmail(email: string) {
    return this.#repository.findOne()
      .where({ email })
      .exec();
  }

  create({ email, password }: CreateUser) {
    return this.#repository.create({
      email,
      password
    });
  }
}
