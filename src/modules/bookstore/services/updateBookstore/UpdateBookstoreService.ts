import { BookstoreEntity } from '../../../../database/entities/BookstoreEntity';
import { BookstoreRepository } from '../../../../database/repositories/BookstoreRepository';
import { UsersRepository } from '../../../../database/repositories/UsersRepository';
import { AppError } from '../../../../errors/AppError';

type UpdateBookstoreDTO = {
  id: string;
  data: Partial<BookstoreEntity>;
  bookstoreId: string
};

class UpdateBookstoreService {
  async execute({
    id, data, bookstoreId
  }: UpdateBookstoreDTO): Promise<BookstoreEntity> {
    
    // valida se id que está logado no insomnia é ou não Admin 
    const usersRepository = new UsersRepository();
    const userAlreadExists = await usersRepository.findByID({ id });
    if (userAlreadExists.isAdmin === false) throw new AppError('User not is Admin', 404);
    
    // metodo pega o bookstoreId passado no insomnia, e envia para o controller
    const bookstoreRepository = new BookstoreRepository();
    const nameAlreadyExists = await bookstoreRepository.findByID3({ bookstoreId });
    if (!nameAlreadyExists) throw new AppError('Bookstore not exists', 404);
    
    // data: envia o data para o body controller
    // bookstoreId: envia o bookstoreId para o headers controller 
    const updatedBookstore = await bookstoreRepository.update({
      data, bookstoreId
    });
    if (!updatedBookstore) throw new AppError('Bookstore update failed', 404);
    
    return updatedBookstore;
  }
}

export { UpdateBookstoreService };
