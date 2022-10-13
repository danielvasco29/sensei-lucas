import { Request, Response } from "express";
import { ReadBookstoreService } from "./ReadBookstoreService";

class ReadBookstoreController {
    async control(req: Request, res: Response): Promise<Response> {
        const bookstoreData = req.headers['x-bookstore-id'] as string;

        const readBookstoreService = new ReadBookstoreService();

        const listBookstore = await readBookstoreService.execute({ bookstoreData });

        return res.status(200).json(listBookstore)
    }
}

export { ReadBookstoreController }