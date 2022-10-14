import { prisma } from "../../../prisma/PrismaClient"
import { BookEntity } from "../entities/BookEntity"

type CreateBookDTO = {
    bookData: BookEntity;
}

type FindByIdDTO = {
    bookId: string;
}

type FindByNameDTO = {
    bookData: BookEntity;
    name?: string;
}

class BookRepository {
    async create({bookData}: CreateBookDTO) {
        const createBook = await prisma.book.create({
            data: {
                ...bookData
            }
        })
        return createBook;
    }

    async findById({ bookId }: FindByIdDTO): Promise<BookEntity> {
        const findById = await prisma.book.findFirst({
            where: {
                id: bookId
            }
        })
        return findById;
    }

    async findByName({ bookData }: FindByNameDTO): Promise<BookEntity> {
        const { name } = bookData;

        const nameFound = await prisma.book.findFirst({
            where: {
                OR: [
                    {
                        name,
                    }
                ]
            }
        })
        return nameFound;
    }
}

export { BookRepository }