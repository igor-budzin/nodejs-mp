import { NotFoundError } from '../exceptions/NotFound';
import { UsersRepository } from './users.repository';

export class UsersService {
  repository: UsersRepository;

  constructor(repository: UsersRepository) {
    this.repository = repository;
  }

  findOne(id: UUID) {
    const user = this.repository.findOne(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }
}