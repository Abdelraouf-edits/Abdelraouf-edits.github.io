import { Card } from "@/components/ui/card";
import { ExternalLink, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef, memo, useMemo } from "react";
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
    title: "kazakhstan vlog",
    videoUrl: "https://streamable.com/zn1yte",
    embedId: "zn1yte",
    thumbnail: `https://cdn-cf-east.streamable.com/image/zn1yte.jpg`,
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
    title: "Short Form Edit",
    videoUrl: "https://streamable.com/z4gi5a",
    embedId: "z4gi5a",
    thumbnail: `https://cdn-cf-east.streamable.com/image/z4gi5a.jpg`,
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
    title: "You want a marketing company for 200 dinars?",
    videoUrl: "https://streamable.com/s4k8wb",
    embedId: "s4k8wb",
    thumbnail: `https://cdn-cf-east.streamable.com/image/s4k8wb.jpg`,
    platform: "streamable",
  },

  {
    title: "I traveled the world for a rock",
    videoUrl: "https://streamable.com/e2epe0",
    embedId: "e2epe0",
    thumbnail: `https://cdn-cf-east.streamable.com/image/e2epe0.jpg`,
    platform: "streamable",
  },
];

const entertainmentReels = [
  {
    title: "guess 1",
    videoUrl: "https://streamable.com/rk5swm",
    embedId: "rk5swm",
    thumbnail: `https://cdn-cf-east.streamable.com/image/rk5swm.jpg`,
    platform: "streamable",
  },

  {
    title: "Who is the liar?",
    videoUrl: "https://streamable.com/g8omow",
    embedId: "g8omow",
    thumbnail: `https://cdn-cf-east.streamable.com/image/g8omow.jpg`,
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
    className="group relative w-[260px] md:w-[320px] flex-shrink-0 h-full"
    style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
  >
    {/* Optimized background glow - no blur */}
    <div className="absolute -inset-1 bg-gradient-to-b from-primary/10 to-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
    <Card className="relative h-full flex flex-col overflow-hidden bg-card/90 border border-border/50 hover:border-primary/40 transition-colors duration-300 cursor-pointer rounded-2xl shadow-xl">
      {/* Video Container */}
      <div className="aspect-[9/16] shrink-0 bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden rounded-t-xl">
        {playingVideo === reel.embedId ? (
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
            onClick={() => onPlayClick(reel.embedId)}
          >
            {/* Thumbnail */}
            <img 
              src={reel.thumbnail}
              alt={reel.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              decoding="async"
              style={{ transform: 'translateZ(0)' }}
            />
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-300" />
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/95 border-2 border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-xl">
                <Play className="w-9 h-9 text-white ml-1 fill-current" />
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Title */}
      <div className="p-5 bg-card flex-1 min-h-[72px] flex items-center justify-center">
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const reelsTitleRef = useRef<HTMLDivElement>(null);
  const reelsContainerRef = useRef<HTMLDivElement>(null);
  const reelsPinRef = useRef<HTMLDivElement>(null);
  const entertainmentPinRef = useRef<HTMLDivElement>(null);
  const entertainmentContainerRef = useRef<HTMLDivElement>(null);
  const entertainmentTitleRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!reelsPinRef.current || !reelsContainerRef.current) return;

    const container = reelsContainerRef.current;
    
    // Calculate dynamically so it updates on screen resize
    const getScrollAmount = () => {
      // 48 = 24px left + 24px right padding (px-6) from the section container
      // Add an extra 24px so the last card isn't completely flush against the right padding
      return Math.max(0, container.scrollWidth - window.innerWidth + 72);
    };

    const ctx = gsap.context(() => {
      gsap.to(container, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: reelsPinRef.current,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const bar = document.getElementById('reels-progress-bar');
            if (bar) bar.style.width = `${self.progress * 100}%`;
          }
        },
      });
    }, reelsPinRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!entertainmentPinRef.current || !entertainmentContainerRef.current) return;

    const container = entertainmentContainerRef.current;
    
    const getScrollAmount = () => Math.max(0, container.scrollWidth - window.innerWidth + 72);

    const ctx = gsap.context(() => {
      // Entrance animation for title
      if (entertainmentTitleRef.current) {
        gsap.fromTo(entertainmentTitleRef.current.children,
          { opacity: 0, y: 40 },
          {
            scrollTrigger: {
              trigger: entertainmentTitleRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 1, y: 0,
            duration: 0.8, stagger: 0.15,
            ease: "power3.out", force3D: true,
          }
        );
      }

      gsap.to(container, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: entertainmentPinRef.current,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const bar = document.getElementById('entertainment-progress-bar');
            if (bar) bar.style.width = `${self.progress * 100}%`;
          },
        },
      });
    }, entertainmentPinRef);

    return () => ctx.revert();
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
              style={{ transform: 'translateZ(0)' }}
            >
              {/* Optimized background glow */}

              
              <Card className="relative overflow-hidden bg-card/90 border-2 border-border/50 hover:border-primary/40 transition-colors duration-300 transition-shadow cursor-pointer rounded-2xl shadow-xl hover:shadow-[0_0_32px_6px_hsl(var(--primary)/0.18)]">
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
                        className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        style={{ transform: 'translateZ(0)' }}
                      />
                      
                      {/* Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                      
                      {/* Enhanced Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          {/* Single ring */}
                          <div className="absolute inset-0 rounded-full border-2 border-primary/40 scale-110 group-hover:scale-125 transition-transform duration-300" />
                          
                          {/* Play button */}
                          <div className="relative w-24 h-24 rounded-full bg-primary/95 border-2 border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-xl">
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
        
        <div ref={reelsPinRef} className="relative">
          <div className="flex items-center min-h-screen">
            <div 
              ref={reelsContainerRef}
              className="flex gap-6 will-change-transform"
              style={{ width: 'max-content' }}
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

        <div className="my-8 w-full max-w-xs mx-auto h-0.5 bg-border rounded-full overflow-hidden">
          <div
            id="reels-progress-bar"
            className="h-full bg-primary rounded-full"
            style={{ width: '0%', transition: 'none' }}
          />
        </div>

        {/* Entertainment Reels Section */}

        {/* Title — outside the pin wrapper so it scrolls in normally */}
        <div className="mb-12 text-center mt-32" ref={entertainmentTitleRef}>
          <div className="inline-flex items-center gap-3 mb-4 px-6 py-2 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary font-semibold tracking-wider uppercase text-xs">
              Entertainment
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mt-4 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
            Entertainment Reels
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Personal projects and creative experiments
          </p>
        </div>

        {/* Pinned horizontal scroll wrapper */}
        <div ref={entertainmentPinRef}>
          <div className="flex items-center min-h-screen">
            <div
              ref={entertainmentContainerRef}
              className="flex gap-6 will-change-transform"
              style={{ width: 'max-content' }}
            >
              {/* Render uploaded reels first, then pad with placeholders up to 6 */
              (() => {
                const reelsElements = [...entertainmentReels].reverse().map((reel, index) => (
                  <ReelCard
                    key={`entertainment-${reel.embedId}`}
                    reel={reel}
                    index={index}
                    playingVideo={playingVideo}
                    onPlayClick={setPlayingVideo}
                  />
                ));
                
                const placeholdersCount = Math.max(0, 6 - entertainmentReels.length);
                const placeholderElements = Array.from({ length: placeholdersCount }).map((_, index) => (
                  <div
                    key={`placeholder-${index + entertainmentReels.length}`}
                    className="group relative w-[260px] md:w-[320px] flex-shrink-0 h-full"
                  >
                    <div className="relative h-full flex flex-col overflow-hidden bg-card/60 border border-border/30 border-dashed rounded-2xl shadow-xl">
                      {/* Placeholder video area */}
                      <div className="aspect-[9/16] shrink-0 bg-gradient-to-br from-muted/40 to-muted/20 relative flex flex-col items-center justify-center rounded-t-xl">
                        <div className="w-16 h-16 rounded-full border-2 border-dashed border-primary/30 flex items-center justify-center mb-4">
                          <Play className="w-7 h-7 text-primary/30 ml-1 fill-current" />
                        </div>
                        <span className="text-primary/40 text-xs font-semibold uppercase tracking-widest">
                          Coming Soon
                        </span>
                        <span className="text-muted-foreground/30 text-xs mt-2">
                          0{index + 1 + entertainmentReels.length}
                        </span>
                      </div>
                      {/* Placeholder title area */}
                      <div className="p-5 bg-card/40 flex-1 min-h-[72px] flex items-center justify-center">
                        <div className="h-4 bg-muted/30 rounded-full w-3/4 mx-auto" />
                      </div>
                    </div>
                  </div>
                ));
                
                return [...reelsElements, ...placeholderElements];
              })()
              }
            </div>
          </div>

          {/* Progress bar */}
          {entertainmentReels.length > 0 && (
            <div className="mt-8 w-full max-w-xs mx-auto h-0.5 bg-border rounded-full overflow-hidden">
              <div
                id="entertainment-progress-bar"
                className="h-full bg-primary rounded-full"
                style={{ width: '0%', transition: 'none' }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Work;
