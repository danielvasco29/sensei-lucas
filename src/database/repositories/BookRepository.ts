import { Prisma } from "@prisma/client";
import { prisma } from "../../../prisma/PrismaClient"
import { BookEntity } from "../entities/BookEntity"

type CreateBookDTO = {
    bookData: BookEntity;
    bookstoreId: string;
}

type FindByIdDTO = {
    bookId: string;
}

type FindByNameDTO = {
    bookData: BookEntity;
    name?: string;
}

class BookRepository {
    async create({bookData, bookstoreId }: CreateBookDTO): Promise<BookEntity> {
        const dataObject: Prisma.BookCreateInput = {
            ...bookData,
            Bookstore: {
                create: {
                    bookstoreId: bookstoreId
                }
            }
        }

        if(!bookstoreId) delete dataObject.Bookstore;
        const createBook = await prisma.book.create({
            data: dataObject
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