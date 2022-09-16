import { Router } from 'express';

import { CreateUserController } from '../../controllers/CreateUserController';
import { errorHandle } from '../../utils/errorHandle';

const router = Router();

const createUserController = new CreateUserController();

router.post('/users/create', errorHandle, createUserController.control);

export { router };
