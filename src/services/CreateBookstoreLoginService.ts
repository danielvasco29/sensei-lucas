import { sign } from 'jsonwebtoken';

import { NewTokenDTO } from '../database/dtos/dtos';
import { BookstoreRepository } from '../database/repositories/BookstoreRepository';
import { FindByAdminRepository } from '../database/repositories/FindByAdminRepository';
import { TokensRepository } from '../database/repositories/TokensRepository';
import { AppError } from '../errors/AppError';
import auth from '../settings/auth';

type BookstoreDTO = {
  name: string;
  isAdmin?: boolean;
  tokenData: string;
};

class CreateBookstoreLoginService {
  async execute({ name, isAdmin, tokenData }: BookstoreDTO): Promise<NewTokenDTO> {
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

    const newToken = sign({ name }, secret, {
      subject: nameExists.id_bookstore,
      expiresIn: '1d',
    });

    const tokensRepository = new TokensRepository();
    const tokenConflict = await tokensRepository.findByBookstoreId({
      bookstoreId: nameExists.id_bookstore,
    });
    if (tokenConflict) {
      await tokensRepository.delete({ bookstoreId: nameExists.id_bookstore });
    }

    await tokensRepository.create({
      data: {
        id_bookstore: nameExists.id_bookstore,
        token: newToken,
      },
    });

    return { newToken };
  }
}

export { CreateBookstoreLoginService };
