import { UpdatePassword } from '../database/dtos/dtos';
import { UsersRepository } from '../database/repositories/UsersRepository';
import { AppError } from '../errors/AppError';

class UpdatePasswordService {
  async execute({ id, userData }: UpdatePassword) {
    const usersRepository = new UsersRepository();
    console.log(usersRepository);

    const userAlreadyExists = await usersRepository.findByID({ id });
    if (!userAlreadyExists) {
      throw new AppError('User not exists', 404);
    }

    const updatePass = await usersRepository.updatePassword({
      id,
      userData,
    });
    console.log('Senha trocada para: ', updatePass.password);
    if (!updatePass) {
      throw new AppError('Failed update Password!', 400);
    }
  }
}

export { UpdatePasswordService };
