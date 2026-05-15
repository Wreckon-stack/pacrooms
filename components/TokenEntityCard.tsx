"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Crosshair, Ghost, Activity } from "lucide-react";
import { cn, formatUsd, relTime } from "@/lib/utils";
import type { PreyToken, ThreatLevel } from "@/lib/types";

const THREAT_STYLE: Record<ThreatLevel, string> = {
  LOW: "text-terminal-green border-terminal-green/40 bg-terminal-green/5",
  MEDIUM: "text-terminal-amber border-terminal-amber/50 bg-terminal-amber/5",
  HIGH: "text-alert-warn border-alert-warn/60 bg-alert-warn/10",
  CRITICAL: "text-alert-red border-alert-red/70 bg-alert-red/10",
};

export function TokenEntityCard({
  prey,
  onTarget,
}: {
  prey: PreyToken;
  onTarget?: (id: string) => void;
}) {
  const odds = Math.max(0, Math.min(100, prey.survivalOdds));
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "group relative overflow-hidden border bg-void-800/80",
        "border-backrooms-yellow/30 hover:border-backrooms-yellow/70",
        "shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]",
        "transition-colors",
      )}
    >
      {/* corner brackets */}
      <CornerBrackets />

      <div className="p-4 sm:p-5 font-mono text-zinc-300">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Ghost className="w-4 h-4 text-backrooms-yellow animate-prey" />
              <span className="font-glitch text-backrooms-yellow text-xl tracking-widest">
                {prey.ticker}
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 tracking-widest uppercase mt-1">
              {prey.name} ► {prey.origin}
            </p>
          </div>
          <span
            className={cn(
              "px-2 py-0.5 text-[10px] tracking-[0.18em] uppercase border font-bold",
              THREAT_STYLE[prey.threatLevel],
              prey.threatLevel === "CRITICAL" && "animate-pulseAlert",
            )}
          >
            {prey.threatLevel}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4 text-[11px]">
          <Stat label="MCAP" value={formatUsd(prey.marketCap)} />
          <Stat label="LIQ" value={formatUsd(prey.liquidity)} />
          <Stat label="VOL24" value={formatUsd(prey.volume24h)} />
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] tracking-widest uppercase">
            <span className="text-zinc-500">Survival Odds</span>
            <span
              className={cn(
                "font-bold",
                odds < 25
                  ? "text-alert-red"
                  : odds < 60
                    ? "text-terminal-amber"
                    : "text-terminal-green",
              )}
            >
              {odds}%
            </span>
          </div>
          <div className="mt-1.5 h-1.5 bg-void-900 border border-backrooms-yellow/20 overflow-hidden">
            <div
              className={cn(
                "h-full transition-all",
                odds < 25
                  ? "bg-alert-red"
                  : odds < 60
                    ? "bg-terminal-amber"
                    : "bg-terminal-green",
              )}
              style={{ width: `${odds}%` }}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-[10px] tracking-widest text-zinc-500 uppercase">
          <span className="flex items-center gap-1">
            <Activity className="w-3 h-3" /> detected {relTime(prey.detectedAt)}
          </span>
          {prey.threatLevel === "CRITICAL" && (
            <span className="flex items-center gap-1 text-alert-red animate-flickerFast">
              <AlertTriangle className="w-3 h-3" /> absorption imminent
            </span>
          )}
        </div>

        {onTarget && (
          <button
            onClick={() => onTarget(prey.id)}
            className="mt-4 w-full border border-alert-red/60 bg-alert-red/10 hover:bg-alert-red/20 text-alert-red px-3 py-2 text-[11px] tracking-[0.22em] uppercase flex items-center justify-center gap-2"
          >
            <Crosshair className="w-3.5 h-3.5" /> Mark as Target
          </button>
        )}
      </div>
    </motion.div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-backrooms-yellow/15 bg-void-900/60 px-2 py-1.5">
      <div className="text-[9px] tracking-[0.22em] text-zinc-500 uppercase">
        {label}
      </div>
      <div className="text-zinc-200">{value}</div>
    </div>
  );
}

function CornerBrackets() {
  return (
    <>
      <span className="pointer-events-none absolute top-0 left-0 w-3 h-3 border-t border-l border-backrooms-yellow/70" />
      <span className="pointer-events-none absolute top-0 right-0 w-3 h-3 border-t border-r border-backrooms-yellow/70" />
      <span className="pointer-events-none absolute bottom-0 left-0 w-3 h-3 border-b border-l border-backrooms-yellow/70" />
      <span className="pointer-events-none absolute bottom-0 right-0 w-3 h-3 border-b border-r border-backrooms-yellow/70" />
    </>
  );
}
