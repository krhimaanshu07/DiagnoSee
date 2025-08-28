import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Global animation settings
gsap.defaults({
  ease: "power2.out",
  duration: 0.8
});

// Reduce motion for accessibility
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const createRevealAnimation = (element: HTMLElement, options: any = {}) => {
  if (prefersReducedMotion) return;

  return gsap.fromTo(element, 
    {
      y: 60,
      opacity: 0,
      scale: 0.95,
      ...options.from
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        ...options.scrollTrigger
      },
      ...options.to
    }
  );
};

export const createStaggerReveal = (elements: HTMLElement[], options: any = {}) => {
  if (prefersReducedMotion) return;

  return gsap.fromTo(elements,
    {
      y: 60,
      opacity: 0,
      scale: 0.95
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: elements[0],
        start: "top 80%",
        toggleActions: "play none none reverse",
        ...options.scrollTrigger
      }
    }
  );
};

export const createParallaxEffect = (element: HTMLElement, speed: number = 0.5) => {
  if (prefersReducedMotion) return;

  return gsap.fromTo(element,
    { y: -100 * speed },
    {
      y: 100 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true
      }
    }
  );
};

export const createCounterAnimation = (element: HTMLElement, endValue: number) => {
  const obj = { value: 0 };
  
  return gsap.to(obj, {
    value: endValue,
    duration: 2,
    ease: "power2.out",
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toString();
    },
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });
};

export const createFloatingAnimation = (element: HTMLElement) => {
  if (prefersReducedMotion) return;

  return gsap.to(element, {
    y: -10,
    duration: 2,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1
  });
};

export const createGlowPulse = (element: HTMLElement) => {
  if (prefersReducedMotion) return;

  return gsap.to(element, {
    boxShadow: "0 0 30px rgba(0, 229, 255, 0.5)",
    duration: 2,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1
  });
};