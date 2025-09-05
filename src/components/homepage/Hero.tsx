import { useEffect, useState } from 'react';
import { Header1 } from "@/components/ui/header"
import ScrollExpandMedia from "@/components/ui/scroll-expand-media"
import mainImage from "@/assets/background.png"
import backgroundImage from "@/assets/main.jpg"

const HeroContent = ({ showContent }: { showContent?: boolean }) => {
  return (
    <div 
      className={`absolute inset-0 flex items-center justify-center z-50 p-8 transition-all duration-700 ${
        showContent ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Dark green card with blended borders - increased transparency */}
      <div className='bg-brand-grey-green/10 backdrop-blur-sm rounded-3xl shadow-2xl border border-brand-grey-green/10 p-8 md:p-12 max-w-4xl mx-auto'>
        {/* Main Headline */}
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-sora font-bold mb-6 leading-tight text-brand-white text-center'>
          Life Begins with<br />
          <span className="text-brand-pastel-green">Clean Air</span>
        </h1>
        
        {/* Subheadline */}
        <p className='text-lg md:text-xl font-montserrat mb-10 text-brand-white/90 max-w-3xl mx-auto leading-relaxed text-center'>
          Clean air is no longer a luxury—it's a daily necessity. Vaayura delivers world-class air purification with intelligent design, making healthier living effortless and beautiful.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="/products" className="bg-brand-pastel-green text-brand-grey-green hover:bg-brand-white hover:text-brand-grey-green px-8 py-4 text-lg font-montserrat font-semibold rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 min-w-[180px] text-center">
            Shop Now
          </a>
          <button className="border-2 border-brand-pastel-green text-brand-pastel-green hover:bg-brand-pastel-green hover:text-brand-grey-green px-8 py-4 text-lg font-montserrat font-semibold rounded-2xl transition-all duration-300 min-w-[180px]">
            Book a Demo
          </button>
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
      <div className='h-screen overflow-hidden'>
        <ScrollExpandMedia
          mediaType="image"
          mediaSrc={mainImage}
          bgImageSrc={backgroundImage}
        >
          <HeroContent />
        </ScrollExpandMedia>
      </div>
    </>
  )
}