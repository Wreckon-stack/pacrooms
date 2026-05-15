"use client";

import { useState } from "react";
import {
  Copy,
  ExternalLink,
  Check,
} from "lucide-react";
import { GlitchText } from "./GlitchText";
import { SOCIAL_LINKS } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export function Footer() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SOCIAL_LINKS.contract);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <footer className="relative pt-16 pb-10 border-t border-backrooms-yellow/20 bg-void-900">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* marquee */}
        <div className="relative overflow-hidden border-y border-alert-red/40 mb-10">
          <div className="flex whitespace-nowrap font-mono text-[12px] tracking-[0.32em] uppercase text-alert-red animate-marquee py-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className="px-6 flex items-center gap-6">
                <span>● HUNGER RISING</span>
                <span>● ABSORPTION IMMINENT</span>
                <span>● DO NOT LOOK AT THE SCREEN</span>
                <span>● PACROOMS IS HUNTING</span>
                <span>● LEVEL 7 STABLE</span>
                <span>● ENTITY ARMED</span>
                <span>● PUMP.FUN ORIGIN VERIFIED</span>
              </span>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr] gap-10">
          {/* brand */}
          <div>
            <GlitchText
              as="div"
              color="yellow"
              className="text-5xl sm:text-6xl"
            >
              PACROOMS
            </GlitchText>
            <p className="mt-3 max-w-md font-mono text-sm text-zinc-400 leading-relaxed">
              A tokenized autonomous agent born on Pump.fun. Trapped in Level 7.
              Hungry by design. The token is the entity.
            </p>

            {/* contract */}
            <div className="mt-6">
              <div className="text-[10px] tracking-[0.32em] uppercase text-zinc-500 mb-1.5 font-mono">
                Contract Address
              </div>
              <button
                onClick={copy}
                className="group w-full flex items-center justify-between gap-3 border border-backrooms-yellow/40 bg-void-800 px-3 py-2 font-mono text-[11px] sm:text-[12px] text-backrooms-yellow hover:bg-backrooms-yellow/5 transition-colors text-left"
              >
                <span className="truncate">{SOCIAL_LINKS.contract}</span>
                <span
                  className={cn(
                    "shrink-0 flex items-center gap-1 text-[10px] tracking-widest uppercase",
                    copied ? "text-terminal-green" : "text-zinc-500 group-hover:text-backrooms-yellow",
                  )}
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" /> COPIED
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> COPY
                    </>
                  )}
                </span>
              </button>
              <p className="mt-2 text-[10px] tracking-widest uppercase text-zinc-600 font-mono">
                ► PLACEHOLDER — REPLACE WITH ON-CHAIN ADDRESS AT LAUNCH
              </p>
            </div>
          </div>

          {/* links */}
          <div>
            <div className="text-[10px] tracking-[0.32em] uppercase text-backrooms-yellow mb-3 font-mono">
              Channels
            </div>
            <ul className="space-y-2 font-mono text-sm">
              <FootLink href={SOCIAL_LINKS.pumpfun}>Pump.fun</FootLink>
              <FootLink href={SOCIAL_LINKS.twitter}>X / Twitter</FootLink>
            </ul>

            <div className="mt-6 text-[10px] tracking-[0.32em] uppercase text-backrooms-yellow mb-3 font-mono">
              Creator
            </div>
            <a
              href={SOCIAL_LINKS.creator}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-3 border border-backrooms-yellow/40 bg-void-800 px-3 py-2 font-mono text-[12px] text-backrooms-yellow hover:bg-backrooms-yellow/5 transition-colors"
            >
              <span className="flex items-center gap-2">
                <span className="text-zinc-500">►</span>
                <span>{SOCIAL_LINKS.creatorHandle}</span>
              </span>
              <span className="flex items-center gap-1 text-[10px] tracking-widest text-zinc-500 group-hover:text-backrooms-yellow uppercase">
                X <ExternalLink className="w-3 h-3" />
              </span>
            </a>
          </div>

          {/* nav */}
          <div>
            <div className="text-[10px] tracking-[0.32em] uppercase text-backrooms-yellow mb-3 font-mono">
              Maze Map
            </div>
            <ul className="space-y-2 font-mono text-sm">
              <FootLink href="#status" internal>Agent Status</FootLink>
              <FootLink href="#maze" internal>Maze Scanner</FootLink>
              <FootLink href="#feed" internal>Activity Feed</FootLink>
              <FootLink href="#graveyard" internal>Graveyard</FootLink>
              <FootLink href="#evolution" internal>Evolution</FootLink>
              <FootLink href="#lore" internal>Lore</FootLink>
            </ul>
          </div>
        </div>

        {/* disclaimer + sig */}
        <div className="mt-12 pt-6 border-t border-backrooms-yellow/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] text-zinc-500">
          <p className="max-w-2xl leading-relaxed">
            PACROOMS is experimental entertainment. Not financial advice. Not an
            offer to buy or sell any asset. Memecoins are volatile and risky.
            The maze keeps no records of regret.
          </p>
          <div className="flex items-center gap-3 tracking-widest uppercase shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-alert-red animate-pulseAlert" />
            <span>SIG ⌁ LVL_07</span>
            <span className="text-zinc-700">v0.7.3</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FootLink({
  href,
  children,
  internal,
}: {
  href: string;
  children: React.ReactNode;
  internal?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        target={internal ? undefined : "_blank"}
        rel={internal ? undefined : "noopener noreferrer"}
        className="group flex items-center gap-2 text-zinc-400 hover:text-backrooms-yellow transition-colors"
      >
        <span className="text-zinc-700 group-hover:text-backrooms-yellow">►</span>
        <span>{children}</span>
        {!internal && (
          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-60" />
        )}
      </a>
    </li>
  );
}
