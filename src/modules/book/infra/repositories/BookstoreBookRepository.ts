import { prisma } from "../../../../../prisma/PrismaClient";
import { BookstoreBookEntity } from "../entities/BookstoreBookEntity";

type BookstoreBookDTO = {
    bookstoreBook: string;
}

type CreateRelationDTO = {
    bookId: string;
    bookstoreId: string;
}

type AlreadyRelationConflictDTO = {
    bookId: string;
    bookstoreId: string;
}

class BookstoreBookRepository {
    async findById({
        bookstoreBook,
    }: BookstoreBookDTO): Promise<BookstoreBookEntity> {
      const bookstoreBookFound = await prisma.bookstoreBooks.findFirst({
        where: {
          id: bookstoreBook,
        },
      });
  
      return bookstoreBookFound;
    }
  
    async createRelation({
      bookId,
      bookstoreId,
    }: CreateRelationDTO): Promise<void> {
      await prisma.bookstoreBooks.create({
        data: {
          bookId,
          bookstoreId,
        },
      });
    }
  
    async alreadyRelationConflict({
      bookId,
      bookstoreId,
    }: AlreadyRelationConflictDTO): Promise<BookstoreBookEntity> {
      const verifyConflict = await prisma.bookstoreBooks.findFirst({
        where: {
          bookId,
          bookstoreId,
        },
      });
  
      return verifyConflict;
    }
  
    async updateToRented({ bookstoreBook }: BookstoreBookDTO): Promise<void> {
      await prisma.bookstoreBooks.update({
        where: {
          id: bookstoreBook,
        },
        data: {
          rented: true,
        },
      });
    }
  
    async updateToNotRented({
      bookstoreBook,
    }: BookstoreBookDTO): Promise<void> {
      await prisma.bookstoreBooks.update({
        where: {
          id: bookstoreBook,
        },
        data: {
          rented: false,
        },
      });
    }
  }