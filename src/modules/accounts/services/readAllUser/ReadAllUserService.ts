import { ReadAllUserDTO } from '../../../../database/dtos/dtos';
import { UserEntity } from '../../../../database/entities/UserEntity';
import { UsersRepository } from '../../../../database/repositories/UsersRepository';
import { AppError } from '../../../../errors/AppError';

class ReadAllUserService {
  async execute({ id }: ReadAllUserDTO): Promise<Partial<UserEntity>[]> {
    const usersRepository = new UsersRepository();

    const { isAdmin } = await usersRepository.findByID({ id });
    if (!isAdmin) throw new AppError('User must be admin', 403);    

    const getAllUsers = await usersRepository.findAll();
    if (getAllUsers.length < 0) throw new AppError('Users not found', 404);

    return getAllUsers;
  }
}

export { ReadAllUserService };
