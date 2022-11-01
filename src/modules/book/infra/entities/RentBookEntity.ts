import { RentUserBook } from "@prisma/client";

class RentBookEntity implements RentUserBook {
    readonly id: string;
    rented_at: Date;
    userId: string;
    bookstoreBooksId: string;

}

export { RentBookEntity }