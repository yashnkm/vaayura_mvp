import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '@/assets/video/lottie_new_2.json';
import heroBackground from '@/assets/sections/homepage/hero/productHeroSection.jpg';

export function HeroMobile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<any>(null);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [scrollStarted, setScrollStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const currentProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const animationFrameRef = useRef<number>();

  // Device detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1280);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let isActive = true;

    const smoothAnimation = () => {
      if (!isActive) return;

      currentProgressRef.current = targetProgressRef.current;

      if (lottieRef.current) {
        const totalFrames = lottieRef.current.getDuration(true);
        if (totalFrames) {
          const framesToSkip = 30;
          const usableFrames = Math.max(totalFrames - (framesToSkip * 2), 1);
          const frame = framesToSkip + ((1 - currentProgressRef.current) * usableFrames);
          
          lottieRef.current.goToAndStop(frame, true);
        }
      }

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
      
      if (scrolled > 10) {
        setScrollStarted(true);
      } else {
        setScrollStarted(false);
      }
      
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
    <section ref={containerRef} className="relative h-[250vh] bg-white">
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
          
          {/* Background blur overlay */}
          <div 
            className={`absolute inset-0 bg-black/50 backdrop-blur-xl z-20 transition-all duration-700 ${
              scrollStarted ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          />
          
          {/* Hero Text Overlay - Zoom resistant with clamp() */}
          <div 
            className={`absolute inset-0 z-30 flex items-center justify-center transition-all duration-500 ${
              scrollStarted ? 'opacity-0 translate-y-[-20px] pointer-events-none' : 'opacity-100 translate-y-0'
            }`}
          >
            <div className="text-center px-4 sm:px-6 max-w-4xl">
              <h1 
                className="font-sora font-bold text-green-200 mb-4 sm:mb-6 leading-tight"
                style={{
                  fontSize: isMobile ? 'clamp(1.75rem, 8vw, 2.5rem)' : 'clamp(2.5rem, 6vw, 4rem)'
                }}
              >
                Life Begins with<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>Clean Air.
              </h1>
              <div 
                className="text-green-100/90 leading-relaxed font-subheading"
                style={{
                  fontSize: isMobile ? 'clamp(0.875rem, 4vw, 1.125rem)' : 'clamp(1rem, 2vw, 1.5rem)'
                }}
              >
                <p className="text-center px-2 sm:px-0">
                  Clean air is no longer a luxury—it's a daily necessity. Vaayura delivers world-class air purification with intelligent design, making healthier living effortless and beautiful.
                </p>
              </div>
              
              {/* Scroll hint */}
              <div className="mt-8 sm:mt-12">
                <span 
                  className="text-white/70 font-subheading"
                  style={{
                    fontSize: isMobile ? 'clamp(0.75rem, 3.5vw, 0.875rem)' : 'clamp(0.875rem, 1.5vw, 1rem)'
                  }}
                >
                  Scroll to explore
                </span>
              </div>
            </div>
          </div>
          
          {/* 3D Lottie Animation with zoom-resistant sizing and positioning */}
          <div className={`absolute inset-0 z-15 flex items-center justify-center transition-all duration-700 ${
            scrollStarted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div 
              className="relative transition-transform duration-300"
              style={{
                transform: `translateX(${displayProgress > 0.5 ? (!isMobile && !isTablet ? '25%' : '0%') : '0%'})`
              }}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={false}
                autoplay={false}
                className="w-full h-full max-w-full max-h-full"
                style={{
                  width: isMobile ? 'min(90vw, 100%)' : isTablet ? 'min(75vw, 85%)' : 'min(110vw, 120%)',
                  height: isMobile ? 'min(60vh, 90%)' : isTablet ? 'min(65vh, 95%)' : 'min(70vh, 100%)',
                  maxWidth: isMobile ? '400px' : isTablet ? '800px' : '1600px',
                  maxHeight: isMobile ? '300px' : isTablet ? '600px' : '1000px',
                  minWidth: isMobile ? '280px' : isTablet ? '400px' : '320px',
                  minHeight: isMobile ? '200px' : isTablet ? '300px' : '240px',
                  aspectRatio: '16/9'
                }}
                rendererSettings={{
                  preserveAspectRatio: 'xMidYMid meet',
                  renderer: 'svg'
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}