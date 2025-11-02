import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set([titleRef.current, subtitleRef.current, descRef.current, buttonsRef.current?.children], {
        opacity: 0,
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate hero elements on load with better timing
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        clearProps: "transform",
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        clearProps: "transform",
      }, "-=0.5")
      .to(descRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        clearProps: "transform",
      }, "-=0.3")
      .to(buttonsRef.current?.children || [], {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.5,
        clearProps: "transform",
      }, "-=0.2");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden" ref={heroRef}>
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-accent/5 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div>
          <p className="text-muted-foreground text-lg mb-4 font-light tracking-wide">
            Hi, I'm
          </p>
          <h1 ref={titleRef} className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tight text-gradient">
            Abdelraouf
          </h1>
          <div className="inline-block">
            <h2 ref={subtitleRef} className="text-2xl md:text-4xl lg:text-5xl font-light text-muted-foreground mb-8">
              Motion Designer & Video Editor
            </h2>
          </div>
        </div>
        
        <div>
          <p ref={descRef} className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            I help entrepreneurs and content creators bring their ideas to life through clean, 
            fast-paced, and engaging motion visuals.
          </p>
          
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="group text-lg px-8 py-6 bg-primary hover:bg-primary/90 transition-smooth shadow-glow hover:shadow-glow-accent hover:scale-105"
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Watch My Work
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-smooth" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 border-primary/50 hover:bg-primary/10 hover:border-primary transition-smooth hover:scale-105"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Me
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
