import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '@/assets/video/Vaayura_Air_Purifier_Video_Showcase - Trim.mp4.lottie.json';

export function Hero3DDoubleBuffer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef1 = useRef<any>(null);
  const lottieRef2 = useRef<any>(null);
  const [displayProgress, setDisplayProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const lastFrameRef = useRef(-1);
  const rafRef = useRef<number>();
  const activeBufferRef = useRef(1);

  useEffect(() => {
    let isActive = true;

    const animate = () => {
      if (!isActive) return;

      // Super smooth interpolation
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
      };

      // Smooth interpolation with different factors for speed
      const diff = Math.abs(targetProgressRef.current - currentProgressRef.current);
      let lerpFactor = 0.05; // Base smoothness
      
      // Adaptive smoothing based on distance
      if (diff > 0.1) {
        lerpFactor = 0.08; // Faster catch-up for large movements
      } else if (diff < 0.01) {
        lerpFactor = 0.02; // Extra smooth for tiny movements
      }

      currentProgressRef.current = lerp(
        currentProgressRef.current,
        targetProgressRef.current,
        lerpFactor
      );

      // Update Lottie with double buffering
      if (lottieRef1.current && lottieRef2.current) {
        const totalFrames = lottieRef1.current.getDuration(true);
        if (totalFrames) {
          const exactFrame = currentProgressRef.current * (totalFrames - 1);
          const targetFrame = Math.round(exactFrame);
          
          // Only update if frame actually changed (reduces computation)
          if (targetFrame !== lastFrameRef.current) {
            lastFrameRef.current = targetFrame;
            
            // Alternate between buffers for smoother updates
            if (activeBufferRef.current === 1) {
              // Update buffer 2 while showing buffer 1
              lottieRef2.current.goToAndStop(targetFrame, true);
              
              // Swap buffers with a micro-delay for smoothness
              setTimeout(() => {
                const elem1 = document.getElementById('lottie-buffer-1');
                const elem2 = document.getElementById('lottie-buffer-2');
                if (elem1 && elem2) {
                  elem1.style.opacity = '0';
                  elem2.style.opacity = '1';
                  activeBufferRef.current = 2;
                }
              }, 16); // One frame delay at 60fps
            } else {
              // Update buffer 1 while showing buffer 2
              lottieRef1.current.goToAndStop(targetFrame, true);
              
              // Swap buffers
              setTimeout(() => {
                const elem1 = document.getElementById('lottie-buffer-1');
                const elem2 = document.getElementById('lottie-buffer-2');
                if (elem1 && elem2) {
                  elem1.style.opacity = '1';
                  elem2.style.opacity = '0';
                  activeBufferRef.current = 1;
                }
              }, 16);
            }
          }
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
    let lastScrollTime = Date.now();
    let scrollVelocity = 0;
    
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const now = Date.now();
      const timeDelta = now - lastScrollTime;
      lastScrollTime = now;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollableHeight = rect.height - windowHeight;
      const scrolled = -rect.top;
      
      let progress = scrolled / scrollableHeight;
      progress = Math.max(0, Math.min(1, progress));
      
      // Calculate velocity for predictive loading
      const progressDelta = progress - targetProgressRef.current;
      scrollVelocity = progressDelta / Math.max(timeDelta, 1) * 1000;
      
      // Add velocity prediction for smoother experience
      const predictedProgress = progress + (scrollVelocity * 0.05);
      targetProgressRef.current = Math.max(0, Math.min(1, predictedProgress));
    };

    // High-frequency scroll sampling for smoothness
    let scrollRaf: number;
    const onScroll = () => {
      cancelAnimationFrame(scrollRaf);
      scrollRaf = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(scrollRaf);
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
                  Double-buffered rendering for the smoothest 3D rotation experience.
                </p>
              </div>

              {/* Ultra-smooth progress indicator */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-subheading text-brand-grey-green">
                  <span>Rotation Progress</span>
                  <span className="font-mono tabular-nums">{(displayProgress * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-pastel-green to-green-500 rounded-full shadow-sm will-change-transform"
                    style={{ 
                      width: `${displayProgress * 100}%`,
                      transform: 'translateZ(0)', // GPU acceleration
                      transition: 'none' // Use JS animation only
                    }}
                  />
                </div>
              </div>

              {/* Performance indicator */}
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>60 FPS • Double Buffered • GPU Accelerated</span>
              </div>

              {/* Features */}
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
                      <span className="text-brand-pastel-green text-xl">⚡</span>
                    </div>
                    <div>
                      <h3 className="font-subheading font-semibold text-brand-grey-green">Double Buffering</h3>
                      <p className="text-sm text-brand-dark-grey/70">Seamless frame transitions</p>
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
                      <span className="text-blue-600 text-xl">🎯</span>
                    </div>
                    <div>
                      <h3 className="font-subheading font-semibold text-brand-grey-green">Predictive Loading</h3>
                      <p className="text-sm text-brand-dark-grey/70">Anticipates your scroll direction</p>
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
                      <span className="text-purple-600 text-xl">✨</span>
                    </div>
                    <div>
                      <h3 className="font-subheading font-semibold text-brand-grey-green">Adaptive Smoothing</h3>
                      <p className="text-sm text-brand-dark-grey/70">Adjusts to your scroll speed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
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

            {/* Right - Double Buffered Lottie */}
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
              
              {/* Double Buffered Lottie Container */}
              <div 
                className="relative z-10 w-full max-w-lg"
                style={{
                  transform: 'translateZ(0)', // GPU acceleration
                  willChange: 'transform'
                }}
              >
                {/* Buffer 1 */}
                <div 
                  id="lottie-buffer-1" 
                  className="absolute inset-0 transition-opacity duration-75"
                  style={{ opacity: 1 }}
                >
                  <Lottie
                    lottieRef={lottieRef1}
                    animationData={animationData}
                    loop={false}
                    autoplay={false}
                    className="w-full h-full"
                    rendererSettings={{
                      preserveAspectRatio: 'xMidYMid meet',
                      hideOnTransparent: false,
                      renderer: 'canvas',
                      clearCanvas: false // Keep previous frame visible
                    }}
                  />
                </div>
                
                {/* Buffer 2 */}
                <div 
                  id="lottie-buffer-2" 
                  className="absolute inset-0 transition-opacity duration-75"
                  style={{ opacity: 0 }}
                >
                  <Lottie
                    lottieRef={lottieRef2}
                    animationData={animationData}
                    loop={false}
                    autoplay={false}
                    className="w-full h-full"
                    rendererSettings={{
                      preserveAspectRatio: 'xMidYMid meet',
                      hideOnTransparent: false,
                      renderer: 'canvas',
                      clearCanvas: false
                    }}
                  />
                </div>
              </div>

              {/* Scroll indicator */}
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
                <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl border border-gray-100">
                  <p className="text-sm font-subheading text-brand-grey-green">
                    {displayProgress < 0.05 ? 'Scroll to rotate ↓' : 
                     displayProgress > 0.95 ? 'Complete! ✨' : 
                     'Smooth rotation...'}
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