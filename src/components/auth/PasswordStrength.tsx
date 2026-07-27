"use client";

type PasswordStrengthProps = {
  password: string;
};

type Strength = {
  label: string;
  color: string;
  width: string;
};

const getStrength = (password: string): Strength => {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  switch (score) {
    case 0:
    case 1:
      return { label: "Weak", color: "bg-red-500", width: "20%" };
    case 2:
      return { label: "Fair", color: "bg-orange-500", width: "40%" };
    case 3:
      return { label: "Good", color: "bg-yellow-500", width: "60%" };
    case 4:
      return { label: "Strong", color: "bg-emerald-500", width: "80%" };
    default:
      return { label: "Very strong", color: "bg-emerald-400", width: "100%" };
  }
};

export function PasswordStrength({ password }: PasswordStrengthProps) {
  if (!password) return null;

  const { label, color, width } = getStrength(password);

  return (
    <div className="space-y-1.5">
      <div className="h-1.5 w-full rounded-full bg-white/10">
        <div
          className={`h-full rounded-full transition-all duration-300 ${color}`}
          style={{ width }}
        />
      </div>
      <p className="text-xs text-slate-400">Password strength: {label}</p>
    </div>
  );
}
