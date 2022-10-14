import { Router } from 'express';

import { TurnAdminController } from '../../modules/accounts/services/adminUser/TurnAdminController';
import { CreateUserController } from '../../modules/accounts/services/createUser/CreateUserController';
import { DeleteUserController } from '../../modules/accounts/services/deleteUser/DeleteUserController';
import { UserLoginController } from '../../modules/accounts/services/loginUser/UserLoginController';
import { UserLogoutController } from '../../modules/accounts/services/logoutUser/UserLogoutController';
import { ReadAllUserController } from '../../modules/accounts/services/readAllUser/ReadAllUserController';
import { ReadUserIdController } from '../../modules/accounts/services/readUser/ReadUserIdController';
import { UpdateUserController } from '../../modules/accounts/services/updateUser/UpdateUserController';
import { UpdatePasswordController } from '../../modules/accounts/services/updateUserPassword/UpdatePasswordController';
import { CreateBookstoreController } from '../../modules/bookstore/services/createBookstore/CreateBookstoreController';
import { DeleteBookstoreController } from '../../modules/bookstore/services/deleteBookstore/DeleteBookstoreController';
import { ReadBookstoreController } from '../../modules/bookstore/services/readBookstore/ReadBookstoreController';
import { UpdateBookstoreController } from '../../modules/bookstore/services/updateBookstore/UpdateBookstoreController';
import { authSecurity } from '../middlewares/authSecurity';

const router = Router();

const createUserController = new CreateUserController();
const userLoginController = new UserLoginController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const readUserIdController = new ReadUserIdController();
const userLogoutController = new UserLogoutController();
const readAllUserController = new ReadAllUserController();
const updatePasswordController = new UpdatePasswordController();
const turnAdminController = new TurnAdminController();
const createBookstoreController = new CreateBookstoreController();
const updateBookstoreController = new UpdateBookstoreController();
const deleteBookstoreController = new DeleteBookstoreController();
const readBookstoreController = new ReadBookstoreController();

router.post('/sessions/login', userLoginController.control);
router.post('/users/create', createUserController.control);
router.put('/users/update', authSecurity, updateUserController.control);
router.get('/users/read', readUserIdController.control);
router.delete('/sessions/logout', authSecurity, userLogoutController.control);
router.delete('/users/delete', authSecurity, deleteUserController.control);
router.get('/users/all', authSecurity, readAllUserController.control);
router.post(
  '/users/updatePassword',
  authSecurity,
  updatePasswordController.control
);
router.put('/users/turnAdmin', authSecurity, turnAdminController.control);
router.post('/bookstore/create', authSecurity, createBookstoreController.control);
router.post(
  '/bookstore/update',
  authSecurity,
  updateBookstoreController.control
);
router.delete(
  '/bookstore/delete',
  authSecurity,
  deleteBookstoreController.control
);
router.get('/bookstore/read', readBookstoreController.control)

export { router };
