import { UsersRepository } from "../../../../database/repositories/UsersRepository";
import { AppError } from "../../../../errors/AppError";
import { DeleteBookDTO } from "../../@types/DeleteBookDTO";
import { BookRepository } from "../../infra/repositories/BookRepository"

class DeleteBookService {
    /* 
    * 1- Verificar se o user é Admin.
    * 2- Verificar se o bookId é válido.
    * 3- Passar os dados para o controller.
    */
    async execute({ bookId, id }: DeleteBookDTO): Promise<void> {
        const usersRepository = new UsersRepository();

        const foundAdmin = await usersRepository.findByID({ id });
        if(foundAdmin.isAdmin === false) throw new AppError('User is not admin', 404);

        const bookRepository = new BookRepository();

        const verifyBookId = await bookRepository.findById({ bookId })
        if(!verifyBookId) throw new AppError('Book Id Not Found', 404)

        await bookRepository.deleteBookId({ bookId, id })
    }
}

export { DeleteBookService }