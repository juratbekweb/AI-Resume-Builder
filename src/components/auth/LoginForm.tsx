"use client";

/* eslint-disable react-hooks/incompatible-library */
import { useState } from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthCard } from "./AuthCard";
import { AuthHeader } from "./AuthHeader";
import { AuthFooter } from "./AuthFooter";
import { PasswordInput } from "./PasswordInput";
import { RememberMe } from "./RememberMe";
import { OAuthButtons } from "./OAuthButtons";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Please enter your password"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

type LoginFormProps = {
  onLogin: (data: {
    email: string;
    password: string;
    rememberMe?: boolean;
  }) => Promise<{ error?: string } | void>;
  onForgotPassword?: () => void;
  onOAuthProviderClick?: (provider: string) => void;
};

export function LoginForm({ onLogin, onForgotPassword, onOAuthProviderClick }: LoginFormProps) {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleFormSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setServerError(null);

    try {
      const result = await onLogin({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });

      if (result?.error) {
        setServerError(result.error);
      }
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <AuthHeader title="Welcome back" subtitle="Sign in to continue to your dashboard" />
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
            className={`w-full rounded-xl border bg-slate-950/60 px-4 py-3 text-sm text-white transition placeholder:text-slate-500 focus:ring-2 focus:outline-none premium-input ${
              errors.email
                ? "border-red-400/80 focus:border-red-300 focus:ring-red-500/40"
                : "border-white/10 focus:border-cyan-400/80 focus:ring-cyan-500/40"
            }`}
            placeholder="you@example.com"
          />
          {errors.email ? (
            <p id="email-error" className="text-xs text-red-300">
              {errors.email.message}
            </p>
          ) : null}
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-slate-200">
              Password
            </label>
            {onForgotPassword ? (
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-xs font-medium text-cyan-300 transition hover:text-cyan-200"
              >
                Forgot password?
              </button>
            ) : null}
          </div>
          <PasswordInput
            id="password"
            label=""
            value={watch("password", "")}
            onChange={(value) => {
              setValue("password", value, { shouldValidate: true });
            }}
            error={errors.password?.message}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </div>
        <div className="flex items-center justify-between">
          <RememberMe checked={rememberMe} onChange={setRememberMe} />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:from-cyan-400 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-70 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 hover:scale-[1.02] premium-button"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
      {onOAuthProviderClick ? (
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs tracking-wider text-slate-500 uppercase">
              <span className="bg-slate-900/80 px-2">Or continue with</span>
            </div>
          </div>
          <div className="mt-4">
            <OAuthButtons onProviderClick={onOAuthProviderClick} />
          </div>
        </div>
      ) : null}
      <AuthFooter prompt="Don't have an account?" linkHref="/register" linkLabel="Create account" />
    </AuthCard>
  );
}
