import { Shield, Zap, Leaf, Sparkles, Moon } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Shield className="h-8 w-8 stroke-1" />,
    title: "4-Layer True HEPA Filtration",
    description: "True HEPA 13, honeycomb activated carbon filter, anti-bacterial filter and pre-filter capturing 99.97% of ultra-fine particles for superior air purification.",
  },
  {
    icon: <Zap className="h-8 w-8 stroke-1" />,
    title: "Intelligent Auto Mode",
    description: "Smart sensors continuously scan your space to detect ultra fine-particles and intelligently choose the right speed automatically.",
  },
  {
    icon: <Leaf className="h-8 w-8 stroke-1" />,
    title: "Ambient Air Quality Display",
    description: "Real-time visual air quality indicator with ambient light functionality that displays current air quality at a glance.",
  },
  {
    icon: <Sparkles className="h-8 w-8 stroke-1" />,
    title: "Aromatherapy Function",
    description: "Built-in aromatherapy functionality to add your favourite essential oils and keep your room smelling fresh.",
  },
  {
    icon: <Moon className="h-8 w-8 stroke-1" />,
    title: "Silent Sleep Mode",
    description: "Ambient light turns off and operates in near silence (quieter than a silent library at 40 dB) for undisturbed rest.",
  },
];

export function ProductFeatures() {
  return (
    <section className="w-full py-20 lg:py-40 bg-slate-50">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          {/* Section Header */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="font-regular max-w-xl text-left text-3xl tracking-tighter md:text-5xl text-brand-grey-green">
                Engineered for <span className="text-brand-pastel-green">Excellence</span>
              </h2>
              <p className="max-w-xl text-left text-lg leading-relaxed tracking-tight text-brand-dark-grey lg:max-w-lg font-body">
                Every Vaayura air purifier combines cutting-edge filtration technology with intelligent automation.
              </p>
            </div>
          </div>

          {/* Features Grid - 1 large + 4 small */}
          <div className="flex flex-col gap-8 sm:grid sm:grid-cols-2 lg:grid lg:grid-cols-3 xl:grid-cols-4">
            {/* Large Feature Card - spans 2 cols and 2 rows */}
            <div className="flex aspect-square h-full w-full flex-col justify-between rounded-md bg-white p-6 lg:col-span-2 lg:row-span-2 border border-slate-100 shadow-sm">
              <div className="text-brand-grey-green">
                {features[0].icon}
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight text-brand-grey-green font-subheading">
                  {features[0].title}
                </h3>
                <p className="max-w-xs text-base text-brand-dark-grey/80 font-body leading-relaxed">
                  {features[0].description}
                </p>
              </div>
            </div>

            {/* Small Feature Cards */}
            {features.slice(1, 5).map((feature, index) => (
              <div key={index + 1} className="flex aspect-square h-full flex-col justify-between rounded-md bg-white p-6 border border-slate-100 shadow-sm">
                <div className="text-brand-grey-green">
                  {feature.icon}
                </div>
                <div className="flex flex-col">
                  <h3 className="text-xl tracking-tight text-brand-grey-green font-subheading">
                    {feature.title}
                  </h3>
                  <p className="max-w-xs text-base text-brand-dark-grey/80 font-body leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}