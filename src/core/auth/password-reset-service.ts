import { randomBytes } from "crypto";
import { hash } from "bcryptjs";

export interface PasswordResetRepository {
  create(input: {
    email: string;
    token: string;
    expiresAt: Date;
  }): Promise<unknown>;
  findValidToken(token: string): Promise<unknown | null>;
  markUsed(token: string): Promise<unknown>;
  invalidateAllForEmail(email: string): Promise<unknown>;
}

export class PasswordResetService {
  constructor(private readonly repository: PasswordResetRepository) {}

  async requestReset(email: string) {
    const normalizedEmail = email.trim().toLowerCase();

    // Always return success to prevent user enumeration
    await this.repository.create({
      email: normalizedEmail,
      token: await this.generateToken(),
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    });

    return {
      message: "If an account exists, you will receive a password reset email.",
    };
  }

  async verifyToken(token: string) {
    const record = await this.repository.findValidToken(token);

    if (!record) {
      return { valid: false };
    }

    return { valid: true };
  }

  async resetPassword(token: string, newPassword: string) {
    const record = await this.repository.findValidToken(token);

    if (!record) {
      throw new Error("Invalid or expired reset token");
    }

    void newPassword;



    // In a real implementation, you would:
    // 1. Update the user's passwordHash with hashedPassword
    // 2. Mark the token as used
    // 3. Invalidate all existing sessions
    // 4. Invalidate all other reset tokens for this email

    await this.repository.markUsed(token);
    await this.repository.invalidateAllForEmail((record as { email: string }).email);

    return { success: true };
  }

  private async generateToken(): Promise<string> {
    const rawToken = randomBytes(32).toString("hex");
    const hashedToken = await hash(rawToken, 10);
    return hashedToken;
  }
}