import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { createCounterAnimation } from '@/lib/animations';
import GlassCard from '@/components/GlassCard';

const stats = [
  {
    value: 250000,
    suffix: '+',
    label: 'Medical Images Processed',
    description: 'Daily AI-enhanced diagnostics'
  },
  {
    value: 98.7,
    suffix: '%',
    label: 'Diagnostic Accuracy',
    description: 'FDA-validated performance'
  },
  {
    value: 1200,
    suffix: '+',
    label: 'Healthcare Facilities',
    description: 'Trust our platform globally'
  },
  {
    value: 45,
    suffix: 'ms',
    label: 'Average Processing Time',
    description: 'Real-time enhancement speed'
  }
];

export default function GlassStats() {
  const statsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (statsRef.current) {
      const counters = statsRef.current.querySelectorAll('.counter-value');
      counters.forEach((counter, index) => {
        createCounterAnimation(counter as HTMLElement, stats[index].value);
      });
    }
  }, []);

  return (
    <section 
      ref={statsRef}
      className="py-24 relative overflow-hidden"
      data-testid="glass-stats"
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
            Proven Results
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-sora font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Trusted by{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Healthcare Leaders
            </span>
          </motion.h2>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard
                variant="stacked"
                className="p-8 text-center h-full group hover:scale-105 transition-transform duration-300"
              >
                <div className="space-y-4">
                  {/* Counter */}
                  <div className="text-4xl md:text-5xl font-sora font-bold">
                    <span className="counter-value text-primary">0</span>
                    <span className="text-secondary">{stat.suffix}</span>
                  </div>
                  
                  {/* Label */}
                  <h3 className="text-xl font-sora font-semibold text-white">
                    {stat.label}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/70 text-sm">
                    {stat.description}
                  </p>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}