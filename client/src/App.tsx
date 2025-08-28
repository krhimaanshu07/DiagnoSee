import { ThemeProvider } from "@/contexts/ThemeContext";
import GlassNavbar from "@/sections/GlassNavbar";
import GlassHero from "@/sections/GlassHero";
import GlassFeatures from "@/sections/GlassFeatures";
import GlassStats from "@/sections/GlassStats";
import GlassPricing from "@/sections/GlassPricing";
import GlassContact from "@/sections/GlassContact";
import GlassFooter from "@/sections/GlassFooter";
import { useGlobalStore } from "@/store/useGlobalStore";

function App() {
  const { showDebugPanel } = useGlobalStore();

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-animated text-white">
        <GlassNavbar />
        
        <main>
          <GlassHero />
          <GlassFeatures />
          <GlassStats />
          <GlassPricing />
          <GlassContact />
        </main>
        
        <GlassFooter />
        
        {/* Debug Panel */}
        {showDebugPanel && (
          <div className="fixed bottom-4 right-4 glass-card p-4 rounded-lg text-xs font-mono z-50">
            <div className="text-primary font-bold mb-2">Debug Info</div>
            <div>FPS: <span id="fps-counter">60</span></div>
            <div>GPU: <span>WebGL 2.0</span></div>
            <div>SR Strength: <span>85%</span></div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
