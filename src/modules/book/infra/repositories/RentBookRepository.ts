import { prisma } from "../../../../../prisma/PrismaClient";

type RentDTO = {
    userId: string;
    bookstoreBooksId: string;
  }
  
class RentBookRepository { 
    
    async rent({
        userId,
        bookstoreBooksId,
      }: RentDTO): Promise<void> {
        
        await prisma.rentUserBook.create({
          data: {
            userId,
            bookstoreBooksId,
          },
        });
      }

      
}

export { RentBookRepository }