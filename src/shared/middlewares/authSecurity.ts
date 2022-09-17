import { NextFunction, request } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../../errors/AppError';

export async function authSecurity(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('Token not found!', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: id } = verify(token, secret) as { sub: string };

    request.user = {
      id,
    };

    next();
  } catch (error) {
    throw new AppError('Invalid Token', 401);
  }
}
