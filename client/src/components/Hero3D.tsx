import heroVideo from "@assets/WhatsApp Video 2025-08-27 at 17.21.38_1756297837502.mp4";

export default function Hero3D() {
  return (
    <div className="w-full h-full relative hero-gradient" data-testid="hero-3d">
      {/* 3D Frameless Hero Video */}
      <div className="absolute inset-0 flex items-center justify-center perspective-1000">
        <div className="relative w-full h-full max-w-4xl video-3d-container">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover video-3d-frameless"
            onError={(e) => console.error('Video load error:', e)}
            onLoadStart={() => console.log('Video loading started')}
            onCanPlay={() => console.log('Video can play')}
            data-testid="hero-video"
          >
            <source src={heroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* 3D depth shadow layers */}
          <div className="video-shadow-layer-1"></div>
          <div className="video-shadow-layer-2"></div>
          <div className="video-shadow-layer-3"></div>
          
          {/* Technical overlay elements with 3D positioning */}
          <div className="absolute top-6 left-6 text-primary font-mono text-sm opacity-80 z-20 transform translate-z-10">
            <div className="bg-black/40 backdrop-blur-sm px-3 py-1 rounded border border-primary/30">
              AI ENHANCEMENT ACTIVE
            </div>
          </div>
          
          <div className="absolute bottom-6 right-6 text-secondary font-mono text-xs opacity-70 z-20 transform translate-z-10">
            <div className="bg-black/40 backdrop-blur-sm px-3 py-1 rounded border border-secondary/30">
              REAL-TIME PROCESSING
            </div>
          </div>
          
          {/* 3D particle effects */}
          <div className="video-particles"></div>
        </div>
      </div>
      
      {/* Medical grid overlay */}
      <div className="absolute inset-0 medical-grid opacity-5" />
      
      {/* Overlay scanlines effect */}
      <div className="absolute inset-0 scanlines pointer-events-none opacity-10" />
    </div>
  );
}