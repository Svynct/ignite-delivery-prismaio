import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { prisma } from "../../../database/prismaClient";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    });

    if (!client) {
      throw new Error("Username or password is not correct");
    }

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error("Username or password is not correct");
    }

    const token = sign({ username }, process.env.JWT_SECRET_CLIENT as string, {
      subject: client.id,
      expiresIn: process.env.JWT_EXPIRES
    });

    return token;
  }
}