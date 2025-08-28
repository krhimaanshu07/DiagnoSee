import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import GlassCard from '@/components/GlassCard';

const plans = [
  {
    name: 'Research',
    price: { monthly: 299, yearly: 2990 },
    description: 'Perfect for academic institutions and research facilities',
    features: [
      'Up to 1,000 images/month',
      'Basic AI enhancement',
      'Standard support',
      'Research license included',
      'Academic pricing available'
    ],
    variant: 'tilt' as const,
    popular: false
  },
  {
    name: 'Clinical',
    price: { monthly: 899, yearly: 8990 },
    description: 'Ideal for hospitals and diagnostic centers',
    features: [
      'Up to 10,000 images/month',
      'Advanced AI suite',
      'Priority support',
      'FDA-validated algorithms',
      'HIPAA compliance',
      'Multi-user dashboard'
    ],
    variant: 'stacked' as const,
    popular: true
  },
  {
    name: 'Enterprise',
    price: { monthly: 2499, yearly: 24990 },
    description: 'For large healthcare networks and imaging centers',
    features: [
      'Unlimited image processing',
      'Custom AI models',
      '24/7 dedicated support',
      'White-label solution',
      'Advanced analytics',
      'API integration',
      'Custom workflows'
    ],
    variant: 'cube' as const,
    popular: false
  }
];

export default function GlassPricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="py-24 relative overflow-hidden" data-testid="glass-pricing">
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
            Flexible Pricing
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-sora font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Choose Your{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AI Solution
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/70 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Scalable pricing for every healthcare organization, from research 
            institutions to enterprise imaging networks.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            className="inline-flex items-center glass-card p-2 rounded-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <button
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                !isYearly 
                  ? 'bg-primary text-white' 
                  : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setIsYearly(false)}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                isYearly 
                  ? 'bg-primary text-white' 
                  : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setIsYearly(true)}
            >
              Yearly
              <span className="ml-2 text-xs bg-secondary px-2 py-1 rounded-full">
                Save 17%
              </span>
            </button>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="glass-card px-4 py-2 text-sm font-semibold text-primary flex items-center gap-2">
                    <Star className="w-4 h-4 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              <GlassCard
                variant={plan.variant}
                className={`p-8 h-full relative ${
                  plan.popular 
                    ? 'ring-2 ring-primary/50 bg-gradient-to-br from-primary/10 to-secondary/5' 
                    : ''
                }`}
              >
                <div className="space-y-6">
                  {/* Plan Header */}
                  <div className="text-center">
                    <h3 className="text-2xl font-sora font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-white/70 text-sm mb-6">
                      {plan.description}
                    </p>
                    
                    {/* Price */}
                    <div className="mb-6">
                      <div className="text-5xl font-sora font-bold text-white mb-2">
                        <span className="text-primary">$</span>
                        {isYearly ? plan.price.yearly : plan.price.monthly}
                      </div>
                      <div className="text-white/60 text-sm">
                        per {isYearly ? 'year' : 'month'}
                        {isYearly && <span className="text-secondary"> (billed annually)</span>}
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <div className="w-5 h-5 glass-card rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-white/80 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90'
                        : 'glass-card text-white hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started
                  </motion.button>
                </div>

                {/* Popular Badge Glow */}
                {plan.popular && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 opacity-50 pointer-events-none" />
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-white/60 text-sm">
            All plans include 30-day free trial • Custom enterprise solutions available
          </p>
        </motion.div>
      </div>
    </section>
  );
}