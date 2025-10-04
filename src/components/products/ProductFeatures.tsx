// Import asset images
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import fourLayerFilterImg from "@/assets/sections/homepage/filtration/hepa_filtration_new.png";
import threeLayerFilterImg from "@/assets/filters/3layer.png";
import intSensorImg from "@/assets/sections/products/features/Adobe_Express_-_file_1.png";
import realtimeAQIImg from "@/assets/sections/products/features/realtime AQI.jpg";
import ambientLightImg from "@/assets/sections/homepage/features/ambient_light_new.png";
import ambientLight1 from "@/assets/sections/homepage/features/ambientlight1.png";
import ambientLight2 from "@/assets/sections/homepage/features/ambientlight2.png";
import ambientLight3 from "@/assets/sections/homepage/features/ambientlight3.png";
import aromaTepImg from "@/assets/sections/products/features/aromatherapy_new.png";
import productHeroImg from "@/assets/sections/homepage/hero/product_hero.png";
import silentSleepModeImg from "@/assets/sections/products/features/Adobe Express - file.png";
import { ArrowRight } from "lucide-react";

interface Feature {
  image: string;
  title: string;
  description: string;
  technical: string;
}

// Base features that are common to all products
const getFeatures = (currentProduct: string): Feature[] => {
  const filtrationFeature = currentProduct === 'nest' ? {
    image: threeLayerFilterImg,
    title: "3-Layer True HEPA Filtration",
    description: "Multi-stage filtration system with pre-filter, True HEPA 13, and activated carbon honeycomb capturing 99.97% of particles as small as 0.1 microns.",
    technical: "HEPA 13 Grade • 99.97% Efficiency • 0.1μm Particle Capture"
  } : {
    image: fourLayerFilterImg,
    title: "4-Layer True HEPA Filtration",
    description: "Multi-stage filtration system with pre-filter, True HEPA 13, anti-bacterial filter, and activated carbon honeycomb capturing 99.97% of particles as small as 0.1 microns.",
    technical: "HEPA 13 Grade • 99.97% Efficiency • 0.1μm Particle Capture"
  };

  const baseFeatures = [filtrationFeature];

  // Add features based on product type
  if (currentProduct === 'storm') {
    // Storm gets all features
    baseFeatures.push(
      {
        image: intSensorImg,
        title: "Intelligent Auto Mode",
        description: "Advanced laser particle sensors continuously monitor air quality and automatically adjust fan speed for optimal performance without manual intervention.",
        technical: "Laser Sensor Technology • Real-time Detection • Auto Speed Control"
      },
      {
        image: ambientLightImg,
        title: "Ambient Air Quality Display",
        description: "360-degree LED indicator ring provides instant visual feedback of current air quality status with color-coded alerts for immediate awareness.",
        technical: "360° LED Ring • Color-coded Alerts • Real-time Status"
      },
      {
        image: aromaTepImg,
        title: "Aromatherapy Function",
        description: "Integrated essential oil compartment with ultrasonic diffusion technology allows you to add your favorite scents while purifying the air.",
        technical: "Ultrasonic Diffusion • Essential Oil Compatible • Dual Function"
      }
    );
  } else if (currentProduct === 'nest') {
    // Nest gets only Silent Sleep Mode
    baseFeatures.push({
      image: silentSleepModeImg,
      title: "Silent Sleep Mode",
      description: "Ultra-quiet operation at just 38dB in sleep mode with dimmed LED indicators, ensuring peaceful rest while maintaining continuous air purification.",
      technical: "<38dB Operation • Dimmed LED • Continuous Purification"
    });
  } else {
    // Other products get aromatherapy and silent sleep mode
    baseFeatures.push(
      {
        image: aromaTepImg,
        title: "Aromatherapy Function",
        description: "Integrated essential oil compartment with ultrasonic diffusion technology allows you to add your favorite scents while purifying the air.",
        technical: "Ultrasonic Diffusion • Essential Oil Compatible • Dual Function"
      },
      {
        image: silentSleepModeImg,
        title: "Silent Sleep Mode",
        description: "Ultra-quiet operation at just 38dB in sleep mode with dimmed LED indicators, ensuring peaceful rest while maintaining continuous air purification.",
        technical: "<38dB Operation • Dimmed LED • Continuous Purification"
      }
    );
  }

  return baseFeatures;
};

