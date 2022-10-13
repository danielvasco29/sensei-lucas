import { prisma } from '../../../prisma/PrismaClient';
import { BookstoreEntity } from '../entities/BookstoreEntity';

type DeleteBookstoreDataDTO = {
  bookstoreData: string;

}

type BookstoreDataDTO = {
  bookstoreData?: string;
  id?: string;
};

type CreateBookstoreDataDTO = {
  bookstoreData: BookstoreEntity;
  isAdmin?: boolean | undefined;
};

type FindByNameDTO = {
  bookstoreData: BookstoreEntity;
  name?: string;
};

type FindByNameDTO2 = {
  findbyName?: Partial<BookstoreEntity>;
  name?: string;
}

type BookstoreDataDTO2 = {
  id?: string;
  bookstoreData?: string;
  data: Partial<BookstoreEntity>;
};

type BookstoreDataDTO3 = {
  bookstoreData: Partial<BookstoreEntity>;
  id?: string;
};

class BookstoreRepository {
  async create({ bookstoreData }: CreateBookstoreDataDTO): Promise<BookstoreEntity> {
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

  async findByID2({ bookstoreData }: BookstoreDataDTO): Promise<BookstoreEntity> {
    const userFound = await prisma.bookstore.findFirst({
      where: {
        id: bookstoreData,
      },   
    });
    return userFound;
  }

  async findByID3({ bookstoreData }: BookstoreDataDTO): Promise<BookstoreEntity> {
    const userFound = await prisma.bookstore.findFirst({
      where: {
        id: bookstoreData,
      },
    });
    return userFound;
  }

  async findByName({ bookstoreData }: FindByNameDTO): Promise<BookstoreEntity> {
    const { name } = bookstoreData;

    const nameFound = await prisma.bookstore.findFirst({
      where: {
        OR: [
          {
            name,
          }
        ]
      },
    });
    return nameFound;
  }

  async findByName2({ name }: FindByNameDTO2): Promise<BookstoreEntity> {

    const nameFound = await prisma.bookstore.findFirst({
      where: {
        OR: [
          {
            name,
          } 
        ]
      },
    });
    return nameFound;
  }

  async update({
    bookstoreData, data
  }: BookstoreDataDTO2): Promise<BookstoreEntity> {
    const updateBookstore = await prisma.bookstore.update({
      where: {
        id: bookstoreData,
      },
      data: {
        ... data
      },
    });

    return updateBookstore;
  }

  async delete({ bookstoreData }: DeleteBookstoreDataDTO): Promise<void> {
    await prisma.bookstore.delete({
      where: {
        id: bookstoreData,
      },
    });
  }
}

export { BookstoreRepository };
