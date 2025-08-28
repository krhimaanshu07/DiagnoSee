import { Router, Route, Switch } from "wouter";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Solutions from "@/pages/Solutions";
import Technology from "@/pages/Technology";
import Demos from "@/pages/Demos";
import Pricing from "@/pages/Pricing";
import Security from "@/pages/Security";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import NotFound from "@/pages/not-found";
import { useGlobalStore } from "@/store/useGlobalStore";

function App() {
  const { showDebugPanel } = useGlobalStore();

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/solutions" component={Solutions} />
            <Route path="/technology" component={Technology} />
            <Route path="/demos" component={Demos} />
            <Route path="/pricing" component={Pricing} />
            <Route path="/security" component={Security} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/login" component={Login} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
        
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
