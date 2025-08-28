import { motion } from 'framer-motion';

interface GlowBlobProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'accent';
  className?: string;
  animate?: boolean;
}

export default function GlowBlob({ 
  size = 'md', 
  color = 'primary', 
  className = '',
  animate = true 
}: GlowBlobProps) {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
    xl: 'w-96 h-96'
  };

  const colorClasses = {
    primary: 'bg-gradient-to-br from-primary/20 to-primary/5',
    secondary: 'bg-gradient-to-br from-secondary/20 to-secondary/5',
    accent: 'bg-gradient-to-br from-purple-500/20 to-pink-500/5'
  };

  const motionProps = animate ? {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 180, 360],
      borderRadius: ["60% 40% 30% 70%", "30% 60% 70% 40%", "60% 40% 30% 70%"]
    },
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  } : {};

  return (
    <motion.div
      className={`
        ${sizeClasses[size]} 
        ${colorClasses[color]}
        ${className}
        absolute rounded-full blur-3xl opacity-30
        pointer-events-none select-none
      `}
      {...motionProps}
    />
  );
}