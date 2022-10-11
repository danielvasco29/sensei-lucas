import { BookstoreEntity } from '../../../../database/entities/BookstoreEntity';
import { BookstoreRepository } from '../../../../database/repositories/BookstoreRepository';
import { UsersRepository } from '../../../../database/repositories/UsersRepository';
import { AppError } from '../../../../errors/AppError';

type UpdateBookstoreDTO = {
  id?: string;
  data: Partial<BookstoreEntity>;
  bookstoreData: string;
};

class UpdateBookstoreService {
  async execute({
    id, bookstoreData, data,
  }: UpdateBookstoreDTO): Promise<BookstoreEntity> {
    const usersRepository = new UsersRepository();

    // valida id recebido se é ou não Admin
    const userAlreadExists = await usersRepository.findByID({ id });
    if (userAlreadExists.isAdmin === false) {
      throw new AppError('User not is Admin', 404);
    }
    
    const bookstoreRepository = new BookstoreRepository();

   /*  const nameAlreadyExists = await bookstoreRepository.findByID({ id });
    if (!nameAlreadyExists) {
      throw new AppError('Bookstore not exists', 404);
    } */

    const updatedBookstore = await bookstoreRepository.update({
      data, bookstoreData
    });

    if (!updatedBookstore) {
      throw new AppError('Bookstore update failed', 404);
    }

    return updatedBookstore;
  }
}

export { UpdateBookstoreService };
