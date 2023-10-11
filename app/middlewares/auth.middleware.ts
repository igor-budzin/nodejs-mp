import { NextFunction, Request, Response } from 'express';
import { UsersRepository } from '../user/users.repository';
import { UsersService } from '../user/users.service';
import { HttpStatuses } from '../utils/httpStatuses';
import { NotFoundError } from '../exceptions/NotFound';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers['x-user-id'];

  if (!userId) {
    res
      .status(HttpStatuses.FORBIDDEN)
      .json({
        data: null,
        error: {
          message: "You must be authorized user"
        }
      });

    return;
  }

  const repository = new UsersRepository();
  const service = new UsersService(repository);

  try {
    service.findOne(userId as UUID);
    next();
  }
  catch (err) {
    if (err instanceof NotFoundError) {
      res.status(HttpStatuses.UNAUTHORIZED);
      res.json({
        data: null,
        error: {
          message: "User is not authorized"
        }
      });
    }
  }
};
