import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '@/assets/video/vaayura animation.json';

export function Hero3DFinal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<any>(null);
  const [displayProgress, setDisplayProgress] = useState(0);
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
          {/* Simple background circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 bg-brand-pastel-green/10 rounded-full"></div>
          </div>
          
          {/* Single Lottie Instance - CENTERED */}
          <div className="relative z-10 w-full max-w-2xl">
            <Lottie
              lottieRef={lottieRef}
              animationData={animationData}
              loop={false}
              autoplay={false}
              className="w-full h-full"
              style={{
                width: '100%',
                height: '100%',
                maxWidth: '700px'
              }}
              rendererSettings={{
                preserveAspectRatio: 'xMidYMid meet',
                renderer: 'svg' // SVG renderer for clarity
              }}
            />
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
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