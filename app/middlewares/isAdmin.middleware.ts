import { Request, Response, NextFunction } from "express";
import { UserRole } from '../user/userRoles';
import { Forbidden } from '../exceptions/Forbidden';

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  const currentUser = req.user;

  if (currentUser.role !== UserRole.ADMIN) {
    return next(new Forbidden('Only admin has access'));
  }

  next();
}
