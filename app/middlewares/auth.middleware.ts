import { NextFunction, Request, Response } from 'express';
import * as jwt from "jsonwebtoken";
import { InvalidToken } from '../exceptions/InvalidToken';
import { UnauthorizedError } from '../exceptions/Unauthorized';

export interface CurrentUser {
  id: string,
  email: string,
  role: string
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    next(new UnauthorizedError());
  }

  const tokenParts = authHeader?.split(' ');

  if (!tokenParts || tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return next(new InvalidToken());
  }

  try {
    const user = jwt.verify(tokenParts[1], process.env.TOKEN_KEY!) as CurrentUser;
    req.user = user;
    next();
  }
  catch (err) {
    return next(new InvalidToken());
  }
};
