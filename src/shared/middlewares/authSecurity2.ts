import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { Tokens2Repository } from '../../database/repositories/Tokens2Repository';
import { AppError } from '../../errors/AppError';
import auth from '../../settings/auth';

export async function authSecurity2(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const tokens2Repository = new Tokens2Repository();

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError('Token not found!', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: id } = verify(token, auth.secret) as { sub: string };
    const { token: tokenDB } = await tokens2Repository.findByBookstoreId({
      bookstoreId: id,
    });

    if (token !== tokenDB) {
      throw new Error();
    }

    req.bookstore = {
      id,
    };

    next();
  } catch (error) {
    throw new AppError('Invalid Token', 401);
  }
}
