import { prisma } from '../../../prisma/PrismaClient';
import { FindByAdminDTO } from '../dtos/dtos';
import { UserEntity } from '../entities/UserEntity';

class FindByAdminRepository {
  async findByAdmin({ isAdmin }: FindByAdminDTO): Promise<Partial<UserEntity>> {
    const userFound = await prisma.user.findFirst({
      where: {
        isAdmin: {
          equals: true,
        },
      },
    });
    return userFound;
  }
}

export { FindByAdminRepository };
