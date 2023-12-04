import { NextFunction, Request, Response } from 'express';
import { HttpStatuses } from './httpStatuses';
import { errorsMap } from './errorsMap';

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
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
