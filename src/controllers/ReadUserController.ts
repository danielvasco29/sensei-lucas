import { Request, Response } from 'express';

import { ReadUserService } from '../services/ReadUserService';

class ReadUserController {
  async control(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const readUserService = new ReadUserService();

    const readProfile = await readUserService.execute({ id });

    return res.status(200).json(readProfile);
  }
}

export { ReadUserController };
