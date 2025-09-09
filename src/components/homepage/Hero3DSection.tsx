import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '@/assets/video/lottie_new_2.json';
import heroBackground from '@/assets/sections/homepage/hero/productHeroSection.jpg';

export function Hero3DSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<any>(null);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [scrollStarted, setScrollStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const currentProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    let isActive = true;

    const smoothAnimation = () => {
      if (!isActive) return;

      // Immediate response - no interpolation delay
      currentProgressRef.current = targetProgressRef.current;

      // Update Lottie animation
      if (lottieRef.current) {
        const totalFrames = lottieRef.current.getDuration(true);
        if (totalFrames) {
          // Calculate frame with high precision (reversed, trimmed)
          // Assuming 30fps, skip first and last 30 frames (1 second each)
          const framesToSkip = 30;
          const usableFrames = Math.max(totalFrames - (framesToSkip * 2), 1);
          const frame = framesToSkip + ((1 - currentProgressRef.current) * usableFrames);
          
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
    // Check device types on mount and resize
    const checkDeviceType = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1280);
    };
    
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);

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
      window.removeEventListener('resize', checkDeviceType);
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
          
          {/* Background blur overlay - fades out when scrolling starts */}
          <div 
            className={`absolute inset-0 bg-black/50 backdrop-blur-xl z-20 transition-all duration-700 ${
              scrollStarted ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          />
          
          {/* Hero Text Overlay - disappears when scrolling starts */}
          <div 
            className={`absolute inset-0 z-30 flex items-center justify-center transition-all duration-500 ${
              scrollStarted ? 'opacity-0 translate-y-[-20px] pointer-events-none' : 'opacity-100 translate-y-0'
            }`}
          >
            <div className="text-center" style={{ padding: 'clamp(1rem, 3vw, 2rem)', maxWidth: 'clamp(20rem, 80vw, 60rem)' }}>
              <h1 className="font-sora font-bold text-green-200 leading-tight" style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', marginBottom: 'clamp(1.5rem, 4vh, 2.5rem)' }}>
                Life Begins with<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>Clean Air.
              </h1>
              <div className="text-green-100/90 leading-relaxed font-subheading" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
                <p className="text-center" style={{ padding: 'clamp(0.5rem, 2vw, 0)' }}>Clean air is no longer a luxury it's a daily necessity. Vaayura delivers world-class air purification with intelligent design, making healthier living effortless and beautiful.</p>
              </div>
              
              {/* Scroll hint */}
              <div style={{ marginTop: 'clamp(2rem, 5vh, 3rem)' }}>
                <span className="text-white/70 font-subheading" style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>Scroll to explore</span>
              </div>
            </div>
          </div>
          
          
          {/* 3D Lottie Animation - NEW VIDEO */}
          <div className={`absolute inset-0 z-15 transition-all duration-700 ${
            scrollStarted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div 
              className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out"
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
                  height: isMobile ? 'min(50vh, 60vh)' : isTablet ? 'min(45vh, 55vh)' : 'min(75vh, 90vh)',
                  maxWidth: isMobile ? '600px' : isTablet ? '800px' : '1800px',
                  maxHeight: isMobile ? '400px' : isTablet ? '500px' : '1200px',
                  minWidth: '320px',
                  minHeight: '240px',
                  aspectRatio: '16/9'
                }}
                rendererSettings={{
                  preserveAspectRatio: 'xMidYMid meet',
                  renderer: 'svg'
                }}
              />
              


            </div>
          </div>

          {/* Left Section - Fixed Position for Text (Mobile/Tablet: Full Width, Desktop: Left Half) */}
          <div className={`absolute top-0 bottom-0 left-0 w-full lg:w-1/2 flex items-center justify-center transition-opacity duration-300 z-20 ${
            displayProgress > 0.5 ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="text-center px-4 sm:px-6">
              {/* Tablet-optimized text using viewport units */}
              <h2 className="font-sora font-bold text-brand-grey-green leading-tight mb-[2vh]" style={{ fontSize: 'clamp(1.5rem, 5vw, 4rem)' }}>
                Vaayura <span className="text-brand-pastel-green">Storm</span>
              </h2>
              
              {/* Tablet-optimized cards with better sizing */}
              <div className="grid grid-cols-2 mx-auto" style={{ gap: 'clamp(0.75rem, 2vw, 1.5rem)', maxWidth: 'clamp(20rem, 35vw, 28rem)' }}>
                <div className="bg-white border border-gray-200 rounded-lg text-center shadow-md" style={{ padding: 'clamp(0.75rem, 2vw, 1.25rem)' }}>
                  <div className="text-gray-600 font-montserrat font-medium mb-1" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 1rem)' }}>CADR</div>
                  <div className="text-brand-pastel-green font-sora font-bold" style={{ fontSize: 'clamp(0.875rem, 2vw, 1.125rem)' }}>600 m³/hr</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg text-center shadow-md" style={{ padding: 'clamp(0.75rem, 2vw, 1.25rem)' }}>
                  <div className="text-gray-600 font-montserrat font-medium mb-1" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 1rem)' }}>Coverage</div>
                  <div className="text-brand-pastel-green font-sora font-bold" style={{ fontSize: 'clamp(0.875rem, 2vw, 1.125rem)' }}>1000 sq ft</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}