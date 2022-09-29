declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    bookstore: {
      id: string;
    };
  }
}
