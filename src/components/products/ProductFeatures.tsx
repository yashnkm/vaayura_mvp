// Import asset images
import React from "react";
import fourLayerFilterImg from "@/assets/4 layer filter.jpg";
import intSensorImg from "@/assets/int_sensor.jpg";
import realtimeAQIImg from "@/assets/realtime AQI.jpg";
import ambientLightImg from "@/assets/Ambiend light.jpg";
import aromaTepImg from "@/assets/aroma_tep.jpg";
import productHeroImg from "@/assets/product_hero.png";
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
    image: realtimeAQIImg,
    title: "Silent Sleep Mode",
    description: "Ultra-quiet operation at just 38dB in sleep mode with dimmed LED indicators, ensuring peaceful rest while maintaining continuous air purification.",
    technical: "<38dB Operation • Dimmed LED • Continuous Purification"
  },
];

export function ProductFeatures() {
  return (
    <section className="w-full py-16 lg:py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-12">
          
          {/* Section Header */}
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-brand-grey-green leading-tight">
              Engineered for <span className="text-brand-pastel-green">Excellence</span>
            </h2>
            <p className="text-lg text-brand-dark-grey font-body max-w-3xl mx-auto leading-relaxed">
              Every Vaayura air purifier combines cutting-edge filtration technology with intelligent automation for superior performance.
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-16">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Feature Image */}
                <div className="flex-1 relative max-w-lg">
                  <div className="relative rounded-2xl bg-slate-50 shadow-lg p-4">
                    <div className="aspect-[4/3] w-full">
                      <img 
                        src={feature.image} 
                        alt={feature.title}
                        className="w-full h-full object-contain rounded-xl"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-grey-green/5 to-transparent rounded-2xl" />
                  </div>
                </div>

                {/* Feature Content */}
                <div className="flex-1 space-y-6">
                  {/* Feature Number */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-pastel-green flex items-center justify-center">
                      <span className="text-brand-grey-green font-bold text-lg">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="h-px bg-brand-pastel-green/30 flex-1" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-subheading text-brand-grey-green leading-tight">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-brand-dark-grey font-body leading-relaxed text-lg">
                    {feature.description}
                  </p>

                  {/* Technical Specs */}
                  <div className="bg-slate-50 rounded-xl p-4 border-l-4 border-brand-pastel-green">
                    <div className="text-sm font-medium text-brand-grey-green mb-1">
                      Technical Specifications
                    </div>
                    <div className="text-brand-dark-grey font-mono text-sm">
                      {feature.technical}
                    </div>
                  </div>

                  {/* Learn More */}
                  <div className="pt-2">
                    <button className="inline-flex items-center gap-2 text-brand-pastel-green font-medium hover:gap-3 transition-all duration-300">
                      <span>Learn more about this feature</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="text-center pt-8 border-t border-slate-200">
            <h3 className="text-xl font-subheading text-brand-grey-green mb-4">
              Experience the Complete Vaayura Difference
            </h3>
            <p className="text-brand-dark-grey font-body mb-8 max-w-2xl mx-auto">
              Each feature works in harmony to deliver the purest air quality experience, 
              combining advanced technology with effortless operation.
            </p>
            <button className="bg-brand-grey-green text-white px-8 py-3 rounded-full font-medium hover:bg-brand-grey-green/90 transition-colors duration-300">
              View Technical Documentation
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}