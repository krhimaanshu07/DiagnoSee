import heroVideo from "@assets/WhatsApp Video 2025-08-27 at 17.21.38_1756297837502.mp4";

export default function Hero3D() {
  return (
    <div className="w-full h-full relative hero-gradient" data-testid="hero-3d">
      {/* Hero Lamp Glow Effect */}
      <div className="hero-lamp-glow"></div>
      
      {/* Video Card Container */}
      <div className="absolute inset-0 flex items-center justify-center z-10 p-8">
        <div className="relative w-full max-w-2xl aspect-video video-card-container">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="video-in-card"
            onError={(e) => console.error('Video load error:', e)}
            onLoadStart={() => console.log('Video loading started')}
            onCanPlay={() => console.log('Video can play')}
            data-testid="hero-video"
          >
            <source src={heroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Card Header */}
          <div className="absolute top-4 left-4 flex items-center space-x-3 z-20">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-primary font-mono text-sm font-semibold">FDA-Cleared Enterprise Imaging AI</span>
          </div>
          
          {/* Card Footer */}
          <div className="absolute bottom-4 right-4 z-20">
            <div className="glass-card px-4 py-2 rounded-lg">
              <div className="text-secondary font-mono text-xs font-semibold">
                Radiology Automation Simplified
              </div>
            </div>
          </div>
          
          {/* Live Status Indicator */}
          <div className="absolute top-4 right-4 flex items-center space-x-2 z-20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-mono text-xs font-semibold">LIVE</span>
          </div>
        </div>
      </div>
      
      {/* Subtle background elements */}
      <div className="absolute inset-0 medical-grid opacity-3" />
    </div>
  );
}