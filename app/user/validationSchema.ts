import Joi from 'joi';
import { SignUpDto } from './signUp.dto';
import { SignInDto } from './signIn.dto';

export const signUpValidationSchema = Joi.object<SignUpDto>({
  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .required(),
})
  .required();

export const signInValidationSchema = Joi.object<SignInDto>({
  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .required(),
})
  .required()
