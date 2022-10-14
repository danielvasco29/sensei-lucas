import { Request, Response } from "express";
import { CreateBookService } from "./CreateBookService";

class CreateBookController {
    async control(req: Request, res: Response) {
        const { id } = req.user;

        const bookstoreData = req.body;

        const createBookService = new CreateBookService();

        const createBook = createBookService.execute({ bookstoreData, id });

        return res.status(200).json(createBook);
    }
}

export { CreateBookController }