import { randomBytes } from "crypto";
import { hash } from "bcryptjs";
import type { MailService } from "./mail-service";

export interface EmailVerificationRepository {
  create(input: {
    userId: string;
    tokenHash: string;
    expiresAt: Date;
  }): Promise<unknown>;
  findValidToken(tokenHash: string): Promise<unknown | null>;
  markVerified(tokenHash: string): Promise<unknown>;
  invalidateAllForUser(userId: string): Promise<unknown>;
}

export class EmailVerificationService {
  constructor(
    private readonly repository: EmailVerificationRepository,
    private readonly mailService: MailService
  ) {}

  async requestVerification(userId: string, email: string) {
    const rawToken = randomBytes(32).toString("hex");
    const tokenHash = await hash(rawToken, 10);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await this.repository.invalidateAllForUser(userId);
    await this.repository.create({
      userId,
      tokenHash,
      expiresAt,
    });

    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/verify-email/${rawToken}`;

    await this.mailService.sendVerificationEmail(email, verificationLink);

    return { success: true };
  }

  async verifyToken(token: string) {
    const tokenHash = await hash(token, 10);
    const record = await this.repository.findValidToken(tokenHash);

    if (!record) {
      return { valid: false, reason: "invalid_or_expired" };
    }

    await this.repository.markVerified(tokenHash);

    return { valid: true };
  }
}
