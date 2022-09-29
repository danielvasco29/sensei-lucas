import { Bookstore } from '@prisma/client';

class BookstoreEntity implements Bookstore {
  readonly id_bookstore: string;
  name: string;
  adress: string;
  readonly created_at: Date;
  readonly updated_at: Date;
}

export { BookstoreEntity };
