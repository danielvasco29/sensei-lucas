import { BookstoreBooks } from "@prisma/client";
import { prisma } from "../../../../../prisma/PrismaClient";
import { BookstoreBookEntity } from "../entities/BookstoreBookEntity";

type BookstoreBookDTO = {
  bookstoreBooksId: string;
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
      bookstoreBooksId,
    }: BookstoreBookDTO): Promise<BookstoreBookEntity> {
      const bookstoreBookFound = await prisma.bookstoreBooks.findFirst({
        where: {
          id: bookstoreBooksId,
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
  
    async updateToRented({ bookstoreBooksId }: BookstoreBookDTO): Promise<BookstoreBooks> {
      await prisma.bookstoreBooks.update({
        where: {
          id: bookstoreBooksId,
        },
        data: {
          rented: true,
        },
      });
      return;
    }
  
    async updateToNotRented({
      bookstoreBooksId,
    }: BookstoreBookDTO): Promise<void> {
      await prisma.bookstoreBooks.update({
        where: {
          id: bookstoreBooksId,
        },
        data: {
          rented: false,
        },
      });
    }
  }

  export { BookstoreBookRepository }