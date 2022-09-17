import { Request, Response } from 'express';

class UserLoginController {
  async control(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const userLoginUseService = new UserLoginUseService();

    const newToken = await this.userLoginUseService.execute({
      email,
      password,
    });

    return res.status(200).json(newToken);
  }
}

export { UserLoginController };
