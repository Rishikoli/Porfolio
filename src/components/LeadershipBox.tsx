import React from "react";

type LeadershipBoxProps = {
  title: string;
  subtitle?: string;
  description: string;
  icon?: React.ReactNode;
  tag?: string;
  href?: string;
};

export default function LeadershipBox({ title, subtitle, description, icon, tag, href }: LeadershipBoxProps) {
  const content = (
    <div className="group relative rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] transition-colors overflow-hidden">
      {/* Accent gradient edge */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-2)] to-[var(--color-accent)] opacity-60" />

      <div className="p-4 sm:p-5 flex items-start gap-3">
        <div className="shrink-0 h-9 w-9 rounded-xl bg-[color-mix(in_oklab,var(--color-accent)_18%,transparent)] text-background grid place-items-center">
          <span className="text-base">{icon ?? "🏅"}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base sm:text-lg font-semibold leading-tight">{title}</h3>
            {tag ? (
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wide">{tag}</span>
            ) : null}
          </div>
          {subtitle ? <p className="text-foreground/70 text-xs sm:text-sm mt-0.5">{subtitle}</p> : null}
          <p className="text-foreground/80 text-sm sm:text-base mt-2">{description}</p>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="block will-change-transform transition-transform hover:-translate-y-0.5">
        {content}
      </a>
    );
  }
  return content;
}
