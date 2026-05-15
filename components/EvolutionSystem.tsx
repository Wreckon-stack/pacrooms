"use client";

import { motion } from "framer-motion";
import { Dna, Lock, Sparkles } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { EVOLUTION_STAGES } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const CURRENT_STAGE_ID = 3;
const STAGE_PROGRESS = 62; // percent into stage 3

export function EvolutionSystem() {
  return (
    <section
      id="evolution"
      className="relative py-20 sm:py-28 border-t border-backrooms-yellow/10 bg-void-900"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          index="06"
          title="Agent Evolution"
          subtitle="PACROOMS mutates as the ecosystem feeds it. Each stage rewrites the agent's hunger curve and corridor behavior."
          status="MUTATING"
        />

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6">
          {/* current stage card */}
          <div className="border border-backrooms-yellow/40 bg-void-800/80 shadow-[inset_0_0_60px_rgba(0,0,0,0.7)]">
            <div className="flex items-center justify-between px-3 py-2 border-b border-backrooms-yellow/30 font-mono text-[10px] tracking-[0.28em] uppercase">
              <span className="text-backrooms-yellow flex items-center gap-1.5">
                <Dna className="w-3.5 h-3.5" /> CURRENT STAGE
              </span>
              <span className="text-terminal-green flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-terminal-green animate-flickerFast" />
                LIVE
              </span>
            </div>
            <div className="p-5">
              <div className="text-[10px] tracking-[0.32em] text-zinc-500 uppercase">
                STAGE {CURRENT_STAGE_ID} / 5
              </div>
              <h3 className="font-glitch text-3xl sm:text-4xl text-backrooms-yellow mt-2 tracking-wider">
                MAZE PREDATOR
              </h3>
              <p className="mt-3 text-[13px] text-zinc-400 font-mono leading-relaxed">
                The agent has learned corridor routing. Consumption events
                accelerate. Treasury fuel begins compounding from absorbed
                liquidity.
              </p>

              {/* progress */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-[10px] tracking-widest uppercase text-zinc-500 mb-1.5">
                  <span>EVOLUTION PROGRESS</span>
                  <span className="text-backrooms-yellow">{STAGE_PROGRESS}%</span>
                </div>
                <div className="relative h-2.5 border border-backrooms-yellow/40 bg-void-900 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-backrooms-yellow via-terminal-amber to-alert-red"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${STAGE_PROGRESS}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-scanlines opacity-50" />
                </div>
              </div>

              {/* mutations */}
              <div className="mt-6 space-y-2 font-mono text-[12px]">
                <div className="text-[10px] tracking-[0.28em] uppercase text-zinc-500">
                  ACTIVE MUTATIONS
                </div>
                {[
                  "+ corridor pathing v2",
                  "+ multi-target lock (up to 3)",
                  "+ low-LP heuristic boost",
                  "+ ghost camouflage detection",
                ].map((m) => (
                  <div
                    key={m}
                    className="flex items-center gap-2 text-terminal-green"
                  >
                    <Sparkles className="w-3 h-3 opacity-70" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* stage ladder */}
          <div className="relative">
            <div className="absolute left-3 top-3 bottom-3 w-px bg-backrooms-yellow/20" />
            <div className="space-y-3">
              {EVOLUTION_STAGES.map((s) => {
                const isCurrent = s.id === CURRENT_STAGE_ID;
                const past = s.id < CURRENT_STAGE_ID;
                const locked = !s.unlocked;
                return (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.35, delay: s.id * 0.05 }}
                    className={cn(
                      "relative pl-10 pr-4 py-4 border bg-void-800/70 font-mono",
                      isCurrent
                        ? "border-backrooms-yellow shadow-[0_0_30px_rgba(205,164,52,0.25)]"
                        : past
                          ? "border-backrooms-yellow/30"
                          : "border-zinc-700",
                      locked && "opacity-70",
                    )}
                  >
                    {/* node dot */}
                    <span
                      className={cn(
                        "absolute left-[6px] top-6 w-3 h-3 border-2",
                        isCurrent
                          ? "bg-backrooms-yellow border-backrooms-yellow animate-pulseAlert shadow-[0_0_18px_rgba(205,164,52,0.7)]"
                          : past
                            ? "bg-backrooms-yellow/60 border-backrooms-yellow/60"
                            : "bg-void-900 border-zinc-600",
                      )}
                    />
                    <div className="flex items-baseline justify-between gap-3">
                      <div>
                        <div className="text-[10px] tracking-[0.32em] uppercase text-zinc-500">
                          STAGE {s.id}
                        </div>
                        <div
                          className={cn(
                            "text-lg sm:text-xl font-glitch tracking-wider",
                            isCurrent
                              ? "text-backrooms-yellow"
                              : past
                                ? "text-zinc-300"
                                : "text-zinc-500",
                          )}
                        >
                          {s.name}
                        </div>
                      </div>
                      {locked ? (
                        <span className="flex items-center gap-1 text-[10px] tracking-widest text-zinc-500 uppercase">
                          <Lock className="w-3 h-3" /> LOCKED
                        </span>
                      ) : (
                        <span
                          className={cn(
                            "text-[10px] tracking-widest uppercase",
                            isCurrent
                              ? "text-terminal-green animate-flicker"
                              : "text-zinc-500",
                          )}
                        >
                          {isCurrent ? "● ACTIVE" : "UNLOCKED"}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-[12px] text-zinc-400 leading-relaxed">
                      {s.description}
                    </p>
                    <p
                      className={cn(
                        "mt-2 text-[10px] tracking-[0.24em] uppercase",
                        locked ? "text-alert-red/80 animate-flicker" : "text-terminal-green/80",
                      )}
                    >
                      ► {s.mutation}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
