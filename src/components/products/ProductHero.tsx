import React, { memo } from "react";
import heroSectionImg from "@/assets/hero2background.jpg";

const ProductHeroComponent = memo(() => {
  return (
    <>
      {/* Full-screen Hero Section */}
      <section className="relative min-h-screen flex items-start overflow-hidden">
        {/* Background Image with optimized loading */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroSectionImg}
            alt="Vaayura Air Purifier in Clean Interior Space"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
          {/* Optimized gradient overlay */}
          <div 
            className="absolute inset-0" 
            style={{
              background: `
                linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, transparent 100%),
                linear-gradient(to bottom, transparent 0%, transparent 80%, rgba(0,0,0,0.2) 100%),
                linear-gradient(to right, rgba(0,0,0,0.1) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.1) 100%)
              `
            }}
          />
        </div>

        {/* Text Content at Bottom */}
        <div className="absolute bottom-16 left-0 right-0 z-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col justify-center items-center space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora text-white leading-tight text-center drop-shadow-lg">
                Pure Air, Pure Life
              </h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

ProductHeroComponent.displayName = 'ProductHero';

export { ProductHeroComponent as ProductHero };