// Ambient light carousel images
const ambientLightImages = [
  ambientLight1,
  ambientLight2,
  ambientLight3
];

export function ProductFeatures() {
  const location = useLocation();

  // Determine current product type from URL
  const getCurrentProduct = () => {
    const path = location.pathname;
    if (path.includes('/storm')) return 'storm';
    if (path.includes('/nest')) return 'nest';
    return 'other';
  };

  const currentProduct = getCurrentProduct();

  // Get dynamic features based on product type
  const allFeatures = getFeatures(currentProduct);

  // Filter features based on product type and screen size
  const [isMobile, setIsMobile] = useState(false);

  const filteredFeatures = allFeatures.filter((feature) => {
    // Remove Silent Sleep Mode for Storm products
    if (feature.title === 'Silent Sleep Mode' && currentProduct === 'storm') {
      return false;
    }
    // Remove Ambient Air Quality Display for mobile view
    if (feature.title === 'Ambient Air Quality Display' && isMobile) {
      return false;
    }
    return true;
  });

  const [visibleFeatures, setVisibleFeatures] = useState<boolean[]>(() =>
    new Array(filteredFeatures.length).fill(isMobile)
  );

  useEffect(() => {
    const checkIsMobile = () => {
      const newIsMobile = window.innerWidth < 1024;
      setIsMobile(newIsMobile);
      // Update visibility immediately when switching to mobile
      if (newIsMobile) {
        setVisibleFeatures(new Array(filteredFeatures.length).fill(true));
      }
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, [filteredFeatures.length]);
  const [ambientCarouselIndex, setAmbientCarouselIndex] = useState(0);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastScrollY = useRef(0);

  // Handle manual carousel navigation for mobile
  const nextAmbientImage = () => {
    setAmbientCarouselIndex(prev => (prev + 1) % ambientLightImages.length);
  };

  const prevAmbientImage = () => {
    setAmbientCarouselIndex(prev => (prev - 1 + ambientLightImages.length) % ambientLightImages.length);
  };

  useEffect(() => {
    // On mobile, make all features visible immediately for faster loading
    if (isMobile) {
      setVisibleFeatures(new Array(filteredFeatures.length).fill(true));
      return;
    }

    // Desktop: use intersection observer for animations
    const observers = filteredFeatures.map((_, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          const currentScrollY = window.scrollY;
          const isScrollingDown = currentScrollY > lastScrollY.current;
          lastScrollY.current = currentScrollY;

          setVisibleFeatures(prev => {
            const newVisible = [...prev];

            // Only animate when scrolling down and element becomes visible
            if (entry.intersectionRatio >= 0.4 && isScrollingDown && !newVisible[index]) {
              newVisible[index] = true;
            }
            // Keep visible state when scrolling up (no animation reset)

            return newVisible;
          });
        },
        {
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
          rootMargin: '200px 0px 200px 0px' // Load images 200px before they come into view
        }
      );

      if (featureRefs.current[index]) {
        observer.observe(featureRefs.current[index]!);
      }

      return observer;
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [isMobile, filteredFeatures.length]);

  // Ambient light carousel effect - desktop only (since mobile hides this feature)
  useEffect(() => {
    // Find the actual index of the Ambient Air Quality Display feature
    const ambientFeatureIndex = filteredFeatures.findIndex(feature =>
      feature.title === 'Ambient Air Quality Display'
    );

    // Only start carousel on desktop when feature is visible
    if (ambientFeatureIndex === -1 || isMobile) return;

    const carouselInterval = setInterval(() => {
      setAmbientCarouselIndex(prev => (prev + 1) % ambientLightImages.length);
    }, 3000);

    return () => {
      clearInterval(carouselInterval);
    };
  }, [currentProduct, isMobile, filteredFeatures.length]); // Include isMobile to restart when screen size changes

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 xl:py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
          
          {/* Section Header */}
          <div className="text-left space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat text-brand-grey-green leading-tight">
              Engineered for Excellence
            </h2>
            <p className="text-base sm:text-lg text-brand-dark-grey font-montserrat max-w-3xl leading-relaxed">
              Every Vaayura air purifier combines cutting-edge filtration technology with intelligent automation for superior performance.
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-16 sm:space-y-24 lg:space-y-32 xl:space-y-40">
            {filteredFeatures.map((feature, index) => (
              <div
                key={index}
                ref={el => featureRefs.current[index] = el}
                className={`flex flex-col lg:flex-row items-center ${feature.title === 'Silent Sleep Mode' ? 'gap-6 sm:gap-8 lg:gap-12' : 'gap-8 sm:gap-12 lg:gap-16'} min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] ${
                  (index % 2 === 1 && feature.title !== 'Silent Sleep Mode') ? 'lg:flex-row-reverse' : ''
                } ${
                  // Mobile: always visible, no animations
                  // Desktop: animated based on visibility
                  visibleFeatures[index]
                    ? 'opacity-100 sm:transition-all sm:duration-1000 sm:ease-out sm:translate-y-0 sm:scale-100'
                    : 'opacity-100 sm:opacity-5 sm:transition-all sm:duration-1000 sm:ease-out sm:translate-y-12 sm:scale-97'
                }`}
                style={{
                  // Only apply animation properties on desktop
                  ...(typeof window !== 'undefined' && window.innerWidth >= 640 && {
                    transitionProperty: 'opacity, transform',
                    willChange: 'opacity, transform'
                  })
                }}
              >
                {/* Feature Image */}
                <div className={`${feature.title === 'Silent Sleep Mode' ? 'flex-none w-full max-w-2xl' : 'flex-1 max-w-lg'} relative p-4 sm:p-6 lg:p-8 ${
                  // Mobile: always visible, no animations
                  // Desktop: animated based on visibility
                  visibleFeatures[index]
                    ? 'opacity-100 sm:transition-all sm:duration-1000 sm:ease-out sm:translate-x-0 sm:scale-100'
                    : `opacity-100 sm:opacity-0 sm:transition-all sm:duration-1000 sm:ease-out sm:scale-95 ${index % 2 === 1 ? 'sm:translate-x-12' : 'sm:-translate-x-12'}`
                }`}>
                  {feature.title === 'Ambient Air Quality Display' && visibleFeatures[index] ? (
                    // Carousel for Ambient Air Quality Display
                    <div className="relative w-full max-w-full h-64 sm:h-80 md:h-96 lg:h-[32rem] overflow-hidden rounded-lg">

                      {ambientLightImages.map((img, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={img}
                          alt={`${feature.title} - View ${imgIndex + 1}`}
                          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out ${
                            imgIndex === ambientCarouselIndex ? 'opacity-100' : 'opacity-0'
                          }`}
                          style={{
                            filter: 'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.15))',
                            maxHeight: '100%',
                            height: 'auto',
                            aspectRatio: 'auto',
                            transformOrigin: 'center center',
                            // Simple responsive transform - smaller for mobile
                            transform: img === ambientLight1
                              ? 'scale(1.2) translateY(-1%)'
                              : 'scale(1.2)'
                          }}
                          loading={isMobile ? "eager" : "lazy"}
                        />
                      ))}


                      {/* Touch areas for mobile navigation */}
                      <div
                        className="absolute left-0 top-0 w-1/3 h-full z-20 cursor-pointer touch-manipulation"
                        onClick={prevAmbientImage}
                        aria-label="Previous ambient light image"
                      />
                      <div
                        className="absolute right-0 top-0 w-1/3 h-full z-20 cursor-pointer touch-manipulation"
                        onClick={nextAmbientImage}
                        aria-label="Next ambient light image"
                      />

                    </div>
                  ) : visibleFeatures[index] ? (
                      // Regular single image for other features
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className={`w-full max-w-full ${feature.title === 'Silent Sleep Mode' ? 'object-cover object-right h-64 sm:h-80 md:h-96 lg:h-[32rem]' : 'object-contain h-48 sm:h-64 md:h-80 lg:h-96'}`}
                        style={{
                          filter: 'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.15))',
                          maxHeight: '100%',
                          height: 'auto',
                          aspectRatio: 'auto',
                          ...(feature.title === 'Silent Sleep Mode' && {
                            objectPosition: '60% center',
                            transform: 'scale(1.25) translateX(-20%)'
                          })
                        }}
                        loading={isMobile ? "eager" : "lazy"}
                      />
                  ) : (
                    <div 
                      className={`w-full max-w-full ${feature.title === 'Silent Sleep Mode' ? 'h-64 sm:h-80 md:h-96 lg:h-[32rem]' : 'h-48 sm:h-64 md:h-80 lg:h-96'} bg-gray-100 rounded-lg animate-pulse flex items-center justify-center`}
                      style={{ filter: 'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.1))' }}
                    >
                      <div className="text-gray-400 text-xs sm:text-sm">Loading...</div>
                    </div>
                  )}
                </div>

                {/* Feature Content */}
                <div className={`flex-1 space-y-6 ${feature.title === 'Silent Sleep Mode' ? 'p-4 sm:p-6 lg:p-8 lg:pl-0' : 'p-4 sm:p-6 lg:p-8'} ${
                  // Mobile: always visible, no animations
                  // Desktop: animated based on visibility
                  visibleFeatures[index]
                    ? 'opacity-100 sm:transition-all sm:duration-1000 sm:ease-out sm:translate-x-0'
                    : `opacity-100 sm:opacity-0 sm:transition-all sm:duration-1000 sm:ease-out ${index % 2 === 1 ? 'sm:-translate-x-12' : 'sm:translate-x-12'}`
                }`}>

                  {/* Title */}
                  <h3 className={`text-2xl md:text-3xl font-montserrat text-brand-grey-green leading-tight ${
                    // Mobile: always visible, no animations
                    // Desktop: animated based on visibility
                    visibleFeatures[index]
                      ? 'opacity-100 sm:transition-all sm:duration-1000 sm:translate-y-0'
                      : 'opacity-100 sm:opacity-0 sm:transition-all sm:duration-1000 sm:translate-y-6'
                  }`}>
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-brand-dark-grey font-montserrat leading-relaxed text-lg ${
                    // Mobile: always visible, no animations
                    // Desktop: animated based on visibility
                    visibleFeatures[index]
                      ? 'opacity-100 sm:transition-all sm:duration-1000 sm:translate-y-0'
                      : 'opacity-100 sm:opacity-0 sm:transition-all sm:duration-1000 sm:translate-y-6'
                  }`}>
                    {feature.description}
                  </p>

                  {/* Technical Specs */}
                  <div className={`${
                    // Mobile: always visible, no animations
                    // Desktop: animated based on visibility
                    visibleFeatures[index]
                      ? 'opacity-100 sm:transition-all sm:duration-1000 sm:translate-y-0'
                      : 'opacity-100 sm:opacity-0 sm:transition-all sm:duration-1000 sm:translate-y-6'
                  }`}>
                    <div className="text-brand-dark-grey text-sm">
                      {feature.technical}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>


        </div>
      </div>
    </section>
  );
}