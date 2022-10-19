import { UsersRepository } from "../../../../database/repositories/UsersRepository";
import { AppError } from "../../../../errors/AppError";
import { DeleteBookDTO } from "../../@types/DeleteBookDTO";
import { BookRepository } from "../../infra/repositories/BookRepository"

class DeleteBookService {
    /* 
    * 1- convertBookIdToArray: Recebe array de vários x-book-id, e separa por vírgula. 
    * 2- actualId: Pega o item 0 do convertBookIdToArray.
    * 3- Verificar se o user é Admin.
    * 4- Verificar se o bookId é válido.
    * 5- Passar os dados para o controller.
    * 6- Increment number
    * 7- convertBookIdToArray.shift: Pega o array, e joga pra dentro do execute.
    */
   private count: number;
    async execute({ bookId, id }: DeleteBookDTO) {
        const convertBookIdToArray = bookId.split(', ');
        const actualId = convertBookIdToArray[0];

        const usersRepository = new UsersRepository();
        
        const foundAdmin = await usersRepository.findByID({ id });
        if(foundAdmin.isAdmin === false) throw new AppError('User is not admin', 404);

        const bookRepository = new BookRepository();

        const verifyBookId = await bookRepository.findById({ bookId: actualId })
        if(!verifyBookId) throw new AppError('Book Id Not Found', 404)

        await bookRepository.deleteBookId({ bookId: actualId, id });
        this.count++;

        convertBookIdToArray.shift();
        if (convertBookIdToArray && convertBookIdToArray.length > 0) {
            const convertArrayToString = convertBookIdToArray.join(', ');

            await this.execute({ bookId: convertArrayToString })
        }
    }
}

export { DeleteBookService }