import { ReactNode, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import VanillaTilt from 'vanilla-tilt';

interface GlassCardProps {
  variant?: 'tilt' | 'stacked' | 'cube' | 'neoGlass';
  children: ReactNode;
  className?: string;
  tiltOptions?: any;
}

export default function GlassCard({ 
  variant = 'tilt', 
  children, 
  className = '',
  tiltOptions = {}
}: GlassCardProps) {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (variant === 'tilt' && tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.2,
        scale: 1.02,
        ...tiltOptions
      });

      return () => {
        if (tiltRef.current && (tiltRef.current as any).vanillaTilt) {
          (tiltRef.current as any).vanillaTilt.destroy();
        }
      };
    }
  }, [variant, tiltOptions]);

  const baseClasses = "glass-card relative overflow-hidden";
  
  const variantClasses = {
    tilt: "transform-gpu transition-all duration-300 hover:z-10",
    stacked: "shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_16px_64px_rgba(0,0,0,0.4)]",
    cube: "perspective-1000 transform-style-preserve-3d hover:rotate-y-12 transition-transform duration-500",
    neoGlass: "shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.1)] hover:shadow-[inset_0_4px_8px_rgba(255,255,255,0.15),inset_0_-4px_8px_rgba(0,0,0,0.15)]"
  };

  if (variant === 'cube') {
    return (
      <motion.div
        ref={tiltRef}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        whileHover={{ 
          rotateY: 12,
          rotateX: 5,
          scale: 1.02 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={variant === 'tilt' ? tiltRef : undefined}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      whileHover={variant !== 'tilt' ? { scale: 1.02, y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}