import { Tokens2 } from '@prisma/client';

class Token2Entity implements Tokens2 {
  readonly id: string;
  bookstoreId: string;
  token: string;
  readonly created_at: Date;
  readonly updated_at: Date;
}

export { Token2Entity };
