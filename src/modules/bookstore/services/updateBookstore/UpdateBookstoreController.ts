import { Request, Response } from 'express';

import { UpdateBookstoreService } from './UpdateBookstoreService';

class UpdateBookstoreController {
  async control(req: Request, res: Response): Promise<Response> {
    const { id } = req.bookstore;

    const bookstoreData = req.body;

    const updateBookstoreService = new UpdateBookstoreService();
    const updatedBookstore = await updateBookstoreService.execute({
      id,
      bookstoreData,
    });

    return res.status(200).json(updatedBookstore);
  }
}

export { UpdateBookstoreController };
