import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { TokensRepository } from '../../database/repositories/TokensRepository';
import { AppError } from '../../errors/AppError';
import auth from '../../settings/auth';

export async function authSecurity(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const tokensRepository = new TokensRepository();

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError('Token not found!', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: id } = verify(token, auth.secret) as { sub: string };
    const { token: tokenDB } = await tokensRepository.findByUserId({
      userId: id,
    });

    if (token !== tokenDB) {
      throw Error();
    }

    req.user = {
      id,
    };

    next();
  } catch (error) {
    throw new AppError('Invalid Token', 401);
  }
}
