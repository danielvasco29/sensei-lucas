import { BookEntity } from "../infra/entities/BookEntity";

type CreateBookDTO = {
    bookData: BookEntity;
    userId?: string;
    bookstoreId: string;
}

export { CreateBookDTO }