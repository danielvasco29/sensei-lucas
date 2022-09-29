import { TurnIsAdminDTO } from '../database/dtos/dtos';
import { FindByAdminRepository } from '../database/repositories/FindByAdminRepository';
import { UsersRepository } from '../database/repositories/UsersRepository';
import { AppError } from '../errors/AppError';

class TurnAdminService {
  async execute({ id, userData }: TurnIsAdminDTO) {
    const { isAdmin } = userData;

    if (!isAdmin === false) {
      throw new AppError('User is not admin', 404);
    }

    const findByAdminRepository = new FindByAdminRepository();

    const findByAdmin = await findByAdminRepository.findByAdmin({ isAdmin });
    console.log('findByAdmin', findByAdmin)
    if (!findByAdmin) {
      throw new AppError('error')
    }

    const usersRepository = new UsersRepository();
    const turnAdmin = await usersRepository.turnIsAdmin({ id, userData });
    if (!turnAdmin) {
      throw new AppError('Turn Admin failed', 400);
    }
  }
}

export { TurnAdminService };
