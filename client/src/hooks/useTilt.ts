import { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

interface TiltOptions {
  max?: number;
  speed?: number;
  glare?: boolean;
  'max-glare'?: number;
  scale?: number;
  perspective?: number;
  axis?: "x" | "y" | null;
  reset?: boolean;
  easing?: string;
}

export default function useTilt(options: TiltOptions = {}) {
  const tiltRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = tiltRef.current;
    if (!element) return;

    const defaultOptions: TiltOptions = {
      max: 15,
      speed: 400,
      glare: true,
      'max-glare': 0.2,
      scale: 1.02,
      perspective: 1000,
      reset: true,
      easing: "cubic-bezier(.03,.98,.52,.99)"
    };

    VanillaTilt.init(element, {
      ...defaultOptions,
      ...options
    });

    return () => {
      if (element && (element as any).vanillaTilt) {
        (element as any).vanillaTilt.destroy();
      }
    };
  }, [options]);

  return tiltRef;
}