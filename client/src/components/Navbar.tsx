import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/site.config";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location === path;

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 transform-gpu perspective-1000 ${
        isScrolled ? "nav-blur backdrop-blur-xl" : "glass-card border-b backdrop-blur-lg"
      }`}
      style={{
        transform: isScrolled ? "translateY(0) rotateX(0deg)" : "translateY(0) rotateX(2deg)",
      }}
      data-testid="navbar"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group transform hover:scale-105 transition-all duration-300 perspective-1000" data-testid="logo-link">
            <div className="w-8 h-8 bg-gradient-medical rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-y-12 group-hover:shadow-lg group-hover:shadow-primary/50 transition-all duration-500 transform-gpu">
              <i className="fas fa-atom text-white text-sm group-hover:animate-spin"></i>
            </div>
            <span className="text-xl font-dm-sans font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              {siteConfig.name}
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {siteConfig.nav.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 hover:rotate-1 magnetic perspective-1000 focus-visible ${
                  isActive(item.href) 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-primary"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
                data-testid={`nav-link-${item.name.toLowerCase()}`}
              >
                <span className="inline-block hover:rotate-y-6 transition-transform duration-300">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
          
          {/* Theme Toggle and CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="text-muted-foreground hover:text-foreground transform hover:scale-110 hover:rotate-12 transition-all duration-300 magnetic"
              data-testid="theme-toggle"
            >
              <span className="transform hover:rotate-y-180 transition-transform duration-500 inline-block">
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </span>
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Link href="/demos">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transform hover:scale-110 hover:rotate-1 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 perspective-1000" data-testid="cta-demos">
                <span className="inline-block hover:rotate-y-6 transition-transform duration-300">
                  See Demos
                </span>
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-zinc-300 hover:text-white"
                data-testid="mobile-menu-button"
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 glass-card border-l border-zinc-800">
              <div className="flex flex-col space-y-6 mt-8">
                {siteConfig.nav.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-left transition-colors ${
                      isActive(item.href) 
                        ? "text-primary" 
                        : "text-zinc-300 hover:text-primary"
                    }`}
                    data-testid={`mobile-nav-link-${item.name.toLowerCase()}`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-6 border-t border-zinc-800 space-y-4">
                  <Button
                    variant="ghost"
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    className="w-full justify-start text-zinc-300 hover:text-white"
                    data-testid="mobile-theme-toggle"
                  >
                    {theme === "light" ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
                    {theme === "light" ? "Dark mode" : "Light mode"}
                  </Button>
                  <Link href="/demos" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      See Demos
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
