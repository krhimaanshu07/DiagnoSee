import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/site.config";
import { Menu, X, Sun, Moon, Play, Calendar } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      {/* Modern Responsive Navigation Bar */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-black/30 backdrop-blur-2xl border-b border-white/10 shadow-2xl" 
            : "bg-black/10 backdrop-blur-xl border-b border-white/5"
        }`}
        data-testid="navbar"
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-secondary/3"></div>
        
        {/* Accent lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent"></div>
        
        <div className="relative">
          {/* Container with proper responsive constraints */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-18">
              
              {/* Logo Section */}
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-3 group" data-testid="logo-link">
                  <div className="relative">
                    <div className="w-9 h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg shadow-primary/20">
                      <i className="fas fa-atom text-white text-base lg:text-lg animate-spin-slow"></i>
                    </div>
                    <div className="absolute inset-0 w-9 h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-primary to-secondary rounded-xl blur-sm opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-lg lg:text-xl font-dm-sans font-bold text-white group-hover:text-primary transition-colors duration-300">
                      {siteConfig.name}
                    </div>
                    <div className="text-xs text-zinc-400 font-mono tracking-wider">
                      Medical AI Platform
                    </div>
                  </div>
                </Link>
              </div>

              {/* Desktop Navigation - Centered */}
              <div className="hidden lg:flex flex-1 justify-center">
                <div className="flex items-center space-x-1 xl:space-x-2">
                  {siteConfig.nav.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`px-3 xl:px-4 py-2 rounded-lg font-medium transition-all duration-300 relative group ${
                        isActive(item.href) 
                          ? "text-primary bg-primary/10 shadow-md" 
                          : "text-zinc-300 hover:text-white hover:bg-white/5"
                      }`}
                      data-testid={`nav-link-${item.name.toLowerCase()}`}
                    >
                      <span className="relative z-10">{item.name}</span>
                      {isActive(item.href) && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                      )}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Desktop Action Buttons */}
              <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
                {/* Theme Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="w-9 h-9 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                  data-testid="theme-toggle"
                >
                  {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </Button>
                
                {/* Demo Button */}
                <Link href="/demos">
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20"
                    data-testid="cta-demos"
                  >
                    <Play className="h-3 w-3 mr-1" />
                    <span className="hidden xl:inline">See Demos</span>
                    <span className="xl:hidden">Demos</span>
                  </Button>
                </Link>
                
                {/* Contact Button */}
                <Link href="/contact">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-zinc-300 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 rounded-lg"
                    data-testid="cta-contact"
                  >
                    <Calendar className="h-3 w-3 mr-1" />
                    <span className="hidden xl:inline">Book Demo</span>
                    <span className="xl:hidden">Book</span>
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden flex items-center space-x-2">
                {/* Mobile Theme Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="w-9 h-9 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                  data-testid="mobile-theme-toggle-header"
                >
                  {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </Button>

                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-9 h-9 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                      data-testid="mobile-menu-button"
                    >
                      {isMobileMenuOpen ? 
                        <X className="h-5 w-5" /> : 
                        <Menu className="h-5 w-5" />
                      }
                    </Button>
                  </SheetTrigger>
                  
                  <SheetContent 
                    side="right" 
                    className="w-72 bg-black/95 backdrop-blur-2xl border-l border-white/10"
                  >
                    <div className="flex flex-col h-full">
                      {/* Mobile Header */}
                      <div className="pt-6 pb-6 border-b border-white/10">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                            <i className="fas fa-atom text-white text-sm"></i>
                          </div>
                          <div>
                            <div className="text-white font-bold text-sm">{siteConfig.name}</div>
                            <div className="text-xs text-zinc-400">Medical AI Platform</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Mobile Navigation */}
                      <div className="flex-1 py-4 space-y-1">
                        {siteConfig.nav.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block px-3 py-3 rounded-lg transition-all duration-300 ${
                              isActive(item.href) 
                                ? "text-primary bg-primary/10 border border-primary/20" 
                                : "text-zinc-300 hover:text-white hover:bg-white/5"
                            }`}
                            data-testid={`mobile-nav-link-${item.name.toLowerCase()}`}
                          >
                            <span className="font-medium">{item.name}</span>
                          </Link>
                        ))}
                      </div>
                      
                      {/* Mobile Actions */}
                      <div className="border-t border-white/10 pt-4 space-y-3">
                        <Link href="/demos" onClick={() => setIsMobileMenuOpen(false)}>
                          <Button className="w-full bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg py-3">
                            <Play className="h-4 w-4 mr-2" />
                            See Demos
                          </Button>
                        </Link>
                        
                        <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                          <Button 
                            variant="outline" 
                            className="w-full border-white/20 text-zinc-300 hover:text-white hover:border-primary/50 rounded-lg py-3"
                          >
                            <Calendar className="h-4 w-4 mr-2" />
                            Book Demo
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Responsive Navbar Spacer */}
      <div className="h-16 lg:h-18"></div>
    </>
  );
}
