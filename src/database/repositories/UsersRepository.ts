import { prisma } from '../../../prisma/PrismaClient';
import { UserEntity } from '../entities/UserEntity';

type CreateUserDTO = {
  userData: UserEntity;
};

type FindByEmailDTO = {
  email: string;
};

type FindByNumberDTO = {
  cellNumber: string;
};

class UsersRepository {
  async create({ userData }: CreateUserDTO) {
    const newUser = await prisma.user.create({
      data: {
        ...userData,
      },
    });

    return newUser;
  }

  async findByEmail({ email }: FindByEmailDTO): Promise<UserEntity> {
    const userFound = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    return userFound;
  }

  async findByNumber({ cellNumber }: FindByNumberDTO): Promise<UserEntity> {
    const userFound = await prisma.user.findFirst({
      where: {
        cellNumber,
      },
    });
    return userFound;
  }
}
export { UsersRepository };
