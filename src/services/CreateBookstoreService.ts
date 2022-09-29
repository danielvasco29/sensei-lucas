import { BookstoreEntity } from '../database/entities/BookstoreEntity';
import { BookstoreRepository } from '../database/repositories/BookstoreRepository';
import { FindByAdminRepository } from '../database/repositories/FindByAdminRepository';
import { AppError } from '../errors/AppError';

type BookstoreDataDTO = {
  bookstoreData: BookstoreEntity;
  isAdmin?: boolean;
  name?: string;
};

class CreateBookstoreService {
  async execute({
    bookstoreData,
    isAdmin,
  }: BookstoreDataDTO): Promise<BookstoreEntity> {
    const findByAdminRepository = new FindByAdminRepository();
    const admin = await findByAdminRepository.findByAdmin({ isAdmin });
    if (!admin) {
      throw new AppError('User is not admin', 404);
    }

    const { name } = bookstoreData;
    const bookstoreRepository = new BookstoreRepository();
    const bookstoreAlreadyExists = await bookstoreRepository.findByName({
      name,
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
