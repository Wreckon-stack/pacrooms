import type {
  AgentStatus,
  ActivityEvent,
  ConsumedEntity,
  EvolutionStage,
  PreyToken,
} from "./types";

export const AGENT_STATUS: AgentStatus = {
  status: "STALKING",
  origin: "Pump.fun",
  chain: "Solana",
  hungerLevel: 87,
  tokensDetected: 1284,
  entitiesConsumed: 39,
  treasuryFuel: 412.77,
  currentTarget: "$RUGCAT",
  currentCorridor: "Level 7 — Corridor 0x7F",
};

export const PREY_TOKENS: PreyToken[] = [
  {
    id: "rugcat",
    ticker: "$RUGCAT",
    name: "rug.cat",
    marketCap: 38_220,
    liquidity: 4_812,
    volume24h: 12_443,
    survivalOdds: 12,
    threatLevel: "CRITICAL",
    detectedAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    origin: "Pump.fun",
    position: { x: 0.18, y: 0.32 },
  },
  {
    id: "frog404",
    ticker: "$FROG404",
    name: "FROG_NOT_FOUND",
    marketCap: 121_900,
    liquidity: 22_330,
    volume24h: 88_410,
    survivalOdds: 34,
    threatLevel: "HIGH",
    detectedAt: new Date(Date.now() - 1000 * 60 * 9).toISOString(),
    origin: "Pump.fun",
    position: { x: 0.62, y: 0.18 },
  },
  {
    id: "dogevoid",
    ticker: "$DOGEVOID",
    name: "doge.void",
    marketCap: 504_220,
    liquidity: 71_010,
    volume24h: 233_100,
    survivalOdds: 58,
    threatLevel: "MEDIUM",
    detectedAt: new Date(Date.now() - 1000 * 60 * 22).toISOString(),
    origin: "Raydium",
    position: { x: 0.78, y: 0.72 },
  },
  {
    id: "bonkroom",
    ticker: "$BONKROOM",
    name: "bonk_in_the_rooms",
    marketCap: 81_002,
    liquidity: 11_290,
    volume24h: 42_330,
    survivalOdds: 21,
    threatLevel: "HIGH",
    detectedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    origin: "Pump.fun",
    position: { x: 0.34, y: 0.78 },
  },
  {
    id: "npcoin",
    ticker: "$NPCOIN",
    name: "non_player_coin",
    marketCap: 17_440,
    liquidity: 2_110,
    volume24h: 6_820,
    survivalOdds: 8,
    threatLevel: "CRITICAL",
    detectedAt: new Date(Date.now() - 1000 * 60 * 1).toISOString(),
    origin: "Unknown",
    position: { x: 0.5, y: 0.5 },
  },
  {
    id: "solghost",
    ticker: "$SOLGHOST",
    name: "sol.ghost",
    marketCap: 902_100,
    liquidity: 188_220,
    volume24h: 411_700,
    survivalOdds: 73,
    threatLevel: "LOW",
    detectedAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
    origin: "Raydium",
    position: { x: 0.88, y: 0.42 },
  },
];

export const ACTIVITY_EVENTS: ActivityEvent[] = [
  { id: "1", ts: t(0), kind: "SCAN", text: "PACROOMS AGENT SCANNING PUMP.FUN LAUNCHES..." },
  { id: "2", ts: t(4), kind: "DETECT", text: "ENTITY DETECTED: $RUGCAT" },
  { id: "3", ts: t(7), kind: "WARN", text: "SURVIVAL ODDS: 12%" },
  { id: "4", ts: t(11), kind: "LOCK", text: "TARGET LOCKED" },
  { id: "5", ts: t(14), kind: "ENTER", text: "PACROOMS ENTERED CORRIDOR 7" },
  { id: "6", ts: t(18), kind: "WARN", text: "LIQUIDITY SIGNAL WEAKENING" },
  { id: "7", ts: t(24), kind: "CONSUME", text: "CONSUMED: $FROG404" },
  { id: "8", ts: t(27), kind: "SOULS", text: "SOULS CLAIMED: 4,229" },
  { id: "9", ts: t(31), kind: "EVOLVE", text: "AGENT EVOLUTION +3%" },
  { id: "10", ts: t(36), kind: "SCAN", text: "RESUMING MAZE SWEEP — CORRIDOR 0x7F" },
  { id: "11", ts: t(41), kind: "DETECT", text: "ENTITY DETECTED: $NPCOIN" },
  { id: "12", ts: t(46), kind: "WARN", text: "PREY ATTEMPTING TO HIDE IN LP DUST" },
];

