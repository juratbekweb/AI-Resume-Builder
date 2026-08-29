"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthCard } from "./AuthCard";
import { AuthHeader } from "./AuthHeader";
import { AuthFooter } from "./AuthFooter";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

type ForgotPasswordFormProps = {
  onSubmit: (data: { email: string }) => Promise<{ error?: string } | void>;
  onBackToLogin?: () => void;
};

export function ForgotPasswordForm({ onSubmit, onBackToLogin }: ForgotPasswordFormProps) {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const handleFormSubmit = async (data: ForgotPasswordFormData) => {
    setLoading(true);
    setServerError(null);

    try {
      const result = await onSubmit({ email: data.email });

      if (result?.error) {
        setServerError(result.error);
      } else {
        setSuccess(true);
      }
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AuthCard>
        <AuthHeader title="Check your email" subtitle="We sent you a link to reset your password" />
        <div className="mt-8 space-y-6">
          <div className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-4 text-sm text-emerald-200">
            If an account exists, you will receive a password reset email shortly.
          </div>
          {onBackToLogin ? (
            <button
              type="button"
              onClick={onBackToLogin}
              className="w-full rounded-full border border-border bg-surface-elevated px-6 py-3 text-sm font-medium text-white transition hover:border-white/20 hover:bg-surface/60"
            >
              Back to login
            </button>
          ) : null}
        </div>
        <AuthFooter prompt="Remember your password?" linkHref="/login" linkLabel="Sign in" />
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <AuthHeader
        title="Forgot password?"
        subtitle="Enter your email and we'll send you a reset link"
      />
      <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-8 space-y-6">
        {serverError ? (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-200"
          >
            {serverError}
          </motion.div>
        ) : null}
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-sm font-medium text-slate-200">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full rounded-xl border bg-surface-elevated px-4 py-3 text-sm text-white transition placeholder:text-foreground-secondary focus:ring-2 focus:outline-none ${
              errors.email
                ? "border-red-400/80 focus:border-red-300 focus:ring-red-500/40"
                : "border-border focus:border-cyan-400/80 focus:ring-cyan-500/40"
            }`}
            placeholder="you@example.com"
          />
          {errors.email ? (
            <p id="email-error" className="text-xs text-red-300">
              {errors.email.message}
            </p>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Sending reset link..." : "Send reset link"}
        </button>
      </form>
      <AuthFooter prompt="Remember your password?" linkHref="/login" linkLabel="Sign in" />
    </AuthCard>
  );
}
