import { JwtPayload } from 'common/types/jwt-payload';
import * as express from 'express';
import { User } from './user.type';

declare global {
  namespace Express {
    interface Request {
      user: null | JwtPayload<User>;
    }
  }
}
