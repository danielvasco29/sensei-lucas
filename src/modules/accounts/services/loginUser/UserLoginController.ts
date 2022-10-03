import { Request, Response } from 'express';

import { UserLoginService } from './UserLoginService';

class UserLoginController {
  async control(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const userLoginService = new UserLoginService();
    const newToken = await userLoginService.execute({
      email,
      password,
    });

    return res.status(200).json(newToken);
  }
}

export { UserLoginController };
