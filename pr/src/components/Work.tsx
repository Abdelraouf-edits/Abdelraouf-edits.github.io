import { Card } from "@/components/ui/card";
import { ExternalLink, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef, memo, useMemo, useCallback } from "react";
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
    title: "Spain Trip - Roman Bridge",
    videoUrl: "https://streamable.com/bzr9go",
    embedId: "bzr9go",
    thumbnail: `https://cdn-cf-east.streamable.com/image/bzr9go.jpg`,
    platform: "streamable",
  },

  {
    title: "Countries you must visit in winter",
    videoUrl: "https://streamable.com/vw9k45",
    embedId: "vw9k45",
    thumbnail: `https://cdn-cf-east.streamable.com/image/vw9k45.jpg`,
    platform: "streamable",
  },

  {
    title: "Caption Bazaar Perfumes",
    videoUrl: "https://streamable.com/2aoz7t",
    embedId: "2aoz7t",
    thumbnail: `https://cdn-cf-east.streamable.com/image/2aoz7t.jpg`,
    platform: "streamable",
  },

  {
    title: "Delivery to all countries worldwide",
    videoUrl: "https://streamable.com/ggd33r",
    embedId: "ggd33r",
    thumbnail: `https://cdn-cf-east.streamable.com/image/ggd33r.jpg`,
    platform: "streamable",
  },

  {
    title: "MANTOBACO perfume",
    videoUrl: "https://streamable.com/v29jkm",
    embedId: "v29jkm",
    thumbnail: `https://cdn-cf-east.streamable.com/image/v29jkm.jpg`,
    platform: "streamable",
  },

  {
    title: "Football Highlight Reel",
    videoUrl: "https://streamable.com/l06h1d",
    embedId: "l06h1d",
    thumbnail: `https://cdn-cf-east.streamable.com/image/l06h1d.jpg`,
    platform: "streamable",
  },

  {
    title: "Short Form Edit",
    videoUrl: "https://streamable.com/z4gi5a",
    embedId: "z4gi5a",
    thumbnail: `https://cdn-cf-east.streamable.com/image/z4gi5a.jpg`,
    platform: "streamable",
  },
];

// Optimized Reel Card with proper memoization and performance hints
const ReelCard = memo(({ 
  reel, 
  index, 
  playingVideo, 
  onPlayClick 
}: {
  reel: typeof reels[0],
  index: number,
  playingVideo: string | null,
  onPlayClick: (id: string) => void
}) => (
  <div 
    key={index}
    className="group relative w-[260px] md:w-[320px] flex-shrink-0"
    style={{ willChange: 'transform' }}
  >
    {/* Floating background effect */}
    <div className="absolute -inset-2 bg-gradient-to-b from-primary/15 via-primary/10 to-primary/15 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-700" />
    
    <Card className="relative overflow-hidden bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-500 cursor-pointer rounded-2xl shadow-2xl">
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
            onClick={() => onPlayClick(`reel-${index}`)}
          >
            {/* Thumbnail */}
            <img 
              src={reel.thumbnail}
              alt={reel.title}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-500" />
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/90 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-2xl">
                <Play className="w-9 h-9 text-white ml-1 fill-current" />
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Title */}
      <div className="p-5 bg-card">
        <h3 className="text-base md:text-lg font-semibold text-foreground/90 leading-tight line-clamp-2 text-center">
          {reel.title}
        </h3>
      </div>
    </Card>
  </div>
));

ReelCard.displayName = 'ReelCard';

