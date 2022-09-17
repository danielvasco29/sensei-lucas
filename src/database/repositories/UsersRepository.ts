import { prisma } from '../../../prisma/PrismaClient';
import {
  CreateUserDTO,
  FindByEmailDTO,
  FindByIdDTO,
  FindByNumberDTO,
  UpdateUserDTO,
} from '../dtos/dtos';
import { UserEntity } from '../entities/UserEntity';

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

  async findByID({ id }: FindByIdDTO): Promise<UserEntity> {
    const userFound = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    return userFound;
  }

  async updateUser({ id, userData }: UpdateUserDTO): Promise<UserEntity> {
    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: userData,
    });
    return updateUser;
  }
}
export { UsersRepository };
