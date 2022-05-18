import { prisma } from "../../../../database/prismaClient";

interface IUpdateDeliveryman {
  id_delivery: string;
  id_deliveryman: string;
}

export class UpdateDeliveryEndDateUseCase {
  async execute({ id_delivery, id_deliveryman }: IUpdateDeliveryman) {
    const deliveryHasEnded = await prisma.deliveries.findFirst({
      where: {
        id: id_delivery
      }
    })

    if (deliveryHasEnded?.end_at !== null) {
      throw new Error("This delivery has already ended")
    }

    const result = await prisma.deliveries.updateMany({
      where: {
        id: id_delivery,
        id_deliveryman
      },
      data: {
        end_at: new Date()
      }
    })

    return result;
  }
}