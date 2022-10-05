import { DeleteUserDTO } from '../../../../database/dtos/dtos';
import { FindByAdminRepository } from '../../../../database/repositories/FindByAdminRepository';
import { UsersRepository } from '../../../../database/repositories/UsersRepository';
import { AppError } from '../../../../errors/AppError';

class DeleteUserService {
  private count: number;

  async execute({ id, userData }: DeleteUserDTO) {
    const convertUsersIdToArray = id.split(', ');
    const actualId = convertUsersIdToArray[0];
    const findByAdminRepository = new FindByAdminRepository();

    const userAdmin = await findByAdminRepository.findByID({ id });
    if (userAdmin.isAdmin === false) {
      throw new AppError('User not Admin', 404);
    }

    const usersRepository = new UsersRepository();
    const userAlreadExists = await usersRepository.findByID({ id });
    if (!userAlreadExists) {
      throw new AppError('User not found!', 404);
    }

    await usersRepository.delete({ id: actualId, userData });
    // eslint-disable-next-line no-plusplus
    this.count++;

    convertUsersIdToArray.shift();
    if (convertUsersIdToArray && convertUsersIdToArray.length > 0) {
      const convertArrayToString = convertUsersIdToArray.join(', ');

      await this.execute({ id: convertArrayToString });
    }
  }
}

export { DeleteUserService };
