import { Request, Response } from 'express';

import { TurnAdminService } from './TurnAdminService';

class TurnAdminController {
  async control(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const userData = req.body;

    const userId = req.headers['x-user-id'] as string;

    const turnAdminService = new TurnAdminService();
    const turnAdmin = await turnAdminService.execute({ id, userData, userId });

    return res.status(201).json(turnAdmin);
  }
}

export { TurnAdminController };
