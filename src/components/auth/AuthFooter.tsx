type AuthFooterProps = {
  prompt: string;
  linkHref: string;
  linkLabel: string;
};

export function AuthFooter({ prompt, linkHref, linkLabel }: AuthFooterProps) {
  return (
    <p className="text-center text-sm text-slate-400">
      {prompt}{" "}
      <a href={linkHref} className="font-medium text-cyan-300 transition hover:text-cyan-200">
        {linkLabel}
      </a>
    </p>
  );
}
