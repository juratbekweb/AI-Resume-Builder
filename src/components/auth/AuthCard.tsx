type AuthCardProps = {
  children: React.ReactNode;
};

export function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl sm:p-10">
      {children}
    </div>
  );
}
