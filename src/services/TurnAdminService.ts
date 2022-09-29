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

    const findByAdmin = await usersRepository.findByAdmin({ id });
    console.log('findByAdmin', findByAdmin)
    if (!findByAdmin) {
      throw new AppError('error')
    }
<<<<<<< HEAD
    const turnAdmin = await usersRepository.turnIsAdmin({ id, userData });
    if (!turnAdmin) {
      throw new AppError('Turn Admin failed', 400);
    }
=======
>>>>>>> 0b966e0d13abf6585ab1c36e18e58e489fdfc3a9
  }
}

export { TurnAdminService };
