import { UsersRepository } from "../../../../database/repositories/UsersRepository";
import { AppError } from "../../../../errors/AppError";
import { RentDTO } from "../../@types/RentDTO";
import { BookstoreBookRepository } from "../../infra/repositories/BookstoreBookRepository";
import { RentBookRepository } from "../../infra/repositories/RentBookRepository";

class RentBookService {
    /* 
    * updateToRented: Função atualizar a coluna rented do bookstoreBook para true, e não permitir alugar um mesmo livro.
     */
    async execute({ bookstoreBooksId, userId}: RentDTO): Promise<void> {
        const userRepository = new UsersRepository();
        const bookstoreBookReposiroty = new BookstoreBookRepository();
        const rentBookRepository = new RentBookRepository();

        // const rentedBooks = await userRepository.readAllBooks({ userId })
        // if(rentedBooks >= 3) throw new AppError('Maximum books rented', 400);
        
        const rented = await bookstoreBookReposiroty.findById({ bookstoreBooksId })
        if(!rented) throw new AppError('Book not exists!', 409);
        console.log('rented', rented)

        await rentBookRepository.rent({ userId, bookstoreBooksId })
        
        await bookstoreBookReposiroty.updateToRented({ bookstoreBooksId })
    }
}

export { RentBookService }