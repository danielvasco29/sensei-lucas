import { Request, Response } from "express";
import { ReturnRentService } from "./ReturnRentService";

class ReturnRentController {
    async control(req: Request, res: Response): Promise<Response> {
        const userId = req.headers['x-user-id'] as string;

        const bookstoreBooksId = req.headers['x-rentuserbook-id'] as string;

        const returnRentService = new ReturnRentService();

        const returnBook = await returnRentService.execute({ userId, returnRent: bookstoreBooksId })

        return res.status(204).json(returnBook);
    }
}

export { ReturnRentController }