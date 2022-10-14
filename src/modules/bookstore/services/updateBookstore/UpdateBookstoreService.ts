import { BookstoreEntity } from '../../../../database/entities/BookstoreEntity';
import { BookstoreRepository } from '../../../../database/repositories/BookstoreRepository';
import { UsersRepository } from '../../../../database/repositories/UsersRepository';
import { AppError } from '../../../../errors/AppError';

type UpdateBookstoreDTO = {
  id?: string;
  data: Partial<BookstoreEntity>;
  bookstoreData: string;
  name?: string;
  bookstoreId?: string
  findbyName?: string;
};

class UpdateBookstoreService {
  async execute({
    id, bookstoreData, data, bookstoreId
  }: UpdateBookstoreDTO): Promise<BookstoreEntity> {
    const usersRepository = new UsersRepository();

    // valida id recebido se é ou não Admin
    const userAlreadExists = await usersRepository.findByID({ id });
    if (userAlreadExists.isAdmin === false) {
      throw new AppError('User not is Admin', 404);
    }
    
    const bookstoreRepository = new BookstoreRepository();

    const nameAlreadyExists = await bookstoreRepository.findByID2({ id: bookstoreId });
    console.log('bookstoreId', bookstoreId)
    console.log('nameAlreadyExists', nameAlreadyExists)
    if (!nameAlreadyExists) {
      throw new AppError('Bookstore not exists', 404);
    }

    const updatedBookstore = await bookstoreRepository.update({
      data, bookstoreData,
    });
    
    console.log('bookstoreData', bookstoreData)
    console.log('data', data)
    if (!updatedBookstore) {
      throw new AppError('Bookstore update failed', 404);
    }

    return updatedBookstore;
  }
}

export { UpdateBookstoreService };
