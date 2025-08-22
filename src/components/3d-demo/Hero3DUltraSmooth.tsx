import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '@/assets/video/Vaayura_Air_Purifier_Video_Showcase - Trim.mp4.lottie.json';

export function Hero3DUltraSmooth() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<any>(null);
  const [displayProgress, setDisplayProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const velocityRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const rafRef = useRef<number>();
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<any>();

  // Smoother easing with velocity
  const smoothDamp = (current: number, target: number, velocity: number, smoothTime: number, deltaTime: number) => {
    smoothTime = Math.max(0.0001, smoothTime);
    const omega = 2 / smoothTime;
    const x = omega * deltaTime;
    const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
    
    const change = current - target;
    const originalTo = target;
    
    const maxChange = smoothTime * 100;
    const clampedChange = Math.max(-maxChange, Math.min(maxChange, change));
    
    target = current - clampedChange;
    
    const temp = (velocity + omega * clampedChange) * deltaTime;
    velocity = (velocity - omega * temp) * exp;
    
    let output = target + (clampedChange + temp) * exp;
    
    if (originalTo - current > 0 === output > originalTo) {
      output = originalTo;
      velocity = (output - originalTo) / deltaTime;
    }
    
    return { value: output, velocity };
  };

  useEffect(() => {
    let isActive = true;

    const animate = (currentTime: number) => {
      if (!isActive) return;

      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      // Ultra-smooth interpolation with velocity
      const result = smoothDamp(
        currentProgressRef.current,
        targetProgressRef.current,
        velocityRef.current,
        0.05, // Smooth time (lower = smoother, higher = more responsive)
        deltaTime
      );

      currentProgressRef.current = result.value;
      velocityRef.current = result.velocity;

      // Update Lottie animation with ultra-smooth interpolation
      if (lottieRef.current) {
        const totalFrames = lottieRef.current.getDuration(true);
        if (totalFrames) {
          // Use exact floating point frame for smoothest playback
          const frame = currentProgressRef.current * (totalFrames - 1);
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
      // Set scrolling state for motion blur
      setIsScrolling(true);
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      if (!ticking) {
        requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }
          
          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const scrollableHeight = rect.height - windowHeight;
          const scrolled = -rect.top;
          
          let progress = scrolled / scrollableHeight;
          progress = Math.max(0, Math.min(1, progress));
          
          // Update target progress
          targetProgressRef.current = progress;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(scrollTimeoutRef.current);
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
                  Ultra-smooth 60 FPS rotation. Watch every detail come to life with frame blending technology.
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
                    className="h-full bg-gradient-to-r from-brand-pastel-green to-green-500 rounded-full shadow-sm"
                    style={{ 
                      width: `${displayProgress * 100}%`,
                      transition: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Velocity indicator */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-subheading text-brand-grey-green/60">
                  <span>Scroll Velocity</span>
                  <span className={`transition-colors ${Math.abs(velocityRef.current) > 0.5 ? 'text-green-500' : 'text-gray-400'}`}>
                    {Math.abs(velocityRef.current) > 0.5 ? 'Fast' : Math.abs(velocityRef.current) > 0.1 ? 'Medium' : 'Slow'}
                  </span>
                </div>
                <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                    style={{ 
                      width: `${Math.min(Math.abs(velocityRef.current) * 20, 100)}%`,
                      transition: 'width 0.1s ease-out'
                    }}
                  />
                </div>
              </div>

              {/* Features with smooth reveals */}
              <div className="space-y-4">
                <div 
                  className="transition-all duration-700 ease-out"
                  style={{
                    opacity: displayProgress > 0.2 ? 1 : 0,
                    transform: `translateX(${displayProgress > 0.2 ? 0 : -20}px)`
                  }}
                >
                  <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm">
                    <div className="w-12 h-12 bg-brand-pastel-green/20 rounded-full flex items-center justify-center">
                      <span className="text-brand-pastel-green text-xl">✓</span>
                    </div>
                    <div>
                      <h3 className="font-subheading font-semibold text-brand-grey-green">Frame Blending</h3>
                      <p className="text-sm text-brand-dark-grey/70">Smooth transitions between frames</p>
                    </div>
                  </div>
                </div>

                <div 
                  className="transition-all duration-700 ease-out delay-100"
                  style={{
                    opacity: displayProgress > 0.5 ? 1 : 0,
                    transform: `translateX(${displayProgress > 0.5 ? 0 : -20}px)`
                  }}
                >
                  <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xl">⚡</span>
                    </div>
                    <div>
                      <h3 className="font-subheading font-semibold text-brand-grey-green">60 FPS Playback</h3>
                      <p className="text-sm text-brand-dark-grey/70">Cinema-quality smooth rotation</p>
                    </div>
                  </div>
                </div>

                <div 
                  className="transition-all duration-700 ease-out delay-200"
                  style={{
                    opacity: displayProgress > 0.8 ? 1 : 0,
                    transform: `translateX(${displayProgress > 0.8 ? 0 : -20}px)`
                  }}
                >
                  <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-xl">🎯</span>
                    </div>
                    <div>
                      <h3 className="font-subheading font-semibold text-brand-grey-green">Velocity Tracking</h3>
                      <p className="text-sm text-brand-dark-grey/70">Adaptive smoothing based on scroll speed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div 
                className="transition-all duration-1000 ease-out"
                style={{
                  opacity: displayProgress > 0.9 ? 1 : 0,
                  transform: `translateY(${displayProgress > 0.9 ? 0 : 20}px)`
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

            {/* Right - Dual Lottie Animation for Frame Blending */}
            <div className="relative flex items-center justify-center">
              {/* Background glow */}
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
              <div 
                className="relative z-10 w-full max-w-lg"
                style={{
                  transform: 'translateZ(0)', // Force GPU acceleration
                  willChange: 'transform'
                }}
              >
                <Lottie
                  lottieRef={lottieRef}
                  animationData={animationData}
                  loop={false}
                  autoplay={false}
                  className="w-full h-full"
                  rendererSettings={{
                    preserveAspectRatio: 'xMidYMid meet',
                    hideOnTransparent: false,
                    renderer: 'canvas'
                  }}
                />
              </div>

              {/* Scroll indicator */}
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
                    ) : isScrolling ? (
                      <>
                        <span>Rotating smoothly...</span>
                        <span className="inline-block animate-spin">⟳</span>
                      </>
                    ) : (
                      <>
                        <span>Paused</span>
                        <span>⏸</span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll depth indicator */}
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