import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import Hero3D from "@/components/Hero3D";
import Section from "@/components/Section";
import FeatureCard from "@/components/FeatureCard";
import Medical3DCard from "@/components/Medical3DCard";
import CTA from "@/components/CTA";
import Badge from "@/components/Badge";
import { siteConfig } from "@/site.config";
import workflowImage from "@assets/image_1756364176481.png";
import xrayImage from "@assets/x-rayy_1756472628643.png";
import mriImage from "@assets/image_1756472973761.png";
import ctaBackgroundVideo from "@assets/GettyImages-876902786_1756708988158.mov";

export default function Home() {
  const [counters, setCounters] = useState({
    upscaling: 0,
    sliceThickness: 0,
    voxelSize: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    const statsSection = document.getElementById("stats");
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    const targets = {
      upscaling: siteConfig.features.xrayUpscaling,
      sliceThickness: siteConfig.features.ctSliceThickness,
      voxelSize: siteConfig.features.mriVoxelSize,
    };

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounters({
        upscaling: Math.round(targets.upscaling * progress),
        sliceThickness: Number((targets.sliceThickness * progress).toFixed(1)),
        voxelSize: Number((targets.voxelSize * progress).toFixed(1)),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, stepTime);
  };

  return (
    <>
      <Helmet>
        <title>{siteConfig.name} - {siteConfig.tagline}</title>
        <meta name="description" content={siteConfig.description} />
      </Helmet>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center medical-grid hero-gradient" style={{ paddingTop: '120px' }} data-testid="hero-section">
        <div className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8 z-20 relative">
              <div className="space-y-6">
                <div className="text-primary font-mono text-sm font-semibold tracking-wide uppercase mb-4">
                  OEM-Agnostic Medical Imaging AI Platform
                </div>
                <h1 className="text-5xl md:text-6xl font-dm-sans font-bold text-white leading-tight">
                  Prime Quality{" "}
                  <span className="text-gradient-medical">Premium Design</span>
                </h1>
                <p className="text-xl text-zinc-300 leading-relaxed max-w-lg">
                  Craft a beautiful and high-converting medical imaging platform with 
                  advanced AI technology. Optimized for enhanced patient care, speed 
                  and user experiences.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <CTA
                  href="/demos"
                  variant="primary"
                  size="lg"
                  icon={<i className="fas fa-play" />}
                  data-testid="hero-demos-cta"
                >
                  Explore Demos
                </CTA>
                <CTA
                  href="/contact"
                  variant="outline"
                  size="lg"
                  data-testid="hero-contact-cta"
                >
                  Open Store Free
                </CTA>
              </div>
              
              {/* Trust Badge */}
              <div className="pt-8">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-certificate text-primary text-lg"></i>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Get 3 months trial with medical imaging platform</div>
                    <div className="text-zinc-400 text-sm">Exclusive platform deal for elite customers</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Video Card */}
            <div className="relative h-[400px] lg:h-[600px] w-full">
              <Hero3D />
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Integration Section */}
      <section className="py-20 bg-gradient-to-b from-black to-zinc-900" data-testid="workflow-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-dm-sans font-bold text-white mb-6">
              Seamless Healthcare <span className="text-gradient-medical">Workflow Integration</span>
            </h2>
            <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
              Our AI-powered radiology solution integrates seamlessly across your entire healthcare ecosystem, 
              from emergency departments to patient management systems.
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="glass-card p-8 rounded-2xl max-w-6xl w-full">
              <img 
                src={workflowImage}
                alt="Healthcare Workflow Integration showing ED Communication, AI Radiology Solution, Care Team Communication, and Patient Management systems"
                className="w-full h-auto rounded-xl shadow-2xl"
                loading="lazy"
                data-testid="workflow-diagram"
              />
              
              {/* Caption */}
              <div className="mt-6 text-center">
                <p className="text-zinc-400 text-sm">
                  Complete workflow integration across emergency departments, radiology systems, 
                  care team coordination, and patient management platforms
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Revolutionary Performance Showcase */}
      <Section id="stats" background="gradient" className="relative overflow-hidden">
        {/* Dynamic background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-primary/10 rounded-full blur-lg animate-bounce" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-primary font-semibold tracking-wide uppercase text-sm">Performance Breakthrough</span>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-dm-sans font-bold text-white mb-6">
            Transforming <span className="text-gradient-medical">Medical Imaging</span> Worldwide
          </h2>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
            Experience revolutionary AI-driven enhancement that's already transforming healthcare institutions globally
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <div className="glass-card p-8 rounded-2xl text-center group hover:scale-105 transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                <i className="fas fa-search-plus text-white text-2xl"></i>
              </div>
              <div className="text-5xl font-bold text-primary mb-3 font-mono" data-testid="upscaling-counter">
                {counters.upscaling}<span className="text-3xl">×</span>
              </div>
              <div className="text-white font-semibold text-lg mb-2">
                Spatial Enhancement
              </div>
              <div className="text-zinc-400 text-sm leading-relaxed">
                Transform legacy X-ray systems with up to 4× spatial resolution improvement
              </div>
              <div className="mt-4 px-3 py-1 bg-primary/20 rounded-full text-primary text-xs font-semibold">
                X-RAY BREAKTHROUGH
              </div>
            </div>
          </div>

          <div className="glass-card p-8 rounded-2xl text-center group hover:scale-105 transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/60 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                <i className="fas fa-layer-group text-white text-2xl"></i>
              </div>
              <div className="text-5xl font-bold text-secondary mb-3 font-mono" data-testid="slice-thickness-counter">
                0.{counters.sliceThickness}<span className="text-3xl">mm</span>
              </div>
              <div className="text-white font-semibold text-lg mb-2">
                Slice Precision
              </div>
              <div className="text-zinc-400 text-sm leading-relaxed">
                Achieve ultra-thin slice equivalence for enhanced diagnostic accuracy
              </div>
              <div className="mt-4 px-3 py-1 bg-secondary/20 rounded-full text-secondary text-xs font-semibold">
                CT INNOVATION
              </div>
            </div>
          </div>

          <div className="glass-card p-8 rounded-2xl text-center group hover:scale-105 transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                <i className="fas fa-cube text-white text-2xl"></i>
              </div>
              <div className="text-5xl font-bold text-primary mb-3 font-mono" data-testid="voxel-size-counter">
                0.{counters.voxelSize}<span className="text-3xl">mm³</span>
              </div>
              <div className="text-white font-semibold text-lg mb-2">
                Voxel Resolution
              </div>
              <div className="text-zinc-400 text-sm leading-relaxed">
                Revolutionary MRI voxel equivalence for superior tissue contrast
              </div>
              <div className="mt-4 px-3 py-1 bg-primary/20 rounded-full text-primary text-xs font-semibold">
                MRI ADVANCEMENT
              </div>
            </div>
          </div>
        </div>

        {/* Floating achievement badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-6 relative z-10">
          <div className="glass-card px-6 py-3 rounded-full flex items-center space-x-3 group hover:scale-105 transition-all duration-300">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-white font-semibold">{siteConfig.company.studiesEnhanced.toLocaleString()}+ Studies Enhanced</span>
          </div>
          <div className="glass-card px-6 py-3 rounded-full flex items-center space-x-3 group hover:scale-105 transition-all duration-300">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <span className="text-white font-semibold">{siteConfig.company.healthcareSystems}+ Healthcare Systems</span>
          </div>
          <div className="glass-card px-6 py-3 rounded-full flex items-center space-x-3 group hover:scale-105 transition-all duration-300">
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <span className="text-white font-semibold">FDA Cleared Technology</span>
          </div>
        </div>
      </Section>

      {/* Trusted Partners Showcase */}
      <Section background="black" className="relative">
        <div className="text-center">
          <div className="mb-12">
            <h3 className="text-3xl font-dm-sans font-bold text-white mb-4">
              Trusted by <span className="text-gradient-medical">Leading Institutions</span>
            </h3>
            <p className="text-zinc-400 text-lg">
              Join the healthcare revolution with institutions already transforming patient care
            </p>
          </div>
          
          {/* Animated partner showcase with scrolling */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-rtl space-x-8 whitespace-nowrap">
              {/* First set of partners */}
              <div className="flex space-x-8 shrink-0">
                <div className="glass-card px-8 py-4 rounded-xl group hover:scale-110 transition-all duration-300 cursor-pointer">
                  <div className="text-xl font-bold text-zinc-300 group-hover:text-primary transition-colors">HOSPITAL A</div>
                  <div className="text-xs text-zinc-500 mt-1">Major Health System</div>
                </div>
                <div className="glass-card px-8 py-4 rounded-xl group hover:scale-110 transition-all duration-300 cursor-pointer">
                  <div className="text-xl font-bold text-zinc-300 group-hover:text-secondary transition-colors">MEDICAL CENTER B</div>
                  <div className="text-xs text-zinc-500 mt-1">Academic Medical Center</div>
                </div>
                <div className="glass-card px-8 py-4 rounded-xl group hover:scale-110 transition-all duration-300 cursor-pointer">
                  <div className="text-xl font-bold text-zinc-300 group-hover:text-primary transition-colors">CLINIC GROUP C</div>
                  <div className="text-xs text-zinc-500 mt-1">Regional Healthcare Network</div>
                </div>
                <div className="glass-card px-8 py-4 rounded-xl group hover:scale-110 transition-all duration-300 cursor-pointer">
                  <div className="text-xl font-bold text-zinc-300 group-hover:text-secondary transition-colors">RADIOLOGY D</div>
                  <div className="text-xs text-zinc-500 mt-1">Specialized Imaging Center</div>
                </div>
                <div className="glass-card px-8 py-4 rounded-xl group hover:scale-110 transition-all duration-300 cursor-pointer">
                  <div className="text-xl font-bold text-zinc-300 group-hover:text-primary transition-colors">UNIVERSITY HOSPITAL</div>
                  <div className="text-xs text-zinc-500 mt-1">Research Institution</div>
                </div>
                <div className="glass-card px-8 py-4 rounded-xl group hover:scale-110 transition-all duration-300 cursor-pointer">
                  <div className="text-xl font-bold text-zinc-300 group-hover:text-secondary transition-colors">IMAGING CENTER F</div>
                  <div className="text-xs text-zinc-500 mt-1">Diagnostic Specialists</div>
                </div>
              </div>
              
              {/* Duplicate set for seamless loop */}
              <div className="flex space-x-8 shrink-0">
                <div className="glass-card px-8 py-4 rounded-xl group hover:scale-110 transition-all duration-300 cursor-pointer">
                  <div className="text-xl font-bold text-zinc-300 group-hover:text-primary transition-colors">HOSPITAL A</div>
                  <div className="text-xs text-zinc-500 mt-1">Major Health System</div>
                </div>
                <div className="glass-card px-8 py-4 rounded-xl group hover:scale-110 transition-all duration-300 cursor-pointer">
                  <div className="text-xl font-bold text-zinc-300 group-hover:text-secondary transition-colors">MEDICAL CENTER B</div>
                  <div className="text-xs text-zinc-500 mt-1">Academic Medical Center</div>
                </div>
                <div className="glass-card px-8 py-4 rounded-xl group hover:scale-110 transition-all duration-300 cursor-pointer">
                  <div className="text-xl font-bold text-zinc-300 group-hover:text-primary transition-colors">CLINIC GROUP C</div>
                  <div className="text-xs text-zinc-500 mt-1">Regional Healthcare Network</div>
                </div>
                <div className="glass-card px-8 py-4 rounded-xl group hover:scale-110 transition-all duration-300 cursor-pointer">
                  <div className="text-xl font-bold text-zinc-300 group-hover:text-secondary transition-colors">RADIOLOGY D</div>
                  <div className="text-xs text-zinc-500 mt-1">Specialized Imaging Center</div>
                </div>
                <div className="glass-card px-8 py-4 rounded-xl group hover:scale-110 transition-all duration-300 cursor-pointer">
                  <div className="text-xl font-bold text-zinc-300 group-hover:text-primary transition-colors">UNIVERSITY HOSPITAL</div>
                  <div className="text-xs text-zinc-500 mt-1">Research Institution</div>
                </div>
                <div className="glass-card px-8 py-4 rounded-xl group hover:scale-110 transition-all duration-300 cursor-pointer">
                  <div className="text-xl font-bold text-zinc-300 group-hover:text-secondary transition-colors">IMAGING CENTER F</div>
                  <div className="text-xs text-zinc-500 mt-1">Diagnostic Specialists</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Revolutionary Solutions with 3D Cards */}
      <Section title="Revolutionary Solutions" subtitle="Upgrade your imaging quality without hardware replacement" background="gradient">
        <div className="grid md:grid-cols-2 gap-12">
          <Medical3DCard
            title="X-Ray Super-Resolution"
            description="Transform legacy computed radiography to digital radiography equivalent quality through AI enhancement."
            features={[
              "From ~200 µm CR → ~50 µm DR-equivalent",
              "Preserve diagnostic fidelity", 
              "Pay-per-use; OEM-agnostic"
            ]}
            image={xrayImage}
            isXRay={true}
          />
          
          <Medical3DCard
            title="CT & MRI Enhancement"
            description="Upgrade slice thickness and spatial resolution for legacy CT and MRI systems using physics-informed AI."
            features={[
              "Legacy systems → Modern equivalent quality",
              "Physics-informed processing",
              "Cloud or hybrid deployment"
            ]}
            image={mriImage}
            isXRay={false}
          />
        </div>

        {/* Additional Solutions Row */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <Medical3DCard
            title="Digital Pathology AI"
            description="Enhance microscopy images with AI-powered super-resolution for cellular and tissue analysis."
            features={[
              "Cellular detail enhancement",
              "Multi-stain compatibility",
              "Pathologist workflow integration"
            ]}
            isXRay={false}
          />

          <Medical3DCard
            title="Mammography Enhancement"
            description="Improve breast imaging quality and early detection capabilities with AI-driven enhancement."
            features={[
              "Micro-calcification clarity",
              "Dense tissue visualization",
              "FDA-cleared technology"
            ]}
            isXRay={false}
          />
        </div>
        
        <div className="text-center mt-16">
          <CTA
            href="/solutions"
            variant="primary"
            size="lg"
            icon={<i className="fas fa-arrow-right" />}
            data-testid="solutions-cta"
          >
            Explore All Solutions
          </CTA>
        </div>
      </Section>

      {/* CTA Section with Video Background */}
      <Section background="black" className="relative overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="cta-background-video"
          >
            <source src={ctaBackgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Light overlay for subtle contrast */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div className="cta-transparent-card p-12 rounded-xl text-center max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-dm-sans font-bold text-white mb-6">
            Ready to Transform Your Medical Imaging?
          </h2>
          <p className="text-xl text-zinc-300 mb-8">
            Experience the power of OEM-agnostic GenAI technology with our interactive demonstrations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTA
              href="/demos"
              variant="primary"
              size="lg"
              icon={<i className="fas fa-play" />}
              data-testid="final-demos-cta"
            >
              Try Interactive Demos
            </CTA>
            <CTA
              href="/contact"
              variant="outline"
              size="lg"
              icon={<i className="fas fa-calendar" />}
              data-testid="final-contact-cta"
            >
              Schedule Consultation
            </CTA>
          </div>
        </div>
      </Section>
    </>
  );
}
