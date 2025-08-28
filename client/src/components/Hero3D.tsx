import heroVideo from "@assets/WhatsApp Video 2025-08-27 at 17.21.38_1756297837502.mp4";

export default function Hero3D() {
  return (
    <div className="w-full h-full relative hero-gradient" data-testid="hero-3d">
      {/* Hero Video */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-2xl hero-video-container">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-xl"
            onError={(e) => console.error('Video load error:', e)}
            onLoadStart={() => console.log('Video loading started')}
            onCanPlay={() => console.log('Video can play')}
            data-testid="hero-video"
          >
            <source src={heroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Video overlay with medical theme */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20 rounded-3xl"
          />
          
          {/* Technical overlay elements */}
          <div className="absolute top-4 left-4 text-primary font-mono text-sm opacity-70">
            AI ENHANCEMENT ACTIVE
          </div>
          
          <div className="absolute bottom-4 right-4 text-secondary font-mono text-xs opacity-50">
            REAL-TIME PROCESSING
          </div>
        </div>
      </div>
      
      {/* Medical grid overlay */}
      <div className="absolute inset-0 medical-grid opacity-5" />
      
      {/* Overlay scanlines effect */}
      <div className="absolute inset-0 scanlines pointer-events-none opacity-10" />
    </div>
  );
}