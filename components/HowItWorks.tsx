"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Radar,
  MapPinned,
  Flame,
  Network,
  AlertTriangle,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const STEPS = [
  {
    id: "01",
    icon: <Cpu className="w-5 h-5" />,
    title: "Born on Pump.fun",
    body: "PACROOMS begins as a Pump.fun tokenized agent. The token is the entity — minting bonds the agent to the chain.",
  },
  {
    id: "02",
    icon: <Network className="w-5 h-5" />,
    title: "Fed by the community",
    body: "Holders, trades, and treasury growth all feed the agent. Activity raises its hunger curve and corridor reach.",
  },
  {
    id: "03",
    icon: <Radar className="w-5 h-5" />,
    title: "Scans memecoin ecosystems",
    body: "Pulls mock data now — wired to accept live feeds from Pump.fun, DexScreener, Birdeye, Helius, or Jupiter later.",
  },
  {
    id: "04",
    icon: <MapPinned className="w-5 h-5" />,
    title: "Targets visualized in the maze",
    body: "Each detected coin becomes a moving ghost dot inside Level 7. Threat level scales with weak liquidity.",
  },
  {
    id: "05",
    icon: <Flame className="w-5 h-5" />,
    title: "Consumption events broadcast",
    body: "When prey is absorbed, the live terminal logs it: corpse, souls, evolution gain. The graveyard grows.",
  },
  {
    id: "06",
    icon: <AlertTriangle className="w-5 h-5" />,
    title: "Future onchain layer",
    body: "Real wallet connection, treasury tracking, and on-chain automation hooks ship later — gated by audits.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      className="relative py-20 sm:py-28 border-t border-backrooms-yellow/10 bg-void-900"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          index="07"
          title="How PACROOMS Works"
          subtitle="A tokenized agent loop: token represents the entity, community fuels it, the maze visualizes the hunt, the feed broadcasts the kills."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative border border-backrooms-yellow/25 hover:border-backrooms-yellow/60 bg-void-800/70 p-5 font-mono transition-colors"
            >
              <div className="flex items-center justify-between text-[10px] tracking-[0.32em] uppercase text-zinc-500">
                <span>STEP {s.id}</span>
                <span className="text-backrooms-yellow">{s.icon}</span>
              </div>
              <h3 className="mt-3 font-glitch text-xl tracking-wider text-backrooms-yellow">
                {s.title}
              </h3>
              <p className="mt-2 text-[13px] text-zinc-400 leading-relaxed">
                {s.body}
              </p>
              {/* corner */}
              <span className="absolute bottom-2 right-2 text-[10px] tracking-widest text-zinc-700">
                {">>"}
              </span>
            </motion.div>
          ))}
        </div>

        {/* disclaimer */}
        <div className="mt-10 border border-alert-red/40 bg-alert-red/[0.04] p-5 font-mono">
          <div className="flex items-center gap-2 text-alert-red text-[10px] tracking-[0.32em] uppercase">
            <AlertTriangle className="w-4 h-4 animate-pulseAlert" />
            DISCLAIMER / COMPLIANCE
          </div>
          <p className="mt-3 text-[13px] text-zinc-300 leading-relaxed">
            PACROOMS is experimental entertainment and not financial advice.
            Nothing on this site is an offer or solicitation to buy, sell, or
            hold any asset. Any future automation must follow applicable laws,
            platform rules, and security best practices. Do your own research.
            The maze does not owe you anything.
          </p>
        </div>
      </div>
    </section>
  );
}
