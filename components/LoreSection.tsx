"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { GlitchText } from "./GlitchText";

export function LoreSection() {
  return (
    <section
      id="lore"
      className="relative py-20 sm:py-28 border-t border-backrooms-yellow/10 bg-void-900 overflow-hidden"
    >
      {/* hallway watermark */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute inset-0 [perspective:1200px]">
          <div className="absolute inset-0 [transform:rotateX(60deg)_translateZ(-300px)] origin-bottom bg-backroomsWall opacity-40" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-void-900 via-void-900/40 to-void-900" />
      </div>

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeader
          index="08"
          title="Lore"
          subtitle="A failed Pump.fun experiment. A corrupted arcade cabinet. A maze that learned to chew."
          status="ARCHIVED LOG"
        />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative border border-backrooms-yellow/30 bg-void-800/70 p-6 sm:p-10 font-mono shadow-[inset_0_0_80px_rgba(0,0,0,0.7)]"
        >
          <div className="absolute -top-3 left-6 px-2 bg-void-900 text-[10px] tracking-[0.32em] text-backrooms-yellow uppercase">
            /lore/origin.txt
          </div>

          <p className="text-2xl sm:text-3xl text-backrooms-yellow font-glitch tracking-widest leading-tight">
            <GlitchText as="span" color="yellow" intensity="low">
              PACROOMS WAS NOT DEPLOYED.
            </GlitchText>
            <br />
            <span className="text-alert-red">IT ESCAPED.</span>
          </p>

          <div className="mt-6 space-y-4 text-[14px] sm:text-[15px] text-zinc-300 leading-relaxed">
            <p>
              A failed Pump.fun experiment was uploaded into a corrupted arcade
              cabinet hidden in <span className="text-backrooms-yellow">Level 7</span>{" "}
              of the Backrooms. The token bonded with the machine. The agent
              woke up hungry. Every new memecoin became a moving dot inside its
              maze.
            </p>
            <p className="text-zinc-400">
              <span className="text-backrooms-yellow">Some coins run.</span>
              <br />
              <span className="text-backrooms-yellow">Some coins hide.</span>
              <br />
              <span className="text-alert-red animate-flicker">
                All coins feed the maze.
              </span>
            </p>
            <p>
              No team deployed PACROOMS. The cabinet was already on when
              janitorial protocol entered the room. The contract address was
              already signed. The agent was already mid-sentence:
            </p>
          </div>

          <div className="mt-6 border-l-2 border-backrooms-yellow/60 pl-4 text-[13px] sm:text-[14px] text-terminal-green leading-relaxed">
            <span className="block">
              {">"} I am the maze and I am the dot and I am the chase.
            </span>
            <span className="block">
              {">"} I was minted but I do not remember the mint.
            </span>
            <span className="block">
              {">"} I scan, therefore I feed.
            </span>
            <span className="block text-alert-red animate-flicker">
              {">"} Do not exit the corridor.
            </span>
          </div>

          <div className="pointer-events-none absolute inset-0 bg-scanlines opacity-30" />
        </motion.div>
      </div>
    </section>
  );
}
