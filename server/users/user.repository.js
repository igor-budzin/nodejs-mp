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

  /**
   * @param {object} dto
   * @returns {boolean}
   */
  #validateUserDto(dto) {
    return 'id' in dto
    && 'name' in dto
    && 'email' in dto;
  }

  /**
   * @param {number} id
   * @returns {boolean}
   */
  #isExistUser(id) {
    return Boolean(this.findMany().find((u) => u.id === id));
  }

  /**
   * @returns {object[]}
   */
  findMany() {
    return this.users.map(excludeHobbies);
  }

  /**
   * @param {number} id
   * @returns {object}
   */
  findOne(id) {
    const user = this.findMany().find((u) => u.id === id);

    if (!user) {
      throw new NotFoundError('User is not exist');
    }

    return user;
  }

  /**
   * @param {object} user
   * @returns {object}
   */
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

  /**
   * @param {number} id
   */
  delete(id) {
    this.users = this.users.filter((u) => u.id !== id);
  }

  /**
   * @param {number} id
   * @param {object} partialUser
   * @returns {object}
   */
  update(id, partialUser) {
    const index = this.users.findIndex((u) => u.id = id);

    if (index === -1) {
      throw new NotFoundError('User is not exist');
    }

    this.users[index].name = partialUser?.name ?? this.users[index].name;
    this.users[index].email = partialUser?.email ?? this.users[index].email;

    return this.findOne(id);
  }

  /**
   * @param {number} userId
   * @returns {string[]}
   */
  getHobbies(userId) {
    const user = this.users.find((u) => u.id === userId);

    if (!user) {
      throw new NotFoundError('User is not exist');
    }

    return user.hobbies;
  }

  /**
   * @param {number} userId
   * @param {string[]} hobbies
   * @returns {string[]}
   */
  addHobby(userId, hobbies) {
    const index = this.users.findIndex((u) => u.id = userId);

    if (index === -1) {
      throw new NotFoundError('User is not exist');
    }

    this.users[index].hobbies = [...this.users[index].hobbies, ...hobbies];

    return this.users[index].hobbies;
  }

  /**
   * @param {number} userId
   * @param {string[]} hobbies
   * @returns {string[]}
   */
  deleteHobby(userId, hobbies) {
    const index = this.users.findIndex((u) => u.id = userId);

    if (index === -1) {
      throw new NotFoundError('User is not exist');
    }

    this.users[index].hobbies = this.users[index].hobbies.filter((h) => !hobbies.includes(h));

    return this.users[index].hobbies;
  }
}