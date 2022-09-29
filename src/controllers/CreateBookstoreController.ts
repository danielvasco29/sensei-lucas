import { Request, Response } from 'express';

import { CreateBookstoreService } from '../services/CreateBookstoreService';

class CreateBookstoreController {
  async control(req: Request, res: Response): Promise<Response> {
    const userObject = req.body;

    const createBookstoreService = new CreateBookstoreService();
    const createBookstore = await createBookstoreService.execute({
      bookstoreData: userObject,
    });

    return res.status(201).json(createBookstore);
  }
}

export { CreateBookstoreController };
