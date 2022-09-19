import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { NewTokenDTO, UserLoginDTO } from '../database/dtos/dtos';
import { TokensRepository } from '../database/repositories/TokensRepository';
import { UsersRepository } from '../database/repositories/UsersRepository';
import { AppError } from '../errors/AppError';
import auth from '../settings/auth';

class UserLoginService {
  async execute({ email, password }: UserLoginDTO): Promise<NewTokenDTO> {
    const { secret } = auth;

    const usersRepository = new UsersRepository();

    const userAlreadyExists = await usersRepository.findByEmail({ email });
    if (!userAlreadyExists) {
      throw new AppError('Incorretct Email or Password', 400);
    }

    const passwordMatch = await compare(password, userAlreadyExists.password);
    if (!passwordMatch) {
      throw new AppError('Incorretct Email or Password', 400);
    }

    const newToken = sign({ email }, secret, {
      subject: userAlreadyExists.id,
      expiresIn: '1d',
    });
    if (!newToken) {
      throw new AppError('login failed', 401);
    }

    const tokensRepository = new TokensRepository();

    const tokenConflict = await tokensRepository.findByUserId({
      userId: userAlreadyExists.id,
    });
    if (!tokenConflict) {
      await tokensRepository.delete({ userId: userAlreadyExists.id });
    }

    await tokensRepository.create({
      tokenData: {
        userId: userAlreadyExists.id,
        token: newToken,
      },
    });

    return { newToken };
  }
}

export { UserLoginService };
