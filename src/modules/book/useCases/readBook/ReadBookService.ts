import { BookstoreRepository } from "../../../../database/repositories/BookstoreRepository";
import { AppError } from "../../../../errors/AppError";
import { ReadDTO } from "../../@types/ReadDTO";
import { BookEntity } from "../../infra/entities/BookEntity";
import { BookRepository } from "../../infra/repositories/BookRepository"

class ReadBookService { 
    async execute({ queryBook, queryBookstore, all }: ReadDTO) {
        const bookRepository = new BookRepository();

        const getAll = all == 'true';
        
        let booksFound: BookEntity[]
        switch (getAll) {
            case true:
                booksFound = await bookRepository.readBooks({ 
                    queryBookstore 
                });
                break;
            case false:
                if(!queryBook) throw new AppError('Book id missing', 400);
                booksFound = await bookRepository.readBooks({ 
                    queryBook
                });
                break;
            default:
        }

        if (booksFound.length < 1) throw new AppError('Books not found', 404)
        
        return booksFound;
    }
}

export { ReadBookService }
