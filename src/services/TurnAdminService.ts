import { TurnIsAdminDTO } from '../database/dtos/dtos';
import { UsersRepository } from '../database/repositories/UsersRepository';
import { AppError } from '../errors/AppError';

class TurnAdminService {
  async execute({ id, userData }: TurnIsAdminDTO) {
    const { isAdmin } = userData;

    if (!isAdmin === false) {
      throw new AppError('User is not admin', 404);
    }

    const usersRepository = new UsersRepository();

    const userAlreadyExists = await usersRepository.findByID({ id });
    if (!userAlreadyExists) {
      throw new AppError('IdUser not found!', 404);
    }
  }
}

export { TurnAdminService };
