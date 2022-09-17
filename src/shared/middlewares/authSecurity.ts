import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../../errors/AppError';
import auth from '../../settings/auth';

export function authSecurity(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError('Token not found!', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: id } = verify(token, auth.secret) as { sub: string };

    req.user = {
      id,
    };

    next();
  } catch (error) {
    throw new AppError('Invalid Token', 401);
  }
}
