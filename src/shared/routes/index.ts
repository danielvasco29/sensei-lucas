import { Router } from 'express';

import { CreateUserController } from '../../controllers/CreateUserController';
import { DeleteUserController } from '../../controllers/DeleteUserController';
import { ReadAllUserController } from '../../controllers/ReadAllUserController';
import { ReadUserController } from '../../controllers/ReadUserController';
import { UpdateUserController } from '../../controllers/UpdateUserController';
import { UserLoginController } from '../../controllers/UserLoginController';
import { UserLogoutController } from '../../controllers/UserLogoutController';
import { authSecurity } from '../middlewares/authSecurity';

const router = Router();

const createUserController = new CreateUserController();
const userLoginController = new UserLoginController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const readUserController = new ReadUserController();
const userLogoutController = new UserLogoutController();
const readAllUserController = new ReadAllUserController();

router.post('/sessions/login', userLoginController.control);
router.post('/users/create', createUserController.control);
router.put('/users/update', authSecurity, updateUserController.control);
router.get('/users/read', authSecurity, readUserController.control);
router.delete('/sessions/logout', authSecurity, userLogoutController.control);
router.delete('/users/delete', authSecurity, deleteUserController.control);
router.get('/users/all', authSecurity, readAllUserController.control);

export { router };
