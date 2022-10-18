import { UserEntity } from "../../../../database/entities/UserEntity";
import { BookstoreRepository } from "../../../../database/repositories/BookstoreRepository";
import { UsersRepository } from "../../../../database/repositories/UsersRepository";
import { AppError } from "../../../../errors/AppError";


type DeletebookstoreDTO = {
  id: string;
  bookstoreId: string;
};

class DeleteBookstoreService {
  async execute({ bookstoreId, id }: DeletebookstoreDTO): Promise<void> {
    const usersRepository = new UsersRepository();
    
    const userAlreadExists = await usersRepository.findByID({ id });
    if (userAlreadExists.isAdmin === false) {
      throw new AppError('User not is Admin', 404);
    }

    const bookstoreRepository = new BookstoreRepository();

    const bookstoreExists = await bookstoreRepository.findByID2({ bookstoreId });
    if(!bookstoreExists) {
      throw new AppError('Bookstore dont exists', 404)
    }

    await bookstoreRepository.delete({ bookstoreId });
  }
}

export { DeleteBookstoreService };
