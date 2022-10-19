import { Request, Response } from "express";
import { ReadBookService } from "./ReadBookService";

class ReadBookController {
    /* 
    * 1- Receber o bookstoreId.
    * 2- Receber o bookName.
    * 3- Listar os itens.
    */
    async control(req: Request, res: Response): Promise<Response> {
        const {
            bookId: queryBook,
            bookstore: queryBookstore,
            all,
          } = req.query as unknown as {
            bookId: string;
            bookstore: string;
            all: string;
          };

        const readBookService = new ReadBookService();

        const findByBookstore = await readBookService.execute({ queryBook, queryBookstore, all })

        return res.status(200).json(findByBookstore)
    }
}

export { ReadBookController }