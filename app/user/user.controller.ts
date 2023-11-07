import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { signInValidationSchema, signUpValidationSchema } from './validationSchema';
import { ValidationError } from '../exceptions/ValidationError';

export class UserController {
  #usersService: UsersService;

  constructor(usersService: UsersService) {
    this.#usersService = usersService;
  }

  async signUp(req: Request, res: Response) {
    const params = req.body;
    const { error, value } = signUpValidationSchema.validate(params);

    if (error) {
      throw new ValidationError(error.message);
    }

    await this.#usersService.signUp(value);

    res.json({
      data: 'User successfully registered',
      error: null
    });
  }

  async signIn(req: Request, res: Response) {
    const params = req.body;
    const { error, value } = signInValidationSchema.validate(params);

    if (error) {
      throw new ValidationError(error.message);
    }

    const data = await this.#usersService.signIn(value);

    res.json({
      data,
      error: null
    });
  }
}