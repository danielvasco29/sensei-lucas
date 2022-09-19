import { prisma } from '../../../prisma/PrismaClient';
import {
  CreateUserDTO,
  DeleteUserDTO,
  FindByEmailDTO,
  FindByIdDTO,
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

  async update({ id, userData }: UpdateUserDTO): Promise<UserEntity> {
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: userData,
    });

    return updatedUser;
  }

  async delete({ id }: DeleteUserDTO) {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
export { UsersRepository };
