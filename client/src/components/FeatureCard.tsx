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
    <div className={`glass-card p-8 rounded-xl group hover:border-primary transition-all duration-300 ${className}`}>
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
          {icon}
        </div>
        <h3 className="text-2xl font-dm-sans font-bold text-white">{title}</h3>
      </div>
      
      <p className="text-zinc-300 mb-6">{description}</p>
      
      <ul className="space-y-3 text-zinc-300 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <i className="fas fa-check text-primary mt-1 mr-3 text-sm"></i>
            {feature}
          </li>
        ))}
      </ul>
      
      {href && (
        <button className="text-primary hover:text-primary/80 font-semibold group-hover:translate-x-2 transition-all duration-300 focus-visible">
          Learn More <i className="fas fa-arrow-right ml-2"></i>
        </button>
      )}
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
