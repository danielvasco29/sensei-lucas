import { Request, Response } from "express";
import { DeleteBookService } from "./DeleteBookService";

class DeleteBookController {
    async control(req: Request, res: Response): Promise<Response> {
        const { id } = req.user;

        const bookId = req.headers['x-book-id'] as string;

        const deleteBookService = new DeleteBookService();

        await deleteBookService.execute({ bookId, id })

        return res.status(200).send();
    }
}

export { DeleteBookController }