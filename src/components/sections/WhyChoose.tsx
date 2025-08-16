"use client";

import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FeatureItem {
  id: number;
  title: string;
  image: string;
  description: string;
}

interface WhyChooseProps {
  features?: FeatureItem[];
}

const defaultFeatures: FeatureItem[] = [
  {
    id: 1,
    title: "World-class Multi-layer Filtration",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop&crop=center",
    description:
      "Advanced HEPA-13 filters combined with activated carbon removing up to 99.97% of harmful airborne particles including dust, pollen, smoke, and microscopic contaminants.",
  },
  {
    id: 2,
    title: "Real-time Air Quality Monitoring",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=400&fit=crop&crop=center",
    description:
      "Smart sensors continuously monitor air quality levels and automatically adjust purification settings. Get complete control with detailed insights into your indoor environment.",
  },
  {
    id: 3,
    title: "Elegant Design Philosophy",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=400&fit=crop&crop=center",
    description:
      "Designed to complement your interiors with elegant, minimal, and timeless aesthetics. Our purifiers seamlessly blend into any space while delivering powerful performance.",
  },
  {
    id: 4,
    title: "Long-lasting Performance",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=400&fit=crop&crop=center",
    description:
      "Built for durability with low maintenance needs. Our filters last longer and our units are designed to operate efficiently for years with minimal upkeep requirements.",
  },
  {
    id: 5,
    title: "Exceptional After-sales Support",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=400&fit=crop&crop=center",
    description:
      "Backed by comprehensive after-sales support including extended warranties, quick service response, and dedicated customer care to ensure your purifier performs optimally.",
  },
];

export function WhyChoose({ features = defaultFeatures }: WhyChooseProps) {
  const [activeTabId, setActiveTabId] = useState<number | null>(1);
  const [activeImage, setActiveImage] = useState(features[0].image);

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto">
        {/* Section Header - matching About section pattern */}
        <div className="text-center space-y-4 mb-12 px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-brand-grey-green leading-tight">
            Why Choose{" "}
            <span className="text-brand-pastel-green">Vaayura?</span>
          </h2>
          <div className="w-16 h-0.5 bg-brand-pastel-green mx-auto rounded-full"></div>
          <p className="text-lg md:text-xl text-brand-dark-grey font-body max-w-2xl mx-auto">
            Discover what makes Vaayura the trusted choice for clean air solutions across India.
          </p>
        </div>

        <div className="flex w-full items-start justify-between gap-12">
          <div className="relative m-auto hidden w-1/2 overflow-hidden rounded-xl bg-slate-50 md:block">
            <img
              src={activeImage}
              alt="Vaayura feature preview"
              className="aspect-[4/3] rounded-md object-cover pr-4"
            />
          </div>
          <div className="w-full md:w-1/2">
            <Accordion type="single" className="w-full" defaultValue="item-1">
              {features.map((feature) => (
                <AccordionItem key={feature.id} value={`item-${feature.id}`} className="border-brand-pastel-green/20">
                  <AccordionTrigger
                    onClick={() => {
                      setActiveImage(feature.image);
                      setActiveTabId(feature.id);
                    }}
                    className="cursor-pointer py-5 !no-underline transition hover:text-brand-grey-green"
                  >
                    <h6
                      className={`text-xl font-semibold font-heading ${feature.id === activeTabId ? "text-brand-grey-green" : "text-brand-dark-grey"}`}
                    >
                      {feature.title}
                    </h6>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mt-3 text-brand-dark-grey font-body">
                      {feature.description}
                    </p>
                    <div className="mt-4 md:hidden">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="h-full max-h-80 w-full rounded-md object-cover"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}