import { prisma } from '../../../prisma/PrismaClient';
import {
  CreateUserDTO,
  DeleteUserDTO,
  FindByEmailDTO,
  FindByIdDTO,
  UpdatePassword,
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

  async findByID({ id }: FindByIdDTO): Promise<Partial<UserEntity>> {
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

  async update({ id, userData }: UpdateUserDTO): Promise<UserEntity> {
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: userData,
    });

    return updatedUser;
  }

  updatePassword({ id, userData }: UpdatePassword) {
    const updatePassword = prisma.user.update({
      where: {
        id,
      },
      data: userData,
    });

    return updatePassword;
  }

  async delete({ id }: DeleteUserDTO) {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async findAll(): Promise<Partial<UserEntity>[]> {
    const getAllUsers = await prisma.user.findMany({
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

    return getAllUsers;
  }
}
export { UsersRepository };
