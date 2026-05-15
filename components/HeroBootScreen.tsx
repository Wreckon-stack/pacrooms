"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Power, Eye, ExternalLink } from "lucide-react";
import { GlitchText } from "./GlitchText";
import { SOCIAL_LINKS } from "@/lib/mockData";

const BOOT_LINES = [
  "[ 0.001 ] BIOS:  PUMP.FUN ARCADE CABINET — REV 0.7",
  "[ 0.014 ] MEM:   608K BACKROOMS DRAM DETECTED",
  "[ 0.027 ] DISK:  /maze/level_07/corridor_0x7F …MOUNTED",
  "[ 0.041 ] INITIALIZING PACROOMS AGENT...",
  "[ 0.064 ] PUMP.FUN ORIGIN VERIFIED",
  "[ 0.081 ] MAZE CONNECTION: ACTIVE",
  "[ 0.106 ] PREY SCANNER: ONLINE",
  "[ 0.131 ] LIQUIDITY SENSOR: CALIBRATED",
  "[ 0.158 ] HUNGER LEVEL: RISING",
  "[ 0.211 ] ENTITY AWAKE — DO NOT TURN OFF THE MACHINE",
];

export function HeroBootScreen() {
  const [shown, setShown] = useState<string[]>([]);

  useEffect(() => {
    let i = 0;
    setShown([]);
    const tick = () => {
      i++;
      setShown(BOOT_LINES.slice(0, i));
      if (i < BOOT_LINES.length) {
        timer = window.setTimeout(tick, 160 + Math.random() * 220);
      }
    };
    let timer = window.setTimeout(tick, 280);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden bg-void-900"
    >
      {/* hallway backdrop */}
      <HallwayBackdrop />

      {/* content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 pt-24 pb-16 sm:pt-32">
        {/* top status bar */}
        <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.22em] uppercase text-backrooms-yellow/80 mb-12">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-alert-red animate-pulseAlert" />
            <span>CAM-07 // LEVEL_7</span>
            <span className="hidden sm:inline text-zinc-500">
              REC ● {new Date().toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-3 text-zinc-500">
            <span>SIG: WEAK</span>
            <span className="hidden sm:inline">SRC: PUMP.FUN/ARCADE</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
          {/* LEFT: title + ctas */}
          <div>
            <motion.div
              initial={{ scaleY: 0.001, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="origin-center"
            >
              <p className="font-mono text-[11px] tracking-[0.4em] text-backrooms-yellow/70 mb-4">
                ░░ TOKENIZED AGENT // PUMP.FUN ORIGIN ░░
              </p>
              <GlitchText
                as="h1"
                color="yellow"
                intensity="normal"
                className="text-[14vw] leading-[0.85] sm:text-[120px] lg:text-[150px]"
              >
                PACROOMS
              </GlitchText>
              <h2 className="mt-6 font-mono text-xl sm:text-2xl text-zinc-200 tracking-widest uppercase">
                <span className="text-alert-red">▌</span> The tokenized entity
                is hungry.
              </h2>
              <p className="mt-4 max-w-2xl font-mono text-sm sm:text-base text-zinc-400 leading-relaxed">
                Born on{" "}
                <span className="text-backrooms-yellow">Pump.fun</span>.
                Trapped in the{" "}
                <span className="text-backrooms-yellow">Backrooms</span>.
                Programmed to detect, stalk, and consume weak memecoins across{" "}
                <span className="text-backrooms-yellow">Solana</span>.
              </p>
            </motion.div>

            <div className="mt-10 flex flex-wrap gap-3">
              <CTA href="#maze" variant="primary" icon={<Power className="w-4 h-4" />}>
                ENTER THE MAZE
              </CTA>
              <CTA href="#feed" variant="secondary" icon={<Eye className="w-4 h-4" />}>
                VIEW AGENT ACTIVITY
              </CTA>
              <CTA
                href={SOCIAL_LINKS.pumpfun}
                external
                variant="ghost"
                icon={<ExternalLink className="w-4 h-4" />}
              >
                PUMP.FUN
              </CTA>
            </div>

            <div className="mt-12 flex items-center gap-4 text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
              <span className="h-px w-10 bg-zinc-700" />
              <span>do not look directly at the screen</span>
            </div>
          </div>

          {/* RIGHT: terminal + agent panel */}
          <div className="space-y-4">
            <BootTerminal lines={shown} />
            <AgentBootPanel />
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA({
  href,
  children,
  variant,
  icon,
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant: "primary" | "secondary" | "ghost";
  icon?: React.ReactNode;
  external?: boolean;
}) {
  const base =
    "group inline-flex items-center gap-2 px-5 py-3 font-mono text-[12px] sm:text-[13px] tracking-[0.24em] uppercase border transition-all";
  const styles =
    variant === "primary"
      ? "bg-backrooms-yellow text-void-900 border-backrooms-yellow hover:bg-backrooms-yellowSick"
      : variant === "secondary"
        ? "bg-transparent text-terminal-green border-terminal-green/60 hover:bg-terminal-green/10"
        : "bg-transparent text-zinc-300 border-zinc-600 hover:border-backrooms-yellow hover:text-backrooms-yellow";
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${base} ${styles}`}
    >
      {icon}
      <span>{children}</span>
      <ChevronRight className="w-4 h-4 -mr-1 opacity-60 group-hover:translate-x-0.5 transition-transform" />
    </a>
  );
}

function BootTerminal({ lines }: { lines: string[] }) {
  return (
    <div className="relative border border-terminal-green/40 bg-void-900/90 shadow-terminal font-mono text-[12px] sm:text-[13px]">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-terminal-green/30 text-terminal-green/80 tracking-widest text-[10px] uppercase">
        <span>/dev/tty.pacrooms</span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 bg-terminal-green rounded-full animate-flickerFast" />
          live
        </span>
      </div>
      <div className="p-3 h-[260px] overflow-hidden text-terminal-green">
        {lines.map((l, i) => (
          <div
            key={i}
            className="whitespace-pre-wrap leading-snug"
            style={{ opacity: 0.7 + (i / lines.length) * 0.3 }}
          >
            {l}
          </div>
        ))}
        <div className="text-terminal-green">
          <span className="animate-flicker">█</span>
        </div>
      </div>
    </div>
  );
}

function AgentBootPanel() {
  return (
    <div className="border border-backrooms-yellow/40 bg-void-800/80 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-backrooms-yellow/30 text-backrooms-yellow tracking-widest text-[10px] uppercase font-mono">
        <span>AGENT_STATUS.bin</span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 bg-alert-red rounded-full animate-pulseAlert" />
          ARMED
        </span>
      </div>
      <div className="p-4 grid grid-cols-2 gap-3 font-mono text-[11px]">
        <KV k="STATE" v="STALKING" highlight />
        <KV k="ORIGIN" v="PUMP.FUN" />
        <KV k="CHAIN" v="SOLANA" />
        <KV k="LEVEL" v="07" />
        <KV k="HUNGER" v="87%" alert />
        <KV k="UPTIME" v="14d:06h" />
      </div>
    </div>
  );
}

function KV({
  k,
  v,
  highlight,
  alert,
}: {
  k: string;
  v: string;
  highlight?: boolean;
  alert?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-backrooms-yellow/10 pb-1">
      <span className="text-zinc-500 tracking-widest uppercase">{k}</span>
      <span
        className={
          alert
            ? "text-alert-red animate-flicker"
            : highlight
              ? "text-backrooms-yellow"
              : "text-zinc-200"
        }
      >
        {v}
      </span>
    </div>
  );
}

function HallwayBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* sickly fluorescent gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#3a2f10_0%,#120c04_55%,#050402_100%)]" />
      {/* receding hallway walls (CSS perspective) */}
      <div className="absolute inset-0 [perspective:900px]">
        <div className="absolute inset-0 [transform-style:preserve-3d]">
          {/* left wall */}
          <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-backroomsWall opacity-25 [transform:rotateY(35deg)_translateZ(-200px)] origin-left animate-flicker" />
          {/* right wall */}
          <div className="absolute top-0 bottom-0 right-0 w-1/2 bg-backroomsWall opacity-25 [transform:rotateY(-35deg)_translateZ(-200px)] origin-right animate-flicker" />
          {/* ceiling lights */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-2 bg-backrooms-yellowSick/60 blur-[2px] animate-flicker" />
          <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[60%] h-1 bg-backrooms-yellowSick/50 blur-[2px] animate-flickerFast" />
          <div className="absolute top-[34%] left-1/2 -translate-x-1/2 w-[45%] h-1 bg-backrooms-yellowSick/40 blur-[2px] animate-flicker" />
        </div>
      </div>
      {/* dark vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-void-900/70 via-transparent to-void-900" />
      {/* maze ghost grid */}
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#cda434_1px,transparent_1px),linear-gradient(to_bottom,#cda434_1px,transparent_1px)] [background-size:48px_48px]" />
    </div>
  );
}
