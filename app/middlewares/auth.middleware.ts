import { NextFunction, Request, Response } from 'express';
import { HttpStatuses } from '../utils/httpStatuses';
import { NotFoundError } from '../exceptions/NotFound';
import { userService } from '../dependencies.container';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
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

  try {
    await userService.findOne(userId as UUID);
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
