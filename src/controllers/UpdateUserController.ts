import { Request, Response } from 'express';

import { UpdateUserUseService } from '../services/UpdateUserUseService';

class UpdateUserController {
  async control(req: Request, res: Response): Promise<Response> {
    console.log('ataerasdsasdas:');
    const { id } = req.user;

    console.log('id:', { id });
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
