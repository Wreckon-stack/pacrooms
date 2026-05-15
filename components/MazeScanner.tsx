"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Crosshair, Eye, Ghost } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { TokenEntityCard } from "./TokenEntityCard";
import { PREY_TOKENS } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import type { PreyToken } from "@/lib/types";

type AlertKind = "ENTITY DETECTED" | "TARGET LOCKED" | "CORRIDOR BREACH" | "ABSORPTION IMMINENT";

const PATH: Array<{ x: number; y: number }> = [
  { x: 0.06, y: 0.5 },
  { x: 0.22, y: 0.5 },
  { x: 0.22, y: 0.18 },
  { x: 0.5, y: 0.18 },
  { x: 0.5, y: 0.5 },
  { x: 0.78, y: 0.5 },
  { x: 0.78, y: 0.82 },
  { x: 0.34, y: 0.82 },
  { x: 0.34, y: 0.5 },
  { x: 0.06, y: 0.5 },
];

export function MazeScanner() {
  const [tick, setTick] = useState(0);
  const [activeAlert, setActiveAlert] = useState<AlertKind | null>(null);
  const [activeTarget, setActiveTarget] = useState<string | null>("rugcat");

  useEffect(() => {
    const i = window.setInterval(() => setTick((t) => t + 1), 90);
    return () => window.clearInterval(i);
  }, []);

  useEffect(() => {
    const alerts: AlertKind[] = [
      "ENTITY DETECTED",
      "TARGET LOCKED",
      "CORRIDOR BREACH",
      "ABSORPTION IMMINENT",
    ];
    let idx = 0;
    const i = window.setInterval(() => {
      setActiveAlert(alerts[idx % alerts.length]);
      idx++;
      window.setTimeout(() => setActiveAlert(null), 2200);
    }, 4200);
    return () => window.clearInterval(i);
  }, []);

  const predator = useMemo(() => {
    const total = tick;
    const segs = PATH.length - 1;
    const speed = 0.012; // fraction per tick
    const tProg = (total * speed) % segs;
    const i = Math.floor(tProg);
    const f = tProg - i;
    const a = PATH[i];
    const b = PATH[i + 1];
    return {
      x: a.x + (b.x - a.x) * f,
      y: a.y + (b.y - a.y) * f,
      dir: b.x === a.x ? (b.y > a.y ? "down" : "up") : b.x > a.x ? "right" : "left",
    };
  }, [tick]);

  return (
    <section
      id="maze"
      className="relative py-20 sm:py-28 border-t border-backrooms-yellow/10 bg-void-900"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          index="03"
          title="Live Maze Scanner"
          subtitle="PACROOMS roams the maze corridors of Level 7. Memecoins surface as moving prey. Weak liquidity attracts the entity."
          status="SCANNING"
        />

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
          {/* MAZE */}
          <div className="relative border border-backrooms-yellow/40 bg-void-800/80 shadow-[inset_0_0_80px_rgba(0,0,0,0.85)]">
            <PanelBar />
            <div className="relative aspect-[5/4] sm:aspect-[16/10]">
              <MazeGrid />
              {/* PREY */}
              {PREY_TOKENS.map((p) => (
                <PreyDot
                  key={p.id}
                  prey={p}
                  active={activeTarget === p.id}
                  onClick={() => setActiveTarget(p.id)}
                />
              ))}
              {/* PREDATOR */}
              <motion.div
                className="absolute z-30"
                style={{
                  left: `${predator.x * 100}%`,
                  top: `${predator.y * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <PacRoomsSprite dir={predator.dir as any} />
              </motion.div>

              {/* alert overlay */}
              <AnimatePresence>
                {activeAlert && (
                  <motion.div
                    key={activeAlert}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-3 py-1.5 bg-alert-red/15 border border-alert-red/70 text-alert-red font-mono text-[11px] tracking-[0.28em] uppercase animate-flicker"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {activeAlert}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* scanlines on maze */}
              <div className="pointer-events-none absolute inset-0 bg-scanlines opacity-40" />

              {/* HUD legend */}
              <div className="absolute bottom-3 left-3 right-3 z-30 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] tracking-widest uppercase text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-backrooms-yellow" /> Predator
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-zinc-300/80" /> Prey
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-alert-red animate-pulseAlert" />{" "}
                  Target
                </span>
                <span className="ml-auto text-zinc-500">
                  LVL_07 // CORRIDOR 0x7F
                </span>
              </div>
            </div>
          </div>

          {/* prey list */}
          <div className="space-y-3">
            <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.28em] uppercase text-backrooms-yellow border border-backrooms-yellow/30 bg-void-800/60 px-3 py-2">
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" /> DETECTED ENTITIES
              </span>
              <span className="text-terminal-green flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-terminal-green animate-flickerFast" />
                {PREY_TOKENS.length}
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {PREY_TOKENS.slice(0, 4).map((p) => (
                <TokenEntityCard
                  key={p.id}
                  prey={p}
                  onTarget={(id) => setActiveTarget(id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* secondary prey grid */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PREY_TOKENS.map((p) => (
            <TokenEntityCard key={`g-${p.id}`} prey={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PanelBar() {
  return (
    <div className="flex items-center justify-between px-3 py-1.5 border-b border-backrooms-yellow/30 font-mono text-[10px] tracking-[0.28em] uppercase">
      <span className="text-backrooms-yellow flex items-center gap-2">
        <Crosshair className="w-3.5 h-3.5" /> MAZE_SCANNER.exe
      </span>
      <span className="flex items-center gap-3 text-zinc-500">
        <span>FPS 60</span>
        <span className="flex items-center gap-1 text-alert-red">
          <span className="h-1.5 w-1.5 rounded-full bg-alert-red animate-pulseAlert" />
          REC
        </span>
      </span>
    </div>
  );
}

function MazeGrid() {
  // Pac-Man-style line maze
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 80"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <pattern
          id="dot"
          x="0"
          y="0"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="3" cy="3" r="0.4" fill="#cda43450" />
        </pattern>
      </defs>
      <rect width="100" height="80" fill="url(#dot)" />
      {/* outer */}
      <rect
        x="2"
        y="2"
        width="96"
        height="76"
        fill="none"
        stroke="#cda43480"
        strokeWidth="0.6"
      />
      {/* corridors */}
      <g stroke="#cda43460" strokeWidth="0.5" fill="none">
        <path d="M14 14 H40 V30 H14 Z" />
        <path d="M48 10 H86 V22 H48 Z" />
        <path d="M14 38 H30 V58 H14 Z" />
        <path d="M38 38 H62 V58 H38 Z" />
        <path d="M70 30 H86 V62 H70 Z" />
        <path d="M40 62 H62 V72 H40 Z" />
        <path d="M14 66 H30 V74 H14 Z" />
        <path d="M70 66 H86 V74 H70 Z" />
      </g>
      {/* pellets */}
      {Array.from({ length: 24 }).map((_, i) => (
        <circle
          key={i}
          cx={6 + (i * 4) % 88}
          cy={6 + Math.floor((i * 4) / 88) * 8}
          r="0.5"
          fill="#cda434"
          opacity="0.6"
        />
      ))}
      {/* power pellets */}
      <circle cx="6" cy="6" r="1.2" fill="#cda434" opacity="0.85" />
      <circle cx="94" cy="6" r="1.2" fill="#cda434" opacity="0.85" />
      <circle cx="6" cy="74" r="1.2" fill="#cda434" opacity="0.85" />
      <circle cx="94" cy="74" r="1.2" fill="#cda434" opacity="0.85" />
    </svg>
  );
}

function PreyDot({
  prey,
  active,
  onClick,
}: {
  prey: PreyToken;
  active: boolean;
  onClick: () => void;
}) {
  const p = prey.position ?? { x: 0.5, y: 0.5 };
  return (
    <button
      onClick={onClick}
      className="absolute z-20"
      style={{
        left: `${p.x * 100}%`,
        top: `${p.y * 100}%`,
        transform: "translate(-50%,-50%)",
      }}
      aria-label={`Target ${prey.ticker}`}
    >
      <div className="relative">
        <Ghost
          className={cn(
            "w-5 h-5 sm:w-6 sm:h-6 animate-prey",
            active
              ? "text-alert-red drop-shadow-[0_0_8px_rgba(255,26,26,0.8)]"
              : "text-zinc-300/80",
          )}
        />
        {active && (
          <span className="pointer-events-none absolute -inset-2 border border-alert-red animate-pulseAlert" />
        )}
        <span
          className={cn(
            "absolute -bottom-4 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-widest uppercase whitespace-nowrap",
            active ? "text-alert-red" : "text-zinc-400",
          )}
        >
          {prey.ticker}
        </span>
      </div>
    </button>
  );
}

function PacRoomsSprite({ dir }: { dir: "up" | "down" | "left" | "right" }) {
  const rot =
    dir === "right" ? 0 : dir === "down" ? 90 : dir === "left" ? 180 : 270;
  return (
    <div
      className="relative"
      style={{ transform: `rotate(${rot}deg)` }}
    >
      <div
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-backrooms-yellow shadow-[0_0_24px_rgba(205,164,52,0.7)] animate-chomp animate-hunger"
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% 35%, 50% 50%, 100% 65%, 100% 100%, 0 100%)",
        }}
      />
      {/* eye */}
      <span className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-void-900 rounded-full" />
    </div>
  );
}
