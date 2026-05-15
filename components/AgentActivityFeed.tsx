"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { ACTIVITY_EVENTS } from "@/lib/mockData";
import { cn, timestamp } from "@/lib/utils";
import type { ActivityEvent } from "@/lib/types";

const KIND_STYLE: Record<ActivityEvent["kind"], { color: string; tag: string }> = {
  SCAN: { color: "text-terminal-green", tag: "SCAN" },
  DETECT: { color: "text-backrooms-yellow", tag: "DETECT" },
  LOCK: { color: "text-alert-warn", tag: "LOCK" },
  ENTER: { color: "text-terminal-green", tag: "ENTER" },
  WARN: { color: "text-alert-warn", tag: "WARN" },
  CONSUME: { color: "text-alert-red", tag: "CONSUME" },
  SOULS: { color: "text-terminal-amber", tag: "SOULS" },
  EVOLVE: { color: "text-terminal-phosphor", tag: "EVOLVE" },
  GLITCH: { color: "text-alert-red", tag: "??!?" },
  UNKNOWN: { color: "text-zinc-500", tag: "???" },
};

const NORMAL: Omit<ActivityEvent, "id" | "ts">[] = [
  { kind: "SCAN", text: "PINGING PUMP.FUN /launches → 47 NEW PAIRS" },
  { kind: "DETECT", text: "ENTITY DETECTED: $WIFROOMS" },
  { kind: "WARN", text: "LP TRUST SCORE: 6/100" },
  { kind: "LOCK", text: "TARGET LOCKED: $WIFROOMS" },
  { kind: "ENTER", text: "PACROOMS ENTERED CORRIDOR 0x4C" },
  { kind: "CONSUME", text: "CONSUMED: $WIFROOMS" },
  { kind: "SOULS", text: "SOULS CLAIMED: 1,888" },
  { kind: "EVOLVE", text: "AGENT EVOLUTION +1.2%" },
  { kind: "SCAN", text: "MAZE SWEEP RESUMED — CORRIDOR 0x7F" },
  { kind: "WARN", text: "PREY USING DECOY LIQUIDITY POOL" },
  { kind: "DETECT", text: "ENTITY DETECTED: $CARPETCAT" },
  { kind: "CONSUME", text: "CONSUMED: $CARPETCAT" },
  { kind: "SCAN", text: "PUMP.FUN BONDING CURVE LATENCY: 41ms" },
  { kind: "DETECT", text: "ENTITY DETECTED: $NPCDOG" },
  { kind: "WARN", text: "DEV WALLET DUMP DETECTED" },
];

const CORRUPTION: Omit<ActivityEvent, "id" | "ts">[] = [
  { kind: "GLITCH", text: "░ SIGNAL LOST ░░░░░░░░░░░░░" },
  { kind: "UNKNOWN", text: "PACROOMS HAS LEFT THE CORRIDOR" },
  { kind: "GLITCH", text: "stack corrupt @ 0x7F — restoring" },
  { kind: "UNKNOWN", text: "?? UNKNOWN ENTITY WATCHING FROM CAM-13" },
  { kind: "GLITCH", text: "▓▓ HUNGER OVERFLOW ▓▓ — clamping to 99%" },
  { kind: "UNKNOWN", text: "WHO TURNED THE CABINET BACK ON" },
  { kind: "GLITCH", text: "P̷A̴C̶R̸O̵O̵M̷S̶ — n0_se_e ye_u" },
  { kind: "UNKNOWN", text: "the maze does not remember you" },
  { kind: "GLITCH", text: "ERR 0x07F: cannot find Level 7 exit" },
  { kind: "UNKNOWN", text: "ten minutes of footage missing" },
];

function corruptTimestamp(): string {
  return Math.random() < 0.5 ? "?:??:??" : "??:??:??";
}

