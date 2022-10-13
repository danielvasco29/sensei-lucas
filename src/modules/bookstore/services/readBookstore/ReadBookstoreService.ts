import { BookstoreEntity } from "../../../../database/entities/BookstoreEntity";
import { BookstoreRepository } from "../../../../database/repositories/BookstoreRepository"
import { AppError } from "../../../../errors/AppError";

type idDTO = {
    bookstoreData: string;
}

class ReadBookstoreService {
    async execute({ bookstoreData }: idDTO): Promise<BookstoreEntity> {

        const bookstoryRepository = new BookstoreRepository();

        const bookstoreExist = await bookstoryRepository.findByID3({ bookstoreData })
        
        if(!bookstoreExist) {
            throw new AppError('Bookstore not exists', 404)
        }

        return bookstoreExist;
    }
}

export { ReadBookstoreService }