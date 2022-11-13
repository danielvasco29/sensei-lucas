import { Request, Response } from "express";
import { CreateBookService } from "./CreateBookService";

class CreateBookController {
    /* 
        * 1 - recebe id do user logado
        * 2 - recebe body do json passados na requisição insominia 
        * 3 - recebe headers id passado pelo insominia
        * 4 - executa parâmetros id, bookstoreId, e passa o conteúdo data atualizado
    */
    async control(req: Request, res: Response): Promise<Response> {
        const { id: userId } = req.user;

        const bookData = req.body;
        
        const bookstoreId = req.headers['x-book-id'] as string;

        const createBookService = new CreateBookService();
        const createBook = await createBookService.execute({ bookData, userId, bookstoreId });

        return res.status(200).json(createBook);
    }
}

export { CreateBookController }