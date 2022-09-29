import { Request, Response } from 'express';

import { CreateBookstoreLoginService } from '../services/CreateBookstoreLoginService';

class CreateBookstoreLoginController {
  async control(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    console.log('name', name);

    const createBookstoreLoginService = new CreateBookstoreLoginService();
    const newToken = await createBookstoreLoginService.execute({ name });
    console.log('newToken', newToken);

    return res.status(200).json(newToken);
  }
}

export { CreateBookstoreLoginController };
