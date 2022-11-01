import { prisma } from "../../../../../prisma/PrismaClient";
import { RentBookEntity } from "../entities/RentBookEntity";

type RentDTO = {
    userId: string;
    bookstoreBooksId: string;
  }
  
class RentBookRepository { 
    
    async rent({
      bookstoreBooksId,
      userId,
      }: RentDTO): Promise<RentBookEntity> {
        
        const createRent = await prisma.rentUserBook.create({
          data: {
            userId,
            bookstoreBooksId,
          },
        });
        return createRent;
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