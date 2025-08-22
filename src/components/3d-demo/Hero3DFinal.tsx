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
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight text-brand-grey-green">
                  Experience the
                  <span className="block text-brand-pastel-green mt-2">3D Revolution</span>
                </h1>
                
                <p className="text-xl text-brand-dark-grey/80 font-body leading-relaxed">
                  Scroll to rotate our air purifier 360°. See every angle, every detail.
                </p>
              </div>

              {/* Progress indicator */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-subheading text-brand-grey-green">
                  <span>Rotation Progress</span>
                  <span className="font-mono">{Math.round(displayProgress * 100)}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-pastel-green to-green-500 rounded-full"
                    style={{ 
                      width: `${displayProgress * 100}%`,
                      transition: 'width 0.1s ease-out'
                    }}
                  />
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <div 
                  className="transition-all duration-500"
                  style={{
                    opacity: displayProgress > 0.3 ? 1 : 0,
                    transform: `translateX(${displayProgress > 0.3 ? 0 : -20}px)`
                  }}
                >
                  <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm">
                    <div className="w-12 h-12 bg-brand-pastel-green/20 rounded-full flex items-center justify-center">
                      <span className="text-brand-pastel-green text-xl">✓</span>
                    </div>
                    <div>
                      <h3 className="font-subheading font-semibold text-brand-grey-green">4-Layer HEPA Filter</h3>
                      <p className="text-sm text-brand-dark-grey/70">99.97% particle removal</p>
                    </div>
                  </div>
                </div>

                <div 
                  className="transition-all duration-500 delay-100"
                  style={{
                    opacity: displayProgress > 0.6 ? 1 : 0,
                    transform: `translateX(${displayProgress > 0.6 ? 0 : -20}px)`
                  }}
                >
                  <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xl">⚡</span>
                    </div>
                    <div>
                      <h3 className="font-subheading font-semibold text-brand-grey-green">Smart Sensors</h3>
                      <p className="text-sm text-brand-dark-grey/70">Real-time air quality monitoring</p>
                    </div>
                  </div>
                </div>

                <div 
                  className="transition-all duration-500 delay-200"
                  style={{
                    opacity: displayProgress > 0.85 ? 1 : 0,
                    transform: `translateX(${displayProgress > 0.85 ? 0 : -20}px)`
                  }}
                >
                  <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-xl">🌸</span>
                    </div>
                    <div>
                      <h3 className="font-subheading font-semibold text-brand-grey-green">Aromatherapy</h3>
                      <p className="text-sm text-brand-dark-grey/70">Integrated wellness features</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div 
                className="transition-all duration-700"
                style={{
                  opacity: displayProgress > 0.95 ? 1 : 0,
                  transform: `translateY(${displayProgress > 0.95 ? 0 : 20}px)`
                }}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="/products" 
                    className="inline-flex items-center justify-center bg-brand-pastel-green text-brand-grey-green hover:bg-brand-grey-green hover:text-white px-8 py-4 text-lg font-subheading font-semibold rounded-2xl transition-all duration-300"
                  >
                    Shop Now
                  </a>
                  <button className="inline-flex items-center justify-center border-2 border-brand-grey-green text-brand-grey-green hover:bg-brand-grey-green hover:text-white px-8 py-4 text-lg font-subheading font-semibold rounded-2xl transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* Right - Single Clear Lottie */}
            <div className="relative flex items-center justify-center">
              {/* Simple background circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-96 h-96 bg-brand-pastel-green/10 rounded-full"></div>
              </div>
              
              {/* Single Lottie Instance - CLEAR AND VISIBLE */}
              <div className="relative z-10 w-full max-w-lg">
                <Lottie
                  lottieRef={lottieRef}
                  animationData={animationData}
                  loop={false}
                  autoplay={false}
                  className="w-full h-full"
                  style={{
                    width: '100%',
                    height: '100%',
                    maxWidth: '500px'
                  }}
                  rendererSettings={{
                    preserveAspectRatio: 'xMidYMid meet',
                    renderer: 'svg' // SVG renderer for clarity
                  }}
                />
              </div>

              {/* Scroll indicator */}
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
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
        </div>
      </div>
    </section>
  );
}