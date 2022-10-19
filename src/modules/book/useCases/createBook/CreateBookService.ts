import { BookEntity } from "../../infra/entities/BookEntity";
import { BookRepository } from "../../infra/repositories/BookRepository";
import { UsersRepository } from "../../../../database/repositories/UsersRepository";
import { AppError } from "../../../../errors/AppError";
import { CreateBookDTO } from "../../@types/CreateBookDTO";

class CreateBookService {
    /* 
        * 1- faz uma comparação do id passado
        * 2- faz uma comparação do name passado no body, com o name salvo no banco
    */
    async execute({ bookData, userId, bookstoreId }: CreateBookDTO): Promise<BookEntity> {
        const usersRepository = new UsersRepository();

        const verifyUserId = await usersRepository.findByID({ userId })
        if(verifyUserId.isAdmin === false) throw new AppError('User not is admin!', 404)
        
        const bookRepository = new BookRepository();
        const teste = await bookRepository.findByName({ bookData })

        const createBook = await bookRepository.create({ bookData, bookstoreId });

        return createBook;      
    }
}

 export { CreateBookService }