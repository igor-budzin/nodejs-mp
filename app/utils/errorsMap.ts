import { HttpStatuses } from './httpStatuses';
import { NotFoundError } from '../exceptions/NotFound';
import { ValidationError } from '../exceptions/ValidationError';
import { InternalServerError } from '../exceptions/InternalServerError';
import { EntityAlreadyExist } from '../exceptions/EntityAlreadyExist';
import { InvalidCredentials } from '../exceptions/InvalidCredentials';
import { InvalidToken } from '../exceptions/InvalidToken';
import { UnauthorizedError } from '../exceptions/Unauthorized';

export const errorsMap = [
  {
    exception: NotFoundError,
    statusCode: HttpStatuses.NOT_FOUND
  },
  {
    exception: ValidationError,
    statusCode: HttpStatuses.BAD_REQUEST
  },
  {
    exception: InternalServerError,
    statusCode: HttpStatuses.INTERNAL_SERVER_ERROR
  },
  {
    exception: EntityAlreadyExist,
    statusCode: HttpStatuses.CONFLICT
  },
  {
    exception: InvalidCredentials,
    statusCode: HttpStatuses.BAD_REQUEST,
  },
  {
    exception: InvalidToken,
    statusCode: HttpStatuses.UNAUTHORIZED
  },
  {
    exception: UnauthorizedError,
    statusCode: HttpStatuses.UNAUTHORIZED
  }
] as const;
