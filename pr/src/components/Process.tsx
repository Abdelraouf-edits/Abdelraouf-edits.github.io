import { Lightbulb, Palette, Rocket } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Understand your brand",
    description: "I learn your message, audience, and goals to create visuals that truly resonate.",
    icon: Lightbulb,
  },
  {
    number: "02",
    title: "Craft the visuals",
    description: "Motion design and editing that aligns with your voice and captures attention.",
    icon: Palette,
  },
  {
    number: "03",
    title: "Deliver results",
    description: "High-quality exports ready to publish, optimized for your platform.",
    icon: Rocket,
  },
];

const Process = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      if (titleRef.current) {
        gsap.fromTo(titleRef.current.children,
          {
            opacity: 0,
            y: 40,
          },
          {
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
              end: "bottom 70%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
          }
        );
      }

      // Animate process steps with better stagger
      if (stepsRef.current) {
        gsap.fromTo(stepsRef.current.children,
          {
            opacity: 0,
            y: 50,
            scale: 0.95,
          },
          {
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 75%",
              end: "bottom 50%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="py-32 px-6" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-20 text-center" ref={titleRef}>
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">
            How I Work
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
            My Process
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative" ref={stepsRef}>
          {/* Connection lines */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="relative group"
              >
                <div className="relative">
                  <div className="absolute -top-4 -left-4 text-8xl font-black text-primary/10 group-hover:text-primary/20 transition-colors duration-500">
                    {step.number}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-gradient transition-all duration-300">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {step.description}
                  </p>
                  
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-glow transition-all duration-500 backdrop-blur-sm border border-primary/20">
                    <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>

                {/* Arrow connector */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-6 text-primary/30 group-hover:text-primary/60 transition-colors duration-500">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
