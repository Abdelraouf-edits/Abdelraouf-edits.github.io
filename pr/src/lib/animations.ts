import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Default animation configurations
export const fadeInUp = {
  opacity: 0,
  y: 60,
  duration: 0.8,
  ease: "power3.out",
};

export const fadeInLeft = {
  opacity: 0,
  x: -50,
  duration: 0.8,
  ease: "power3.out",
};

export const fadeInRight = {
  opacity: 0,
  x: 50,
  duration: 0.8,
  ease: "power3.out",
};

export const scaleIn = {
  opacity: 0,
  scale: 0.9,
  duration: 1,
  ease: "power3.out",
};

export const defaultScrollTrigger = {
  start: "top 85%",
  end: "bottom 60%",
  toggleActions: "play none none reverse",
};

// Helper function to create scroll animations
export const createScrollAnimation = (
  trigger: HTMLElement | null,
  targets: HTMLElement[] | HTMLElement | null,
  animationProps: gsap.TweenVars = fadeInUp,
  scrollTriggerProps: ScrollTrigger.Vars = defaultScrollTrigger
) => {
  if (!trigger || !targets) return;

  return gsap.from(targets, {
    scrollTrigger: {
      trigger,
      ...scrollTriggerProps,
    },
    ...animationProps,
  });
};

// Helper function to create staggered animations
export const createStaggerAnimation = (
  trigger: HTMLElement | null,
  targets: HTMLElement[] | NodeListOf<Element> | null,
  animationProps: gsap.TweenVars = fadeInUp,
  staggerDelay: number = 0.15,
  scrollTriggerProps: ScrollTrigger.Vars = defaultScrollTrigger
) => {
  if (!trigger || !targets) return;

  return gsap.from(targets, {
    scrollTrigger: {
      trigger,
      ...scrollTriggerProps,
    },
    stagger: staggerDelay,
    ...animationProps,
  });
};
