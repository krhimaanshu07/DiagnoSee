import { useRef } from "react";
import heroVideo from "@assets/WhatsApp Video 2025-08-27 at 17.21.38_1756297837502.mp4";

export default function Hero3D() {
  const cardRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!cardRef.current) return;

    console.log('MOUSE DOWN - Starting drag');
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    cardRef.current.classList.add('dragging');

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !cardRef.current) return;
      
      e.preventDefault();
      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;
      
      cardRef.current.style.transform = `
        perspective(1200px) 
        rotateX(0deg) 
        rotateY(0deg) 
        translateX(${deltaX}px) 
        translateY(${deltaY}px) 
        scale(1.05)
      `;
    };

    const handleMouseUp = () => {
      console.log('MOUSE UP - Elastic return triggered');
      isDraggingRef.current = false;
      
      if (cardRef.current) {
        cardRef.current.classList.remove('dragging');
        cardRef.current.classList.add('returning');
        
        // Force return to original position
        cardRef.current.style.transform = `
          perspective(clamp(800px, 120vw, 1200px)) 
          rotateX(clamp(2deg, 0.8vw, 4deg)) 
          rotateY(clamp(-1deg, -0.5vw, -3deg))
          translateX(0px) 
          translateY(0px) 
          scale(1)
        `;
        
        // Clean up after animation
        setTimeout(() => {
          if (cardRef.current) {
            cardRef.current.classList.remove('returning');
          }
        }, 400);
      }
      
      // Remove listeners
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    // Add global listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="w-full h-full relative hero-gradient" data-testid="hero-3d">
      {/* Hero Lamp Glow Effect */}
      <div className="hero-lamp-glow"></div>
      
      {/* Dynamic Video Card Container */}
      <div className="absolute inset-0 flex items-center justify-center z-10 p-2 sm:p-4 md:p-6">
        <div 
          ref={cardRef}
          className="relative w-full max-w-[90vw] sm:max-w-4xl lg:max-w-5xl xl:max-w-6xl video-card-container"
          onMouseDown={handleMouseDown}
        >
          
          {/* Card Header with Browser Controls */}
          <div className="video-card-header">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
                </div>
                <span className="text-white/90 font-mono text-xs sm:text-sm font-medium">
                  FDA-Cleared Enterprise Imaging AI Platform
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-sm"></div>
                <span className="text-green-400 font-mono text-xs font-bold">LIVE</span>
              </div>
            </div>
          </div>

          {/* Video Content Area with Border Frame */}
          <div className="video-content-frame">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="video-with-frame"
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
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/25 rounded-lg flex items-center justify-center border border-primary/30">
                  <i className="fas fa-brain text-primary text-xs sm:text-sm"></i>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-white font-semibold text-xs sm:text-sm truncate">
                    Radiology Automation Simplified
                  </div>
                  <div className="text-white/70 text-xs truncate">AI-Enhanced Medical Imaging</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="px-2 py-1 sm:px-3 sm:py-1 bg-secondary/25 text-secondary text-xs font-mono rounded-full border border-secondary/40 whitespace-nowrap">
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