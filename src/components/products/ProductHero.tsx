import { Shield, Zap, Leaf } from "lucide-react";
import React from "react";
import { Separator } from "@/components/ui/separator";
import heroSectionImg from "@/assets/herosection_product.png";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

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

export function ProductHero() {
  return (
    <>
      {/* Full-screen Hero Section */}
      <section className="relative min-h-screen flex items-start overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroSectionImg}
            alt="Vaayura Air Purifier in Clean Interior Space"
            className="w-full h-full object-cover"
          />
          {/* Multiple Fade Effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10"></div>
        </div>

        {/* Text Content at Top */}
        <div className="container mx-auto relative z-10 pt-52">
          <div className="flex justify-center items-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-brand-pastel-green leading-tight text-center">
              Pure Air, Pure Life
            </h1>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <div className="mx-auto flex max-w-5xl flex-col md:flex-row">
            {features.map((feature, index) => (
              <React.Fragment key={feature.title}>
                {index > 0 && (
                  <Separator
                    orientation="vertical"
                    className="mx-6 hidden h-auto w-[2px] bg-gradient-to-b from-muted via-transparent to-muted md:block"
                  />
                )}
                <div
                  key={index}
                  className="flex grow basis-0 flex-col rounded-md bg-background p-4"
                >
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
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}