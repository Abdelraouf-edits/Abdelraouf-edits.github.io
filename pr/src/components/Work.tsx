import { Card } from "@/components/ui/card";
import { ExternalLink, Play, ChevronLeft, ChevronRight } from "lucide-react";
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
    title: "Test",
    videoUrl: "https://streamable.com/tc8epx",
    embedId: "tc8epx",
    platform: "streamable",
    thumbnail: `https://cdn-cf-east.streamable.com/image/tc8epx.jpg`,
  },
  {
    title: "Football Highlight Reel",
    videoUrl: "https://streamable.com/l06h1d",
    embedId: "l06h1d",
    platform: "streamable",
    thumbnail: `https://cdn-cf-east.streamable.com/image/l06h1d.jpg`,
  },
  {
    title: "Mohi Visuals Style Recreation",
    videoUrl: "https://streamable.com/3ib9ax",
    embedId: "3ib9ax",
    platform: "streamable",
    thumbnail: `https://cdn-cf-east.streamable.com/image/3ib9ax.jpg`,
  },
  {
    title: "Short Form Edit",
    videoUrl: "https://streamable.com/z4gi5a",
    embedId: "z4gi5a",
    platform: "streamable",
    thumbnail: `https://cdn-cf-east.streamable.com/image/z4gi5a.jpg`,
  },
];

const Work = () => {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [projectsPage, setProjectsPage] = useState(0);
  const [reelsPage, setReelsPage] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const reelsTitleRef = useRef<HTMLDivElement>(null);
  const reelsRef = useRef<HTMLDivElement>(null);

  const PROJECTS_PER_PAGE = 4;
  const REELS_PER_PAGE = 6;

  const totalProjectsPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const totalReelsPages = Math.ceil(reels.length / REELS_PER_PAGE);

  const currentProjects = projects.slice(
    projectsPage * PROJECTS_PER_PAGE,
    (projectsPage + 1) * PROJECTS_PER_PAGE
  );

  const currentReels = reels.slice(
    reelsPage * REELS_PER_PAGE,
    (reelsPage + 1) * REELS_PER_PAGE
  );

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const nextProjectsPage = () => {
    if (projectsPage < totalProjectsPages - 1) {
      setProjectsPage(prev => prev + 1);
      setTimeout(() => scrollToSection(projectsRef), 100);
    }
  };

  const prevProjectsPage = () => {
    if (projectsPage > 0) {
      setProjectsPage(prev => prev - 1);
      setTimeout(() => scrollToSection(projectsRef), 100);
    }
  };

  const nextReelsPage = () => {
    if (reelsPage < totalReelsPages - 1) {
      setReelsPage(prev => prev + 1);
      setTimeout(() => scrollToSection(reelsRef), 100);
    }
  };

  const prevReelsPage = () => {
    if (reelsPage > 0) {
      setReelsPage(prev => prev - 1);
      setTimeout(() => scrollToSection(reelsRef), 100);
    }
  };

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
        
        <div className="relative">
          {/* Navigation Arrows for Projects */}
          {totalProjectsPages > 1 && (
            <>
              <button
                onClick={prevProjectsPage}
                disabled={projectsPage === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 w-12 h-12 rounded-full bg-primary/90 hover:bg-primary disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:hover:scale-100"
                aria-label="Previous projects"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextProjectsPage}
                disabled={projectsPage >= totalProjectsPages - 1}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 w-12 h-12 rounded-full bg-primary/90 hover:bg-primary disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:hover:scale-100"
                aria-label="Next projects"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-32" ref={projectsRef}>
            {currentProjects.map((project, index) => (
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

        {/* Pagination Indicator for Projects */}
        {totalProjectsPages > 1 && (
          <div className="flex justify-center gap-2 mb-32">
            {Array.from({ length: totalProjectsPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setProjectsPage(idx);
                  setTimeout(() => scrollToSection(projectsRef), 100);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === projectsPage
                    ? 'bg-primary w-8'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to projects page ${idx + 1}`}
              />
            ))}
          </div>
        )}
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
        
        <div className="relative">
          {/* Navigation Arrows for Reels */}
          {totalReelsPages > 1 && (
            <>
              <button
                onClick={prevReelsPage}
                disabled={reelsPage === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 w-12 h-12 rounded-full bg-primary/90 hover:bg-primary disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:hover:scale-100"
                aria-label="Previous reels"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextReelsPage}
                disabled={reelsPage >= totalReelsPages - 1}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 w-12 h-12 rounded-full bg-primary/90 hover:bg-primary disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:hover:scale-100"
                aria-label="Next reels"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto" ref={reelsRef}>
            {currentReels.map((reel, index) => (
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

        {/* Pagination Indicator for Reels */}
        {totalReelsPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalReelsPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setReelsPage(idx);
                  setTimeout(() => scrollToSection(reelsRef), 100);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === reelsPage
                    ? 'bg-primary w-8'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to reels page ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      </div>
    </section>
  );
};

export default Work;
