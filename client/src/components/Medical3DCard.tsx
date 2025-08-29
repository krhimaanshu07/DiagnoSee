import { useState } from "react";

interface Medical3DCardProps {
  title: string;
  description: string;
  features: string[];
  image?: string;
  isXRay?: boolean;
  className?: string;
}

export default function Medical3DCard({ 
  title, 
  description, 
  features, 
  image, 
  isXRay = false,
  className = "" 
}: Medical3DCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`medical-3d-card-container ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Card Frame */}
      <div className="medical-3d-card">
        {/* Card Header */}
        <div className="medical-3d-card-header">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-primary font-mono text-xs font-semibold">
                {isXRay ? "X-RAY ENHANCEMENT" : "AI PROCESSING"}
              </span>
            </div>
            <div className="text-green-400 font-mono text-xs">
              {isXRay ? "LIVE" : "READY"}
            </div>
          </div>
        </div>

        {/* Medical Image Display */}
        {image ? (
          <div className="medical-3d-image-frame">
            <img 
              src={image} 
              alt={title}
              className="medical-3d-image"
            />
            {/* Scanning Lines Effect */}
            <div className="medical-scan-lines"></div>
            
            {/* Glow Overlay */}
            <div className="medical-glow-overlay"></div>
          </div>
        ) : (
          <div className="medical-3d-placeholder">
            <div className="medical-placeholder-content">
              <div className="medical-placeholder-icon">
                <i className={`fas ${isXRay ? 'fa-x-ray' : 'fa-microscope'} text-primary text-4xl`}></i>
              </div>
              <div className="medical-placeholder-grid"></div>
            </div>
          </div>
        )}

        {/* Card Content */}
        <div className="medical-3d-card-content">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-zinc-300 text-sm mb-4 leading-relaxed">
            {description}
          </p>

          {/* Feature List */}
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-zinc-400 text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {/* Enhancement Badge */}
          <div className="mt-4 px-3 py-1 bg-primary/20 rounded-full text-primary text-xs font-semibold text-center">
            {isXRay ? "SUPER-RESOLUTION ACTIVE" : "AI ENHANCEMENT READY"}
          </div>
        </div>

        {/* Holographic Border Effect */}
        <div className="medical-holographic-border"></div>
      </div>
    </div>
  );
}