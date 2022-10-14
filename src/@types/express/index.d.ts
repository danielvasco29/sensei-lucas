declare namespace Express {
  export interface Request {
    user: {
      id: string;
      isAdmin: boolean;
    };
    bookstore: {
      id: string;
    };
    book: {
      id: string;
    };
  }
}
