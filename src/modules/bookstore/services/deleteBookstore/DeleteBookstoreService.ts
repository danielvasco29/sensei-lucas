import { UserEntity } from "../../../../database/entities/UserEntity";
import { BookstoreRepository } from "../../../../database/repositories/BookstoreRepository";
import { UsersRepository } from "../../../../database/repositories/UsersRepository";
import { AppError } from "../../../../errors/AppError";


type DeletebookstoreDTO = {
  id?: string;
  userData?: Partial<UserEntity>;
  name?: string;
  bookstoreData?: string;
};

class DeleteBookstoreService {
  async execute({ bookstoreData, id }: DeletebookstoreDTO): Promise<void> {
    const usersRepository = new UsersRepository();
    const userAlreadExists = await usersRepository.findByID({ id });
    if (userAlreadExists.isAdmin === false) {
      throw new AppError('User not is Admin', 404);
    }

    const bookstoreRepository = new BookstoreRepository();

    const bookstoreExists = bookstoreRepository.findByID2({ bookstoreData });
    
    if(!bookstoreExists) throw new AppError('Book dont exists', 404)

    await bookstoreRepository.delete({ bookstoreData });
  }
}

export { DeleteBookstoreService };
