import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, ExternalLink } from "lucide-react";

interface CustomVideoPlayerProps {
  videoId: string;
  thumbnail: string;
  title: string;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const CustomVideoPlayer = ({ videoId, thumbnail, title }: CustomVideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const youtubePlayerRef = useRef<any>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();
  const progressIntervalRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to pause video when scrolled away
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && isPlaying && youtubePlayerRef.current) {
            try {
              youtubePlayerRef.current.pauseVideo();
              setIsPlaying(false);
            } catch (error) {
              console.error('Error pausing video:', error);
            }
          }
        });
      },
      { threshold: 0.5 } // Pause when less than 50% visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    // Check if API is already loaded
    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      // Load YouTube IFrame API
      if (!document.getElementById('youtube-iframe-api')) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }

      // Set up callback
      window.onYouTubeIframeAPIReady = () => {
        initializePlayer();
      };
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (youtubePlayerRef.current && youtubePlayerRef.current.destroy) {
        youtubePlayerRef.current.destroy();
      }
    };
  }, [videoId]);

  const initializePlayer = () => {
    if (!window.YT || !window.YT.Player) return;

    const iframe = document.getElementById(`player-${videoId}`);
    if (!iframe) return;

    youtubePlayerRef.current = new window.YT.Player(`player-${videoId}`, {
      events: {
        onReady: (event: any) => {
          setIsReady(true);
          // Autoplay when player is ready
          event.target.playVideo();
        },
        onStateChange: (event: any) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
            startProgressTracking();
          } else if (event.data === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false);
            stopProgressTracking();
          } else if (event.data === window.YT.PlayerState.ENDED) {
            setIsPlaying(false);
            setProgress(0);
            stopProgressTracking();
          }
        },
      },
    });
  };

  const startProgressTracking = () => {
    stopProgressTracking();
    progressIntervalRef.current = setInterval(() => {
      if (youtubePlayerRef.current && youtubePlayerRef.current.getCurrentTime) {
        try {
          const current = youtubePlayerRef.current.getCurrentTime();
          const duration = youtubePlayerRef.current.getDuration();
          if (duration > 0) {
            setProgress((current / duration) * 100);
          }
        } catch (error) {
          console.error('Error tracking progress:', error);
        }
      }
    }, 100);
  };

  const stopProgressTracking = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  };

  const togglePlay = () => {
    if (!youtubePlayerRef.current || !isReady) return;
    
    try {
      if (isPlaying) {
        youtubePlayerRef.current.pauseVideo();
      } else {
        youtubePlayerRef.current.playVideo();
      }
    } catch (error) {
      console.error('Error toggling play:', error);
    }
  };

  const toggleMute = () => {
    if (!youtubePlayerRef.current || !isReady) return;
    
    try {
      if (isMuted) {
        youtubePlayerRef.current.unMute();
        setIsMuted(false);
      } else {
        youtubePlayerRef.current.mute();
        setIsMuted(true);
      }
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!youtubePlayerRef.current || !isReady) return;
    
    try {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const duration = youtubePlayerRef.current.getDuration();
      youtubePlayerRef.current.seekTo(duration * pos, true);
      setProgress(pos * 100);
    } catch (error) {
      console.error('Error seeking:', error);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full group bg-black"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* YouTube IFrame with maximum branding removal */}
      <iframe
        id={`player-${videoId}`}
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&iv_load_policy=3&disablekb=1&cc_load_policy=0&playsinline=1&origin=${window.location.origin}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ border: 'none' }}
      />

      {/* Custom Header with Your Channel Branding */}
      <div 
        className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black/90 via-black/50 to-transparent p-4 transition-opacity duration-300 z-20 pointer-events-none ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3">
            {/* Your Channel Logo/Photo */}
            <a 
              href="https://www.youtube.com/@abdelraoufedits" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-shrink-0 hover:opacity-80 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src="/abdo.webp" 
                alt="Channel" 
                className="w-10 h-10 rounded-full border-2 border-primary object-cover shadow-lg"
              />
            </a>
            
            {/* Video Title */}
            <div className="flex flex-col">
              <h3 className="text-white font-semibold text-sm line-clamp-1 drop-shadow-lg">{title}</h3>
              <a 
                href="https://www.youtube.com/@abdelraoufedits"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-xs hover:underline flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                Abdelraouf Edits
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Controls Overlay */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Center Play Button (when paused) */}
        {!isPlaying && isReady && (
          <div 
            className="absolute inset-0 flex items-center justify-center cursor-pointer pointer-events-auto"
            onClick={togglePlay}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl scale-150 animate-pulse" />
              <div className="relative w-20 h-20 rounded-full bg-primary backdrop-blur-sm border-2 border-primary flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-2xl">
                <Play className="w-8 h-8 text-primary-foreground ml-1 fill-current" />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Controls Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 pt-12 pointer-events-auto">
          {/* Progress Bar */}
          <div 
            className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer mb-3 group/progress"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-primary rounded-full relative transition-all duration-100 group-hover/progress:h-2"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                disabled={!isReady}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors disabled:opacity-50"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                )}
              </button>

              {/* Volume Button */}
              <button
                onClick={toggleMute}
                disabled={!isReady}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors disabled:opacity-50"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
