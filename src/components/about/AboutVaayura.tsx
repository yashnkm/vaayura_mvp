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
    <>
      {/* Full-Screen Hero Section */}
      <section className="min-h-screen bg-white flex items-center py-20 px-6">
        <div className="container mx-auto">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center min-h-[80vh]">
            
            {/* Left Column: Text Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-brand-grey-green leading-tight">
                  About <span className="text-brand-pastel-green">Us</span>
                </h1>
                <div className="w-16 h-0.5 bg-brand-pastel-green rounded-full"></div>
                
                <h2 className="text-2xl md:text-3xl font-semibold font-heading text-brand-grey-green">
                  Our Story Begins with a Breath.
                </h2>
                
                <div className="space-y-4 text-lg text-brand-dark-grey font-body leading-relaxed">
                  <p>
                    In 2025, we asked a simple question: Why is clean air still considered a privilege?
                  </p>
                  <p>
                    Returning from abroad, our founders saw loved ones breathing "Hazardous" air daily—without even realizing it. 
                    It wasn't just a statistic, it was personal. That moment became our mission.
                  </p>
                </div>
              </div>

              {/* Our Roots Section with Visual Element */}
              <div className="relative space-y-6">
                <div className="relative flex gap-4">
                  <div className="relative">
                    <div className="flex w-12 h-12 items-center justify-center overflow-hidden rounded-full border-2 border-brand-pastel-green/30 bg-brand-pastel-green/10">
                      <div className="w-6 h-6 bg-brand-grey-green rounded"></div>
                    </div>
                    <div className="absolute left-1/2 top-12 h-16 w-px -translate-x-1/2 bg-brand-pastel-green/30"></div>
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-semibold font-heading text-brand-grey-green mb-3">Our Roots</h3>
                    <p className="text-base text-brand-dark-grey font-body leading-relaxed">
                      Vaayura is built on the foundation of Grasp Enterprises, an engineering leader since 1996. 
                      With decades of experience in air conditioning, renewable energy, and automation, 
                      we know how to build systems that work beautifully and last.
                    </p>
                  </div>
                </div>

                <div className="relative flex gap-4">
                  <div className="relative">
                    <div className="flex w-12 h-12 items-center justify-center overflow-hidden rounded-full border-2 border-brand-pastel-green/30 bg-brand-pastel-green/10">
                      <div className="w-6 h-6 bg-brand-pastel-green rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-semibold font-heading text-brand-grey-green mb-3">Our Mission</h3>
                    <p className="text-base text-brand-dark-grey font-body leading-relaxed">
                      To make clean air accessible to every Indian home, transforming the way families breathe, live, and thrive in their indoor spaces.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Image */}
            <div className="relative">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop&crop=center"
                  alt="Clean air technology and healthy living"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-grey-green/20 to-transparent"></div>
                
                {/* Floating Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-brand-pastel-green/20">
                  <h4 className="text-lg font-semibold font-heading text-brand-grey-green mb-2">
                    Clean Air, Healthy Lives
                  </h4>
                  <p className="text-sm text-brand-dark-grey font-body leading-relaxed">
                    Our advanced air purification technology ensures every breath you take at home is clean, safe, and refreshing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Our Philosophy Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-semibold font-display text-brand-grey-green mb-6">Our Philosophy</h2>
            <div className="w-16 h-0.5 bg-brand-pastel-green mx-auto rounded-full mb-8"></div>
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-start gap-4 text-left">
                <span className="text-brand-pastel-green text-xl">•</span>
                <p className="text-lg text-brand-dark-grey font-body">Clean air should be a right, not a luxury.</p>
              </div>
              <div className="flex items-start gap-4 text-left">
                <span className="text-brand-pastel-green text-xl">•</span>
                <p className="text-lg text-brand-dark-grey font-body">Performance and beauty can coexist.</p>
              </div>
              <div className="flex items-start gap-4 text-left">
                <span className="text-brand-pastel-green text-xl">•</span>
                <p className="text-lg text-brand-dark-grey font-body">Technology should work silently in the background, while you live fully in the foreground.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden rounded-xl bg-white p-10 md:p-16 shadow-lg">
            <div className="flex flex-col gap-4 text-center md:text-left mb-10">
              <h2 className="text-4xl md:text-5xl font-semibold font-display text-brand-grey-green">{achievementsTitle}</h2>
              <div className="w-16 h-0.5 bg-brand-pastel-green rounded-full md:mx-0 mx-auto"></div>
              <p className="max-w-screen-sm text-lg text-brand-dark-grey font-body">
                {achievementsDescription}
              </p>
            </div>
            <div className="flex flex-wrap justify-between gap-10 text-center">
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

    </>
  );
};