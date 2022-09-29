import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { NewTokenDTO } from '../database/dtos/dtos';
import { BookstoreRepository } from '../database/repositories/BookstoreRepository';
import { FindByAdminRepository } from '../database/repositories/FindByAdminRepository';
import { TokensRepository } from '../database/repositories/TokensRepository';
import { AppError } from '../errors/AppError';
import auth from '../settings/auth';

type BookstoreDTO = {
  adress?: string;
  name: string;
  isAdmin?: boolean;
};

class CreateBookstoreLoginService {
  async execute({ name, adress, isAdmin }: BookstoreDTO): Promise<NewTokenDTO> {
    const { secret } = auth;
    const findByAdminRepository = new FindByAdminRepository();
    const adminExists = await findByAdminRepository.findByAdmin({ isAdmin });
    if (!adminExists) {
      throw new AppError('User is not admin!', 404);
    }

    const bookstoreRepository = new BookstoreRepository();
    const nameExists = await bookstoreRepository.findByName({ name });
    if (!nameExists) {
      throw new AppError('Bookstore not exists!', 404);
    }

    /*   const adressMatch = await compare(adress, nameExists.adress);
    console.log('adressMatch', adressMatch);
    if (!adressMatch) {
      throw new AppError('Incorrect');
    } */

    const newToken = sign({ name }, secret, {
      subject: nameExists.id,
      expiresIn: '1d',
    });
    console.log('newToken, ', newToken);
    if (!newToken) {
      throw new AppError('login failed, contact support', 401);
    }

    const tokensRepository = new TokensRepository();
    const tokenConflict = await tokensRepository.findByBookstoreId({
      bookstoreId: nameExists.id,
    });
    console.log('tokenConflict', tokenConflict);
    if (tokenConflict) {
      await tokensRepository.delete({ bookstoreId: nameExists.id });
    }

    await tokensRepository.create2({
      tokenData: {
        bookstoreId: nameExists.id,
        token: newToken,
      },
    });

    return { newToken };
  }
}

export { CreateBookstoreLoginService };
