import { NextFunction, Request, Response } from 'express';
import { HttpStatuses } from './httpStatuses';
import { NotFoundError } from '../exceptions/NotFound';
import { ValidationError } from '../exceptions/ValidationError';
import { InternalServerError } from '../exceptions/InternalServerError';
import { EntityAlreadyExist } from '../exceptions/EntityAlreadyExist';
import { InvalidCredentials } from '../exceptions/InvalidCredentials';

const errorsMap = [
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
    statusCode: HttpStatuses.BAD_REQUEST
  }
] as const;

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const defaultMessage = 'Something went wrong';
  const errorDescription = errorsMap.find((e) => err instanceof e.exception);

  if (!errorDescription) {
    res
      .status(HttpStatuses.INTERNAL_SERVER_ERROR)
      .json({ data: null, error: defaultMessage });

    console.error(err);
    return;
  }

  const message = err?.message ?? defaultMessage;

  res
    .status(errorDescription.statusCode)
    .json({ data: null, error: message });
};

export const errorCatcher = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise
        .resolve(fn(req, res, next))
        .catch(next);
  };
}
