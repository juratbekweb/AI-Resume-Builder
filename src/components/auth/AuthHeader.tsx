type AuthHeaderProps = {
  title: string;
  subtitle?: string;
};

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h1>
      {subtitle ? <p className="mt-2 text-sm text-slate-400">{subtitle}</p> : null}
    </div>
  );
}
