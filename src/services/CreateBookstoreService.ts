import { BookstoreEntity } from '../database/entities/BookstoreEntity';
import { UserEntity } from '../database/entities/UserEntity';
import { BookstoreRepository } from '../database/repositories/BookstoreRepository';
import { AppError } from '../errors/AppError';

type BookstoreDataDTO = {
  bookstoreData: BookstoreEntity;
};

class CreateBookstoreService {
  async execute({ bookstoreData }: BookstoreDataDTO): Promise<BookstoreEntity> {
    /* const userAdmin = userData;
    if (!userAdmin === false) {
      throw new AppError('user is not admin');
    } */

    const bookstoreRepository = new BookstoreRepository();

    const newBookstore = await bookstoreRepository.create({
      bookstoreData,
    });

    return newBookstore;
  }
}

export { CreateBookstoreService };
