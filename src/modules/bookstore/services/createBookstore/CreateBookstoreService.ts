import { BookstoreEntity } from '../../../../database/entities/BookstoreEntity';
import { BookstoreRepository } from '../../../../database/repositories/BookstoreRepository';
import { UsersRepository } from '../../../../database/repositories/UsersRepository';
import { AppError } from '../../../../errors/AppError';

type BookstoreDataDTO = {
  bookstoreData: BookstoreEntity;
  admin?: boolean | undefined;
  id?: string;
};

class CreateBookstoreService {
  async execute({
    bookstoreData,
    id,
  }: BookstoreDataDTO) {
    const usersRepository = new UsersRepository()
    const findAdmin = await usersRepository.findByID({ id })
    if(findAdmin.isAdmin === false) {
      throw new AppError('User is not admin!', 404)
    }

    const bookstoreRepository = new BookstoreRepository();
    const bookstoreAlreadyExists = await bookstoreRepository.findByName({
      bookstoreData,
    });
    if (bookstoreAlreadyExists) {
      throw new AppError('Bookstore Already Exists!', 404);
    }

    const newBookstore = await bookstoreRepository.create({
      bookstoreData,
    });

    return newBookstore;
  }
}

export { CreateBookstoreService };
