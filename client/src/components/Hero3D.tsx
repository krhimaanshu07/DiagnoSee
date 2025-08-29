import heroVideo from "@assets/WhatsApp Video 2025-08-27 at 17.21.38_1756297837502.mp4";

export default function Hero3D() {
  return (
    <div className="w-full h-full relative hero-gradient" data-testid="hero-3d">
      {/* Perfectly Synced Hero Video */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-5xl video-synced-container">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover video-synced-seamless"
            onError={(e) => console.error('Video load error:', e)}
            onLoadStart={() => console.log('Video loading started')}
            onCanPlay={() => console.log('Video can play')}
            data-testid="hero-video"
          >
            <source src={heroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Seamless integration overlay */}
          <div className="video-integration-overlay"></div>
          
          {/* Professional status indicators */}
          <div className="absolute top-4 left-4 flex items-center space-x-2 z-20">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-primary font-mono text-xs tracking-wide">FDA-CLEARED ENTERPRISE IMAGING AI PLATFORM</span>
          </div>
          
          <div className="absolute bottom-4 right-4 z-20">
            <div className="glass-card px-3 py-1 text-xs font-mono text-secondary">
              Radiology Automation Simplified
            </div>
          </div>
          
          {/* Subtle depth enhancement */}
          <div className="video-depth-layer"></div>
        </div>
      </div>
      
      {/* Medical grid overlay */}
      <div className="absolute inset-0 medical-grid opacity-5" />
      
      {/* Overlay scanlines effect */}
      <div className="absolute inset-0 scanlines pointer-events-none opacity-10" />
    </div>
  );
}