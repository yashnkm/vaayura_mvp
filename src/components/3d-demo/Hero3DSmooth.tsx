import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '@/assets/video/Vaayura_Air_Purifier_Video_Showcase - Trim.mp4.lottie.json';

export function Hero3DSmooth() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<any>(null);
  const [displayProgress, setDisplayProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafRef = useRef<number>();

  // Smooth easing function
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  useEffect(() => {
    let isActive = true;

    // Smooth animation loop
    const animate = () => {
      if (!isActive) return;

      // Lerp (linear interpolation) for smooth transitions
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
      };

      // Smoothly interpolate to target progress with ultra-smooth factor for 60fps
      currentProgressRef.current = lerp(
        currentProgressRef.current,
        targetProgressRef.current,
        0.03 // Ultra-smooth for 60fps Lottie (lower = smoother, higher = more responsive)
      );

      // Apply gentler easing for 60fps content
      const easedProgress = currentProgressRef.current; // Direct progress without additional easing for smoother 60fps playback

      // Update Lottie animation with high precision for 60fps
      if (lottieRef.current) {
        const totalFrames = lottieRef.current.getDuration(true);
        if (totalFrames) {
          // Use floating point precision for smoother frame interpolation at 60fps
          let frame = easedProgress * (totalFrames - 1);
          
          // Only apply hard stop at the very end to prevent lag
          if (easedProgress >= 0.999) {
            frame = totalFrames - 1;
          }
          
          // Use subframe precision for ultra-smooth playback
          lottieRef.current.goToAndStop(frame, true);
        }
      }

      // Update display progress
      setDisplayProgress(currentProgressRef.current);

      rafRef.current = requestAnimationFrame(animate);
    };

    // Start animation loop
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      isActive = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }
          
          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          // More precise progress calculation for 60fps
          const scrollableHeight = rect.height - windowHeight;
          const scrolled = -rect.top;
          
          // Ultra-smooth progress with finer granularity
          let progress = scrolled / scrollableHeight;
          progress = Math.max(0, Math.min(1, progress));
          
          // Apply micro-smoothing to reduce jitter
          const delta = Math.abs(progress - targetProgressRef.current);
          if (delta < 0.001) {
            // Skip tiny movements to reduce jitter
            ticking = false;
            return;
          }
          
          // Update target progress (the animation will smoothly follow)
          targetProgressRef.current = progress;
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Fixed container */}
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
                  Scroll down to see our air purifier rotate 360°. Watch every detail, every curve, every innovation come to life.
                </p>
              </div>

              {/* Smooth progress indicator */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-subheading text-brand-grey-green">
                  <span>Rotation Progress</span>
                  <span className="font-mono">{Math.round(displayProgress * 100)}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-pastel-green to-green-500 transition-none rounded-full shadow-sm"
                    style={{ 
                      width: `${displayProgress * 100}%`,
                      transition: 'none' // Remove CSS transition for smoother JS animation
                    }}
                  />
                </div>
                {/* Mini progress dots */}
                <div className="flex justify-between px-1">
                  {[0, 25, 50, 75, 100].map((milestone) => (
                    <div
                      key={milestone}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        displayProgress * 100 >= milestone
                          ? 'bg-brand-pastel-green scale-125'
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Features with smooth transitions */}
              <div className="space-y-4">
                <div 
                  className="transition-all duration-700 ease-out"
                  style={{
                    opacity: displayProgress > 0.15 ? 1 : 0,
                    transform: `translateX(${displayProgress > 0.15 ? 0 : -20}px)`
                  }}
                >
                  <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm">
                    <div className="w-12 h-12 bg-brand-pastel-green/20 rounded-full flex items-center justify-center">
                      <span className="text-brand-pastel-green text-xl">✓</span>
                    </div>
                    <div>
                      <h3 className="font-subheading font-semibold text-brand-grey-green">4-Layer HEPA Filter</h3>
                      <p className="text-sm text-brand-dark-grey/70">99.97% particle removal efficiency</p>
                    </div>
                  </div>
                </div>

                <div 
                  className="transition-all duration-700 ease-out delay-100"
                  style={{
                    opacity: displayProgress > 0.45 ? 1 : 0,
                    transform: `translateX(${displayProgress > 0.45 ? 0 : -20}px)`
                  }}
                >
                  <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xl">⚡</span>
                    </div>
                    <div>
                      <h3 className="font-subheading font-semibold text-brand-grey-green">Smart AI Sensors</h3>
                      <p className="text-sm text-brand-dark-grey/70">Real-time air quality monitoring</p>
                    </div>
                  </div>
                </div>

                <div 
                  className="transition-all duration-700 ease-out delay-200"
                  style={{
                    opacity: displayProgress > 0.75 ? 1 : 0,
                    transform: `translateX(${displayProgress > 0.75 ? 0 : -20}px)`
                  }}
                >
                  <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-xl">🌸</span>
                    </div>
                    <div>
                      <h3 className="font-subheading font-semibold text-brand-grey-green">Aromatherapy Mode</h3>
                      <p className="text-sm text-brand-dark-grey/70">Integrated wellness features</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons with smooth reveal */}
              <div 
                className="transition-all duration-1000 ease-out"
                style={{
                  opacity: displayProgress > 0.85 ? 1 : 0,
                  transform: `translateY(${displayProgress > 0.85 ? 0 : 20}px)`
                }}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="/products" 
                    className="inline-flex items-center justify-center bg-brand-pastel-green text-brand-grey-green hover:bg-brand-grey-green hover:text-white px-8 py-4 text-lg font-subheading font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Shop Now
                  </a>
                  <button className="inline-flex items-center justify-center border-2 border-brand-grey-green text-brand-grey-green hover:bg-brand-grey-green hover:text-white px-8 py-4 text-lg font-subheading font-semibold rounded-2xl transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* Right - Lottie Animation */}
            <div className="relative flex items-center justify-center">
              {/* Dynamic background glow based on progress */}
              <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  opacity: 0.3 + (displayProgress * 0.4)
                }}
              >
                <div 
                  className="bg-brand-pastel-green rounded-full blur-3xl transition-all duration-1000"
                  style={{
                    width: `${300 + (displayProgress * 200)}px`,
                    height: `${300 + (displayProgress * 200)}px`,
                  }}
                />
              </div>
              
              {/* Lottie Animation Container */}
              <div className="relative z-10 w-full max-w-lg">
                {/* Subtle shadow that grows with progress */}
                <div 
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/10 rounded-full blur-2xl transition-all duration-500"
                  style={{
                    width: `${200 + (displayProgress * 100)}px`,
                    height: '40px',
                    opacity: 0.2 + (displayProgress * 0.3)
                  }}
                />
                
                <Lottie
                  lottieRef={lottieRef}
                  animationData={animationData}
                  loop={false}
                  autoplay={false}
                  className="w-full h-full"
                  rendererSettings={{
                    preserveAspectRatio: 'xMidYMid meet',
                    progressiveLoad: false, // Disable for smoother 60fps playback
                    hideOnTransparent: false,
                    // Canvas renderer is smoother for 60fps animations
                    renderer: 'canvas'
                  }}
                />
              </div>

              {/* Enhanced scroll indicator */}
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
                <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl border border-gray-100">
                  <p className="text-sm font-subheading text-brand-grey-green flex items-center gap-2">
                    {displayProgress < 0.05 ? (
                      <>
                        <span>Scroll to rotate</span>
                        <span className="animate-bounce">↓</span>
                      </>
                    ) : displayProgress > 0.95 ? (
                      <>
                        <span>Complete!</span>
                        <span>✨</span>
                      </>
                    ) : (
                      <>
                        <span>Rotating...</span>
                        <span className="inline-block animate-spin">⟳</span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll depth indicator on the side */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
        <div className="h-48 w-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="w-full bg-gradient-to-b from-brand-pastel-green to-green-500 rounded-full transition-none"
            style={{ 
              height: `${displayProgress * 100}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
}