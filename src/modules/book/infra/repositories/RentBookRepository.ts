import { RentUserBook } from "@prisma/client";
import { prisma } from "../../../../../prisma/PrismaClient";
import { RentDTO } from "../../@types/RentDTO";

class RentBookRepository { 
    
  async rent({
    userId,
    bookstoreBooksId,
  }: RentDTO): Promise<RentUserBook> {
    
    const rent = await prisma.rentUserBook.create({
      data: {
        bookstoreBooksId,
        userId
      }
    });
    return rent;
  }
}

export { RentBookRepository }