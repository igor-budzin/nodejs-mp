import { UserType } from './user.entity';
import { Model } from 'mongoose';

export class UsersRepository {
  #repository: Model<UserType>;

  constructor(repository: Model<UserType>) {
    this.#repository = repository;
  }

  findOne(id: UUID) {
    return this.#repository.findById(id);
  }
}
