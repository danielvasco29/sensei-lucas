import { DeleteUserDTO } from '../database/dtos/dtos';
import { UsersRepository } from '../database/repositories/UsersRepository';
import { AppError } from '../errors/AppError';

class DeleteUserService {
  async execute({ id }: DeleteUserDTO) {
    const usersRepository = new UsersRepository();

    const userAlreadExists = usersRepository.findByID({ id });
    if (!userAlreadExists) {
      throw new AppError('User not found!', 404);
    }

    await usersRepository.delete({ id });
  }

  return;
}

export { DeleteUserService };
