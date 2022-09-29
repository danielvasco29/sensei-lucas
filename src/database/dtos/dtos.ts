import { TokenEntity } from '../entities/TokenEntity';
import { UserEntity } from '../entities/UserEntity';

type TurnIsAdminDTO = {
  id: string;
  userData: Partial<UserEntity>;
};

type UserLogoutDTO = {
  userId: string;
};

type CreateUserDTO = {
  userData: UserEntity;
};

type CreateTokenDTO = {
  tokenData: Partial<TokenEntity>;
};

type UpdateUserDTO = {
  id: string;
  userData: Partial<UserEntity>;
};

type UpdatePassword = {
  id?: string;
  userData: Partial<UserEntity>;
};

type FindByEmailDTO = {
  email: string;
};

type FindByAdminDTO = {
  isAdmin: boolean;
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

type DeleteUserDTO = {
  id: string;
  isAdmin?: boolean;
};

type ReadUserDTO = {
  id: string;
};

type FindByUserIdDTO = {
  userId?: string;
  bookstoreId?: string;
};

type DeleteTokenDTO = {
  userId?: string;
  bookstoreId?: string;
};

type ReadAllUserDTO = {
  userId: string;
};

export {
  FindByAdminDTO,
  TurnIsAdminDTO,
  UpdatePassword,
  ReadAllUserDTO,
  UserLogoutDTO,
  FindByUserIdDTO,
  DeleteTokenDTO,
  UpdateUserDTO,
  FindByNumberDTO,
  FindByIdDTO,
  FindByEmailDTO,
  CreateUserDTO,
  UserLoginDTO,
  NewTokenDTO,
  DeleteUserDTO,
  ReadUserDTO,
  CreateTokenDTO,
};
