import { Request, Response } from 'express';

import { UpdatePasswordService } from '../services/UpdatePasswordService';

class UpdatePasswordController {
  async control(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const userData = req.body;

    const updatePasswordService = new UpdatePasswordService();

    const updatePass = await updatePasswordService.execute({ id, userData });

    return res.status(200).json(updatePass);
  }
}

export { UpdatePasswordController };
