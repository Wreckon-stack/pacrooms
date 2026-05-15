export type ThreatLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface PreyToken {
  id: string;
  ticker: string;
  name: string;
  marketCap: number;
  liquidity: number;
  volume24h: number;
  survivalOdds: number; // 0..100
  threatLevel: ThreatLevel;
  detectedAt: string; // ISO
  origin: "Pump.fun" | "Raydium" | "Unknown";
  position?: { x: number; y: number }; // 0..1 in maze
}

export interface ConsumedEntity {
  id: string;
  ticker: string;
  origin: "Pump.fun" | "Raydium" | "Unknown";
  liquidityAbsorbed: number;
  soulsClaimed: number;
  timeOfDeath: string; // ISO
  spriteSeed: number; // for deterministic ghost sprite
}

export interface AgentStatus {
  status: "ONLINE" | "STALKING" | "FEEDING" | "DORMANT";
  origin: string;
  chain: string;
  hungerLevel: number; // 0..100
  tokensDetected: number;
  entitiesConsumed: number;
  treasuryFuel: number; // SOL
  currentTarget: string;
  currentCorridor: string;
}

export interface ActivityEvent {
  id: string;
  ts: string;
  kind:
    | "SCAN"
    | "DETECT"
    | "LOCK"
    | "ENTER"
    | "WARN"
    | "CONSUME"
    | "SOULS"
    | "EVOLVE"
    | "GLITCH"
    | "UNKNOWN";
  text: string;
}

export interface EvolutionStage {
  id: number;
  name: string;
  description: string;
  unlocked: boolean;
  mutation: string;
}
