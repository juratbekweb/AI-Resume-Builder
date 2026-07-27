"use client";

type RememberMeProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function RememberMe({ checked, onChange }: RememberMeProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        id="rememberMe"
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 rounded border-white/20 bg-slate-950/60 text-cyan-400 focus:ring-2 focus:ring-cyan-500/40"
      />
      <label htmlFor="rememberMe" className="text-sm text-slate-300">
        Remember me
      </label>
    </div>
  );
}
