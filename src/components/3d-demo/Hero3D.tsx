import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import animationData from '@/assets/video/Vaayura_Air_Purifier_Video_Showcase - Trim.mp4.lottie.json';

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<any>(null);
  const rightSectionRef = useRef<HTMLDivElement>(null);
  const [animationLoaded, setAnimationLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Debug logging
  useEffect(() => {
    console.log('Lottie ref:', lottieRef.current);
    console.log('Animation loaded:', animationLoaded);
  }, [animationLoaded]);

  useEffect(() => {
    const handleScroll = () => {
      if (lottieRef.current && animationLoaded) {
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollTop / scrollHeight;
        
        // Get total frames from the animation
        const animation = lottieRef.current;
        const totalFrames = animation.getDuration(true);
        
        // Calculate which frame to show based on scroll
        const frame = Math.min(Math.floor(scrollProgress * totalFrames * 2), totalFrames - 1);
        
        console.log('Scroll progress:', scrollProgress, 'Frame:', frame, 'Total frames:', totalFrames);
        
        // Go to the specific frame
        animation.goToAndStop(frame, true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [animationLoaded]);

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  return (
    <section ref={containerRef} className="relative min-h-[200vh] bg-gradient-to-b from-brand-white to-gray-50">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="h-full grid lg:grid-cols-2">
          
          {/* Left Section - Scrollable Text Content */}
          <div className="relative h-full overflow-y-auto">
            <div className="px-8 lg:px-12 py-20 space-y-32">
              
              {/* Hero Text */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight text-brand-grey-green">
                  Experience Air Purification in
                  <span className="block text-brand-pastel-green mt-2">3D Perspective</span>
                </h1>
                <p className="text-xl text-brand-dark-grey/80 font-body leading-relaxed max-w-xl">
                  Scroll to explore our revolutionary air purifier from every angle. 
                  See how advanced technology meets elegant design.
                </p>
              </motion.div>

              {/* Feature 1 */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-pastel-green/20 rounded-full">
                  <div className="w-2 h-2 bg-brand-pastel-green rounded-full animate-pulse"></div>
                  <span className="text-sm font-subheading font-semibold text-brand-grey-green">Advanced Filtration</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-display font-bold text-brand-grey-green">
                  4-Layer HEPA Protection
                </h2>
                <p className="text-lg text-brand-dark-grey/70 font-body leading-relaxed max-w-lg">
                  Our multi-stage filtration system captures 99.97% of particles as small as 0.3 microns, 
                  including dust, pollen, smoke, and bacteria.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-subheading font-semibold text-blue-800">Smart Technology</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-display font-bold text-brand-grey-green">
                  AI-Powered Air Quality Control
                </h2>
                <p className="text-lg text-brand-dark-grey/70 font-body leading-relaxed max-w-lg">
                  Intelligent sensors continuously monitor air quality and automatically adjust purification 
                  levels for optimal performance and energy efficiency.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-subheading font-semibold text-purple-800">Wellness Features</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-display font-bold text-brand-grey-green">
                  Aromatherapy & Ambient Lighting
                </h2>
                <p className="text-lg text-brand-dark-grey/70 font-body leading-relaxed max-w-lg">
                  Transform your space with integrated aromatherapy diffusion and customizable ambient 
                  lighting that adapts to your mood and time of day.
                </p>
              </motion.div>

              {/* CTA Section */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6 pb-20"
              >
                <h3 className="text-2xl font-display font-bold text-brand-grey-green">
                  Ready to breathe better?
                </h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="/products" 
                    className="inline-flex items-center justify-center bg-brand-pastel-green text-brand-grey-green hover:bg-brand-grey-green hover:text-white px-8 py-4 text-lg font-subheading font-semibold rounded-2xl transition-all duration-300 hover:shadow-xl"
                  >
                    Explore Products
                  </a>
                  <button className="inline-flex items-center justify-center border-2 border-brand-grey-green text-brand-grey-green hover:bg-brand-grey-green hover:text-white px-8 py-4 text-lg font-subheading font-semibold rounded-2xl transition-all duration-300">
                    Download Brochure
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Section - Sticky Lottie Animation */}
          <div ref={rightSectionRef} className="relative h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <motion.div
              style={{ opacity, scale }}
              className="w-full max-w-2xl px-8"
            >
              <div className="relative">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-96 h-96 bg-brand-pastel-green/10 rounded-full blur-3xl"></div>
                </div>
                
                {/* Lottie Animation */}
                <div className="relative z-10">
                  <Lottie
                    lottieRef={lottieRef}
                    animationData={animationData}
                    loop={false}
                    autoplay={false}
                    className="w-full h-full"
                    onComplete={() => console.log('Animation complete')}
                    onLoopComplete={() => console.log('Loop complete')}
                    onEnterFrame={() => console.log('Frame entered')}
                    onSegmentStart={() => console.log('Segment started')}
                    onDOMLoaded={() => {
                      console.log('Lottie DOM loaded');
                      setAnimationLoaded(true);
                    }}
                    onConfigReady={() => {
                      console.log('Lottie config ready');
                    }}
                    onDataReady={() => {
                      console.log('Lottie data ready');
                    }}
                    rendererSettings={{
                      preserveAspectRatio: 'xMidYMid slice'
                    }}
                  />
                </div>

                {/* Progress Indicator */}
                <motion.div 
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                  style={{ opacity }}
                >
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                    <div className="text-sm font-subheading text-brand-grey-green">Scroll to rotate</div>
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-brand-pastel-green"
                    >
                      ↓
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}