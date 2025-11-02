import { Card } from "@/components/ui/card";
import { ExternalLink, Play } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import CustomVideoPlayer from "@/components/ui/CustomVideoPlayer";
import CustomStreamablePlayer from "@/components/ui/CustomStreamablePlayer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "PVE for personal brand",
    category: "Spec Work",
    videoUrl: "https://streamable.com/ct2sog",
    embedId: "ct2sog",
    thumbnail: `https://cdn-cf-east.streamable.com/image/ct2sog.jpg`,
    platform: "streamable",
  },
  {
    title: "First Motion Design Animation",
    category: "Motion Graphics",
    videoUrl: "https://streamable.com/4wa04a",
    embedId: "4wa04a",
    thumbnail: `https://cdn-cf-east.streamable.com/image/4wa04a.jpg`,
    platform: "streamable",
  },
  {
    title: "Iman Gadzhi Editing Style Recreation",
    category: "Style Recreation",
    videoUrl: "https://streamable.com/lw5cam",
    embedId: "lw5cam",
    thumbnail: `https://cdn-cf-east.streamable.com/image/lw5cam.jpg`,
    platform: "streamable",
  },
  {
    title: "The Last True Libretto",
    category: "Cinematic Edit",
    videoUrl: "https://streamable.com/v9cpns",
    embedId: "v9cpns",
    thumbnail: `https://cdn-cf-east.streamable.com/image/v9cpns.jpg`,
    platform: "streamable",
  },
];

const reels = [
  {
    title: "Football Highlight Reel",
    videoUrl: "https://streamable.com/l06h1d",
    embedId: "l06h1d",
    platform: "streamable",
    thumbnail: `https://cdn-cf-east.streamable.com/image/l06h1d.jpg`,
  },
  {
    title: "Short Form Edit",
    videoUrl: "https://streamable.com/3ib9ax",
    embedId: "3ib9ax",
    platform: "streamable",
    thumbnail: `https://cdn-cf-east.streamable.com/image/3ib9ax.jpg`,
  },
  {
    title: "Mohi Visuals Style Recreation",
    videoUrl: "https://streamable.com/z4gi5a",
    embedId: "z4gi5a",
    platform: "streamable",
    thumbnail: `https://cdn-cf-east.streamable.com/image/z4gi5a.jpg`,
  },
];

