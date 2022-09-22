import { Router } from 'express';

import { CreateUserController } from '../../controllers/CreateUserController';
import { DeleteUserController } from '../../controllers/DeleteUserController';
import { ReadAllUserController } from '../../controllers/ReadAllUserController';
import { ReadUserIdController } from '../../controllers/ReadUserIdController';
import { UpdatePasswordController } from '../../controllers/UpdatePasswordController';
import { UpdateUserController } from '../../controllers/UpdateUserController';
import { UserLoginController } from '../../controllers/UserLoginController';
import { UserLogoutController } from '../../controllers/UserLogoutController';
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

export { router };
