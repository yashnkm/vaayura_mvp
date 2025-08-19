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
    <section className="py-32 bg-slate-50">
      <div className="container overflow-hidden">
        <div className="mb-8 flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-brand-grey-green leading-tight">
            Pure Air, Pure Life
          </h1>
        </div>
        <div className="relative mx-auto max-w-6xl">
          <img
            src={heroSectionImg}
            alt="Vaayura Air Purifier in Clean Interior Space"
            className="aspect-video max-h-[600px] w-full rounded-xl object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          <div className="absolute -top-28 -right-28 -z-10 aspect-video h-72 w-96 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] [background-size:12px_12px] opacity-40 sm:bg-[radial-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)]"></div>
          <div className="absolute -top-28 -left-28 -z-10 aspect-video h-72 w-96 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] [background-size:12px_12px] opacity-40 sm:bg-[radial-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)]"></div>
        </div>
        <div className="mx-auto mt-10 flex max-w-5xl flex-col md:flex-row">
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
  );
}