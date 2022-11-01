import { BookstoreBooks } from "@prisma/client";

class BookstoreBookEntity implements BookstoreBooks {
    readonly id: string;
    bookstoreId: string;
    bookId: string;
    rented: boolean;
   
 
}

export { BookstoreBookEntity }
