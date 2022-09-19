import { Router } from 'express';

import { CreateUserController } from '../../controllers/CreateUserController';
import { DeleteUserController } from '../../controllers/DeleteUserController';
import { UpdateUserController } from '../../controllers/UpdateUserController';
import { UserLoginController } from '../../controllers/UserLoginController';
import { errorHandle } from '../../utils/errorHandle';
import { authSecurity } from '../middlewares/authSecurity';

const router = Router();

const createUserController = new CreateUserController();
const userLoginController = new UserLoginController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

router.post('/users/create', errorHandle, createUserController.control);
router.post('/users/login', errorHandle, userLoginController.control);
router.put(
  '/users/update',
  authSecurity,
  errorHandle,
  updateUserController.control
);
router.delete(
  '/users/delete',
  authSecurity,
  errorHandle,
  deleteUserController.control
);

export { router };
