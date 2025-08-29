import heroVideo from "@assets/WhatsApp Video 2025-08-27 at 17.21.38_1756297837502.mp4";

export default function Hero3D() {
  return (
    <div className="w-full h-full relative hero-gradient" data-testid="hero-3d">
      {/* Hero Lamp Glow Effect */}
      <div className="hero-lamp-glow"></div>
      
      {/* Enhanced Video Card Container */}
      <div className="absolute inset-0 flex items-center justify-center z-10 p-4">
        <div className="relative w-full max-w-3xl aspect-[16/10] video-card-container">
          
          {/* Card Header with Browser Controls */}
          <div className="video-card-header">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-white/80 font-mono text-sm">FDA-Cleared Enterprise Imaging AI Platform</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-sm"></div>
                <span className="text-green-400 font-mono text-xs font-bold">LIVE</span>
              </div>
            </div>
          </div>

          {/* Video Content Area - Full Frame */}
          <div className="absolute inset-2 rounded-[20px] overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(1.08) contrast(1.12) saturate(1.15)' }}
              onError={(e) => console.error('Video load error:', e)}
              onLoadStart={() => console.log('Video loading started')}
              onCanPlay={() => console.log('Video can play')}
              data-testid="hero-video"
            >
              <source src={heroVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Card Footer with Controls */}
          <div className="video-card-footer">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <i className="fas fa-brain text-primary text-sm"></i>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Radiology Automation Simplified</div>
                  <div className="text-white/60 text-xs">AI-Enhanced Medical Imaging</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="px-3 py-1 bg-secondary/20 text-secondary text-xs font-mono rounded-full border border-secondary/30">
                  Real-time Processing
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Subtle background elements */}
      <div className="absolute inset-0 medical-grid opacity-3" />
    </div>
  );
}