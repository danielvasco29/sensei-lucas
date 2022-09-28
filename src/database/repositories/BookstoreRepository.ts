import { prisma } from '../../../prisma/PrismaClient';
import { BookstoreEntity } from '../entities/BookstoreEntity';
import { UserEntity } from '../entities/UserEntity';

type BookstoreDataDTO = {
  id?: string;
  name?: string;
  bookstoreData?: Partial<BookstoreEntity>;
  userData?: UserEntity;
};

type CreateBookstoreDataDTO = {
  bookstoreData: BookstoreEntity;
};

type FindByNameDTO = {
  name: string;
};

class BookstoreRepository {
  async create({ bookstoreData }: CreateBookstoreDataDTO) {
    const newBookstore = await prisma.bookstore.create({
      data: {
        ...bookstoreData,
      },
    });

    return newBookstore;
  }

  async findByID({ id }: BookstoreDataDTO): Promise<Partial<BookstoreEntity>> {
    const userFound = await prisma.bookstore.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        adress: true,
        created_at: true,
        updated_at: true,
      },
    });
    return userFound;
  }

  async findByName({ name }: FindByNameDTO): Promise<BookstoreEntity> {
    const nameFound = await prisma.bookstore.findFirst({
      where: {
        name,
      },
    });
    return nameFound;
  }

  async update({
    id,
    bookstoreData,
  }: BookstoreDataDTO): Promise<BookstoreEntity> {
    const updateBookstore = await prisma.bookstore.update({
      where: {
        id,
      },
      data: {
        name: bookstoreData.name,
        adress: bookstoreData.adress,
      },
    });
    return updateBookstore;
  }

  async delete({ id }: BookstoreDataDTO) {
    await prisma.bookstore.delete({
      where: {
        id,
      },
    });
  }
}

export { BookstoreRepository };