export function AgentActivityFeed() {
  const [events, setEvents] = useState<ActivityEvent[]>(ACTIVITY_EVENTS);

  useEffect(() => {
    let count = 0;
    let normalIdx = 0;
    let corruptIdx = 0;

    const t = window.setInterval(() => {
      count++;
      // ~1 in 7 is a corruption event
      const corrupt = Math.random() < 0.14;
      const tmpl = corrupt
        ? CORRUPTION[corruptIdx++ % CORRUPTION.length]
        : NORMAL[normalIdx++ % NORMAL.length];
      const ev: ActivityEvent = {
        ...tmpl,
        id: `live-${Date.now()}-${count}`,
        ts: new Date().toISOString(),
      };
      setEvents((prev) => [ev, ...prev].slice(0, 60));
    }, 2200);
    return () => window.clearInterval(t);
  }, []);

  return (
    <section
      id="feed"
      className="relative py-20 sm:py-28 border-t border-backrooms-yellow/10 bg-void-900"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          index="04"
          title="Agent Activity Feed"
          subtitle="Raw stream from /var/log/pacrooms.agent — every scan, lock, consumption, and evolution event in real time."
          status="STREAMING"
        />

        <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
          {/* terminal feed */}
          <div className="border border-terminal-green/40 bg-void-800/80 shadow-terminal">
            <div className="flex items-center justify-between px-3 py-2 border-b border-terminal-green/30 font-mono text-[10px] tracking-[0.28em] uppercase">
              <span className="text-terminal-green truncate">
                root@pacrooms:/var/log/pacrooms.agent
              </span>
              <span className="flex items-center gap-2 text-zinc-500 shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-terminal-green animate-flickerFast" />
                tail -f
              </span>
            </div>
            <div className="font-mono text-[12px] sm:text-[13px] leading-snug p-3 sm:p-4 h-[360px] sm:h-[460px] lg:h-[520px] overflow-hidden relative">
              <AnimatePresence initial={false}>
                {events.map((e) => {
                  const s = KIND_STYLE[e.kind];
                  const isCorrupt = e.kind === "GLITCH" || e.kind === "UNKNOWN";
                  return (
                    <motion.div
                      key={e.id}
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                      className={cn(
                        "flex items-start gap-2 mb-0.5",
                        isCorrupt && "animate-flicker",
                      )}
                    >
                      <span className="text-zinc-600 shrink-0">
                        [{isCorrupt ? corruptTimestamp() : timestamp(e.ts)}]
                      </span>
                      <span
                        className={cn(
                          "shrink-0 w-[68px] tracking-widest uppercase",
                          s.color,
                        )}
                      >
                        {s.tag}
                      </span>
                      <span
                        className={cn(
                          "min-w-0 break-words",
                          isCorrupt ? "text-alert-red/90" : "text-zinc-300",
                        )}
                      >
                        {e.text}
                      </span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-void-800/95 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-scanlines opacity-40" />
            </div>
            <div className="px-3 py-1.5 border-t border-terminal-green/30 font-mono text-[11px] text-terminal-green">
              <span className="animate-flicker">█</span>{" "}
              <span className="text-zinc-500 tracking-widest uppercase">
                awaiting next event…
              </span>
            </div>
          </div>

          {/* side counters */}
          <div className="space-y-4 font-mono">
            <SideCounter label="ENTITIES SCANNED / 24H" value="3,902" trend="+12%" />
            <SideCounter label="ENTITIES CONSUMED / 24H" value="14" trend="+3" tone="red" />
            <SideCounter label="SOULS / 24H" value="42,118" trend="+8.4%" tone="amber" />
            <div className="border border-backrooms-yellow/30 bg-void-800/80 p-4">
              <div className="text-[10px] tracking-[0.28em] uppercase text-backrooms-yellow mb-2">
                AGENT INSTRUCTIONS
              </div>
              <pre className="text-[11px] text-zinc-300 leading-relaxed whitespace-pre-wrap">
{`> while (hunger > 0) {
>   scan(Pump.fun);
>   if (prey.lp < threshold)
>     lock(prey);
>   if (locked)
>     consume(prey);
>   hunger -= 0.001;
> }
> // hunger never returns 0`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SideCounter({
  label,
  value,
  trend,
  tone = "yellow",
}: {
  label: string;
  value: string;
  trend: string;
  tone?: "yellow" | "red" | "amber";
}) {
  const c =
    tone === "red"
      ? "text-alert-red border-alert-red/40"
      : tone === "amber"
        ? "text-terminal-amber border-terminal-amber/40"
        : "text-backrooms-yellow border-backrooms-yellow/40";
  return (
    <div className={cn("border bg-void-800/70 p-4", c)}>
      <div className="text-[10px] tracking-[0.28em] uppercase text-zinc-500">
        {label}
      </div>
      <div className="flex items-baseline justify-between mt-2">
        <div className="text-2xl tracking-wider">{value}</div>
        <div className="text-[11px] tracking-widest uppercase">{trend}</div>
      </div>
    </div>
  );
}
