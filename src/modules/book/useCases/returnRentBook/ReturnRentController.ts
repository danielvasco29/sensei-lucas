import { Request, Response } from "express";
import { ReturnRentService } from "./ReturnRentService";

class ReturnRentController {
    async control(req: Request, res: Response): Promise<Response> {
        const userId = req.headers['x-user-id'] as string;

        const rentBookUserId = req.headers['x-returnuserbook-id'] as string;

        const returnRentService = new ReturnRentService();

        const returnBook = await returnRentService.execute({ userId, returnRent: rentBookUserId });

        return res.status(200).json(returnBook);
    }
}

export { ReturnRentController }