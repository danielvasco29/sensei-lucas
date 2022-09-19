import { Request, Response } from 'express';

import { ReadUserIdService } from '../services/ReadUserIdService';

class ReadUserIdController {
  async control(req: Request, res: Response): Promise<Response> {
    const { id } =
      (req.body as unknown as { id: string }) ||
      (req.user as unknown as { id: string });

    const readUserService = new ReadUserIdService();

    const readProfile = await readUserService.execute({ id });

    return res.status(200).json(readProfile);
  }
}

export { ReadUserIdController };
