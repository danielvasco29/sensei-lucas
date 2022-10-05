import { prisma } from '../../../prisma/PrismaClient';
import { FindByAdminDTO } from '../dtos/dtos';
import { UserEntity } from '../entities/UserEntity';

type UpdateAdmin = {
  id: string;
  userData?: Partial<UserEntity>;
};

class FindByAdminRepository {
  async findByID({ id }: UpdateAdmin): Promise<Partial<UserEntity>> {
    const userFound = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        isAdmin: true,
        birthDate: true,
        cellNumber: true,
        created_at: true,
        updated_at: true,
      },
    });
    return userFound;
  }

  async update({ id, userData }: UpdateAdmin): Promise<UserEntity> {
    const updateBookstore = await prisma.user.update({
      where: {
        id,
      },
      data: {
        isAdmin: userData.isAdmin,
      },
    });
    return updateBookstore;
  }
}

export { FindByAdminRepository };
