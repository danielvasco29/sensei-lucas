import { Request, Response } from 'express';

import { DeleteUserService } from './DeleteUserService';

class DeleteUserController {
  async control(req: Request, res: Response): Promise<Response> {
    const id = req.headers['x-users-id'] as string;

    const deleteUserService = new DeleteUserService();

    const deleteUser = await deleteUserService.execute({ id });

    return res.status(204).send();
  }
}

export { DeleteUserController };
