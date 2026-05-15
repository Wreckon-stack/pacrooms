"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Crosshair, Eye, Ghost } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { TokenEntityCard } from "./TokenEntityCard";
import { PREY_TOKENS } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import type { PreyToken } from "@/lib/types";

type AlertKind =
  | "ENTITY DETECTED"
  | "TARGET LOCKED"
  | "CORRIDOR BREACH"
  | "ABSORPTION IMMINENT";

type LivePrey = PreyToken & {
  alive: boolean;
  pos: { x: number; y: number };
  vel: { x: number; y: number };
};

const PREDATOR_SPEED = 0.0055; // fraction of maze per tick
const CAPTURE_RADIUS = 0.045;
const FLEE_RADIUS = 0.22;
const PREY_SPEED = 0.0028;
const TICK_MS = 60;

function seedPrey(): LivePrey[] {
  return PREY_TOKENS.map((p) => ({
    ...p,
    alive: true,
    pos: { x: p.position?.x ?? Math.random(), y: p.position?.y ?? Math.random() },
    vel: {
      x: (Math.random() - 0.5) * PREY_SPEED * 0.6,
      y: (Math.random() - 0.5) * PREY_SPEED * 0.6,
    },
  }));
}

function dist(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

function clamp01(v: number) {
  if (v < 0.04) return 0.04;
  if (v > 0.96) return 0.96;
  return v;
}

export function MazeScanner() {
  const [prey, setPrey] = useState<LivePrey[]>(() => seedPrey());
  const predatorRef = useRef({ x: 0.06, y: 0.5, dir: "right" as Dir });
  const [, setRender] = useState(0);
  const [activeAlert, setActiveAlert] = useState<AlertKind | null>(null);
  const [targetId, setTargetId] = useState<string>("rugcat");
  const [kills, setKills] = useState(0);

  // game loop
  useEffect(() => {
    const id = window.setInterval(() => {
      setPrey((current) => {
        // pick target: locked target if alive, else nearest alive
        const pred = predatorRef.current;
        let target = current.find((p) => p.id === targetId && p.alive);
        if (!target) {
          const alive = current.filter((p) => p.alive);
          if (alive.length === 0) return current;
          target = alive.reduce((acc, p) =>
            dist(p.pos, pred) < dist(acc.pos, pred) ? p : acc,
          );
        }

        // move predator toward target
        const dx = target.pos.x - pred.x;
        const dy = target.pos.y - pred.y;
        const len = Math.hypot(dx, dy) || 1;
        const step = Math.min(PREDATOR_SPEED, len);
        pred.x = clamp01(pred.x + (dx / len) * step);
        pred.y = clamp01(pred.y + (dy / len) * step);
        pred.dir =
          Math.abs(dx) > Math.abs(dy)
            ? dx > 0
              ? "right"
              : "left"
            : dy > 0
              ? "down"
              : "up";

        // capture?
        const captured = current.find(
          (p) => p.alive && dist(p.pos, pred) < CAPTURE_RADIUS,
        );

        // move prey — flee if predator is near
        const next = current.map((p) => {
          if (!p.alive) return p;
          if (captured && p.id === captured.id) {
            return { ...p, alive: false };
          }
          let vx = p.vel.x;
          let vy = p.vel.y;
          const d = dist(p.pos, pred);
          if (d < FLEE_RADIUS) {
            const fx = p.pos.x - pred.x;
            const fy = p.pos.y - pred.y;
            const fl = Math.hypot(fx, fy) || 1;
            // accelerate away
            vx = (fx / fl) * PREY_SPEED * 1.8;
            vy = (fy / fl) * PREY_SPEED * 1.8;
          } else {
            // slow drift + tiny jitter
            vx = vx * 0.9 + (Math.random() - 0.5) * PREY_SPEED * 0.4;
            vy = vy * 0.9 + (Math.random() - 0.5) * PREY_SPEED * 0.4;
          }
          let nx = p.pos.x + vx;
          let ny = p.pos.y + vy;
          // bounce off walls softly
          if (nx < 0.04 || nx > 0.96) vx = -vx;
          if (ny < 0.04 || ny > 0.96) vy = -vy;
          nx = clamp01(nx);
          ny = clamp01(ny);
          return { ...p, pos: { x: nx, y: ny }, vel: { x: vx, y: vy } };
        });

        if (captured) {
          // schedule respawn
          window.setTimeout(() => {
            setPrey((cur) =>
              cur.map((p) =>
                p.id === captured.id
                  ? {
                      ...p,
                      alive: true,
                      pos: { x: Math.random() * 0.9 + 0.05, y: Math.random() * 0.9 + 0.05 },
                      vel: { x: 0, y: 0 },
                    }
                  : p,
              ),
            );
          }, 1800);
          setKills((k) => k + 1);
          setActiveAlert("ABSORPTION IMMINENT");
          window.setTimeout(() => setActiveAlert(null), 1400);
          // jump to next target
          const stillAlive = next.filter((p) => p.alive);
          if (stillAlive.length > 0) {
            // prefer weakest survival odds
            const weakest = stillAlive.reduce((a, b) =>
              a.survivalOdds < b.survivalOdds ? a : b,
            );
            setTargetId(weakest.id);
          }
        }

        return next;
      });
      setRender((r) => r + 1);
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [targetId]);

  // ambient alert rotation
  useEffect(() => {
    const alerts: AlertKind[] = [
      "ENTITY DETECTED",
      "TARGET LOCKED",
      "CORRIDOR BREACH",
    ];
    let idx = 0;
    const i = window.setInterval(() => {
      // don't override absorption alert
      setActiveAlert((cur) => (cur === "ABSORPTION IMMINENT" ? cur : alerts[idx % alerts.length]));
      idx++;
      window.setTimeout(
        () =>
          setActiveAlert((cur) =>
            cur === "ABSORPTION IMMINENT" ? cur : null,
          ),
        2000,
      );
    }, 5200);
    return () => window.clearInterval(i);
  }, []);

  const aliveCount = useMemo(() => prey.filter((p) => p.alive).length, [prey]);

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
            <PanelBar kills={kills} alive={aliveCount} />
            <div className="relative aspect-[5/4] sm:aspect-[16/10]">
              <MazeGrid />
              {/* PREY */}
              {prey.map((p) => (
                <PreyDot
                  key={p.id}
                  prey={p}
                  active={targetId === p.id && p.alive}
                  onClick={() => p.alive && setTargetId(p.id)}
                />
              ))}
              {/* PREDATOR */}
              <motion.div
                className="absolute z-30"
                animate={{
                  left: `${predatorRef.current.x * 100}%`,
                  top: `${predatorRef.current.y * 100}%`,
                }}
                transition={{ duration: TICK_MS / 1000, ease: "linear" }}
                style={{ transform: "translate(-50%, -50%)" }}
              >
                <PacRoomsSprite dir={predatorRef.current.dir} />
              </motion.div>

              {/* alert overlay */}
              <AnimatePresence>
                {activeAlert && (
                  <motion.div
                    key={activeAlert + kills}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={cn(
                      "absolute top-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-3 py-1.5 border font-mono text-[11px] tracking-[0.28em] uppercase animate-flicker",
                      activeAlert === "ABSORPTION IMMINENT"
                        ? "bg-alert-red/25 border-alert-red text-alert-red animate-pulseAlert"
                        : "bg-alert-red/15 border-alert-red/70 text-alert-red",
                    )}
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

          {/* prey list — all 6, no duplicate grid below */}
          <div className="space-y-3">
            <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.28em] uppercase text-backrooms-yellow border border-backrooms-yellow/30 bg-void-800/60 px-3 py-2">
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" /> DETECTED ENTITIES
              </span>
              <span className="text-terminal-green flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-terminal-green animate-flickerFast" />
                {aliveCount}/{prey.length}
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {prey.map((p) => (
                <TokenEntityCard
                  key={p.id}
                  prey={p}
                  onTarget={(id) => setTargetId(id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type Dir = "up" | "down" | "left" | "right";

function PanelBar({ kills, alive }: { kills: number; alive: number }) {
  return (
    <div className="flex items-center justify-between px-3 py-1.5 border-b border-backrooms-yellow/30 font-mono text-[10px] tracking-[0.28em] uppercase">
      <span className="text-backrooms-yellow flex items-center gap-2">
        <Crosshair className="w-3.5 h-3.5" /> MAZE_SCANNER.exe
      </span>
      <span className="flex items-center gap-3 text-zinc-500">
        <span className="hidden sm:inline">PREY {alive}</span>
        <span className="text-alert-red">KILLS {kills}</span>
        <span className="flex items-center gap-1 text-alert-red">
          <span className="h-1.5 w-1.5 rounded-full bg-alert-red animate-pulseAlert" />
          REC
        </span>
      </span>
    </div>
  );
}

function MazeGrid() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 80"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <pattern id="dot" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.4" fill="#cda43450" />
        </pattern>
      </defs>
      <rect width="100" height="80" fill="url(#dot)" />
      <rect x="2" y="2" width="96" height="76" fill="none" stroke="#cda43480" strokeWidth="0.6" />
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
      {Array.from({ length: 24 }).map((_, i) => (
        <circle
          key={i}
          cx={6 + ((i * 4) % 88)}
          cy={6 + Math.floor((i * 4) / 88) * 8}
          r="0.5"
          fill="#cda434"
          opacity="0.6"
        />
      ))}
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
  prey: LivePrey;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <AnimatePresence>
      {prey.alive ? (
        <motion.button
          key={prey.id + "-alive"}
          onClick={onClick}
          className="absolute z-20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            left: `${prey.pos.x * 100}%`,
            top: `${prey.pos.y * 100}%`,
          }}
          exit={{ scale: 0, opacity: 0, rotate: 180 }}
          transition={{ duration: TICK_MS / 1000, ease: "linear" }}
          style={{ transform: "translate(-50%,-50%)" }}
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
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}

function PacRoomsSprite({ dir }: { dir: Dir }) {
  const rot = dir === "right" ? 0 : dir === "down" ? 90 : dir === "left" ? 180 : 270;
  return (
    <div className="relative" style={{ transform: `rotate(${rot}deg)` }}>
      <div
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-backrooms-yellow shadow-[0_0_24px_rgba(205,164,52,0.7)] animate-chomp animate-hunger"
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% 35%, 50% 50%, 100% 65%, 100% 100%, 0 100%)",
        }}
      />
      <span className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-void-900 rounded-full" />
    </div>
  );
}
