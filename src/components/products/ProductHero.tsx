import { Shield, Zap, Leaf } from "lucide-react";
import React, { memo, useMemo } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import heroSectionImg from "@/assets/herosection_product.png";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Memoized feature component to prevent re-renders
const FeatureItem = memo(({ feature, index }: { feature: Feature; index: number }) => (
  <>
    {index > 0 && (
      <Separator
        orientation="vertical"
        className="mx-6 hidden h-auto w-[2px] bg-gradient-to-b from-muted via-transparent to-muted md:block"
      />
    )}
    <div className="flex grow basis-0 flex-col rounded-md bg-background p-4">
      <div className="mb-6 flex size-10 items-center justify-center rounded-full bg-brand-pastel-green/10 drop-shadow-lg">
        <div className="text-brand-grey-green">
          {feature.icon}
        </div>
      </div>
      <h3 className="mb-2 font-subheading font-semibold text-brand-grey-green">{feature.title}</h3>
      <p className="text-sm text-brand-dark-grey/70 font-body leading-relaxed">
        {feature.description}
      </p>
    </div>
  </>
));

FeatureItem.displayName = 'FeatureItem';

const features: Feature[] = [
  {
    icon: <Shield className="h-auto w-5" />,
    title: "Advanced Filtration",
    description: "Multi-stage HEPA filtration technology removes 99.97% of particles and pollutants from your air.",
  },
  {
    icon: <Leaf className="h-auto w-5" />,
    title: "Natural Wellness",
    description: "Designed to create healthier indoor environments that support your well-being and vitality.",
  },
  {
    icon: <Zap className="h-auto w-5" />,
    title: "Smart Technology",
    description: "Intelligent sensors automatically adjust performance based on air quality conditions.",
  },
];

const ProductHeroComponent = memo(() => {
  // Memoize features rendering to prevent unnecessary re-renders
  const featuresSection = useMemo(() => (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="mx-auto flex max-w-5xl flex-col md:flex-row">
          {features.map((feature, index) => (
            <FeatureItem key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  ), []);

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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white leading-tight text-center drop-shadow-lg">
                Pure Air, Pure Life
              </h1>
            </div>
          </div>
        </div>
      </section>

      {featuresSection}
    </>
  );
});

ProductHeroComponent.displayName = 'ProductHero';

export { ProductHeroComponent as ProductHero };