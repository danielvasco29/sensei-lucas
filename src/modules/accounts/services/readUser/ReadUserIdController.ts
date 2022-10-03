import { Request, Response } from 'express';

import { ReadUserIdService } from './ReadUserIdService';

class ReadUserIdController {
  async control(req: Request, res: Response): Promise<Response> {
    const id = (req.headers['x-users-id'] as string) || (req.user.id as string);

    const readUserService = new ReadUserIdService();

    const readProfile = await readUserService.execute({ id });

    return res.status(200).json(readProfile);
  }
}

export { ReadUserIdController };
