import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import Hero3D from "@/components/Hero3D";
import Section from "@/components/Section";
import FeatureCard from "@/components/FeatureCard";
import CTA from "@/components/CTA";
import Badge from "@/components/Badge";
import { siteConfig } from "@/site.config";

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
      <section className="min-h-screen flex items-center medical-grid pt-20" data-testid="hero-section">
        <div className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-dm-sans font-bold text-white leading-tight">
                  OEM-Agnostic{" "}
                  <span className="text-gradient-medical">GenAI</span>{" "}
                  for Medical Imaging
                </h1>
                <p className="text-xl text-zinc-300 leading-relaxed">
                  {siteConfig.tagline}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <CTA
                  href="/demos"
                  variant="primary"
                  size="lg"
                  icon={<i className="fas fa-arrow-right" />}
                  data-testid="hero-demos-cta"
                >
                  See Live Demos
                </CTA>
                <CTA
                  href="/contact"
                  variant="outline"
                  size="lg"
                  data-testid="hero-contact-cta"
                >
                  Talk to Us
                </CTA>
              </div>
            </div>

            {/* 3D Gantry Hero */}
            <div className="flex items-center justify-center h-96">
              <Hero3D />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <Section id="stats" background="black">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-primary mb-2" data-testid="upscaling-counter">
              {counters.upscaling}×
            </div>
            <div className="text-zinc-400 font-mono text-sm">
              Up to {siteConfig.features.xrayUpscaling}× spatial upscaling (X-ray)
            </div>
          </div>
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-primary mb-2" data-testid="slice-thickness-counter">
              {counters.sliceThickness}
            </div>
            <div className="text-zinc-400 font-mono text-sm">
              Down to {siteConfig.features.ctSliceThickness} mm slice equivalent (CT)
            </div>
          </div>
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-primary mb-2" data-testid="voxel-size-counter">
              {counters.voxelSize}
            </div>
            <div className="text-zinc-400 font-mono text-sm">
              {siteConfig.features.mriVoxelSize} mm³ voxel equivalence (MRI)
            </div>
          </div>
        </div>
      </Section>

      {/* Trusted By Section */}
      <Section background="black">
        <div className="text-center">
          <p className="text-zinc-400 mb-8">Trusted by leading healthcare institutions</p>
          <div className="flex justify-center items-center space-x-12 opacity-40">
            <div className="text-2xl font-bold text-zinc-500">HOSPITAL A</div>
            <div className="text-2xl font-bold text-zinc-500">MEDICAL CENTER B</div>
            <div className="text-2xl font-bold text-zinc-500">CLINIC GROUP C</div>
            <div className="text-2xl font-bold text-zinc-500">RADIOLOGY D</div>
          </div>
          <div className="mt-8">
            <Badge variant="outline" size="lg">
              <i className="fas fa-chart-line mr-2"></i>
              {siteConfig.company.studiesEnhanced.toLocaleString()}+ Studies Enhanced
            </Badge>
            <Badge variant="outline" size="lg" className="ml-4">
              <i className="fas fa-hospital mr-2"></i>
              {siteConfig.company.healthcareSystems}+ Healthcare Systems
            </Badge>
          </div>
        </div>
      </Section>

      {/* Feature Highlights */}
      <Section title="Revolutionary Solutions" subtitle="Upgrade your imaging quality without hardware replacement" background="gradient">
        <div className="grid md:grid-cols-2 gap-8">
          <FeatureCard
            icon={<i className="fas fa-x-ray text-primary text-xl"></i>}
            title="X-Ray Super-Resolution"
            description="Transform legacy computed radiography to digital radiography equivalent quality through AI enhancement."
            features={[
              "From ~200 µm CR → ~50 µm DR-equivalent",
              "Preserve diagnostic fidelity",
              "Pay-per-use; OEM-agnostic"
            ]}
            href="/solutions"
          />
          
          <FeatureCard
            icon={<i className="fas fa-microscope text-primary text-xl"></i>}
            title="CT & MRI Enhancement"
            description="Upgrade slice thickness and spatial resolution for legacy CT and MRI systems using physics-informed AI."
            features={[
              "Legacy systems → Modern equivalent quality",
              "Physics-informed processing",
              "Cloud or hybrid deployment"
            ]}
            href="/solutions"
          />
        </div>
        
        <div className="text-center mt-12">
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

      {/* CTA Section */}
      <Section background="black">
        <div className="glass-card p-12 rounded-xl text-center max-w-4xl mx-auto">
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
