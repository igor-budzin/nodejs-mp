import { Repository } from 'typeorm';
import { User } from './user.entity';

export class UsersRepository {
  #repository: Repository<User>;

  constructor(repository: Repository<User>) {
    this.#repository = repository;
  }

  findOne(id: UUID) {
    return this.#repository.findOne({ where: { id } });
  }
}
