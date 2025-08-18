import { useEffect, useState } from 'react';
import { Header1 } from "@/components/ui/header"
import ScrollExpandMedia from "@/components/ui/scroll-expand-media"
import mainImage from "@/assets/background.png"
import backgroundImage from "@/assets/main.jpg"

const HeroContent = () => {
  return (
    <div className='max-w-5xl mx-auto text-white'>
      {/* Main Headline */}
      <div className="text-center mb-12">
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight'>
          Life Begins with <span className="text-emerald-300">Clean Air</span>
        </h1>
        <p className='text-lg md:text-xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed'>
          Clean air is no longer a luxury—it's a daily necessity. Vaayura delivers world-class air purification with intelligent design, making healthier living effortless and beautiful.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button className="bg-white text-emerald-900 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            Explore Products
          </button>
          <button className="border-2 border-emerald-300 text-emerald-100 hover:bg-emerald-300 hover:text-emerald-900 px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300">
            Book a Demo
          </button>
        </div>
      </div>

      {/* Technical Specs */}
      <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-emerald-300/20">
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-300 mb-2">99.97%</div>
          <div className="text-sm opacity-80">HEPA Efficiency</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-300 mb-2">≤20dB</div>
          <div className="text-sm opacity-80">Ultra Quiet</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-300 mb-2">800+</div>
          <div className="text-sm opacity-80">Sq Ft Coverage</div>
        </div>
      </div>
    </div>
  );
};

export function Hero() {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);

    // Listen for when content is fully shown to display nav
    const handleContentShow = () => {
      setShowNav(true);
    };

    // Listen for when user goes back to expansion mode
    const handleContentHide = () => {
      setShowNav(false);
    };

    window.addEventListener('heroContentShown', handleContentShow);
    window.addEventListener('heroContentHidden', handleContentHide);
    
    return () => {
      window.removeEventListener('heroContentShown', handleContentShow);
      window.removeEventListener('heroContentHidden', handleContentHide);
    };
  }, []);

  return (
    <>
      {/* Navigation - animated */}
      <div 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          showNav ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
      >
        <Header1 />
      </div>
      
      {/* ScrollExpandMedia Hero Section */}
      <div className='min-h-screen'>
        <ScrollExpandMedia
          mediaType="image"
          mediaSrc={mainImage}
          bgImageSrc={backgroundImage}
          title="Vaayura Clean Air"
          date="Premium Air Purifiers"
          scrollToExpand="Scroll to Expand"
        >
          <HeroContent />
        </ScrollExpandMedia>
      </div>
    </>
  )
}