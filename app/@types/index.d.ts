declare type UUID = string;

declare namespace Express {
  export interface Request {
    user: import('../middlewares/auth.middleware').CurrentUser;
  }
}
