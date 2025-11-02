import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, ExternalLink } from 'lucide-react';

interface CustomStreamablePlayerProps {
  videoId: string;
  thumbnail: string;
  title: string;
}

const CustomStreamablePlayer = ({ videoId, thumbnail, title }: CustomStreamablePlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [useIframe, setUseIframe] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Try to fetch the actual video URL from Streamable
  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        // Try multiple possible URL formats
        const possibleUrls = [
          `https://cdn-cf-east.streamable.com/video/${videoId}.mp4`,
          `https://cdn-b-east.streamable.com/video/${videoId}.mp4`,
          `https://streamable.com/o/${videoId}`,
        ];
        
        let videoLoaded = false;
        
        if (videoRef.current) {
          // Try the first URL
          videoRef.current.src = possibleUrls[0];
          
          // Set up error handler
          videoRef.current.onerror = () => {
            console.warn('Direct video URL failed, falling back to iframe embed');
            setUseIframe(true);
          };
          
          // Set up success handler
          videoRef.current.onloadedmetadata = () => {
            setVideoLoaded(true);
            videoLoaded = true;
          };
          
          // Timeout fallback to iframe after 3 seconds
          setTimeout(() => {
            if (!videoLoaded) {
              console.warn('Video loading timeout, falling back to iframe embed');
              setUseIframe(true);
            }
          }, 3000);
        }
      } catch (error) {
        console.error('Error loading video:', error);
        setUseIframe(true);
      }
    };

    fetchVideoUrl();
  }, [videoId]);

  // Auto-pause when scrolled out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && isPlaying) {
            handlePlayPause();
          }
        });
      },
      { threshold: 0.5 }
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

  // Update progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    if (videoRef.current) {
      videoRef.current.currentTime = (newProgress / 100) * videoRef.current.duration;
    }
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-black overflow-hidden group"
      onMouseEnter={() => !useIframe && setShowControls(true)}
      onMouseLeave={() => !useIframe && setShowControls(false)}
    >
      {/* Use iframe if direct video fails */}
      {useIframe ? (
        <>
          <iframe 
            allow="autoplay; fullscreen" 
            allowFullScreen 
            src={`https://streamable.com/e/${videoId}?autoplay=1`}
            className="w-full h-full border-none absolute inset-0"
            title={title}
          />
          {/* Personal Branding Overlay for iframe - Always Visible */}
          <div 
            className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 via-black/50 to-transparent pointer-events-none transition-opacity duration-300"
            style={{ zIndex: 50 }}
          >
            <div className="flex items-center gap-3 pointer-events-auto">
              {/* Profile Photo with Link */}
              <a
                href="https://x.com/abdelrauof_"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group/avatar flex-shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/80 hover:border-primary transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/50">
                  <img 
                    src="/abdo.webp" 
                    alt="Abdelraouf"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/abdo.png';
                    }}
                  />
                </div>
              </a>

              {/* Title and Channel Name */}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-sm line-clamp-1 drop-shadow-lg">
                  {title}
                </h3>
                <a
                  href="https://x.com/abdelrauof_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary/90 hover:text-primary text-xs font-medium transition-colors flex items-center gap-1 w-fit"
                  onClick={(e) => e.stopPropagation()}
                >
                  @abdelrauof_
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            poster={thumbnail}
            playsInline
            onClick={handlePlayPause}
          />

      {/* Personal Branding Overlay - Always Visible */}
      <div 
        className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 via-black/50 to-transparent pointer-events-none transition-opacity duration-300"
        style={{ zIndex: 50 }}
      >
        <div className="flex items-center gap-3 pointer-events-auto">
          {/* Profile Photo with Link */}
          <a
            href="https://x.com/abdelrauof_"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group/avatar flex-shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/80 hover:border-primary transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/50">
              <img 
                src="/abdo.png" 
                alt="Abdelraouf"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://scontent-lga3-2.cdninstagram.com/v/t51.2885-19/467484558_1107209267768606_6636711612999803585_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_cat=109&_nc_ohc=yQQQA0eYjjEQ7kNvgGaQrVE&_nc_gid=bf88eddc63724ffaba4ba4d8bd00baed&edm=AEhyXUkBAAAA&ccb=7-5&oh=00_AYDnYGLmscgAihmUmOFm_F4sAF8S28z3LbqNjB5dA0RL-A&oe=672BFE20&_nc_sid=8f1549';
                }}
              />
            </div>
          </a>

          {/* Title and Channel Name */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-sm line-clamp-1 drop-shadow-lg">
              {title}
            </h3>
            <a
              href="https://x.com/abdelrauof_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary/90 hover:text-primary text-xs font-medium transition-colors flex items-center gap-1 w-fit"
              onClick={(e) => e.stopPropagation()}
            >
              @abdelrauof_
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Play Button Overlay (when paused) */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={handlePlayPause}
          style={{ zIndex: 40 }}
        >
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl scale-150 group-hover:scale-175 transition-transform duration-500" />
            
            {/* Play button */}
            <div className="relative w-20 h-20 rounded-full bg-primary/90 backdrop-blur-sm border-2 border-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary transition-all duration-300 shadow-2xl">
              <Play className="w-8 h-8 text-primary-foreground ml-1 fill-current" />
            </div>
          </div>
        </div>
      )}

      {/* Custom Controls */}
      <div 
        className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent transition-opacity duration-300 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ zIndex: 45 }}
      >
        {/* Progress Bar */}
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
          className="w-full h-1 mb-3 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary hover:[&::-webkit-slider-thumb]:bg-primary/90 transition-colors"
          style={{
            background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${progress}%, rgba(255,255,255,0.2) ${progress}%, rgba(255,255,255,0.2) 100%)`
          }}
        />

        {/* Control Buttons */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Play/Pause */}
            <button
              onClick={handlePlayPause}
              className="text-white hover:text-primary transition-colors p-1"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current" />
              )}
            </button>

            {/* Volume Controls */}
            <div className="flex items-center gap-2 group/volume">
              <button
                onClick={toggleMute}
                className="text-white hover:text-primary transition-colors p-1"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer opacity-0 group-hover/volume:opacity-100 transition-opacity [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
              />
            </div>
          </div>

          {/* Fullscreen */}
          <button
            onClick={handleFullscreen}
            className="text-white hover:text-primary transition-colors p-1"
          >
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Video Not Loaded Message */}
      {!videoLoaded && !useIframe && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white">
          <p>Loading video...</p>
        </div>
      )}
        </>
      )}
    </div>
  );
};

export default CustomStreamablePlayer;
