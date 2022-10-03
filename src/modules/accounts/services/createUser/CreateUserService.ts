import { hash } from 'bcrypt';

import { CreateUserDTO } from '../../../../database/dtos/dtos';
import { UserEntity } from '../../../../database/entities/UserEntity';
import { UsersRepository } from '../../../../database/repositories/UsersRepository';
import { AppError } from '../../../../errors/AppError';

class CreateUserService {
  async execute({ userData }: CreateUserDTO): Promise<UserEntity> {
    const { email, password } = userData;
    const usersRepository = new UsersRepository();

    const userConflict = await usersRepository.findByEmail({ email });

    /* const numberExists = await usersRepository.findByNumber({ cellNumber }); */

    if (userConflict) {
      throw new AppError('User already exists!', 409);
    } /* else if (numberExists) {
      throw new AppError('Number already exists!');
    } */

    const newPass = await hash(password, 10);
    userData.password = newPass;

    if (userData?.birthDate) {
      userData.birthDate = new Date(
        userData.birthDate
      ).toISOString() as unknown as Date;
    }

    const newUser = await usersRepository.create({ userData });

    if (!newUser) {
      throw new AppError(
        'User creation failed, contact suport for more details',
        500
      );
    }

    return newUser;
  }
}

export { CreateUserService };
