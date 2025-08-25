import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '@/assets/video/animiation2.mp4.lottie.json';
import heroBackground from '@/assets/hero2background.jpg';

export function Hero3DSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<any>(null);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [scrollStarted, setScrollStarted] = useState(false);
  const currentProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    let isActive = true;

    const smoothAnimation = () => {
      if (!isActive) return;

      // Very smooth interpolation
      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.1; // Smooth factor

      // Update Lottie animation
      if (lottieRef.current) {
        const totalFrames = lottieRef.current.getDuration(true);
        if (totalFrames) {
          // Calculate frame with high precision
          const frame = currentProgressRef.current * (totalFrames - 1);
          
          // Update animation
          lottieRef.current.goToAndStop(frame, true);
        }
      }

      // Update display
      setDisplayProgress(currentProgressRef.current);

      animationFrameRef.current = requestAnimationFrame(smoothAnimation);
    };

    animationFrameRef.current = requestAnimationFrame(smoothAnimation);

    return () => {
      isActive = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollableHeight = rect.height - windowHeight;
      const scrolled = -rect.top;
      
      // Check if scroll has started
      if (scrolled > 10) {
        setScrollStarted(true);
      } else {
        setScrollStarted(false);
      }
      
      // Simple progress calculation
      let progress = scrolled / scrollableHeight;
      progress = Math.max(0, Math.min(1, progress));
      
      targetProgressRef.current = progress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-gradient-to-b from-white to-gray-50">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative flex items-center justify-center w-full h-full">
          
          {/* Initial Hero Background Image */}
          <div 
            className={`absolute inset-0 z-10 transition-all duration-700 ${
              scrollStarted ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              backgroundImage: `url(${heroBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          
          {/* Background blur overlay - fades out when scrolling starts */}
          <div 
            className={`absolute inset-0 bg-white/60 backdrop-blur-md z-20 transition-all duration-700 ${
              scrollStarted ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          />
          
          {/* Hero Text Overlay - disappears when scrolling starts */}
          <div 
            className={`absolute inset-0 z-30 flex items-center justify-center transition-all duration-500 ${
              scrollStarted ? 'opacity-0 translate-y-[-20px] pointer-events-none' : 'opacity-100 translate-y-0'
            }`}
          >
            <div className="text-center px-6 max-w-4xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-sora font-bold text-gray-900 mb-6 leading-tight">
                Life Begins with Clean Air.
              </h1>
              <p className="text-xl md:text-2xl text-brand-dark-grey/80 leading-relaxed font-subheading">
                Clean air is no longer a luxury—it's a daily necessity. Vaayura delivers world-class air purification with intelligent design, making healthier living effortless and beautiful.
              </p>
              
              {/* Scroll hint */}
              <div className="mt-12">
                <span className="text-sm text-brand-grey-green font-subheading">Scroll to explore</span>
              </div>
            </div>
          </div>
          
          {/* Background elements */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
            scrollStarted ? 'opacity-100' : 'opacity-30'
          }`}>
            <div className="w-96 h-96 bg-brand-pastel-green/10 rounded-full"></div>
          </div>
          
          {/* 3D Lottie Animation */}
          <div className={`absolute inset-0 z-15 flex items-center justify-center transition-all duration-700 ${
            scrollStarted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <Lottie
              lottieRef={lottieRef}
              animationData={animationData}
              loop={false}
              autoplay={false}
              className="w-full h-full"
              style={{
                width: '75vw',
                height: '75vh',
                maxWidth: '1200px',
                maxHeight: '800px'
              }}
              rendererSettings={{
                preserveAspectRatio: 'xMidYMid meet',
                renderer: 'svg'
              }}
            />
          </div>

          {/* Scroll progress indicator - only shows after scroll starts */}
          <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
            scrollStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <p className="text-sm font-subheading text-brand-grey-green">
                {displayProgress < 0.05 ? 'Scroll to rotate ↓' : 
                 displayProgress > 0.95 ? 'Complete! ✨' : 
                 'Keep scrolling...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}