function t(offsetSec: number) {
  const d = new Date(Date.now() - offsetSec * 1000);
  return d.toISOString();
}

export const CONSUMED: ConsumedEntity[] = [
  {
    id: "c1",
    ticker: "$FROG404",
    origin: "Pump.fun",
    liquidityAbsorbed: 22_330,
    soulsClaimed: 4_229,
    timeOfDeath: t(120),
    spriteSeed: 7,
  },
  {
    id: "c2",
    ticker: "$WIFROOMS",
    origin: "Pump.fun",
    liquidityAbsorbed: 7_120,
    soulsClaimed: 1_888,
    timeOfDeath: t(580),
    spriteSeed: 12,
  },
  {
    id: "c3",
    ticker: "$LIMINAL",
    origin: "Raydium",
    liquidityAbsorbed: 91_400,
    soulsClaimed: 12_004,
    timeOfDeath: t(1240),
    spriteSeed: 3,
  },
  {
    id: "c4",
    ticker: "$CARPETCAT",
    origin: "Pump.fun",
    liquidityAbsorbed: 3_240,
    soulsClaimed: 612,
    timeOfDeath: t(2200),
    spriteSeed: 17,
  },
  {
    id: "c5",
    ticker: "$HALLWAY",
    origin: "Unknown",
    liquidityAbsorbed: 14_009,
    soulsClaimed: 2_771,
    timeOfDeath: t(3300),
    spriteSeed: 21,
  },
  {
    id: "c6",
    ticker: "$NPCDOG",
    origin: "Pump.fun",
    liquidityAbsorbed: 902,
    soulsClaimed: 144,
    timeOfDeath: t(4400),
    spriteSeed: 9,
  },
  {
    id: "c7",
    ticker: "$BUZZLIGHT",
    origin: "Raydium",
    liquidityAbsorbed: 41_222,
    soulsClaimed: 8_811,
    timeOfDeath: t(5300),
    spriteSeed: 14,
  },
  {
    id: "c8",
    ticker: "$EXITSIGN",
    origin: "Pump.fun",
    liquidityAbsorbed: 6_510,
    soulsClaimed: 1_212,
    timeOfDeath: t(6800),
    spriteSeed: 1,
  },
];

export const EVOLUTION_STAGES: EvolutionStage[] = [
  {
    id: 1,
    name: "Tokenized Orb",
    description:
      "A dormant pellet of code — minted, signed, and dropped into the maze.",
    unlocked: true,
    mutation: "Origin signature ► Pump.fun",
  },
  {
    id: 2,
    name: "Hungry Agent",
    description:
      "First scan online. Detects low-liquidity prey within Level 7.",
    unlocked: true,
    mutation: "Prey scanner ► ACTIVE",
  },
  {
    id: 3,
    name: "Maze Predator",
    description:
      "Learns corridor routing. Consumption events accelerate.",
    unlocked: true,
    mutation: "Corridor pathing ► ONLINE",
  },
  {
    id: 4,
    name: "Backrooms Protocol",
    description:
      "Treasury fuel reaches critical mass. Agent self-rewrites.",
    unlocked: false,
    mutation: "?? rewriting hunger curve ??",
  },
  {
    id: 5,
    name: "The Final Consumer",
    description:
      "The maze becomes the agent. The agent becomes the maze.",
    unlocked: false,
    mutation: "[REDACTED]",
  },
];

const CONTRACT = "GRY1dQRAPU2iDP5RFzg52vrip4ttnPtJH1CjH6Lpump";

export const SOCIAL_LINKS = {
  pumpfun: `https://pump.fun/coin/${CONTRACT}`,
  twitter: "#",
  creator: "https://x.com/wreckon",
  creatorHandle: "@wreckon",
  solscan: `https://solscan.io/token/${CONTRACT}`,
  contract: CONTRACT,
};
