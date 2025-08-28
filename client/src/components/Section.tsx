import { ReactNode } from "react";
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
  const backgroundClasses = {
    black: "bg-black",
    gradient: "bg-gradient-to-b from-black to-zinc-900",
    zinc: "bg-zinc-900",
  };

  return (
    <section 
      id={id}
      className={cn("py-20", backgroundClasses[background], className)}
      data-testid={id ? `section-${id}` : "section"}
    >
      <div className="container mx-auto px-6">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-4xl md:text-5xl font-dm-sans font-bold text-white mb-6">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
