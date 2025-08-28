import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import GlassCard from '@/components/GlassCard';

export default function GlassContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-24 relative overflow-hidden" data-testid="glass-contact">
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
            Get in Touch
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-sora font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Ready to{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Transform
            </span>{" "}
            Your Imaging?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/70 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Let's discuss how our AI-powered medical imaging platform can 
            enhance your diagnostic capabilities and improve patient outcomes.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard variant="tilt" className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label className="text-white/80 text-sm font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full glass-card px-4 py-3 rounded-xl text-white placeholder-white/50 
                               border-0 focus:ring-2 focus:ring-primary/50 transition-all duration-300
                               bg-white/5 backdrop-blur-sm"
                      placeholder="Dr. John Smith"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-white/80 text-sm font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full glass-card px-4 py-3 rounded-xl text-white placeholder-white/50 
                               border-0 focus:ring-2 focus:ring-primary/50 transition-all duration-300
                               bg-white/5 backdrop-blur-sm"
                      placeholder="john@hospital.com"
                    />
                  </div>
                </div>

                {/* Organization Field */}
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">
                    Organization
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full glass-card px-4 py-3 rounded-xl text-white placeholder-white/50 
                             border-0 focus:ring-2 focus:ring-primary/50 transition-all duration-300
                             bg-white/5 backdrop-blur-sm"
                    placeholder="General Hospital Medical Center"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full glass-card px-4 py-3 rounded-xl text-white placeholder-white/50 
                             border-0 focus:ring-2 focus:ring-primary/50 transition-all duration-300
                             bg-white/5 backdrop-blur-sm resize-none"
                    placeholder="Tell us about your imaging needs and challenges..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full glass-card px-8 py-4 rounded-2xl font-semibold text-white
                           bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30
                           hover:from-primary/30 hover:to-secondary/30 transition-all duration-300
                           flex items-center justify-center gap-3 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </motion.button>
              </form>
            </GlassCard>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {/* Contact Cards */}
            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  title: 'Visit Our Office',
                  content: '123 Medical AI Drive\nSan Francisco, CA 94102\nUnited States',
                  gradient: 'from-blue-500/20 to-cyan-500/20'
                },
                {
                  icon: Phone,
                  title: 'Call Us',
                  content: '+1 (555) 123-4567\nMon-Fri 9AM-6PM PST\n24/7 Emergency Support',
                  gradient: 'from-purple-500/20 to-pink-500/20'
                },
                {
                  icon: Mail,
                  title: 'Email Us',
                  content: 'hello@agnosticai.com\nsupport@agnosticai.com\nsales@agnosticai.com',
                  gradient: 'from-green-500/20 to-emerald-500/20'
                }
              ].map((contact, index) => {
                const Icon = contact.icon;
                
                return (
                  <motion.div
                    key={contact.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <GlassCard 
                      variant="stacked" 
                      className={`p-6 bg-gradient-to-r ${contact.gradient} hover:scale-105 transition-transform duration-300`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-sora font-semibold text-white mb-2">
                            {contact.title}
                          </h3>
                          <p className="text-white/80 whitespace-pre-line leading-relaxed">
                            {contact.content}
                          </p>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <GlassCard variant="neoGlass" className="p-4 h-64">
                <div className="w-full h-full glass-card rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 
                               flex items-center justify-center relative overflow-hidden">
                  {/* Map overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                  <div className="relative z-10 text-center">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                    <p className="text-white/80 font-medium">Interactive Map</p>
                    <p className="text-white/60 text-sm">San Francisco, CA</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}