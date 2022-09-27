import { BookstoreEntity } from '../database/entities/BookstoreEntity';
import { UserEntity } from '../database/entities/UserEntity';
import { BookstoreRepository } from '../database/repositories/BookstoreRepository';
import { UsersRepository } from '../database/repositories/UsersRepository';
import { AppError } from '../errors/AppError';

type BookstoreDataDTO = {
  bookstoreData: BookstoreEntity;
  isAdmin: boolean;
};

class CreateBookstoreService {
  async execute({
    bookstoreData,
    isAdmin,
  }: BookstoreDataDTO): Promise<BookstoreEntity> {
    const usersRepository = new UsersRepository();

    const admin = await usersRepository.findByAdmin({ isAdmin });
    if (!admin) {
      throw new AppError('User is not admin', 404);
    }

    const bookstoreRepository = new BookstoreRepository();

    const newBookstore = await bookstoreRepository.create({
      bookstoreData,
    });

    return newBookstore;
  }
}

export { CreateBookstoreService };
