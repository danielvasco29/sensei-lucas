import { Request, Response } from 'express';

import { CreateBookstoreService } from './CreateBookstoreService';

class CreateBookstoreController {
  async control(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    
    const bookstoreData = req.body;

    const createBookstoreService = new CreateBookstoreService();
    
    const createBookstore = await createBookstoreService.execute({
      bookstoreData, id
    });

    return res.status(201).json(createBookstore);
  }
}

export { CreateBookstoreController };
