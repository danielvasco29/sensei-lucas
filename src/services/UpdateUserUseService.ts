import { updateUserDTO } from '../database/dtos/dtos';
import { UserEntity } from '../database/entities/UserEntity';
import { UsersRepository } from '../database/repositories/UsersRepository';
import { AppError } from '../errors/AppError';

class UpdateUserUseService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id, userData }: updateUserDTO): Promise<UserEntity> {
    const userAlreadyExists = await this.usersRepository.findByID({ id });
    if (!userAlreadyExists) {
      throw new AppError('User not exists');
    }

    const updatedUser = await this.usersRepository.updateUser({
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
