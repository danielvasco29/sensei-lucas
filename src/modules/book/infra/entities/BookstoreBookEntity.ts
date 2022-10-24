import { BookstoreBooks } from "@prisma/client";

class BookstoreBookEntity implements BookstoreBooks {
    id: string;
    bookstoreId: string;
    bookId: string;
    rented: boolean;
   
 
}

export { BookstoreBookEntity }
