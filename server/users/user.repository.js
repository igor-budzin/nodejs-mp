import { users } from './dataStub.js';
import { ValidationError } from '../exceptions/ValidationError.js'
import { EntityAlreadyExist } from '../exceptions/EntityAlreadyExist.js'
import { NotFoundError } from '../exceptions/NotFound.js'

const excludeHobbies = ({ hobbies, ...restData }) => {
  return restData;
};

export class UserRepository {
  constructor() {
    this.users = users;
  }

  #validateUserDto(dto) {
    return 'id' in dto
    && 'name' in dto
    && 'email' in dto;
  }

  #isExistUser(id) {
    return Boolean(this.findMany().find((u) => u.id === id));
  }

  findMany() {
    return this.users.map(excludeHobbies);
  }

  findOne(id) {
    const user = this.findMany().find((u) => u.id === id);

    if (!user) {
      throw new NotFoundError('User is not exist');
    }

    return user;
  }

  create(user) {
    if (!this.#validateUserDto(user)) {
      throw new ValidationError('Invalid user');
    }

    if (this.#isExistUser(user.id)) {
      throw new EntityAlreadyExist(`User with id "${user.id}" is already exist"`);
    }

    // Destructuring to avoid saving unnecessary properties
    const { name, email, id } = user;
    const newUser = { name, email, id };

    this.users.push(newUser);
    return newUser;
  }

  delete(id) {
    this.users = this.users.filter((u) => u.id !== id);
  }

  update(id, partialUser) {
    const index = this.users.findIndex((u) => u.id = id);

    this.users[index].name = partialUser?.name ?? this.users[index].name;
    this.users[index].email = partialUser?.email ?? this.users[index].email;

    return this.findOne(id);
  }
}