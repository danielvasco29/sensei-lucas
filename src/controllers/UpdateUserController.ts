import { Request, Response } from 'express';

import { UpdateUserUseService } from '../services/UpdateUserUseService';

class UpdateUserController {
  constructor(private updateUserUseService: UpdateUserUseService) {}

  async control(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    const userData = req.body;

    const updateUser = await this.updateUserUseService.execute({
      id,
      userData,
    });

    return res.status(200).json(updateUser);
  }
}

export { UpdateUserController };
