import { Request, Response } from 'express';
import { BookstoreEntity } from '../../../../database/entities/BookstoreEntity';
import { UpdateBookstoreService } from './UpdateBookstoreService';

class UpdateBookstoreController {
  async control(req: Request, res: Response): Promise<Response> {
    // recebe id do user logado
    const { id } = req.user;
   
    // recebe body em json passados na requisição insominia 
    const data = req.body as Partial<BookstoreEntity>;

    // recebe id header passado pelo insominia
    const bookstoreId = req.headers['x-bookstore-id'] as string; 

    // executa validações id, bookstoreId, e passa o conteúdo data atualizado
    const updateBookstoreService = new UpdateBookstoreService();
    const updatedBookstore = await updateBookstoreService.execute({
      bookstoreId, data, id,
    });

    // retorna o valor na tela
    return res.status(200).json(updatedBookstore);
  }
}

export { UpdateBookstoreController };
