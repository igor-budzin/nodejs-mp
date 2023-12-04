import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const requestId = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.headers['X-Request-ID'];

  if (typeof id === 'string') {
    req.id = id;
  }

  req.id = uuidv4();

  return next();
};
