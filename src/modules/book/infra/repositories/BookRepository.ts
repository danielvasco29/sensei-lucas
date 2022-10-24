import { Prisma } from "@prisma/client";
import { prisma } from "../../../../../prisma/PrismaClient"
import { CreateBookDTO } from "../../@types/CreateBookDTO";
import { DeleteBookDTO } from "../../@types/DeleteBookDTO";
import { FindByIdDTO } from "../../@types/FindByIdDTO";
import { FindByNameDTO } from "../../@types/FindByNameDTO";
import { FindManyDTO } from "../../@types/FindManyDTO";
import { BookEntity } from "../entities/BookEntity"



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

    async deleteBookId({ bookId }: DeleteBookDTO): Promise<void> {
        await prisma.book.delete({
          where: {
            id: bookId, 
          }
        })
    }

    async findManyBooks({ queryBook }: FindManyDTO) {
        const bookstoreFound = await prisma.book.findMany({
            where: {
                id: queryBook
            },
            include: {
                Bookstore: { include: { Bookstore: true } }
            },              
        });

        const result = bookstoreFound.map((bookstore) => {
            const book = bookstore.Bookstore;

            return book.map((books) => {
                return books.Bookstore;
            })
        })
        return result[0];
    }

    async readBooks({
        queryBookstore,
        queryBook,
      }: FindManyDTO): Promise<BookEntity[]> {
        const whereObject: Prisma.BookWhereInput = {
            Bookstore: {
                some: {
                    bookstoreId: queryBookstore,
                },
            },
            id: queryBook,
        };
    
        if (!queryBookstore) delete whereObject.Bookstore;
        if (!queryBook) delete whereObject.id;
    
        const booksFound = prisma.book.findMany({
          where: whereObject,
        });
    
        return booksFound;
      };

     
}

export { BookRepository }