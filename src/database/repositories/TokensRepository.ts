import { prisma } from '../../../prisma/PrismaClient';
import { CreateTokenDTO, DeleteTokenDTO, FindByUserIdDTO } from '../dtos/dtos';
import { TokenEntity } from '../entities/TokenEntity';

class TokensRepository {
  async create({
    tokenData: { userId, token },
  }: CreateTokenDTO): Promise<void> {
    await prisma.tokens.create({
      data: {
        userId,
        token,
      },
    });
  }

  async delete({ userId }: DeleteTokenDTO): Promise<void> {
    await prisma.tokens.delete({
      where: {
        userId,
      },
    });
  }

  async findByUserId({ userId }: FindByUserIdDTO): Promise<TokenEntity> {
    const foundToken = await prisma.tokens.findFirst({
      where: {
        userId,
      },
    });

    return foundToken;
  }
}

export { TokensRepository };
