import { Request, Response } from 'express';

import { CreateBookstoreLoginService } from './CreateBookstoreLoginService';

class CreateBookstoreLoginController {
  async control(req: Request, res: Response): Promise<Response> {
    const { name, adress } = req.body;

    const createBookstoreLoginService = new CreateBookstoreLoginService();
    const newToken = await createBookstoreLoginService.execute({
      name,
      adress,
    });

    return res.status(200).json(newToken);
  }
}

export { CreateBookstoreLoginController };
