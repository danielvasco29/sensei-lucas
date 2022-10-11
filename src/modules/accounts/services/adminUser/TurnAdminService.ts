import { TurnIsAdminDTO } from '../../../../database/dtos/dtos';
import { FindByAdminRepository } from '../../../../database/repositories/FindByAdminRepository';
import { UsersRepository } from '../../../../database/repositories/UsersRepository';
import { AppError } from '../../../../errors/AppError';

class TurnAdminService {
  async execute({ id, userData }: TurnIsAdminDTO): Promise<void> {
    const usersRepository = new UsersRepository();
    const userAlreadyExists = await usersRepository.findByID({ id });
    if (userAlreadyExists.isAdmin === false) {
      throw new AppError('user is not admin!', 404);
    }

    const findByAdminRepository = new FindByAdminRepository();
    const findAdmin = await findByAdminRepository.update({ id, userData });
    if (!findAdmin) {
      throw new AppError('Turn Admin failed', 404);
    }
  }
}

export { TurnAdminService };
