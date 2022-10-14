import { Request, Response } from "express";
import { CreateBookService } from "./CreateBookService";

class CreateBookController {
    async control(req: Request, res: Response): Promise<Response> {
        // recebe id do user logado
        const { id } = req.user;

        // recebe body em json passados na requisição insominia 
        const bookData = req.body;

        // recebe id header passado pelo insominia
        const bookstoreId = req.headers['x-book-id'] as string;

        // executa validações id, bookstoreId, e passa o conteúdo data atualizado
        const createBookService = new CreateBookService();
        const createBook = await createBookService.execute({ bookData, id, bookstoreId });

        return res.status(200).json(createBook);
    }
}

export { CreateBookController }