import { Router } from 'express';

import { CreateUserController } from '../../controllers/CreateUserController';
import { DeleteUserController } from '../../controllers/DeleteUserController';
import { UpdateUserController } from '../../controllers/UpdateUserController';
import { UserLoginController } from '../../controllers/UserLoginController';
import { authSecurity } from '../middlewares/authSecurity';

const router = Router();

const createUserController = new CreateUserController();
const userLoginController = new UserLoginController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

router.post('/users/create', createUserController.control);
router.post('/users/login', userLoginController.control);
router.put('/users/update', authSecurity, updateUserController.control);
router.delete('/users/delete', authSecurity, deleteUserController.control);

export { router };
