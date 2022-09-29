import { Request, Response } from 'express';

import { UpdateBookstoreService } from '../services/UpdateBookstoreService';

class UpdateBookstoreController {
  async control(req: Request, res: Response): Promise<Response> {
    const { id } = req.bookstore;
    console.log('aaaaaaaaaaaaaa', id);

    const bookstoreData = req.body;
    console.log('bookstoreData', bookstoreData);

    const updateBookstoreService = new UpdateBookstoreService();
    const updatedBookstore = await updateBookstoreService.execute({
      id,
      bookstoreData,
    });

    console.log('updatedBookstore', updatedBookstore);
    return res.status(200).json(updatedBookstore);
  }
}

export { UpdateBookstoreController };
