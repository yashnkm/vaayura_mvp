import { useEffect, useRef, useState } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import animationData from '@/assets/video/Vaayura_Air_Purifier_Video_Showcase - Trim.mp4.lottie.json';

export function Hero3DSimple() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on container position
      const start = rect.top + windowHeight;
      const end = rect.bottom;
      const distance = end - start;
      const scrolled = windowHeight - rect.top;
      
      let progress = scrolled / distance;
      progress = Math.max(0, Math.min(1, progress));
      
      setScrollProgress(progress);
      
      // Control Lottie animation based on scroll
      if (lottieRef.current) {
        const totalFrames = lottieRef.current.getDuration(true);
        if (totalFrames) {
          const frame = Math.floor(progress * (totalFrames - 1));
          lottieRef.current.goToAndStop(frame, true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[300vh] bg-gradient-to-b from-white to-gray-50">
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

              {/* Progress indicator */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-subheading text-brand-grey-green">
                  <span>Rotation Progress</span>
                  <span>{Math.round(scrollProgress * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-pastel-green transition-all duration-150"
                    style={{ width: `${scrollProgress * 100}%` }}
                  />
                </div>
              </div>

              {/* Features that appear based on scroll */}
              <div className="space-y-4">
                <div className={`transition-all duration-500 ${scrollProgress > 0.2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-brand-pastel-green/20 rounded-full flex items-center justify-center">
                      <span className="text-brand-pastel-green text-xl">✓</span>
                    </div>
                    <div>
                      <h3 className="font-subheading font-semibold text-brand-grey-green">4-Layer HEPA Filter</h3>
                      <p className="text-sm text-brand-dark-grey/70">99.97% particle removal</p>
                    </div>
                  </div>
                </div>

                <div className={`transition-all duration-500 ${scrollProgress > 0.5 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xl">⚡</span>
                    </div>
                    <div>
                      <h3 className="font-subheading font-semibold text-brand-grey-green">Smart Sensors</h3>
                      <p className="text-sm text-brand-dark-grey/70">Real-time air quality monitoring</p>
                    </div>
                  </div>
                </div>

                <div className={`transition-all duration-500 ${scrollProgress > 0.8 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                  <div className="flex items-center gap-3">
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

              {/* CTA Buttons - appear at end */}
              <div className={`transition-all duration-500 ${scrollProgress > 0.9 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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

            {/* Right - Lottie Animation */}
            <div className="relative flex items-center justify-center">
              {/* Background glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-96 h-96 bg-brand-pastel-green/20 rounded-full blur-3xl animate-pulse"></div>
              </div>
              
              {/* Lottie Animation */}
              <div className="relative z-10 w-full max-w-lg">
                <Lottie
                  lottieRef={lottieRef}
                  animationData={animationData}
                  loop={false}
                  autoplay={false}
                  className="w-full h-full"
                />
              </div>

              {/* Scroll indicator */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <p className="text-sm font-subheading text-brand-grey-green">
                    {scrollProgress < 0.1 ? 'Scroll to rotate ↓' : scrollProgress > 0.9 ? 'Complete! ✨' : 'Keep scrolling...'}
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