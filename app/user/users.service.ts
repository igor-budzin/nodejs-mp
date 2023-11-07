import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { EntityAlreadyExist } from '../exceptions/EntityAlreadyExist';
import { NotFoundError } from '../exceptions/NotFound';
import { SignUpDto } from './signUp.dto';
import { UsersRepository } from './users.repository';
import { InternalServerError } from '../exceptions/InternalServerError';
import { SignInDto } from './signIn.dto';
import { InvalidCredentials } from '../exceptions/InvalidCredentials';
import { UserRole } from './userRoles';

export class UsersService {
  #repository: UsersRepository;

  constructor(repository: UsersRepository) {
    this.#repository = repository;
  }

  async findOne(id: UUID) {
    const user = await this.#repository.findOne(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async signUp(dto: SignUpDto) {
    const user = await this.#repository.findOneByEmail(dto.email);

    if (user) {
      throw new EntityAlreadyExist('User already exist. Please Login');
    }

    try {

      const saltLength = 10;
      const encryptedPassword = await bcrypt.hash(dto.password, saltLength);

      await this.#repository.create({
        email: dto.email,
        password: encryptedPassword,
      });
    }
    catch (err) {
      throw new InternalServerError();
    }
  }

  async signIn(dto: SignInDto) {
    const user = await this.#repository.findOneByEmail(dto.email);

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new InvalidCredentials();
    }

    const tokenPayload = {
      user_id: user._id,
      email: user.email,
      role: user?.role ?? UserRole.USER
    };

    const token = jwt.sign(tokenPayload, process.env.TOKEN_KEY!, {
      expiresIn: process.env.TOKEN_EXPIRES_IN!,
    });

    return { token };
  }
}