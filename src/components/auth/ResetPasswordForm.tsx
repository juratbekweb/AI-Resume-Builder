"use client";

/* eslint-disable react-hooks/incompatible-library */
import { useState } from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthCard } from "./AuthCard";
import { AuthHeader } from "./AuthHeader";
import { PasswordInput } from "./PasswordInput";
import { PasswordStrength } from "./PasswordStrength";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

type ResetPasswordFormProps = {
  onSubmit: (data: { password: string }) => Promise<{ error?: string } | void>;
  onSuccess?: () => void;
};

export function ResetPasswordForm({ onSubmit, onSuccess }: ResetPasswordFormProps) {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const password = watch("password", "");

  const handleFormSubmit = async (data: ResetPasswordFormData) => {
    setLoading(true);
    setServerError(null);

    try {
      const result = await onSubmit({ password: data.password });

      if (result?.error) {
        setServerError(result.error);
      } else {
        setSuccess(true);
        onSuccess?.();
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
        <AuthHeader
          title="Password updated"
          subtitle="Your password has been successfully reset"
        />
        <div className="mt-8 space-y-6">
          <div className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-4 text-sm text-emerald-200">
            You can now sign in with your new password.
          </div>
          <a
            href="/login"
            className="block w-full rounded-full bg-cyan-400 px-6 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Sign in
          </a>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <AuthHeader
        title="Reset your password"
        subtitle="Enter your new password below"
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
        <PasswordInput
          id="password"
          label="New password"
          value={watch("password", "")}
          onChange={(value) => {
            setValue("password", value, { shouldValidate: true });
          }}
          error={errors.password?.message}
          placeholder="Create a strong password"
          autoComplete="new-password"
        />
        <PasswordStrength password={password} />
        <PasswordInput
          id="confirmPassword"
          label="Confirm new password"
          value={watch("confirmPassword", "")}
          onChange={(value) => {
            setValue("confirmPassword", value, { shouldValidate: true });
          }}
          error={errors.confirmPassword?.message}
          placeholder="Repeat your new password"
          autoComplete="new-password"
        />
        <motion.button
          type="submit"
          disabled={loading}
          className="premium-button w-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/60 hover:scale-105 transition-all disabled:cursor-not-allowed disabled:opacity-70"
          whileTap={{ scale: 0.98 }}
        >
          {loading ? "Resetting password..." : "Reset password"}
        </motion.button>
      </form>
    </AuthCard>
  );
}