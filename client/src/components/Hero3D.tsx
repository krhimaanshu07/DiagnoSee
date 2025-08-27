import heroVideo from "@assets/WhatsApp Video 2025-08-27 at 17.21.38_1756297837502.mp4";

export default function Hero3D() {
  return (
    <div className="w-full h-full relative overflow-hidden" data-testid="hero-3d">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        data-testid="hero-background-video"
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Video overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-background/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/30" />
      
      {/* Technical overlay elements */}
      <div className="absolute top-4 right-4 text-primary font-mono text-sm opacity-70 z-10">
        AI ENHANCEMENT ACTIVE
      </div>
      
      <div className="absolute bottom-4 left-4 text-secondary font-mono text-xs opacity-50 z-10">
        REAL-TIME PROCESSING
      </div>
      
      {/* Medical grid overlay */}
      <div className="absolute inset-0 medical-grid opacity-5 z-10" />
      
      {/* Overlay scanlines effect */}
      <div className="absolute inset-0 scanlines pointer-events-none opacity-10 z-10" />
    </div>
  );
}