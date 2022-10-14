import { BookEntity } from "../../../database/entities/BookEntity";
import { BookRepository } from "../../../database/repositories/BookRepository";
import { UsersRepository } from "../../../database/repositories/UsersRepository";
import { AppError } from "../../../errors/AppError";

type CreateBookDTO = {
    bookData: BookEntity;
    id: string;
}

class CreateBookService {
    async execute({ bookData, id }: CreateBookDTO): Promise<BookEntity> {

        const usersRepository = new UsersRepository();
        const verifyUserId = await usersRepository.findByID({ id })
        if(verifyUserId.isAdmin === false) throw new AppError('User not is admin!', 404)
        
        const bookRepository = new BookRepository();
        const verifyBookNameExists = await bookRepository.findByName({ bookData })
        if(verifyBookNameExists) throw new AppError('Name already exists', 404)

        const createBook = await bookRepository.create({ bookData });

        return createBook;

        
    }
}

 export { CreateBookService }