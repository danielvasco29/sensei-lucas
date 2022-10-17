import { prisma } from '../../../prisma/PrismaClient';
import { UserEntity } from '../entities/UserEntity';

type UpdateAdmin = {
  id?: string;
  userData?: Partial<UserEntity>;
  userId?: string;
};

class FindByAdminRepository {
  async findByID({ userId }: UpdateAdmin): Promise<Partial<UserEntity>> {
    const userFound = await prisma.user.findFirst({
      where: {
        id: userId,
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

  async update({ userData, userId }: UpdateAdmin): Promise<UserEntity> {
    const updateBookstore = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isAdmin: userData.isAdmin,
      },
    });
    return updateBookstore;
  }
}

export { FindByAdminRepository };
