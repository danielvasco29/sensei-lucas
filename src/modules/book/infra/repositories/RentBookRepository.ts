import { prisma } from "../../../../../prisma/PrismaClient";
import { RentBookEntity } from "../entities/RentBookEntity";

type RentDTO = {
    userId: string;
    bookstoreBooksId: string;
    historyRentId: string;
  }

type DeleteDTO = {
  returnRent: string;
}
  
class RentBookRepository { 
    
    async rent({
      bookstoreBooksId,
      userId,
      historyRentId
      }: RentDTO): Promise<RentBookEntity> {
        
        const createRent = await prisma.rentUserBook.create({
          data: {
            userId,
            bookstoreBooksId, 
            historyId: historyRentId
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

      async delete({ returnRent }: DeleteDTO): Promise<void> {
        await prisma.rentUserBook.delete({
          where: {
            id: returnRent
          }
        })
      }
    }


export { RentBookRepository }