"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#status", label: "STATUS" },
  { href: "#maze", label: "MAZE" },
  { href: "#feed", label: "FEED" },
  { href: "#graveyard", label: "GRAVEYARD" },
  { href: "#evolution", label: "EVOLUTION" },
  { href: "#how", label: "HOW" },
  { href: "#lore", label: "LORE" },
];

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [now, setNow] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const pad = (n: number) => n.toString().padStart(2, "0");
      setNow(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`);
    };
    update();
    const t = window.setInterval(update, 1000);
    return () => window.clearInterval(t);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-colors",
        scrolled
          ? "bg-void-900/85 backdrop-blur-sm border-b border-backrooms-yellow/30"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-14 flex items-center justify-between font-mono">
        <a
          href="#hero"
          className="flex items-center gap-2 text-backrooms-yellow tracking-[0.32em] text-sm sm:text-base font-glitch"
        >
          <span className="h-2 w-2 bg-alert-red rounded-full animate-pulseAlert" />
          PACROOMS
          <span className="hidden sm:inline text-[10px] text-zinc-500 tracking-widest">
            /lvl_07
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-5 text-[11px] tracking-[0.22em] uppercase">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-zinc-400 hover:text-backrooms-yellow transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-[10px] tracking-[0.28em] uppercase text-zinc-500">
          <span className="hidden sm:flex items-center gap-1 text-terminal-green">
            <span className="h-1.5 w-1.5 rounded-full bg-terminal-green animate-flickerFast" />
            ONLINE
          </span>
          <span className="hidden sm:inline">{now}</span>
        </div>
      </div>
    </header>
  );
}
