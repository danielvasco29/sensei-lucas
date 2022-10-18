import { BookstoreBooks } from "@prisma/client";

class BookstoreBookEntity implements BookstoreBooks {
    bookstoreId: string;
    bookId: string;
}

export { BookstoreBookEntity }
