import { MoveRight } from "lucide-react";
import React from "react";

interface ProofItem {
  icon: string;
  title: string;
  tags: string;
  heading: string;
  subtitle: string;
  image: string;
  link?: string;
}

interface ProofTrustProps {
  featuredProof?: ProofItem;
  proofPoints?: ProofItem[];
}

const defaultFeaturedProof: ProofItem = {
  icon: "▢",
  title: "Grasp Enterprises",
  tags: "ENGINEERING EXCELLENCE / MANUFACTURING",
  heading: "30+ years of engineering expertise.",
  subtitle: "Backed by three decades of precision manufacturing and innovation in air purification technology.",
  image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&crop=center",
  link: "#",
};

const defaultProofPoints: ProofItem[] = [
  {
    icon: "○",
    title: "Lab Certified",
    tags: "PERFORMANCE",
    heading: "99.95% filtration efficiency.",
    subtitle: "Verified by independent testing.",
    image: "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=400&h=300&fit=crop&crop=center",
    link: "#",
  },
  {
    icon: "◇",
    title: "Best Value",
    tags: "AFFORDABILITY",
    heading: "20% more affordable.",
    subtitle: "Premium quality, accessible price.",
    image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=300&fit=crop&crop=center",
    link: "#",
  },
];

export function ProofTrust({
  featuredProof = defaultFeaturedProof,
  proofPoints = defaultProofPoints,
}: ProofTrustProps) {
  return (
    <section className="py-32 bg-slate-50">
      <div className="container mx-auto">
        {/* Section Header - matching About section pattern */}
        <div className="text-center space-y-4 mb-12 px-6">
          <h2 className="text-4xl lg:text-5xl font-sora font-bold text-[#36454F] leading-tight mb-6">
            Proof &{" "}
            <span className="text-brand-pastel-green">Trust</span>
          </h2>
          <div className="w-16 h-0.5 bg-brand-pastel-green mx-auto rounded-full"></div>
          <p className="text-lg md:text-xl text-brand-dark-grey font-montserrat max-w-2xl mx-auto">
            Backed by decades of expertise, proven performance, and unmatched value in air purification.
          </p>
        </div>

        <div className="border border-brand-pastel-green/20 rounded-2xl overflow-hidden">
          <div className="group grid gap-4 overflow-hidden px-6 transition-colors duration-500 ease-out hover:bg-brand-pastel-green/5 lg:grid-cols-2 xl:px-28">
            <div className="flex flex-col gap-6 py-6 md:py-8 lg:pb-8">
              <div className="flex items-center gap-2 text-lg font-sora text-brand-grey-green">
                <span className="text-xl font-light">{featuredProof.icon}</span>
                {featuredProof.title}
              </div>
              <div>
                <span className="text-xs text-brand-dark-grey/70 font-montserrat uppercase tracking-wider">
                  {featuredProof.tags}
                </span>
                <h3 className="mt-2 mb-3 text-lg font-semibold font-sora text-brand-grey-green text-balance sm:text-xl">
                  {featuredProof.heading}
                  <span className="block font-normal text-brand-dark-grey transition-colors duration-500 ease-out group-hover:text-brand-grey-green font-montserrat text-sm mt-1">
                    {featuredProof.subtitle}
                  </span>
                </h3>
              </div>
            </div>
            <div className="relative isolate py-6 md:py-8">
              <div className="relative isolate border border-brand-pastel-green/20 bg-white p-2 rounded-xl">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={featuredProof.image}
                    alt="Engineering expertise"
                    className="aspect-[16/9] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-brand-pastel-green/20">
            <div className="grid lg:grid-cols-2">
              {proofPoints.map((item, idx) => (
                <div
                  key={item.title}
                  className={`group flex flex-col gap-6 border-brand-pastel-green/20 bg-white px-6 py-6 transition-colors duration-500 ease-out hover:bg-brand-pastel-green/5 md:py-8 lg:pb-8 xl:gap-8 xl:px-28 ${
                    idx === 0
                      ? ""
                      : "border-t lg:border-t-0 lg:border-l"
                  }`}
                >
                  <div className="flex items-center gap-2 text-lg font-sora text-brand-grey-green">
                    <span className="text-xl font-light">{item.icon}</span>
                    {item.title}
                  </div>
                  <div>
                    <span className="text-xs text-brand-dark-grey/70 font-montserrat uppercase tracking-wider">
                      {item.tags}
                    </span>
                    <h3 className="mt-2 mb-3 text-lg font-semibold font-sora text-brand-grey-green text-balance sm:text-xl">
                      {item.heading}
                      <span className="block font-normal text-brand-dark-grey transition-colors duration-500 ease-out group-hover:text-brand-grey-green font-montserrat text-sm mt-1">
                        {item.subtitle}
                      </span>
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}