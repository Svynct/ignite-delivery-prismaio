import { hash } from "bcryptjs";

import { prisma } from "../../../../database/prismaClient";

interface ICreateDeliveryman {
  username: string;
  password: string;
}

export class CreateDeliverymanUseCase {
  async execute({ username, password }: ICreateDeliveryman) {
    const clientExist = await prisma.deliveryman.findFirst({
      where: {
        username: {
          mode: "insensitive",
          equals: username
        }
      },
    })

    if (clientExist) {
      throw new Error("Deliveryman already exists");
    }

    const hashPassword = await hash(password, 10);

    const client = await prisma.deliveryman.create({
      data: {
        username,
        password: hashPassword
      }
    })

    return client;
  }
}