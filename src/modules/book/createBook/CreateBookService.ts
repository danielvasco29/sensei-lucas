import { BookEntity } from "../../../database/entities/BookEntity";
import { BookRepository } from "../../../database/repositories/BookRepository";

type CreateBookDTO = {
    bookData: BookEntity;
    id: string;
}

class CreateBookService {
    async execute({ bookData, id }: CreateBookDTO): Promise<BookEntity> {

        const bookRepository = new BookRepository();

        const createBook = await bookRepository.create({ bookData });

        
    }
}

 export { CreateBookService }