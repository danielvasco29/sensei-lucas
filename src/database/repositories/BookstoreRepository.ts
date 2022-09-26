import { prisma } from '../../../prisma/PrismaClient';
import { BookstoreEntity } from '../entities/BookstoreEntity';

type BookstoreDataDTO = {
  bookstoreData: BookstoreEntity;
};

class BookstoreRepository {
  async create({ bookstoreData }: BookstoreDataDTO) {
    const newBookstore = await prisma.bookstore.create({
      data: {
        ...bookstoreData,
      },
    });

    return newBookstore;
  }
}

export { BookstoreRepository };
