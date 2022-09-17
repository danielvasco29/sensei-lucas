import { UpdateUserDTO } from '../database/dtos/dtos';
import { UserEntity } from '../database/entities/UserEntity';
import { UsersRepository } from '../database/repositories/UsersRepository';
import { AppError } from '../errors/AppError';

class UpdateUserUseService {
  async execute({ id, userData }: UpdateUserDTO): Promise<UserEntity> {
    const usersRepository = new UsersRepository();

    const userAlreadyExists = await usersRepository.findByID({ id });
    if (!userAlreadyExists) {
      throw new AppError('User not exists', 404);
    }

    const updatedUser = await usersRepository.updateUser({
      id,
      userData,
    });
    if (!updatedUser) {
      throw new AppError('User update failed, contact suport for more details');
    }

    return updatedUser;
  }
}

export { UpdateUserUseService };
