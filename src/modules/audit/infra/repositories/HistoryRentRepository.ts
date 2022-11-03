import { prisma } from "../../../../../prisma/PrismaClient"
import { CreateHistoryRentDTO } from "../../@types/CreateHistoryRentDTO"
import { UpdateDTO } from "../../@types/UpdateDTO";
import { HistoryRentEntity } from "../entities/HistoryRentEntity"

class HistoryRentRepository {

    async CreateHistoryRent({ dataToCreateHistory }: CreateHistoryRentDTO): Promise<HistoryRentEntity> {
        const createHistory = await prisma.historyRent.create({ data: { ...dataToCreateHistory } })

        return createHistory;
    };

    async Update({ id, endDate, totalValue }: UpdateDTO): Promise<void> {
        await prisma.historyRent.update({
            where: {
                id
            },
            data: {
                endDate,
                totalValue
            }
        })
    }
}

export { HistoryRentRepository }