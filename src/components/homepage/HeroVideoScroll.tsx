import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '@/assets/video/lottie_new_2.json';
import heroBackground from '@/assets/sections/homepage/hero/productHeroSection.jpg';

export function HeroVideoScroll() {
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

      // Immediate response - no interpolation delay
      currentProgressRef.current = targetProgressRef.current;

      // Update Lottie animation
      if (lottieRef.current) {
        const totalFrames = lottieRef.current.getDuration(true);
        if (totalFrames) {
          // Calculate frame with high precision (reversed, trimmed) - SLOWER ANIMATION
          // Assuming 30fps, skip first and last 30 frames (1 second each)
          const framesToSkip = 30;
          const usableFrames = Math.max(totalFrames - (framesToSkip * 2), 1);
          // Make animation slower by using a slower progress curve (0.7 multiplier)
          const slowedProgress = Math.pow(currentProgressRef.current, 0.7);
          const frame = framesToSkip + ((1 - slowedProgress) * usableFrames);
          
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
            <div className="text-center px-4 sm:px-6 max-w-4xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sora font-bold text-green-200 mb-4 sm:mb-6 leading-tight">
                Life Begins with<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>Clean Air.
              </h1>
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-green-100/90 leading-relaxed font-subheading">
                <p className="text-center px-2 sm:px-0">Clean air is no longer a luxury it's a daily necessity. Vaayura delivers world-class air purification with intelligent design, making healthier living effortless and beautiful.</p>
              </div>
              
              {/* Scroll hint */}
              <div className="mt-8 sm:mt-12">
                <span className="text-sm sm:text-base text-white/70 font-subheading">Scroll to explore</span>
              </div>
            </div>
          </div>
          
          {/* Background elements */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
            scrollStarted ? 'opacity-100' : 'opacity-30'
          }`}>
            <div className="w-96 h-96 bg-brand-pastel-green/10 rounded-full"></div>
          </div>
          
          {/* 3D Lottie Animation - NEW VIDEO */}
          <div className={`absolute inset-0 z-15 flex items-center justify-center transition-all duration-700 ${
            scrollStarted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div className="relative">
              <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={false}
                autoplay={false}
                className="w-full h-full max-w-full max-h-full"
                style={{
                  width: 'min(95vw, 100%)',
                  height: 'min(70vh, 100%)',
                  maxWidth: '1600px',
                  maxHeight: '1000px',
                  minWidth: '320px',
                  minHeight: '240px',
                  aspectRatio: '16/9'
                }}
                rendererSettings={{
                  preserveAspectRatio: 'xMidYMid meet',
                  renderer: 'svg'
                }}
              />
              
              {/* Section 1: Vaayura Storm Text (Left Third) */}
              <div className={`absolute top-0 bottom-0 left-0 w-1/3 flex items-center justify-center transition-opacity duration-300 ${
                displayProgress > 0.5 ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="text-center">
                  <h2 className="text-5xl lg:text-6xl xl:text-7xl font-sora font-bold text-brand-grey-green leading-tight">
                    Vaayura<br />
                    <span className="text-brand-pastel-green">Storm</span>
                  </h2>
                </div>
              </div>

              {/* Section 3: Product Specification Cards (Right Third) */}
              <div className={`absolute top-0 bottom-0 right-0 w-1/3 flex items-center justify-center transition-opacity duration-300 ${
                displayProgress > 0.5 ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="grid grid-cols-1 gap-4 p-6 max-w-xs">
                  <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 text-center shadow-md">
                    <div className="text-gray-600 text-sm font-montserrat font-medium mb-2">CADR</div>
                    <div className="text-brand-pastel-green font-sora font-bold text-lg">600 m³/hr</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 text-center shadow-md">
                    <div className="text-gray-600 text-sm font-montserrat font-medium mb-2">Coverage</div>
                    <div className="text-brand-pastel-green font-sora font-bold text-lg">1000 sq ft</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}