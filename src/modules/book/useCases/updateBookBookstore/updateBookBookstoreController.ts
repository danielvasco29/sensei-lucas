import { Request, Response } from "express";
import { UpdateBookBookstoreService } from "./updateBookBookstoreService";

class UpdateBookBookstoreController {
    async control(req: Request, res: Response): Promise<Response> {
        const bookId = req.headers['x-book-id'] as string;
        console.log('bookId', bookId)

        const bookstoreId = req.headers['x-bookstore-id'] as string;
        console.log('bookstoreId', bookstoreId)

        const updateBookBookstoreService = new UpdateBookBookstoreService();

        const updateBookBookstore = await updateBookBookstoreService.execute({ bookstoreId, bookId });
        console.log('updateBookBookstore', updateBookBookstore)

        return res.status(200).json(updateBookBookstore);
    }
}

export { UpdateBookBookstoreController }