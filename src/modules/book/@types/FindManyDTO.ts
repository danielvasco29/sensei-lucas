import { BookEntity } from "../infra/entities/BookEntity"

type FindManyDTO = {
    queryBook?: string;
    queryBookstore?: string;
}

export { FindManyDTO }