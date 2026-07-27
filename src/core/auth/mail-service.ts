export interface MailService {
  sendPasswordResetEmail(to: string, resetLink: string): Promise<void>;
  sendVerificationEmail(to: string, verificationLink: string): Promise<void>;
}
