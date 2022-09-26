import { Bookstore } from '@prisma/client';

class BookstoreEntity implements Bookstore {
  readonly id: string;
  name: string;
  adress: string;
  readonly created_at: Date;
  readonly updated_at: Date;
}

export { BookstoreEntity };
