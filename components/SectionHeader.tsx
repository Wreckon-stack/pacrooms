"use client";

import { GlitchText } from "./GlitchText";

export function SectionHeader({
  index,
  title,
  subtitle,
  status,
}: {
  index: string;
  title: string;
  subtitle?: string;
  status?: string;
}) {
  return (
    <div className="mb-8 sm:mb-12">
      <div className="flex items-center gap-3 font-mono text-[10px] sm:text-[11px] tracking-[0.32em] text-backrooms-yellow/70 uppercase">
        <span className="text-alert-red">▌</span>
        <span>SECTION {index}</span>
        <span className="flex-1 h-px bg-backrooms-yellow/20" />
        {status && (
          <span className="flex items-center gap-1 text-terminal-green">
            <span className="h-1.5 w-1.5 rounded-full bg-terminal-green animate-flickerFast" />
            {status}
          </span>
        )}
      </div>
      <GlitchText
        as="h2"
        color="yellow"
        className="mt-3 text-3xl sm:text-5xl"
      >
        {title}
      </GlitchText>
      {subtitle && (
        <p className="mt-3 max-w-2xl font-mono text-sm text-zinc-400 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
