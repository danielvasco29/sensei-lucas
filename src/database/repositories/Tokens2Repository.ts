import { prisma } from '../../../prisma/PrismaClient';
import { DeleteTokenDTO, FindByUserIdDTO } from '../dtos/dtos';
import { Token2Entity } from '../entities/Token2Entity';

type CreateTokenDTO2 = {
  tokenData: Partial<Token2Entity>;
};

class Tokens2Repository {
  async create({
    tokenData: { bookstoreId, token },
  }: CreateTokenDTO2): Promise<void> {
    await prisma.tokens2.create({
      data: {
        bookstoreId,
        token,
      },
    });
  }

  async findByBookstoreId({
    bookstoreId,
  }: FindByUserIdDTO): Promise<Token2Entity> {
    const foundToken = await prisma.tokens2.findFirst({
      where: {
        bookstoreId,
      },
    });

    return foundToken;
  }

  async delete({ bookstoreId }: DeleteTokenDTO): Promise<void> {
    await prisma.tokens2.delete({
      where: {
        bookstoreId,
      },
    });
  }
}

export { Tokens2Repository };
