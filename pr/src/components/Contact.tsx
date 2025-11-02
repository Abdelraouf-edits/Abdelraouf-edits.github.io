import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Instagram } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { toast } = useToast();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

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

      // Animate form fields
      if (formRef.current) {
        gsap.fromTo(formRef.current.children,
          {
            opacity: 0,
            y: 25,
          },
          {
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
              end: "bottom 60%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
          }
        );
      }

      // Animate social icons with bounce effect
      if (socialRef.current) {
        gsap.fromTo(socialRef.current.children,
          {
            opacity: 0,
            scale: 0.7,
          },
          {
            scrollTrigger: {
              trigger: socialRef.current,
              start: "top 85%",
              end: "bottom 70%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "back.out(1.5)",
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Message from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:abdo159001@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    toast({
      title: "Opening email client...",
      description: "Your message is ready to send!",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-32 px-6" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center" ref={titleRef}>
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
            Let's create something amazing together
          </h2>
          <p className="text-muted-foreground text-lg">
            Have a project in mind? Drop me a message and let's bring your vision to life.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 mb-12" ref={formRef}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="bg-card border-border focus:border-primary transition-colors"
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="bg-card border-border focus:border-primary transition-colors"
            />
          </div>
          <Textarea
            placeholder="Tell me about your project..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            rows={6}
            className="bg-card border-border focus:border-primary transition-colors resize-none"
          />
          <Button 
            type="submit" 
            size="lg" 
            className="w-full bg-primary hover:bg-primary/90 transition-smooth text-lg py-6 shadow-glow hover:shadow-glow-accent hover:scale-105 group"
          >
            Send Message
            <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
          </Button>
        </form>
        
        <div className="flex flex-col items-center gap-6">
          <div className="flex justify-center gap-6" ref={socialRef}>
            <a 
              href="mailto:abdo159001@gmail.com" 
              className="w-12 h-12 bg-card border border-border hover:border-primary flex items-center justify-center rounded-full transition-all hover:scale-110 hover:shadow-glow hover:-translate-y-1 group relative"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 group-hover:text-primary transition-colors" />
              {/* Tooltip */}
              <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-card border border-primary px-3 py-2 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                abdo159001@gmail.com
              </span>
            </a>
            <a 
              href="https://www.instagram.com/abdelraouf.edits/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-card border border-border hover:border-primary flex items-center justify-center rounded-full transition-all hover:scale-110 hover:shadow-glow hover:-translate-y-1 group relative"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 group-hover:text-primary transition-colors" />
              {/* Tooltip */}
              <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-card border border-primary px-3 py-2 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                @abdelraouf.edits
              </span>
            </a>
            <a 
              href="https://discord.com/users/863395257571213333" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-card border border-border hover:border-primary flex items-center justify-center rounded-full transition-all hover:scale-110 hover:shadow-glow hover:-translate-y-1 group relative"
              aria-label="Discord"
            >
              <svg 
                className="w-5 h-5 group-hover:text-primary transition-colors" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              {/* Tooltip */}
              <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-card border border-primary px-3 py-2 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                username: abdelraouf.7
              </span>
            </a>
            <a 
              href="https://x.com/abdelrauof_" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-card border border-border hover:border-primary flex items-center justify-center rounded-full transition-all hover:scale-110 hover:shadow-glow hover:-translate-y-1 group relative"
              aria-label="X (Twitter)"
            >
              <svg 
                className="w-5 h-5 group-hover:text-primary transition-colors" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              {/* Tooltip */}
              <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-card border border-primary px-3 py-2 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                @abdelrauof_
              </span>
            </a>
          </div>
          <p className="text-muted-foreground text-sm">
            Or email me directly at: <a href="mailto:abdo159001@gmail.com" className="text-primary hover:underline">abdo159001@gmail.com</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
