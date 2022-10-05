import { UserEntity } from '../../database/entities/UserEntity';
import { BookstoreRepository } from '../../database/repositories/BookstoreRepository';
import { UsersRepository } from '../../database/repositories/UsersRepository';
import { AppError } from '../../errors/AppError';

type DeletebookstoreDTO = {
  id?: string;
  userData?: Partial<UserEntity>;
  isAdmin?: boolean;
};

class DeleteBookstoreService {
  async execute({ id, userData, isAdmin }: DeletebookstoreDTO) {
    const usersRepository = new UsersRepository();
    const userAlreadExists = await usersRepository.findByID({ id });
    if (userAlreadExists.isAdmin === false) {
      throw new AppError('User not is Admin', 404);
    }

    const bookstoreRepository = new BookstoreRepository();
    await bookstoreRepository.delete({ id, userData });
  }
}

export { DeleteBookstoreService };
