import { ReactNode } from "react";
import { Link } from "wouter";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
  href?: string;
  className?: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  features,
  href,
  className = "",
}: FeatureCardProps) {
  const CardContent = () => (
    <div className={`glass-card p-8 rounded-xl group hover:border-primary transition-all duration-500 transform-gpu perspective-1000 ${className}`}>
      {/* 3D Floating Icon */}
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-y-12 transition-all duration-500 transform-gpu">
          {icon}
        </div>
        <h3 className="text-2xl font-dm-sans font-bold text-white group-hover:text-primary transition-colors duration-300">{title}</h3>
      </div>
      
      <p className="text-zinc-300 mb-6 group-hover:text-zinc-200 transition-colors duration-300">{description}</p>
      
      <ul className="space-y-3 text-zinc-300 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start group-hover:translate-x-2 transition-all duration-300" style={{ transitionDelay: `${index * 100}ms` }}>
            <i className="fas fa-check text-primary mt-1 mr-3 text-sm group-hover:scale-125 transition-transform duration-300"></i>
            <span className="group-hover:text-zinc-200 transition-colors duration-300">{feature}</span>
          </li>
        ))}
      </ul>
      
      {href && (
        <button className="text-primary hover:text-primary/80 font-semibold group-hover:translate-x-4 transition-all duration-300 focus-visible inline-flex items-center">
          Learn More <i className="fas fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform duration-300"></i>
        </button>
      )}
      
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />
    </div>
  );

  if (href && href.startsWith("/")) {
    return (
      <Link href={href} data-testid={`feature-card-${title.toLowerCase().replace(/\s+/g, "-")}`}>
        <CardContent />
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} data-testid={`feature-card-${title.toLowerCase().replace(/\s+/g, "-")}`}>
        <CardContent />
      </a>
    );
  }

  return (
    <div data-testid={`feature-card-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <CardContent />
    </div>
  );
}
