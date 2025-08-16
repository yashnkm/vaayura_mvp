import { Button } from "@/components/ui/button";

interface AboutVaayuraProps {
  title?: string;
  description?: string;
  mainImage?: {
    src: string;
    alt: string;
  };
  secondaryImage?: {
    src: string;
    alt: string;
  };
  breakout?: {
    src: string;
    alt: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: Array<{
    label: string;
    value: string;
  }>;
}

const defaultAchievements = [
  { label: "Years of Engineering Excellence", value: "29+" },
  { label: "Air Quality Improved", value: "99.95%" },
  { label: "Customer Satisfaction", value: "100%" },
  { label: "Cities Served", value: "50+" },
];

export const AboutVaayura = ({
  title = "About Vaayura",
  description = "Our Story Begins with a Breath. In 2025, we asked a simple question: Why is clean air still considered a privilege? Returning from abroad, our founders saw loved ones breathing 'Hazardous' air daily—without even realizing it. It wasn't just a statistic, it was personal. That moment became our mission.",
  mainImage = {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center",
    alt: "Air purification technology",
  },
  secondaryImage = {
    src: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=600&fit=crop&crop=center",
    alt: "Modern air purifier",
  },
  breakout = {
    src: "/logo_2.png",
    alt: "Vaayura logo",
    title: "Built on Engineering Excellence",
    description: "Vaayura is built on the foundation of Grasp Enterprises, an engineering leader since 1996. With decades of experience in air conditioning, renewable energy, and automation.",
    buttonText: "Learn More",
    buttonUrl: "#",
  },
  achievementsTitle = "Our Promise in Numbers",
  achievementsDescription = "We promise cutting-edge air purification technology, built to last and backed by robust service. Our purifiers combine multi-layer filtration with intelligent sensors, delivering exceptional performance while operating quietly in the background.",
  achievements = defaultAchievements,
}: AboutVaayuraProps = {}) => {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto">
        <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
          <h1 className="text-5xl font-semibold font-display text-brand-grey-green">{title}</h1>
          <p className="text-brand-dark-grey font-body">{description}</p>
        </div>
        <div className="grid gap-7 lg:grid-cols-3">
          <img
            src={mainImage.src}
            alt={mainImage.alt}
            className="size-full max-h-[620px] rounded-xl object-cover lg:col-span-2"
          />
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            <div className="flex flex-col justify-between gap-6 rounded-xl bg-slate-50 p-7 md:w-1/2 lg:w-auto">
              <img
                src={breakout.src}
                alt={breakout.alt}
                className="mr-auto h-12"
              />
              <div>
                <p className="mb-2 text-lg font-semibold font-heading text-brand-grey-green">{breakout.title}</p>
                <p className="text-brand-dark-grey font-body">{breakout.description}</p>
              </div>
              <Button variant="brand-outline" className="mr-auto" asChild>
                <a href={breakout.buttonUrl}>
                  {breakout.buttonText}
                </a>
              </Button>
            </div>
            <img
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              className="grow basis-0 rounded-xl object-cover md:w-1/2 lg:min-h-0 lg:w-auto"
            />
          </div>
        </div>
        
        {/* Our Philosophy Section */}
        <div className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold font-heading text-brand-grey-green mb-6">Our Philosophy</h2>
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="flex items-start gap-4 text-left">
                <span className="text-brand-pastel-green text-xl">•</span>
                <p className="text-brand-dark-grey font-body">Clean air should be a right, not a luxury.</p>
              </div>
              <div className="flex items-start gap-4 text-left">
                <span className="text-brand-pastel-green text-xl">•</span>
                <p className="text-brand-dark-grey font-body">Performance and beauty can coexist.</p>
              </div>
              <div className="flex items-start gap-4 text-left">
                <span className="text-brand-pastel-green text-xl">•</span>
                <p className="text-brand-dark-grey font-body">Technology should work silently in the background, while you live fully in the foreground.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl bg-slate-50 p-10 md:p-16">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-4xl font-semibold font-heading text-brand-grey-green">{achievementsTitle}</h2>
            <p className="max-w-screen-sm text-brand-dark-grey font-body">
              {achievementsDescription}
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-between gap-10 text-center">
            {achievements.map((item, idx) => (
              <div className="flex flex-col gap-4" key={item.label + idx}>
                <p className="text-brand-dark-grey font-body">{item.label}</p>
                <span className="text-4xl font-semibold md:text-5xl font-display text-brand-grey-green">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute -top-1 right-1 z-10 hidden h-full w-full bg-[linear-gradient(to_right,hsl(var(--brand-pastel-green))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--brand-pastel-green))_1px,transparent_1px)] bg-[size:80px_80px] opacity-15 [mask-image:linear-gradient(to_bottom_right,#000,transparent,transparent)] md:block"></div>
        </div>
      </div>
    </section>
  );
};