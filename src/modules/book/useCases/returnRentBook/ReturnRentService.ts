import { AppError } from "../../../../errors/AppError";
import { RentBookRepository } from "../../infra/repositories/RentBookRepository";

class ReturnRentService {
    async execute({ returnRent, userId }) {
        const rentBookRepository = new RentBookRepository();

        const verifyRent = await rentBookRepository.verifyRentExists({ id: returnRent })
        if(verifyRent.userId != userId) throw new AppError('You arent the user who rent this book"')

        if(!verifyRent) throw new AppError('Book is not rented')
    }

}

export { ReturnRentService }