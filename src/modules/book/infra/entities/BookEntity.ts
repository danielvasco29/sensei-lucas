import { Book } from '@prisma/client';

class BookEntity implements Book {
    readonly id: string;
    name: string;
    author: string;
    readonly created_at: Date;
    readonly updated_at: Date;
    
}

export { BookEntity }