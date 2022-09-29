import { Request, Response } from 'express';

import { CreateUserService } from '../services/CreateUserService';

class CreateUserController {
  async control(req: Request, res: Response): Promise<Response> {
    const userObject = req.body;

    const createUserService = new CreateUserService();
    const newUser = await createUserService.execute({ userData: userObject });

    return res.status(201).json(newUser);
  }
}

export { CreateUserController };
