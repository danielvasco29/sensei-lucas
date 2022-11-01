import { prisma } from "../../../../../prisma/PrismaClient";

type RentDTO = {
    userId: string;
    bookstoreBooksId: string;
  }
  
class RentBookRepository { 
    
    async rent({
      bookstoreBooksId,
      userId,
      }: RentDTO): Promise<void> {
        
        await prisma.rentUserBook.create({
          data: {
            userId,
            bookstoreBooksId,
          },
        });
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