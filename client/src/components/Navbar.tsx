import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/site.config";
import { Menu, X, Sun, Moon, ChevronDown, Zap, Play, Calendar } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location === path;

  return (
    <>
      {/* Stunning Navigation Bar */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
          isScrolled 
            ? "navbar-scrolled backdrop-blur-2xl bg-black/20 border-b border-white/10" 
            : "navbar-top bg-black/5 backdrop-blur-xl border-b border-white/5"
        }`}
        data-testid="navbar"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-30"></div>
        
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-4 relative">
          <div className="flex items-center justify-between">
            {/* Enhanced Logo */}
            <Link href="/" className="flex items-center space-x-3 group" data-testid="logo-link">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary via-secondary to-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-xl shadow-primary/20">
                  <i className="fas fa-atom text-white text-lg animate-spin-slow group-hover:animate-pulse"></i>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-dm-sans font-bold text-white group-hover:text-primary transition-colors duration-300">
                  {siteConfig.name}
                </span>
                <span className="text-xs text-zinc-400 font-mono tracking-wider">
                  Medical AI Platform
                </span>
              </div>
            </Link>
            
            {/* Enhanced Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-8">
              <div className="flex items-center space-x-2 xl:space-x-4">
                {siteConfig.nav.map((item, index) => (
                <div key={item.name} className="relative">
                  <Link
                    href={item.href}
                    className={`relative px-4 xl:px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 group ${
                      isActive(item.href) 
                        ? "text-primary bg-primary/10 shadow-lg shadow-primary/20" 
                        : "text-zinc-300 hover:text-white hover:bg-white/5"
                    }`}
                    data-testid={`nav-link-${item.name.toLowerCase()}`}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <span className="relative z-10">{item.name}</span>
                    
                    {/* Animated hover effect */}
                    <div className={`absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 transition-all duration-300 ${
                      hoveredItem === item.name ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}></div>
                    
                    {/* Active indicator */}
                    {isActive(item.href) && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-pulse"></div>
                    )}
                  </Link>
                  

                </div>
                ))}
              </div>
            </div>
            
            {/* Enhanced Action Buttons */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
              {/* Theme Toggle with enhanced design */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="relative w-11 h-11 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-300 group"
                data-testid="theme-toggle"
              >
                <div className="relative z-10">
                  {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="sr-only">Toggle theme</span>
              </Button>
              
              {/* Enhanced Demo Button */}
              <Link href="/demos">
                <Button 
                  className="relative px-4 xl:px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-xl shadow-primary/25 group overflow-hidden"
                  data-testid="cta-demos"
                >
                  <div className="relative z-10 flex items-center space-x-2">
                    <Play className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span>See Demos</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </Button>
              </Link>
              
              {/* Contact Button */}
              <Link href="/contact">
                <Button 
                  variant="outline"
                  className="px-4 xl:px-6 py-3 border-white/20 text-zinc-300 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 rounded-xl group"
                  data-testid="cta-contact"
                >
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span>Book Demo</span>
                  </div>
                </Button>
              </Link>
            </div>
            
            {/* Enhanced Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden w-11 h-11 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10 transition-all duration-300 relative group"
                  data-testid="mobile-menu-button"
                >
                  <div className="relative z-10">
                    {isMobileMenuOpen ? 
                      <X className="h-6 w-6 transition-transform duration-300 rotate-90" /> : 
                      <Menu className="h-6 w-6 transition-transform duration-300" />
                    }
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-80 bg-black/95 backdrop-blur-2xl border-l border-white/10 overflow-hidden"
              >
                {/* Mobile menu background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  {/* Mobile header */}
                  <div className="pt-8 pb-6 border-b border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                        <i className="fas fa-atom text-white text-sm"></i>
                      </div>
                      <div>
                        <div className="text-white font-bold">{siteConfig.name}</div>
                        <div className="text-xs text-zinc-400">Medical AI Platform</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile navigation */}
                  <div className="flex-1 py-6 space-y-2">
                    {siteConfig.nav.map((item, index) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-4 py-4 rounded-xl transition-all duration-300 group ${
                          isActive(item.href) 
                            ? "text-primary bg-primary/10 border border-primary/20" 
                            : "text-zinc-300 hover:text-white hover:bg-white/5"
                        }`}
                        data-testid={`mobile-nav-link-${item.name.toLowerCase()}`}
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.name}</span>
                          <ChevronDown className="h-4 w-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  {/* Mobile actions */}
                  <div className="border-t border-white/10 pt-6 space-y-4">
                    <Button
                      variant="ghost"
                      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                      className="w-full justify-start text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl py-4"
                      data-testid="mobile-theme-toggle"
                    >
                      <div className="flex items-center space-x-3">
                        {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                        <span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
                      </div>
                    </Button>
                    
                    <Link href="/demos" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl py-4 hover:scale-105 transition-transform">
                        <div className="flex items-center space-x-2">
                          <Play className="h-4 w-4" />
                          <span>See Demos</span>
                        </div>
                      </Button>
                    </Link>
                    
                    <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button 
                        variant="outline" 
                        className="w-full border-white/20 text-zinc-300 hover:text-white hover:border-primary/50 rounded-xl py-4"
                      >
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>Book Demo</span>
                        </div>
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent"></div>
      </nav>
      
      {/* Navbar spacer - adjusted for proper content spacing */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
}
