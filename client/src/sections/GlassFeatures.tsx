import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Shield, Microscope, Heart, Eye } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { createStaggerReveal } from '@/lib/animations';

const features = [
  {
    icon: Brain,
    title: "AI Super-Resolution",
    description: "Enhance image quality up to 8x with our proprietary deep learning algorithms",
    variant: "tilt" as const,
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: Zap,
    title: "Real-time Processing",
    description: "Lightning-fast analysis with sub-second response times for critical diagnostics",
    variant: "stacked" as const,
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Enterprise-grade security with end-to-end encryption and audit trails",
    variant: "cube" as const,
    gradient: "from-green-500/20 to-emerald-500/20"
  },
  {
    icon: Microscope,
    title: "Multi-Modal Support",
    description: "Works with X-Ray, CT, MRI, and Digital Pathology across all major OEMs",
    variant: "neoGlass" as const,
    gradient: "from-orange-500/20 to-red-500/20"
  },
  {
    icon: Heart,
    title: "Clinical Validation",
    description: "FDA-cleared algorithms with proven accuracy in real-world clinical settings",
    variant: "tilt" as const,
    gradient: "from-rose-500/20 to-pink-500/20"
  },
  {
    icon: Eye,
    title: "Radiologist AI Assistant",
    description: "Augment physician expertise with intelligent annotations and insights",
    variant: "stacked" as const,
    gradient: "from-indigo-500/20 to-purple-500/20"
  }
];

export default function GlassFeatures() {
  const featuresRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (featuresRef.current) {
      const cards = featuresRef.current.querySelectorAll('.feature-card');
      createStaggerReveal(Array.from(cards) as HTMLElement[]);
    }
  }, []);

  return (
    <section 
      ref={featuresRef}
      className="py-24 relative overflow-hidden"
      data-testid="glass-features"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center glass-card px-4 py-2 text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></div>
            Advanced Features
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-sora font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Cutting-Edge{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AI Technology
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/70 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Revolutionize medical imaging with our comprehensive AI platform designed 
            for healthcare professionals who demand excellence and precision.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <GlassCard
                key={feature.title}
                variant={feature.variant}
                className={`feature-card p-8 h-full bg-gradient-to-br ${feature.gradient} hover:${feature.gradient.replace('/20', '/30')} transition-all duration-500`}
                tiltOptions={{
                  max: feature.variant === 'tilt' ? 20 : 10,
                  perspective: 1000,
                  scale: 1.05
                }}
              >
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="w-8 h-8 text-primary" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-sora font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-white/80 leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* CTA */}
                  <motion.button
                    className="text-primary hover:text-secondary font-semibold text-sm
                             flex items-center gap-2 group transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    Learn More
                    <motion.span
                      className="inline-block"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </GlassCard>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="glass-card px-12 py-4 text-white font-semibold rounded-2xl
                     bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30
                     hover:from-primary/30 hover:to-secondary/30 transition-all duration-300"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore All Features
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}