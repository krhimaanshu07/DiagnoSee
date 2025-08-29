import { useRef } from "react";
import heroVideo from "@assets/WhatsApp Video 2025-08-27 at 17.21.38_1756297837502.mp4";

export default function Hero3D() {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
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
      
      // Apply drag transform to card with no transition during dragging
      cardRef.current.style.transition = 'none';
      cardRef.current.style.transform = `
        perspective(1200px) 
        rotateX(0deg) 
        rotateY(0deg) 
        translateX(${deltaX}px) 
        translateY(${deltaY}px) 
        scale(1.05)
      `;
      
      // Move background glow effect with the card
      if (glowRef.current) {
        glowRef.current.style.transition = 'none';
        glowRef.current.style.transform = `translateX(${deltaX * 0.3}px) translateY(${deltaY * 0.3}px)`;
      }
    };

    const handleMouseUp = () => {
      console.log('MOUSE UP - Immediate elastic snap-back');
      isDraggingRef.current = false;
      
      if (cardRef.current) {
        // Remove dragging state immediately
        cardRef.current.classList.remove('dragging');
        cardRef.current.classList.add('returning');
        
        // Force immediate return to center with no delay
        requestAnimationFrame(() => {
          if (cardRef.current) {
            cardRef.current.style.transform = '';
            cardRef.current.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            
            // Return background glow to original position
            if (glowRef.current) {
              glowRef.current.style.transform = '';
              glowRef.current.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            }
            
            // Clean up after animation
            setTimeout(() => {
              if (cardRef.current) {
                cardRef.current.classList.remove('returning');
                cardRef.current.style.transition = '';
              }
              if (glowRef.current) {
                glowRef.current.style.transition = '';
              }
            }, 300);
          }
        });
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
      <div ref={glowRef} className="hero-lamp-glow"></div>
      
      {/* Extended Background Fill Layer for Drag Area */}
      <div className="absolute inset-0 z-5" style={{
        background: `
          radial-gradient(ellipse 120% 80% at 50% 0%, hsla(140, 60%, 25%, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse 100% 100% at 80% 20%, hsla(145, 70%, 30%, 0.12) 0%, transparent 60%),
          radial-gradient(ellipse 80% 120% at 20% 70%, hsla(135, 65%, 28%, 0.1) 0%, transparent 55%),
          linear-gradient(
            135deg,
            hsl(140, 40%, 2%) 0%,
            hsl(145, 35%, 3%) 15%,
            hsl(140, 45%, 4%) 35%,
            hsl(135, 40%, 3%) 65%,
            hsl(140, 35%, 2%) 100%
          )
        `,
        width: '300vw',
        height: '300vh',
        left: '-100vw',
        top: '-100vh'
      }}></div>
      
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