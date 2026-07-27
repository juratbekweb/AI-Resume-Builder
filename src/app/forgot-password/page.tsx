import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { PasswordResetService } from "@/core/auth/password-reset-service";
import { PrismaPasswordResetRepository } from "@/core/auth/prisma-password-reset-repository";

const passwordResetService = new PasswordResetService(new PrismaPasswordResetRepository());

export const dynamic = "force-dynamic";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
      <ForgotPasswordForm
        onSubmit={async (data) => {
          await passwordResetService.requestReset(data.email);
        }}
        onBackToLogin={() => {
          // handled by link in footer
        }}
      />
    </div>
  );
}
