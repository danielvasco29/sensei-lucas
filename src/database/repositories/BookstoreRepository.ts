import { prisma } from '../../../prisma/PrismaClient';
import { BookstoreEntity } from '../entities/BookstoreEntity';
import { UserEntity } from '../entities/UserEntity';

type BookstoreDataDTO = {
  bookstoreData: BookstoreEntity;
  userData?: UserEntity;
};

class BookstoreRepository {
  async create({ bookstoreData, userData }: BookstoreDataDTO) {
    const newBookstore = await prisma.bookstore.create({
      data: {
        ...bookstoreData,
        ...userData,
      },
    });

    return newBookstore;
  }
}

export { BookstoreRepository };
