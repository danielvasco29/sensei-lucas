import { Request, Response } from 'express';

import { UserLogoutService } from './UserLogoutService';

class UserLogoutController {
  async control(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const userLogoutService = new UserLogoutService();

    await userLogoutService.execute({ userId: id });

    return res.status(204).send();
  }
}

export { UserLogoutController };
