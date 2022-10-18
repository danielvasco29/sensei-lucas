import { BookEntity } from "../infra/entities/BookEntity";

type FindByNameDTO = {
    bookData: BookEntity;
    name?: string;
}

export { FindByNameDTO }