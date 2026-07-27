"use client";

type OAuthButtonsProps = {
  onProviderClick: (provider: string) => void;
};

const providers = [
  { id: "google", label: "Continue with Google" },
  { id: "github", label: "Continue with GitHub" },
];

export function OAuthButtons({ onProviderClick }: OAuthButtonsProps) {
  return (
    <div className="space-y-3">
      {providers.map((provider) => (
        <button
          key={provider.id}
          type="button"
          onClick={() => onProviderClick(provider.id)}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-4 py-3 text-sm font-medium text-white transition hover:border-white/20 hover:bg-slate-900/60"
        >
          <span className="h-5 w-5 rounded-full border border-white/20" aria-hidden />
          {provider.label}
        </button>
      ))}
    </div>
  );
}
