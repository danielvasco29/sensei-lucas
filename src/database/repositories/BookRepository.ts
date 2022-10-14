import { prisma } from "../../../prisma/PrismaClient"
import { BookEntity } from "../entities/BookEntity"

type CreateBookDTO = {
    bookData: BookEntity;
}

class BookRepository {
    async create({bookData}: CreateBookDTO) {
        const createBook = await prisma.book.create({
            data: {
                ... bookData
            }
        })
        return createBook;

    }
}

export { BookRepository }