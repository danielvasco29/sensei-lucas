import { RentUserBook } from "@prisma/client";

class RentBookEntity implements RentUserBook {
    id: string;
    rented_at: Date;
    userId: string;
    bookstoreBooksId: string;
    historyId: string;
}

export { RentBookEntity }