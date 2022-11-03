import { AppError } from "../../../../errors/AppError";
import { BookRepository } from "../../infra/repositories/BookRepository";
import { BookstoreBookRepository } from "../../infra/repositories/BookstoreBookRepository";
import { RentBookRepository } from "../../infra/repositories/RentBookRepository";

class ReturnRentService {
    async execute({ returnRent, userId }) {
        const rentBookRepository = new RentBookRepository();
        const bookstoreBookRepository = new BookstoreBookRepository();

        const verifyRent = await rentBookRepository.verifyRentExists({ id: returnRent })
        if(verifyRent.userId != userId) throw new AppError('You arent the user who rent this book!')

        if(!verifyRent) throw new AppError('Book is not rented')

        const now = new Date(Date.now()) as Date;
        const rented_at = new Date(verifyRent.rented_at) as Date;

        const { bookId } = await bookstoreBookRepository.findById({ bookstoreBooksId: verifyRent.bookstoreBooksId })

        const bookRepository = new BookRepository();
        const book = await bookRepository.findById({ bookId });

        const { hourValue } = book;

        const parsedNow = now as unknown as number;
        const parsedRentedAt = rented_at as unknown as number;

        const time = Math.abs(parsedNow - parsedRentedAt);

        const minutes = Math.ceil(time / (1000 * 60));
        const coefficientHours = minutes / 60;

        const total = (coefficientHours * hourValue).toFixed(2);

        await bookstoreBookRepository.updateToNotRented({ bookstoreBooksId: verifyRent.bookstoreBooksId })

        await rentBookRepository.delete({ returnRent })

        return { total, coefficientHours }
    }

}

export { ReturnRentService }