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

  async verifyRentExists({ id: returnRent }) {
    const find = await prisma.rentUserBook.findFirst({
      where: {
        id: returnRent 
      }, 
    })
    return find;
  }
}

export { RentBookRepository }