"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlitchTextProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "div" | "p";
  className?: string;
  color?: "yellow" | "green" | "red" | "amber" | "white";
  intensity?: "low" | "normal" | "high";
}

const COLOR: Record<NonNullable<GlitchTextProps["color"]>, string> = {
  yellow: "text-backrooms-yellow",
  green: "text-terminal-green",
  red: "text-alert-red",
  amber: "text-terminal-amber",
  white: "text-zinc-200",
};

export function GlitchText({
  children,
  as: Tag = "h2",
  className,
  color = "yellow",
  intensity = "normal",
}: GlitchTextProps) {
  const text = typeof children === "string" ? children : undefined;
  return (
    <Tag
      data-text={text}
      className={cn(
        "relative inline-block font-glitch tracking-[0.18em] uppercase",
        COLOR[color],
        intensity === "high" && "animate-flickerFast",
        intensity === "normal" && "animate-flicker",
        className,
      )}
    >
      {/* base layer */}
      <span className="relative z-10">{children}</span>
      {/* glitch dupes */}
      {text && (
        <>
          <span
            aria-hidden
            className="absolute inset-0 z-0 mix-blend-screen text-alert-red/80 animate-glitchShift translate-x-[1px]"
          >
            {text}
          </span>
          <span
            aria-hidden
            className="absolute inset-0 z-0 mix-blend-screen text-terminal-green/70 animate-glitchShift -translate-x-[1px]"
            style={{ animationDelay: "0.15s" }}
          >
            {text}
          </span>
        </>
      )}
    </Tag>
  );
}
