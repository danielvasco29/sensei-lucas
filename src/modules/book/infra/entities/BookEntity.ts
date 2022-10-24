import { Book } from '@prisma/client';

class BookEntity implements Book {
    readonly id: string;
    name: string;
    author: string;
    hourValue: number;   
}

export { BookEntity }