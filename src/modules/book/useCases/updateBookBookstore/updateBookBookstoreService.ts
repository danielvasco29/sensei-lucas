import { AppError } from "../../../../errors/AppError";
import { BookstoreBookRepository } from "../../infra/repositories/BookstoreBookRepository";

type BookIdDTO = {
    bookId: string;
    bookstoreId?: string;
}

class UpdateBookBookstoreService {
    async execute({ bookId, bookstoreId}: BookIdDTO): Promise<void> {
        const bookRepository = new BookstoreBookRepository();

        const alreadyRelationConflict = await bookRepository.alreadyRelationConflict({ bookId, bookstoreId });
        if(alreadyRelationConflict) throw new AppError('This relation already exists!', 400);
        
        await bookRepository.createRelation({ bookId, bookstoreId })
    }
}

export { UpdateBookBookstoreService }