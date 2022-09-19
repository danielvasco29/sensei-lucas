import { ReadUserDTO } from '../database/dtos/dtos';
import { UsersRepository } from '../database/repositories/UsersRepository';
import { AppError } from '../errors/AppError';

class ReadUserService {
  async execute({ id }: ReadUserDTO) {
    const usersRepository = new UsersRepository();

    const readUser = await usersRepository.findByID({ id });
    if (!readUser) {
      throw new AppError('User not exists!', 404);
    }
    return { readUser };
  }
}

export { ReadUserService };
