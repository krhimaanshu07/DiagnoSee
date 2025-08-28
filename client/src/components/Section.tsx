import { ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  background?: "black" | "gradient" | "zinc";
}

export default function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
  background = "black",
}: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollY = window.scrollY;
      const rate = scrollY * -0.5;
      
      // Apply parallax effect
      section.style.transform = `translateY(${rate * 0.1}px)`;
      
      // Apply 3D tilt based on scroll position
      const centerY = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distanceFromCenter = (elementCenter - centerY) / centerY;
      const tiltX = distanceFromCenter * 2;
      
      const parallaxElements = section.querySelectorAll('.parallax-bg, .parallax-mid, .parallax-front, .parallax-float');
      parallaxElements.forEach((el, index) => {
        const element = el as HTMLElement;
        const layerRate = (index + 1) * 0.1;
        element.style.transform = `
          translateZ(${-200 + index * 100}px) 
          scale(${1.2 - index * 0.05}) 
          rotateX(${tiltX * layerRate}deg)
          translateY(${rate * layerRate}px)
        `;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const backgroundClasses = {
    black: "bg-black",
    gradient: "bg-gradient-to-b from-black via-zinc-900 to-black",
    zinc: "bg-zinc-900",
  };

  return (
    <section 
      ref={sectionRef}
      id={id}
      className={cn(
        "py-20 parallax-section relative overflow-hidden",
        backgroundClasses[background], 
        className
      )}
      data-testid={id ? `section-${id}` : "section"}
    >
      {/* 3D Background Layers */}
      <div className="absolute inset-0 parallax-bg opacity-20">
        <div className="medical-grid h-full w-full" />
      </div>
      
      <div className="absolute inset-0 parallax-mid opacity-10">
        <div className="scanlines h-full w-full" />
      </div>

      <div className="container mx-auto px-6 parallax-front relative z-10">
        {(title || subtitle) && (
          <div className="text-center mb-16 parallax-float">
            {title && (
              <h2 className="text-4xl md:text-5xl font-dm-sans font-bold text-white mb-6 transform hover:scale-105 transition-transform duration-300">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-zinc-300 max-w-3xl mx-auto transform hover:scale-105 transition-transform duration-300">
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className="parallax-front">
          {children}
        </div>
      </div>
    </section>
  );
}
