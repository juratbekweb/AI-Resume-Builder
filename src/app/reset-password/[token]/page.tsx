import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { PasswordResetService } from "@/core/auth/password-reset-service";
import { PrismaPasswordResetRepository } from "@/core/auth/prisma-password-reset-repository";

const passwordResetService = new PasswordResetService(new PrismaPasswordResetRepository());

export const dynamic = "force-dynamic";

type ResetPasswordPageProps = {
  params: Promise<{ token: string }>;
};

export default async function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  const { token } = await params;
  const verification = await passwordResetService.verifyToken(token);

  if (!verification.valid) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
        <div className="w-full max-w-md space-y-6 text-center">
          <h1 className="text-2xl font-semibold text-white">Invalid or expired link</h1>
          <p className="text-sm text-slate-400">
            This password reset link is invalid or has expired. Please request a new one.
          </p>
          <a
            href="/forgot-password"
            className="inline-block rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Request new link
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
      <ResetPasswordForm
        onSubmit={async (data) => {
          await passwordResetService.resetPassword(token, data.password);
        }}
        onSuccess={() => {
          // handled by success state in form
        }}
      />
    </div>
  );
}
