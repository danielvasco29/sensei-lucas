import { hash } from 'bcrypt';

import { UserEntity } from '../database/entities/UserEntity';
import { UsersRepository } from '../database/repositories/UsersRepository';

type CreateUserDTO = {
  userData: UserEntity;
};

class CreateUserService {
  async execute({ userData }: CreateUserDTO): Promise<UserEntity> {
    const { email, password } = userData;
    const usersRepository = new UsersRepository();

    const userConflict = await usersRepository.findByEmail({ email });

    if (userConflict) {
      throw new Error('User already exists!');
    }

    const newPass = await hash(password, 10);
    // eslint-disable-next-line no-param-reassign
    userData.password = newPass;

    if (userData?.birthDate) {
      // eslint-disable-next-line no-param-reassign
      userData.birthDate = new Date(
        userData.birthDate
      ).toISOString() as unknown as Date;
    }

    const newUser = await usersRepository.create({ userData });

    if (!newUser) {
      throw new Error('User creation failed, contact suport for more details');
    }

    return newUser;
  }
}

export { CreateUserService };
