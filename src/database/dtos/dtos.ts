import { UserEntity } from '../entities/UserEntity';

type CreateUserDTO = {
  userData: UserEntity;
};

type UpdateUserDTO = {
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

type UserLoginDTO = {
  email: string;
  password: string;
};

type NewTokenDTO = {
  newToken: string;
};

export {
  UpdateUserDTO,
  FindByNumberDTO,
  FindByIdDTO,
  FindByEmailDTO,
  CreateUserDTO,
  UserLoginDTO,
  NewTokenDTO,
};
