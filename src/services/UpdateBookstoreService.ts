import { BookstoreEntity } from '../database/entities/BookstoreEntity';
import { BookstoreRepository } from '../database/repositories/BookstoreRepository';
import { UsersRepository } from '../database/repositories/UsersRepository';
import { AppError } from '../errors/AppError';

type UpdateBookstoreDTO = {
  id: string;
  bookstoreData: Partial<BookstoreEntity>;
};

class UpdateBookstoreService {
  async execute({
    id,
    bookstoreData,
  }: UpdateBookstoreDTO): Promise<BookstoreEntity> {
    const bookstoreRepository = new BookstoreRepository();

    const nameAlreadyExists = await bookstoreRepository.findByID({ id });
    console.log('nameAlreadyExists', nameAlreadyExists);
    if (!nameAlreadyExists) {
      throw new AppError('Bookstore not exists', 404);
    }

    const updatedBookstore = await bookstoreRepository.update({
      id,
      bookstoreData,
    });

    if (!updatedBookstore) {
      throw new AppError('Bookstore update failed', 404);
    }

    return updatedBookstore;
  }
}

export { UpdateBookstoreService };
