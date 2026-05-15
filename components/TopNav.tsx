"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
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
  const [open, setOpen] = useState(false);
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

  // close mobile menu when nav anchor clicked
  useEffect(() => {
    if (!open) return;
    const onHash = () => setOpen(false);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-colors",
        scrolled || open
          ? "bg-void-900/90 backdrop-blur-sm border-b border-backrooms-yellow/30"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 h-14 flex items-center justify-between font-mono">
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
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden flex items-center justify-center w-9 h-9 border border-backrooms-yellow/40 text-backrooms-yellow hover:bg-backrooms-yellow/10 transition-colors"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <div
        className={cn(
          "md:hidden overflow-hidden border-t transition-[max-height,opacity] duration-300 ease-in-out",
          open
            ? "max-h-96 opacity-100 border-backrooms-yellow/30 bg-void-900/95"
            : "max-h-0 opacity-0 border-transparent",
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 py-3 grid grid-cols-2 gap-2 font-mono text-[12px] tracking-[0.22em] uppercase">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 border border-backrooms-yellow/20 px-3 py-2 text-zinc-300 hover:border-backrooms-yellow hover:text-backrooms-yellow transition-colors"
            >
              <span className="text-zinc-600">►</span>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
