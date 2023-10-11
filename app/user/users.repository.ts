import users from './dataStub.json';
import { User } from './user';

export class UsersRepository {
  #users: User[];

  constructor() {
    this.#users = users;
  }

  findOne(id: UUID) {
    return this.#users.find((u) => u.id === id);
  }
}
