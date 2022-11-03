import { UsersRepository } from "../../../../database/repositories/UsersRepository";
import { AppError } from "../../../../errors/AppError";
import { HistoryRentEntity } from "../../../audit/infra/entities/HistoryRentEntity";
import { HistoryRentRepository } from "../../../audit/infra/repositories/HistoryRentRepository";
import { BookRepository } from "../../infra/repositories/BookRepository"
import { BookstoreBookRepository } from "../../infra/repositories/BookstoreBookRepository";
import { RentBookRepository } from "../../infra/repositories/RentBookRepository";

type BookDTO = {
    bookstoreBooksId: string;
    userId: string;
};

class RentBookService {
    /* 
    * updateToRented: Função atualizar a coluna rented do bookstoreBook para true, e não permitir alugar um mesmo livro.
     */
    async execute({ bookstoreBooksId, userId}: BookDTO): Promise<void> {
        const userRepository = new UsersRepository();
        const bookstoreBookReposiroty = new BookstoreBookRepository();
        const rentBookRepository = new RentBookRepository();
        const historyRent = new HistoryRentRepository();

        const rentedBooks = await userRepository.readAllBooks({ userId })
        if(rentedBooks >= 3) throw new AppError('Maximum books rented', 400);
        
        const bookRented = await bookstoreBookReposiroty.findById({ bookstoreBooksId })
        if(bookRented.rented === true) throw new AppError('Book already rented!', 409);

        const dataToCreateHistory = { bookstoreId: bookstoreBooksId, bookId: bookstoreBooksId, userId, startDate: new Date } as HistoryRentEntity;
        const createdHistory = await historyRent.CreateHistoryRent({ dataToCreateHistory })

        await rentBookRepository.rent({ userId, bookstoreBooksId, historyRentId: createdHistory.id })

        await bookstoreBookReposiroty.updateToRented({ bookstoreBooksId })
    }
}

export { RentBookService }