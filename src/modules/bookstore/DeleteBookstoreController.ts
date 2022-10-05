import { Request, Response } from 'express';

import { DeleteBookstoreService } from './DeleteBookstoreService';

class DeleteBookstoreController {
  async control(req: Request, res: Response): Promise<Response> {
    const id = req.headers['x-bookstore-id'] as string;

    const deleteBookstoreService = new DeleteBookstoreService();

    await deleteBookstoreService.execute({ id });

    return res.status(204).send();
  }
}

export { DeleteBookstoreController };
