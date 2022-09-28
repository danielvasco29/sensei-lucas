import { BookstoreEntity } from '../database/entities/BookstoreEntity';
import { BookstoreRepository } from '../database/repositories/BookstoreRepository';
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
    if (!nameAlreadyExists) {
      throw new AppError('Bookstore not exists', 404);
    }

    const updatedBookstore = await bookstoreRepository.update({
      id,
      bookstoreData,
    });

    return updatedBookstore;
  }
}

export { UpdateBookstoreService };
