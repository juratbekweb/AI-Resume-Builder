"use client";

/* eslint-disable react-hooks/incompatible-library */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthCard } from "./AuthCard";
import { AuthHeader } from "./AuthHeader";
import { AuthFooter } from "./AuthFooter";
import { PasswordInput } from "./PasswordInput";
import { PasswordStrength } from "./PasswordStrength";

const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be less than 50 characters"),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be less than 50 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

type RegisterFormProps = {
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<void> | void;
};

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch("password", "");

  const handleFormSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setServerError(null);

    try {
      await onSubmit({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });
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
      <AuthHeader
        title="Create your account"
        subtitle="Start building AI-powered resumes in minutes"
      />
      <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-8 space-y-6">
        {serverError ? (
          <div className="rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-200">
            {serverError}
          </div>
        ) : null}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="firstName" className="block text-sm font-medium text-slate-200">
              First name
            </label>
            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              {...register("firstName")}
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
              className={`w-full rounded-xl border bg-slate-950/60 px-4 py-3 text-sm text-white transition placeholder:text-slate-500 focus:ring-2 focus:outline-none ${
                errors.firstName
                  ? "border-red-400/80 focus:border-red-300 focus:ring-red-500/40"
                  : "border-white/10 focus:border-cyan-400/80 focus:ring-cyan-500/40"
              }`}
              placeholder="Jane"
            />
            {errors.firstName ? (
              <p id="firstName-error" className="text-xs text-red-300">
                {errors.firstName.message}
              </p>
            ) : null}
          </div>
          <div className="space-y-1.5">
            <label htmlFor="lastName" className="block text-sm font-medium text-slate-200">
              Last name
            </label>
            <input
              id="lastName"
              type="text"
              autoComplete="family-name"
              {...register("lastName")}
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
              className={`w-full rounded-xl border bg-slate-950/60 px-4 py-3 text-sm text-white transition placeholder:text-slate-500 focus:ring-2 focus:outline-none ${
                errors.lastName
                  ? "border-red-400/80 focus:border-red-300 focus:ring-red-500/40"
                  : "border-white/10 focus:border-cyan-400/80 focus:ring-cyan-500/40"
              }`}
              placeholder="Doe"
            />
            {errors.lastName ? (
              <p id="lastName-error" className="text-xs text-red-300">
                {errors.lastName.message}
              </p>
            ) : null}
          </div>
        </div>
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
            className={`w-full rounded-xl border bg-slate-950/60 px-4 py-3 text-sm text-white transition placeholder:text-slate-500 focus:ring-2 focus:outline-none ${
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
        <PasswordInput
          id="password"
          label="Password"
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
          label="Confirm password"
          value={watch("confirmPassword", "")}
          onChange={(value) => {
            setValue("confirmPassword", value, { shouldValidate: true });
          }}
          error={errors.confirmPassword?.message}
          placeholder="Repeat your password"
          autoComplete="new-password"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>
      <AuthFooter prompt="Already have an account?" linkHref="/login" linkLabel="Sign in" />
    </AuthCard>
  );
}
