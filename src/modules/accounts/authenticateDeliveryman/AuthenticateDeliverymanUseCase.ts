import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { prisma } from "../../../database/prismaClient";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    });

    if (!deliveryman) {
      throw new Error("Username or password is not correct");
    }

    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new Error("Username or password is not correct");
    }

    const token = sign({ username }, process.env.JWT_SECRET_DELIVERYMAN as string, {
      subject: deliveryman.id,
      expiresIn: process.env.JWT_EXPIRES
    });

    return token;
  }
}