import { Request, Response } from 'express';

import { ReadAllUserService } from './ReadAllUserService';

class ReadAllUserController {
  async control(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const readAllUserService = new ReadAllUserService();

    const getAllUsers = await readAllUserService.execute({ id });

    return res.status(200).json(getAllUsers);
  }
}

export { ReadAllUserController };
