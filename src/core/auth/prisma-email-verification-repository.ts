import { prisma } from "../../lib/prisma";
import type { EmailVerificationRepository } from "./email-verification-service";

export class PrismaEmailVerificationRepository implements EmailVerificationRepository {
  async create(input: { userId: string; tokenHash: string; expiresAt: Date }) {
    return prisma.emailVerification.create({
      data: {
        userId: input.userId,
        tokenHash: input.tokenHash,
        expires: input.expiresAt,
      },
    });
  }

  async findValidToken(tokenHash: string) {
    return prisma.emailVerification.findFirst({
      where: {
        tokenHash,
        verifiedAt: null,
        expires: { gt: new Date() },
      },
    });
  }

  async markVerified(tokenHash: string) {
    return prisma.emailVerification.updateMany({
      where: { tokenHash },
      data: { verifiedAt: new Date() },
    });
  }

  async invalidateAllForUser(userId: string) {
    return prisma.emailVerification.updateMany({
      where: { userId, verifiedAt: null },
      data: { verifiedAt: new Date() },
    });
  }
}
