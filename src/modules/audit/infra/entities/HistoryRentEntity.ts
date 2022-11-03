import { HistoryRent } from "@prisma/client";

class HistoryRentEntity implements HistoryRent {
    readonly id: string;
    bookstoreId: string;
    bookId: string;
    userId: string;
    startDate: Date;
    endDate: Date;
    totalValue: string;
  

}

export { HistoryRentEntity }