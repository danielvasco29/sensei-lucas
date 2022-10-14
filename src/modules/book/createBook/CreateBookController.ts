import { Request, Response } from "express";
import { CreateBookService } from "./CreateBookService";

class CreateBookController {
    async control(req: Request, res: Response): Promise<Response> {
        const { id } = req.user;

        const bookData = req.body;

        const createBookService = new CreateBookService();

        const createBook = await createBookService.execute({ bookData, id });

        return res.status(200).json(createBook);
    }
}

export { CreateBookController }