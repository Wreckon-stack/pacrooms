"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  Crosshair,
  Database,
  Flame,
  MapPin,
  Network,
  Radar,
  Skull,
  Wifi,
} from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { AGENT_STATUS } from "@/lib/mockData";
import { cn, formatNum } from "@/lib/utils";

export function AgentStatusDashboard() {
  // small live wiggle on hunger
  const [hunger, setHunger] = useState(AGENT_STATUS.hungerLevel);
  useEffect(() => {
    const t = window.setInterval(() => {
      setHunger((h) => {
        const delta = (Math.random() - 0.4) * 0.8;
        return Math.max(72, Math.min(99, +(h + delta).toFixed(1)));
      });
    }, 1400);
    return () => window.clearInterval(t);
  }, []);

  return (
    <section
      id="status"
      className="relative py-20 sm:py-28 border-t border-backrooms-yellow/10 bg-void-900"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          index="02"
          title="Agent Status"
          subtitle="Live surveillance from the PACROOMS control panel. All metrics streamed from the tokenized entity inside Level 7."
          status="LIVE"
        />

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
          {/* LEFT: surveillance grid */}
          <div className="border border-backrooms-yellow/30 bg-void-800/70 shadow-[inset_0_0_60px_rgba(0,0,0,0.7)]">
            <PanelHeader title="SURVEILLANCE / AGENT_CORE" badge="ARMED" />
            <div className="p-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <StatCard
                icon={<Wifi className="w-4 h-4" />}
                label="Agent Status"
                value={AGENT_STATUS.status}
                tone="green"
                pulse
              />
              <StatCard
                icon={<Network className="w-4 h-4" />}
                label="Origin"
                value={AGENT_STATUS.origin}
              />
              <StatCard
                icon={<Database className="w-4 h-4" />}
                label="Chain"
                value={AGENT_STATUS.chain}
              />
              <StatCard
                icon={<Flame className="w-4 h-4" />}
                label="Hunger"
                value={`${hunger.toFixed(1)}%`}
                tone="red"
                pulse
              />
              <StatCard
                icon={<Radar className="w-4 h-4" />}
                label="Tokens Detected"
                value={formatNum(AGENT_STATUS.tokensDetected)}
              />
              <StatCard
                icon={<Skull className="w-4 h-4" />}
                label="Entities Consumed"
                value={formatNum(AGENT_STATUS.entitiesConsumed)}
                tone="amber"
              />
              <StatCard
                icon={<Activity className="w-4 h-4" />}
                label="Treasury Fuel"
                value={`${AGENT_STATUS.treasuryFuel.toFixed(2)} SOL`}
                tone="amber"
              />
              <StatCard
                icon={<Crosshair className="w-4 h-4" />}
                label="Current Target"
                value={AGENT_STATUS.currentTarget}
                tone="red"
              />
              <StatCard
                icon={<MapPin className="w-4 h-4" />}
                label="Corridor"
                value={AGENT_STATUS.currentCorridor}
              />
            </div>

            {/* hunger bar */}
            <div className="px-5 pb-5">
              <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.22em] uppercase text-zinc-500 mb-1.5">
                <span>HUNGER CURVE</span>
                <span className="text-alert-red animate-flicker">
                  CRITICAL
                </span>
              </div>
              <div className="h-2 border border-alert-red/40 bg-void-900 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-alert-warn via-alert-red to-alert-blood"
                  initial={{ width: 0 }}
                  animate={{ width: `${hunger}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
              <div className="mt-2 font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
                {">"} Hunger above 85% triggers autonomous corridor sweep
              </div>
            </div>
          </div>

          {/* RIGHT: cam feeds */}
          <div className="space-y-4">
            <CamFeed
              label="CAM-07 / LEVEL_7"
              title="CORRIDOR 0x7F"
              entity="PACROOMS"
            />
            <CamFeed
              label="CAM-13 / LP_PIT"
              title="LIQUIDITY DRAIN"
              entity="$RUGCAT"
              alert
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function PanelHeader({ title, badge }: { title: string; badge?: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-backrooms-yellow/30 font-mono text-[10px] tracking-[0.28em] uppercase">
      <span className="text-backrooms-yellow">{title}</span>
      {badge && (
        <span className="flex items-center gap-1 text-alert-red">
          <span className="h-1.5 w-1.5 bg-alert-red rounded-full animate-pulseAlert" />
          {badge}
        </span>
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  tone = "yellow",
  pulse,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone?: "yellow" | "green" | "red" | "amber";
  pulse?: boolean;
}) {
  const toneCls =
    tone === "green"
      ? "text-terminal-green border-terminal-green/30"
      : tone === "red"
        ? "text-alert-red border-alert-red/40"
        : tone === "amber"
          ? "text-terminal-amber border-terminal-amber/40"
          : "text-backrooms-yellow border-backrooms-yellow/30";
  return (
    <div
      className={cn(
        "relative border bg-void-900/70 p-3 font-mono",
        toneCls,
        pulse && "animate-flicker",
      )}
    >
      <div className="flex items-center justify-between text-[9px] tracking-[0.28em] uppercase text-zinc-500">
        <span className="flex items-center gap-1.5">
          {icon}
          {label}
        </span>
      </div>
      <div className="mt-2 text-base sm:text-lg tracking-wider uppercase">
        {value}
      </div>
    </div>
  );
}

function CamFeed({
  label,
  title,
  entity,
  alert,
}: {
  label: string;
  title: string;
  entity: string;
  alert?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative border bg-void-800/70 overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.7)]",
        alert
          ? "border-alert-red/60 animate-flicker"
          : "border-backrooms-yellow/30",
      )}
    >
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-inherit font-mono text-[10px] tracking-[0.28em] uppercase">
        <span className={alert ? "text-alert-red" : "text-backrooms-yellow"}>
          ● REC {label}
        </span>
        <span className="text-zinc-500">
          {new Date().toLocaleTimeString("en-GB", { hour12: false })}
        </span>
      </div>
      <div className="relative aspect-[16/9] bg-void-900">
        {/* maze tile background */}
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,#cda434_1px,transparent_1px),linear-gradient(to_bottom,#cda434_1px,transparent_1px)] [background-size:28px_28px]" />
        {/* moving "entity" blip */}
        <motion.div
          className={cn(
            "absolute h-3 w-3 rounded-full",
            alert ? "bg-alert-red" : "bg-backrooms-yellow",
          )}
          initial={{ left: "10%", top: "60%" }}
          animate={{
            left: ["10%", "70%", "30%", "85%", "10%"],
            top: ["60%", "20%", "75%", "40%", "60%"],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-scanlines opacity-50" />
        <div className="absolute inset-0 flex items-end justify-between p-3 text-[10px] font-mono tracking-widest uppercase">
          <span className="text-zinc-400">{title}</span>
          <span className={alert ? "text-alert-red animate-flicker" : "text-backrooms-yellow"}>
            TARGET: {entity}
          </span>
        </div>
        {alert && (
          <div className="absolute top-3 right-3 text-[10px] font-mono tracking-widest text-alert-red animate-pulseAlert">
            ◉ ABSORPTION IMMINENT
          </div>
        )}
      </div>
    </div>
  );
}
