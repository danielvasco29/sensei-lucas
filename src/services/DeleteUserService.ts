import { DeleteUserDTO } from '../database/dtos/dtos';
import { UsersRepository } from '../database/repositories/UsersRepository';
import { AppError } from '../errors/AppError';

class DeleteUserService {
  private count: number;

  async execute({ id }: DeleteUserDTO) {
    const convertUsersIdToArray = id.split(', ');
    const actualId = convertUsersIdToArray[0];
    const usersRepository = new UsersRepository();

    const userAlreadExists = usersRepository.findByID({ id: actualId });
    if (!userAlreadExists) {
      throw new AppError('User not found!', 404);
    }

    await usersRepository.delete({ id: actualId });
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
