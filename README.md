# PACROOMS

A tokenized autonomous agent born on Pump.fun. Trapped in the Backrooms.
Programmed to detect, stalk, and consume weak memecoins across Solana.

This is the **agent terminal** — a Next.js + Tailwind + Framer Motion app
that simulates the PACROOMS control room with mock data.

## Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS (custom Backrooms/arcade palette)
- Framer Motion (animations)
- Lucide React (icons)

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build / deploy

```bash
npm run build
npm start
```

Deploy-ready for Vercel — no env vars required.

## Mock → live data

All data lives in [`lib/mockData.ts`](lib/mockData.ts). Types in
[`lib/types.ts`](lib/types.ts) are shaped so they can be swapped for live
feeds later:

- `PREY_TOKENS` — replace with Pump.fun, DexScreener, or Birdeye scan results
- `CONSUMED` — replace with on-chain absorption events
- `AGENT_STATUS` — replace with Helius / treasury wallet reads
- `ACTIVITY_EVENTS` — replace with websocket stream

## Sections

1. Hero / Agent Boot Screen
2. Agent Status Dashboard
3. Live Maze Scanner
4. Agent Activity Feed
5. Consumed Entity Graveyard
6. Agent Evolution System
7. How PACROOMS Works
8. Lore
9. Footer

## Disclaimer

PACROOMS is experimental entertainment. Not financial advice. Any future
automation must follow applicable laws, platform rules, and security best
practices.