const Work = () => {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const reelsTitleRef = useRef<HTMLDivElement>(null);
  const reelsRef = useRef<HTMLDivElement>(null);

  // GSAP Scroll Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
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
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          }
        );
      }

      // Animate project cards
      if (projectsRef.current) {
        gsap.fromTo(projectsRef.current.children,
          {
            opacity: 0,
            y: 60,
            scale: 0.96,
          },
          {
            scrollTrigger: {
              trigger: projectsRef.current,
              start: "top 75%",
              end: "bottom 50%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
          }
        );
      }

      // Animate reels title
      if (reelsTitleRef.current) {
        gsap.fromTo(reelsTitleRef.current.children,
          {
            opacity: 0,
            y: 40,
          },
          {
            scrollTrigger: {
              trigger: reelsTitleRef.current,
              start: "top 85%",
              end: "bottom 70%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          }
        );
      }

      // Animate reel cards
      if (reelsRef.current) {
        gsap.fromTo(reelsRef.current.children,
          {
            opacity: 0,
            y: 60,
            scale: 0.96,
          },
          {
            scrollTrigger: {
              trigger: reelsRef.current,
              start: "top 75%",
              end: "bottom 50%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="py-32 px-6 bg-card/30" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        {/* Featured Projects Section */}
        <div className="mb-20 text-center" ref={titleRef}>
          <div className="inline-flex items-center gap-3 mb-4 px-6 py-2 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary font-semibold tracking-wider uppercase text-xs">
              Long-form Content
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mt-4 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Cinematic storytelling and professional video editing that captivates audiences
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-32" ref={projectsRef}>
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group relative"
            >
              {/* Floating background effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              
              <Card className="relative overflow-hidden bg-card/80 backdrop-blur-sm border-2 border-border/50 hover:border-primary/50 transition-all duration-500 cursor-pointer rounded-2xl shadow-2xl">
                {/* Video Container */}
                <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden rounded-t-xl">
                  {playingVideo === `project-${index}` ? (
                    project.platform === "streamable" ? (
                      <CustomStreamablePlayer 
                        videoId={project.embedId}
                        thumbnail={project.thumbnail}
                        title={project.title}
                      />
                    ) : (
                      <CustomVideoPlayer 
                        videoId={project.embedId}
                        thumbnail={project.thumbnail}
                        title={project.title}
                      />
                    )
                  ) : (
                    <div 
                      className="relative w-full h-full cursor-pointer"
                      onClick={() => setPlayingVideo(`project-${index}`)}
                    >
                      {/* Thumbnail */}
                      <img 
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                      />
                      
                      {/* Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Enhanced Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          {/* Animated rings */}
                          <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl scale-150 group-hover:scale-200 transition-all duration-700 animate-pulse" />
                          <div className="absolute inset-0 rounded-full border-2 border-primary/50 scale-125 group-hover:scale-150 transition-all duration-700" />
                          
                          {/* Play button */}
                          <div className="relative w-24 h-24 rounded-full bg-primary/95 backdrop-blur-md border-3 border-white/20 flex items-center justify-center group-hover:scale-125 transition-all duration-500 shadow-2xl">
                            <Play className="w-10 h-10 text-white ml-1.5 fill-current drop-shadow-lg" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Corner Number Badge */}
                      <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/70 backdrop-blur-md border border-primary/30 flex items-center justify-center">
                        <span className="text-primary font-bold text-lg">0{index + 1}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Content Section */}
                <div className="p-8 relative bg-gradient-to-br from-card via-card to-card/80">
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>
                    
                    <button
                      className="p-2 rounded-full bg-muted/50 hover:bg-primary/20 border border-border hover:border-primary/50 transition-all duration-300 group/btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.videoUrl, '_blank');
                      }}
                    >
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover/btn:text-primary group-hover/btn:rotate-45 transition-all duration-300" />
                    </button>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors duration-300 leading-tight">
                    {project.title}
                  </h3>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Reels Section */}
        <div className="mb-20 text-center" ref={reelsTitleRef}>
          <div className="inline-flex items-center gap-3 mb-4 px-6 py-2 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary font-semibold tracking-wider uppercase text-xs">
              Short Form Content
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mt-4 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
            Featured Reels
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Viral-worthy short-form content designed to captivate and engage
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto" ref={reelsRef}>
          {reels.map((reel, index) => (
            <div 
              key={index}
              className="group relative"
            >
              {/* Floating background effect */}
              <div className="absolute -inset-1 bg-gradient-to-b from-primary/30 via-primary/20 to-primary/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              
              <Card className="relative overflow-hidden bg-card/80 backdrop-blur-sm border-2 border-border/50 hover:border-primary/50 transition-all duration-500 cursor-pointer rounded-2xl shadow-2xl">
                {/* Video Container */}
                <div className="aspect-[9/16] bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden rounded-t-xl">
                  {playingVideo === `reel-${index}` ? (
                    reel.platform === "streamable" ? (
                      <CustomStreamablePlayer 
                        videoId={reel.embedId}
                        thumbnail={reel.thumbnail}
                        title={reel.title}
                      />
                    ) : (
                      <CustomVideoPlayer 
                        videoId={reel.embedId}
                        thumbnail={reel.thumbnail}
                        title={reel.title}
                      />
                    )
                  ) : (
                    <div 
                      className="relative w-full h-full cursor-pointer"
                      onClick={() => setPlayingVideo(`reel-${index}`)}
                    >
                      {/* Thumbnail */}
                      <img 
                        src={reel.thumbnail}
                        alt={reel.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                      />
                      
                      {/* Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Enhanced Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          {/* Animated rings */}
                          <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl scale-150 group-hover:scale-200 transition-all duration-700 animate-pulse" />
                          <div className="absolute inset-0 rounded-full border-2 border-primary/50 scale-125 group-hover:scale-150 transition-all duration-700" />
                          
                          {/* Play button */}
                          <div className="relative w-20 h-20 rounded-full bg-primary/95 backdrop-blur-md border-3 border-white/20 flex items-center justify-center group-hover:scale-125 transition-all duration-500 shadow-2xl">
                            <Play className="w-8 h-8 text-white ml-1 fill-current drop-shadow-lg" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Corner Number Badge */}
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-primary/30 flex items-center justify-center">
                        <span className="text-primary font-bold text-sm">0{index + 1}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Content Section */}
                <div className="p-5 relative bg-gradient-to-br from-card via-card to-card/80">
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Title */}
                  <h3 className="text-base font-bold group-hover:text-primary transition-colors duration-300 leading-tight mb-3">
                    {reel.title}
                  </h3>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
