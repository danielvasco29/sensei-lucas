import { Request, Response } from 'express';

import { UpdateUserService } from './UpdateUserService';

class UpdateUserController {
  async control(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const userData = req.body;

    const updateUserUseService = new UpdateUserService();

    const updateUser = await updateUserUseService.execute({
      id,
      userData,
    });

    return res.status(200).json(updateUser);
  }
}

export { UpdateUserController };
