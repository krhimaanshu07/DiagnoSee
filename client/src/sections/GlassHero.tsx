import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Play } from 'lucide-react';
import { createRevealAnimation, createParallaxEffect } from '@/lib/animations';
import ParallaxLayer from '@/components/ParallaxLayer';
import GlowBlob from '@/components/GlowBlob';
import heroVideo from "@assets/WhatsApp Video 2025-08-27 at 17.21.38_1756297837502.mp4";

export default function GlassHero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      createRevealAnimation(heroRef.current);
    }
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-animated"
      data-testid="glass-hero"
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 particles"></div>
      
      <ParallaxLayer speed={-0.3} className="absolute top-20 left-10">
        <GlowBlob size="lg" color="primary" />
      </ParallaxLayer>
      
      <ParallaxLayer speed={0.2} className="absolute bottom-20 right-10">
        <GlowBlob size="md" color="secondary" />
      </ParallaxLayer>
      
      <ParallaxLayer speed={-0.1} className="absolute top-1/3 right-1/4">
        <GlowBlob size="xl" color="accent" />
      </ParallaxLayer>

      {/* Main Content Container */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Hero Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Glass Badge */}
            <motion.div
              className="inline-flex items-center glass-card px-4 py-2 text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></div>
              AI-Powered Medical Imaging
            </motion.div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-sora font-bold leading-tight">
                <span className="text-white">OEM-Agnostic</span>{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  GenAI
                </span>{" "}
                <span className="text-white">for Medical Imaging</span>
              </h1>
              
              <p className="text-xl text-white/80 leading-relaxed max-w-2xl">
                Transform medical imaging with our cutting-edge AI platform. 
                Enhance X-Ray, CT, MRI, and Digital Pathology with super-resolution 
                and intelligent analysis across all major OEM systems.
              </p>
            </div>

            {/* Glass CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                className="glass-card px-8 py-4 text-white font-semibold rounded-2xl
                         bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30
                         hover:from-primary/30 hover:to-secondary/30 transition-all duration-300
                         flex items-center gap-3 group"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                data-testid="hero-demos-cta"
              >
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                See Live Demos
              </motion.button>
              
              <motion.button
                className="glass-card px-8 py-4 text-white font-semibold rounded-2xl
                         hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                data-testid="hero-contact-cta"
              >
                Talk to Experts
              </motion.button>
            </div>

            {/* Floating Glass Chips */}
            <div className="flex flex-wrap gap-3 pt-6">
              {['FDA Compliant', 'HIPAA Secure', 'Real-time Processing'].map((chip, index) => (
                <ParallaxLayer key={chip} speed={0.1 * (index + 1)}>
                  <motion.div
                    className="glass-card px-4 py-2 text-sm text-white/90 rounded-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {chip}
                  </motion.div>
                </ParallaxLayer>
              ))}
            </div>
          </motion.div>

          {/* Hero Video in Glass Frame */}
          <motion.div 
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative w-full max-w-lg">
              <div className="glass-card p-4 rounded-3xl">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto rounded-2xl shadow-2xl"
                  style={{
                    filter: "drop-shadow(0 0 30px rgba(0, 229, 255, 0.3))"
                  }}
                  data-testid="hero-video"
                >
                  <source src={heroVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Video Overlay */}
                <div className="absolute inset-4 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl pointer-events-none" />
                
                {/* Technical Overlays */}
                <div className="absolute top-8 left-8 text-primary font-mono text-sm opacity-80">
                  AI ENHANCEMENT ACTIVE
                </div>
                
                <div className="absolute bottom-8 right-8 text-secondary font-mono text-xs opacity-60">
                  REAL-TIME PROCESSING
                </div>
              </div>

              {/* Floating Elements */}
              <ParallaxLayer speed={0.3} className="absolute -top-4 -right-4">
                <motion.div
                  className="w-8 h-8 bg-primary/30 rounded-full blur-sm"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </ParallaxLayer>
              
              <ParallaxLayer speed={-0.2} className="absolute -bottom-4 -left-4">
                <motion.div
                  className="w-6 h-6 bg-secondary/30 rounded-full blur-sm"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </ParallaxLayer>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="glass-card w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: 1.1 }}
        >
          <ArrowDown className="w-5 h-5 text-white" />
        </motion.div>
      </motion.div>
    </section>
  );
}