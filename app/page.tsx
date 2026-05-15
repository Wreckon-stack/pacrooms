import { BootSequence } from "@/components/BootSequence";
import { CRTOverlay } from "@/components/CRTOverlay";
import { TopNav } from "@/components/TopNav";
import { HeroBootScreen } from "@/components/HeroBootScreen";
import { AgentStatusDashboard } from "@/components/AgentStatusDashboard";
import { MazeScanner } from "@/components/MazeScanner";
import { AgentActivityFeed } from "@/components/AgentActivityFeed";
import { Graveyard } from "@/components/Graveyard";
import { EvolutionSystem } from "@/components/EvolutionSystem";
import { HowItWorks } from "@/components/HowItWorks";
import { LoreSection } from "@/components/LoreSection";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <main className="relative min-h-screen bg-void-900 text-zinc-200">
      <BootSequence />
      <TopNav />
      <HeroBootScreen />
      <AgentStatusDashboard />
      <MazeScanner />
      <AgentActivityFeed />
      <Graveyard />
      <EvolutionSystem />
      <HowItWorks />
      <LoreSection />
      <Footer />
      <CRTOverlay intensity="normal" />
    </main>
  );
}
