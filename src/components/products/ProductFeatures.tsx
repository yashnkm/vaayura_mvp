// Import asset images
import React, { useState, useEffect, useRef } from "react";
import fourLayerFilterImg from "@/assets/hepa_filtration_new.png";
import intSensorImg from "@/assets/Adobe_Express_-_file_1.png";
import realtimeAQIImg from "@/assets/realtime AQI.jpg";
import ambientLightImg from "@/assets/ambient_light_new.png";
import aromaTepImg from "@/assets/aromatherapy_new.png";
import productHeroImg from "@/assets/product_hero.png";
import silentSleepModeImg from "@/assets/Adobe Express - file.png";
import { ArrowRight } from "lucide-react";

interface Feature {
  image: string;
  title: string;
  description: string;
  technical: string;
}

const features: Feature[] = [
  {
    image: fourLayerFilterImg,
    title: "4-Layer True HEPA Filtration",
    description: "Multi-stage filtration system with pre-filter, True HEPA 13, anti-bacterial filter, and activated carbon honeycomb capturing 99.97% of particles as small as 0.3 microns.",
    technical: "HEPA 13 Grade • 99.97% Efficiency • 0.3μm Particle Capture"
  },
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
  },
  {
    image: silentSleepModeImg,
    title: "Silent Sleep Mode",
    description: "Ultra-quiet operation at just 38dB in sleep mode with dimmed LED indicators, ensuring peaceful rest while maintaining continuous air purification.",
    technical: "<38dB Operation • Dimmed LED • Continuous Purification"
  },
];

export function ProductFeatures() {
  const [visibleFeatures, setVisibleFeatures] = useState<boolean[]>([false, false, false, false, false]);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = features.map((_, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisibleFeatures(prev => {
            const newVisible = [...prev];
            // Show feature only when it's more centered in viewport
            newVisible[index] = entry.intersectionRatio >= 0.4;
            return newVisible;
          });
        },
        {
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
          rootMargin: '50px 0px 50px 0px' // Balanced margins
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
  }, []);

  return (
    <section className="w-full py-16 lg:py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-8">
        <div className="flex flex-col gap-12">
          
          {/* Section Header */}
          <div className="text-left space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat text-brand-grey-green leading-tight">
              Engineered for <span className="text-brand-pastel-green">Excellence</span>
            </h2>
            <p className="text-lg text-brand-dark-grey font-montserrat max-w-3xl leading-relaxed">
              Every Vaayura air purifier combines cutting-edge filtration technology with intelligent automation for superior performance.
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-40">
            {features.map((feature, index) => (
              <div 
                key={index}
                ref={el => featureRefs.current[index] = el}
                className={`flex flex-col lg:flex-row items-center ${feature.title === 'Silent Sleep Mode' ? 'gap-4 lg:gap-8' : 'gap-8 lg:gap-16'} min-h-[500px] transition-all duration-1000 ease-out ${
                  (index % 2 === 1 && feature.title !== 'Silent Sleep Mode') ? 'lg:flex-row-reverse' : ''
                } ${
                  visibleFeatures[index] 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-5 translate-y-12 scale-97'
                }`}
                style={{
                  transitionProperty: 'opacity, transform',
                  willChange: 'opacity, transform'
                }}
              >
                {/* Feature Image */}
                <div className={`${feature.title === 'Silent Sleep Mode' ? 'flex-none w-full max-w-2xl -ml-24' : 'flex-1 max-w-lg'} relative transition-all duration-1000 ease-out ${
                  visibleFeatures[index] 
                    ? 'opacity-100 translate-x-0 scale-100' 
                    : `opacity-0 scale-95 ${index % 2 === 1 ? 'translate-x-12' : '-translate-x-12'}`
                }`}>
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className={`w-full object-contain ${feature.title === 'Silent Sleep Mode' ? 'h-[32rem]' : 'h-96'}`}
                    style={{ filter: 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.2))' }}
                  />
                </div>

                {/* Feature Content */}
                <div className={`flex-1 space-y-6 transition-all duration-1000 ease-out ${
                  visibleFeatures[index] 
                    ? 'opacity-100 translate-x-0' 
                    : `opacity-0 ${index % 2 === 1 ? '-translate-x-12' : 'translate-x-12'}`
                }`}>

                  {/* Title */}
                  <h3 className={`text-2xl md:text-3xl font-montserrat text-brand-grey-green leading-tight transition-all duration-1000 ${
                    visibleFeatures[index] 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-6'
                  }`}>
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-brand-dark-grey font-montserrat leading-relaxed text-lg transition-all duration-1000 ${
                    visibleFeatures[index] 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-6'
                  }`}>
                    {feature.description}
                  </p>

                  {/* Technical Specs */}
                  <div className={`transition-all duration-1000 ${
                    visibleFeatures[index] 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-6'
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