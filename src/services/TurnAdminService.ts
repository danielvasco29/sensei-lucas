import { TurnIsAdminDTO } from '../database/dtos/dtos';
import { UsersRepository } from '../database/repositories/UsersRepository';
import { AppError } from '../errors/AppError';

class TurnAdminService {
  async execute({ id, userData }: TurnIsAdminDTO) {
    const usersRepository = new UsersRepository();

    const findByAdmin = await usersRepository.findByAdmin({ id });
    console.log('findByAdmin', findByAdmin)
    if (!findByAdmin) {
      throw new AppError('error')
    }
    const turnAdmin = await usersRepository.turnIsAdmin({ id, userData });
    if (!turnAdmin) {
      throw new AppError('Turn Admin failed', 400);
    }
  }
}

export { TurnAdminService };
