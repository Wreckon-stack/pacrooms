"use client";

import { motion } from "framer-motion";
import { Skull, ExternalLink } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { CONSUMED } from "@/lib/mockData";
import { cn, formatUsd, formatNum, relTime } from "@/lib/utils";

export function Graveyard() {
  return (
    <section
      id="graveyard"
      className="relative py-20 sm:py-28 border-t border-backrooms-yellow/10 bg-void-900"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          index="05"
          title="Consumed Entity Graveyard"
          subtitle="Souls of the digested. Every token PACROOMS has dragged into the maze leaves a corrupted ghost behind."
          status="ARCHIVED"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {CONSUMED.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              className="group relative border border-backrooms-yellow/25 bg-void-800/80 hover:border-alert-red/60 transition-colors overflow-hidden"
            >
              {/* tombstone header */}
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-backrooms-yellow/20 font-mono text-[10px] tracking-[0.28em] uppercase">
                <span className="flex items-center gap-1.5 text-zinc-500">
                  <Skull className="w-3.5 h-3.5" /> CONSUMED
                </span>
                <span className="text-alert-red animate-flicker">RIP</span>
              </div>

              {/* corrupted ghost sprite */}
              <CorruptedGhost seed={c.spriteSeed} />

              <div className="p-4 font-mono">
                <div className="flex items-baseline justify-between">
                  <span className="font-glitch text-backrooms-yellow text-xl tracking-wider">
                    {c.ticker}
                  </span>
                  <span className="text-[10px] tracking-widest uppercase text-zinc-500">
                    {c.origin}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                  <Stat label="ABSORBED" value={formatUsd(c.liquidityAbsorbed)} />
                  <Stat label="SOULS" value={formatNum(c.soulsClaimed)} tone="amber" />
                </div>
                <div className="mt-3 text-[10px] tracking-widest uppercase text-zinc-500">
                  time of death ► {relTime(c.timeOfDeath)}
                </div>
                <button
                  className={cn(
                    "mt-4 w-full flex items-center justify-center gap-2 border border-zinc-700",
                    "hover:border-backrooms-yellow hover:text-backrooms-yellow",
                    "text-zinc-400 px-3 py-2 text-[10px] tracking-[0.28em] uppercase",
                  )}
                >
                  <ExternalLink className="w-3 h-3" /> View Corpse
                </button>
              </div>

              {/* scanlines */}
              <div className="pointer-events-none absolute inset-0 bg-scanlines opacity-30" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  tone = "yellow",
}: {
  label: string;
  value: string;
  tone?: "yellow" | "amber";
}) {
  const c =
    tone === "amber"
      ? "text-terminal-amber border-terminal-amber/30"
      : "text-backrooms-yellow border-backrooms-yellow/25";
  return (
    <div className={cn("border bg-void-900/60 px-2 py-1.5", c)}>
      <div className="text-[9px] tracking-[0.22em] text-zinc-500 uppercase">
        {label}
      </div>
      <div className="text-zinc-200">{value}</div>
    </div>
  );
}

function CorruptedGhost({ seed }: { seed: number }) {
  // simple deterministic-ish variations
  const hue = (seed * 47) % 360;
  const offset = (seed * 13) % 8;
  return (
    <div className="relative h-32 bg-[radial-gradient(ellipse_at_center,#100c08_0%,#050402_85%)] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,#cda434_1px,transparent_1px),linear-gradient(to_bottom,#cda434_1px,transparent_1px)] [background-size:14px_14px]"
        style={{ transform: `translate(${offset}px,${offset}px)` }}
      />
      <svg
        viewBox="0 0 32 32"
        className="relative w-20 h-20 animate-prey"
        style={{ filter: `hue-rotate(${hue}deg) saturate(0.7)` }}
      >
        <path
          d="M4 14 C4 8 10 4 16 4 C22 4 28 8 28 14 V26 L24 23 L20 26 L16 23 L12 26 L8 23 L4 26 Z"
          fill="#cda434"
          opacity="0.85"
        />
        <circle cx="12" cy="14" r="2.5" fill="#050402" />
        <circle cx="20" cy="14" r="2.5" fill="#050402" />
        <circle cx="12" cy="14" r="1" fill="#ff1a1a" />
        <circle cx="20" cy="14" r="1" fill="#ff1a1a" />
      </svg>
      <div className="pointer-events-none absolute inset-0 bg-scanlines opacity-40" />
      <div className="pointer-events-none absolute inset-0 animate-flicker bg-alert-red/[0.04]" />
    </div>
  );
}
