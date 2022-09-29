import { Request, Response } from 'express';

import { CreateBookstoreLoginService } from '../services/CreateBookstoreLoginService';

class CreateBookstoreLoginController {
  async control(req: Request, res: Response): Promise<Response> {
    const { name, adress } = req.body;
    console.log('name', name);

    const createBookstoreLoginService = new CreateBookstoreLoginService();
    console.log('testeteste');
    const newToken = await createBookstoreLoginService.execute({
      name,
      adress,
    });
    console.log('newToken', newToken);

    return res.status(200).json(newToken);
  }
}

export { CreateBookstoreLoginController };
