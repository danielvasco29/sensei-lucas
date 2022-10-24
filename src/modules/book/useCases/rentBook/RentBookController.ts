import { Request, Response } from "express";
import { RentBookService } from "./RentBookService";

class RentBookController {
    async control(req: Request, res: Response): Promise<Response> {
        const rentBookService = new RentBookService();
        
        rentBookService

        return res.status(200).json()
    }
}

export { RentBookController }