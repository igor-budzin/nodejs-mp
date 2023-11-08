import { UserType } from './user.entity';
import { Model } from 'mongoose';
import { UserRole } from './userRoles';

interface CreateUser {
  email: string;
  password: string;
  role?: UserRole;
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

  create({ email, password, role }: CreateUser) {
    return this.#repository.create({
      email,
      password,
      role: role ?? UserRole.USER
    });
  }
}
