import { UserEntity } from '../entities/UserEntity';

type CreateUserDTO = {
  userData: UserEntity;
};

type updateUserDTO = {
  id: string;
  userData: Partial<UserEntity>;
};

type FindByEmailDTO = {
  email: string;
};

type FindByNumberDTO = {
  cellNumber: string;
};

type FindByIdDTO = {
  id: string;
};

export {
  updateUserDTO,
  FindByNumberDTO,
  FindByIdDTO,
  FindByEmailDTO,
  CreateUserDTO,
};
