import { ReactNode, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number; // -1 to 1, where negative moves opposite to scroll
  className?: string;
  direction?: 'vertical' | 'horizontal';
}

export default function ParallaxLayer({ 
  children, 
  speed = 0.5, 
  className = '',
  direction = 'vertical'
}: ParallaxLayerProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true
      }
    });

    if (direction === 'vertical') {
      tl.fromTo(element, 
        { y: -100 * speed }, 
        { y: 100 * speed, ease: "none" }
      );
    } else {
      tl.fromTo(element, 
        { x: -100 * speed }, 
        { x: 100 * speed, ease: "none" }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [speed, direction]);

  return (
    <div ref={elementRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}