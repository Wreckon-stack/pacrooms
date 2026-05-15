"use client";

import { cn } from "@/lib/utils";

/**
 * Full-bleed overlay: scanlines, vignette, dust, jitter.
 * Pointer-events: none. Lives above content, below modals.
 */
export function CRTOverlay({
  intensity = "normal",
  className,
}: {
  intensity?: "low" | "normal" | "high";
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-[60] mix-blend-screen",
        className,
      )}
    >
      {/* scanlines */}
      <div
        className={cn(
          "absolute inset-0 bg-scanlines",
          intensity === "low" && "opacity-30",
          intensity === "normal" && "opacity-60",
          intensity === "high" && "opacity-80",
        )}
      />
      {/* phosphor flicker */}
      <div className="absolute inset-0 bg-terminal-green/[0.012] animate-flicker" />
      {/* vignette */}
      <div className="absolute inset-0 bg-crtNoise opacity-90 mix-blend-multiply" />
      {/* moving scan band */}
      <div className="absolute inset-x-0 -top-1/2 h-1/2 bg-gradient-to-b from-transparent via-terminal-green/5 to-transparent animate-scanline" />
      {/* dust particles */}
      <div className="absolute inset-0 opacity-[0.07] animate-dust [background-image:radial-gradient(circle_at_10%_20%,#fff_0.5px,transparent_0.6px),radial-gradient(circle_at_70%_80%,#fff_0.5px,transparent_0.6px),radial-gradient(circle_at_30%_60%,#fff_0.5px,transparent_0.6px),radial-gradient(circle_at_90%_40%,#fff_0.5px,transparent_0.6px)] [background-size:120px_120px,160px_160px,200px_200px,180px_180px]" />
    </div>
  );
}