const Work = () => {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [projectsPage, setProjectsPage] = useState(0);
  const [isPaused, setIsPaused] = useState(true); // Start paused until user interacts
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const reelsTitleRef = useRef<HTMLDivElement>(null);
  const reelsContainerRef = useRef<HTMLDivElement>(null);
  const scrollDirectionRef = useRef<'right' | 'left'>('right');
  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const endPauseRef = useRef<number | null>(null);
  const scrollThrottleRef = useRef<number>(0);
  const isScrollingRef = useRef<boolean>(false);

  const PROJECTS_PER_PAGE = 4;
  const totalProjectsPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);

  const currentProjects = useMemo(() => projects.slice(
    projectsPage * PROJECTS_PER_PAGE,
    (projectsPage + 1) * PROJECTS_PER_PAGE
  ), [projectsPage]);

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

  // Optimized smooth auto-scroll using requestAnimationFrame
  useEffect(() => {
    const container = reelsContainerRef.current;
    if (!container) return;

    let rafId: number;
    let lastTime = performance.now();
    const SPEED_PX_PER_SEC = 100; // Reduced for smoother motion
    const PAUSE_AT_ENDS = 2000;

    const step = (time: number) => {
      // Only update if enough time has passed (throttle to ~60fps)
      if (time - lastTime < 16) {
        rafId = requestAnimationFrame(step);
        return;
      }

      const dt = Math.min((time - lastTime) / 1000, 0.1); // Cap dt to prevent jumps
      lastTime = time;

      if (!isPaused && !isScrollingRef.current) {
        if (endPauseRef.current && time < endPauseRef.current) {
          // Still in pause at end
        } else {
          endPauseRef.current = null;

          const maxScroll = container.scrollWidth - container.clientWidth;
          const delta = SPEED_PX_PER_SEC * dt;

          if (scrollDirectionRef.current === 'right') {
            const next = container.scrollLeft + delta;
            if (next >= maxScroll - 1) {
              container.scrollLeft = maxScroll;
              endPauseRef.current = time + PAUSE_AT_ENDS;
              scrollDirectionRef.current = 'left';
            } else {
              container.scrollLeft = next;
            }
          } else {
            const next = container.scrollLeft - delta;
            if (next <= 1) {
              container.scrollLeft = 0;
              endPauseRef.current = time + PAUSE_AT_ENDS;
              scrollDirectionRef.current = 'right';
            } else {
              container.scrollLeft = next;
            }
          }
        }
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isPaused]);

  // Optimized interaction handlers with useCallback
  const handleUserInteraction = useCallback(() => {
    setHasUserInteracted(true);
    setIsPaused(false);

    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }

    inactivityTimeoutRef.current = setTimeout(() => {
      setIsPaused(true);
    }, 5000);
  }, []);

  const handleMouseEnter = useCallback(() => {
    handleUserInteraction();
  }, [handleUserInteraction]);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(true);
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
  }, []);

  const handleScroll = useCallback(() => {
    const now = Date.now();
    // Throttle scroll handler to max 10 calls per second
    if (now - scrollThrottleRef.current < 100) return;
    
    scrollThrottleRef.current = now;
    isScrollingRef.current = true;
    
    handleUserInteraction();
    
    // Update arrow visibility based on scroll position
    if (reelsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = reelsContainerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
    
    // Reset scrolling flag after a short delay
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 150);
  }, [handleUserInteraction]);

  const scrollReels = useCallback((direction: 'left' | 'right') => {
    if (reelsContainerRef.current) {
      const scrollAmount = 720; // Scroll ~2 reels at a time
      reelsContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      
      // Update arrow visibility after scroll
      setTimeout(() => {
        if (reelsContainerRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = reelsContainerRef.current;
          setShowLeftArrow(scrollLeft > 10);
          setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
      }, 300);
    }
  }, []);

  // Optimized GSAP Scroll Animations with force3D
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
              fastScrollEnd: true,
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            force3D: true,
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
              fastScrollEnd: true,
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            force3D: true,
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
              fastScrollEnd: true,
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            force3D: true,
          }
        );
      }

      // Animate reels container
      if (reelsContainerRef.current) {
        gsap.fromTo(reelsContainerRef.current,
          {
            opacity: 0,
            y: 60,
          },
          {
            scrollTrigger: {
              trigger: reelsContainerRef.current,
              start: "top 85%",
              end: "bottom 70%",
              toggleActions: "play none none none",
              fastScrollEnd: true,
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            force3D: true,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [projectsPage]);

  return (
    <section id="work" className="relative py-32 px-6 overflow-hidden" ref={sectionRef}>
      {/* Blended background effect matching About section */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      {/* Optional: Add a subtle connection gradient at the top if needed */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
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
        <div className="mb-12 text-center" ref={reelsTitleRef}>
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
        
        <div className="relative group/reels-container"
             onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}>
          
          {/* Redesigned Navigation Arrows - Show on hover only */}
          {showLeftArrow && (
            <button
              onClick={() => {
                scrollReels('left');
                handleUserInteraction();
              }}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-background/95 backdrop-blur-md border-2 border-primary/30 hover:border-primary hover:bg-primary/10 flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 opacity-0 group-hover/reels-container:opacity-100"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-primary" />
            </button>
          )}
          
          {showRightArrow && (
            <button
              onClick={() => {
                scrollReels('right');
                handleUserInteraction();
              }}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-background/95 backdrop-blur-md border-2 border-primary/30 hover:border-primary hover:bg-primary/10 flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 opacity-0 group-hover/reels-container:opacity-100"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-primary" />
            </button>
          )}
          
          {/* Optimized Reels Scroll Container with performance hints */}
          <div 
            className="flex gap-6 overflow-x-auto pb-10 pt-2 px-4 no-scrollbar scroll-smooth" 
            ref={reelsContainerRef}
            onScroll={handleScroll}
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              willChange: 'scroll-position',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {useMemo(() => (
              [...reels].reverse().map((reel, index) => (
                <ReelCard
                  key={`reel-${reel.embedId}`}
                  reel={reel}
                  index={index}
                  playingVideo={playingVideo}
                  onPlayClick={setPlayingVideo}
                />
              ))
            ), [playingVideo])}
          </div>
      </div>
      </div>
    </section>
  );
};

export default Work;
