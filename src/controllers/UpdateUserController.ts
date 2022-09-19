import { Request, Response } from 'express';

import { UpdateUserUseService } from '../services/UpdateUserUseService';

class UpdateUserController {
  async control(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const userData = req.body;

    const updateUserUseService = new UpdateUserUseService();

    const updateUser = await updateUserUseService.execute({
      id,
      userData,
    });

    return res.status(200).json(updateUser);
  }
}

export { UpdateUserController };
