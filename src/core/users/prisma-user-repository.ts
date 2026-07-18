import { prisma } from "../../lib/prisma";

export class PrismaUserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async create(input: { email: string; name?: string | null }) {
    return prisma.user.create({
      data: {
        email: input.email,
        name: input.name ?? null,
      },
    });
  }
}
