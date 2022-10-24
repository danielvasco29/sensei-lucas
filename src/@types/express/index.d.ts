declare namespace Express {
  export interface Request {
    user: {
      id: string;
      isAdmin?: boolean;
      userId: string;
    };
    bookstore: {
      id: string;
    };
    book: {
      id: string;
    };
  }
}
