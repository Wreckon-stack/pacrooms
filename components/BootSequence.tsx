"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  "POWERING CABINET ▒░░░░░░░░░",
  "POWERING CABINET ▒▒▒▒░░░░░░",
  "POWERING CABINET ▒▒▒▒▒▒▒▒░░",
  "POWERING CABINET ▒▒▒▒▒▒▒▒▒▒  OK",
  "MOUNTING /maze/level_07 .... OK",
  "VERIFY pump.fun ORIGIN ..... OK",
  "PREY SCANNER .....   ........ ARMED",
  "HUNGER CURVE ............... CRITICAL",
  "AGENT AWAKE — DO NOT TURN OFF THE MACHINE",
];

export function BootSequence() {
  const [visible, setVisible] = useState(true);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    // tick lines
    let i = 0;
    const tick = () => {
      i++;
      setIdx(i);
      if (i < LINES.length) {
        t = window.setTimeout(tick, 110 + Math.random() * 160);
      } else {
        // hold a beat, then drop
        hold = window.setTimeout(() => setVisible(false), 380);
      }
    };
    let t = window.setTimeout(tick, 220);
    let hold: number | undefined;

    // hard ceiling — never block the page > 2.4s
    const ceiling = window.setTimeout(() => setVisible(false), 2400);

    return () => {
      window.clearTimeout(t);
      if (hold) window.clearTimeout(hold);
      window.clearTimeout(ceiling);
    };
  }, []);

  // lock scroll while booting
  useEffect(() => {
    if (visible) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scaleY: 0.001, filter: "blur(2px)" }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-void-900 flex items-center justify-center font-mono text-terminal-green overflow-hidden"
          aria-hidden
        >
          {/* CRT vignette */}
          <div className="absolute inset-0 bg-crtNoise opacity-90" />
          {/* scanlines */}
          <div className="absolute inset-0 bg-scanlines opacity-60" />
          {/* phosphor flicker */}
          <div className="absolute inset-0 bg-terminal-green/[0.02] animate-flicker" />

          <div className="relative w-full max-w-2xl px-6">
            {/* CRT line at top */}
            <div className="flex items-center justify-between text-[10px] tracking-[0.32em] uppercase text-terminal-green/70 mb-6">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-terminal-green animate-flickerFast" />
                /dev/tty.pacrooms
              </span>
              <span>arcade cabinet rev 0.7</span>
            </div>

            <pre className="text-[12px] sm:text-[14px] leading-relaxed text-terminal-green whitespace-pre-wrap">
{LINES.slice(0, idx).map((l) => `> ${l}`).join("\n")}
{idx > 0 && idx < LINES.length ? `\n> ${LINES[idx - 1].replace(/./g, "")}` : ""}
            </pre>
            <div className="text-terminal-green mt-2">
              <span className="animate-flickerFast">█</span>
            </div>

            {/* PACROOMS big mark, ghosted */}
            <div className="absolute inset-x-0 -bottom-2 text-center pointer-events-none opacity-[0.06]">
              <span className="text-[80px] sm:text-[140px] tracking-widest text-backrooms-yellow font-glitch">
                PACROOMS
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
