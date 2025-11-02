import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo(titleRef.current, 
        {
          opacity: 0,
          y: 30,
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
          ease: "power3.out",
        }
      );

      // Animate text paragraphs with better stagger
      if (textRef.current) {
        gsap.fromTo(textRef.current.children,
          {
            opacity: 0,
            x: -40,
          },
          {
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
              end: "bottom 60%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
          }
        );
      }

      // Animate photo with better timing
      gsap.fromTo(photoRef.current,
        {
          opacity: 0,
          x: 40,
          scale: 0.95,
        },
        {
          scrollTrigger: {
            trigger: photoRef.current,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden" ref={sectionRef}>
      {/* Subtle background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16 text-center" ref={titleRef}>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 text-lg md:text-xl leading-relaxed" ref={textRef}>
            <p className="text-foreground font-light backdrop-blur-sm bg-card/20 p-6 rounded-2xl border border-border/30 hover:border-primary/50 transition-all duration-500 hover-lift">
              I'm a <span className="text-primary font-medium">19-year-old creative</span> passionate 
              about turning ideas into motion.
            </p>
            
            <p className="text-muted-foreground font-light backdrop-blur-sm bg-card/20 p-6 rounded-2xl border border-border/30 hover:border-primary/50 transition-all duration-500 hover-lift">
              I specialize in creating <span className="text-foreground">YouTube edits</span>, {" "}
              <span className="text-foreground">reels</span>, and {" "}
              <span className="text-foreground">explainer graphics</span> that feel modern, 
              minimal, and professional.
            </p>
            
            <p className="text-muted-foreground font-light backdrop-blur-sm bg-card/20 p-6 rounded-2xl border border-border/30 hover:border-primary/50 transition-all duration-500 hover-lift">
              My goal is simple — to help your brand or content connect with your audience through 
              powerful visuals that <span className="text-primary font-medium">drive results</span>.
            </p>
          </div>

          {/* Photo */}
          <div className="flex justify-center lg:justify-end" ref={photoRef}>
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all duration-500" />
              
              {/* Photo container */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] rounded-full overflow-hidden border-4 border-primary/30 group-hover:border-primary/50 transition-all duration-500 shadow-2xl">
                <img 
                  src="/abdo.webp"
                  alt="Abdo"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
