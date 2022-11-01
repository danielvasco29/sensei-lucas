import { Request, Response } from "express";
import { RentBookService } from "./RentBookService";

class RentBookController {
    async control(req: Request, res: Response): Promise<Response> {
        const { userId } = req.user;

        const bookstoreBooksId = req.headers['x-bookstoreBook-id'] as string;

        const rentBookService = new RentBookService();
        
        await rentBookService.execute({ userId, bookstoreBooksId });

        return res.status(200).json();
    }
}

export { RentBookController }