import { NextFunction, Request, Response } from 'express';
import { HttpStatuses } from './httpStatuses';
import { NotFoundError } from '../exceptions/NotFound';

const errorsMap = [
  {
    exception: NotFoundError,
    statusCode: HttpStatuses.NOT_FOUND
  },
  // {
  //   exception: ValidationError,
  //   statusCode: HttpStatuses.BAD_REQUEST
  // },
  // {
  //   exception: EntityAlreadyExist,
  //   statusCode: HttpStatuses.CONFLICT
  // },
] as const;

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const errorDescription = errorsMap.find((e) => err instanceof e.exception);

  if (!errorDescription) {
    res
      .status(HttpStatuses.INTERNAL_SERVER_ERROR)
      .json({ data: null, error: 'Something went wrong' });

    console.error(err);
    return;
  }

  const message = err?.message ?? 'Something went wrong';

  res
    .status(errorDescription.statusCode)
    .json({ data: null, error: message });
};
