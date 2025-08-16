import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Building2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TabContent {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
}

interface Tab {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: TabContent;
}

interface ProductHighlightsProps {
  badge?: string;
  heading?: string;
  description?: string;
  tabs?: Tab[];
}

const ProductHighlights = ({
  badge = "Vaayura Products",
  heading = "Product Highlights",
  description = "Discover our flagship air purifiers designed to meet every need, from personal spaces to large environments.",
  tabs = [
    {
      value: "mini",
      icon: <Home className="h-auto w-4 shrink-0" />,
      label: "Vaayura Mini",
      content: {
        badge: "Compact Power",
        title: "Compact power for personal spaces.",
        description:
          "Perfect for bedrooms, offices, and small spaces. Advanced HEPA filtration in a sleek, portable design that delivers powerful air purification.",
        buttonText: "Learn More",
        imageSrc:
          "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=400&fit=crop&crop=center",
        imageAlt: "Vaayura Mini Air Purifier",
      },
    },
    {
      value: "zen",
      icon: <Building2 className="h-auto w-4 shrink-0" />,
      label: "Vaayura Zen",
      content: {
        badge: "Smart Technology",
        title: "Smart, app-connected purification for larger spaces.",
        description:
          "AI-powered air purification with real-time monitoring and smartphone control for living rooms and large spaces. Advanced features for ultimate convenience.",
        buttonText: "Explore Features",
        imageSrc:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop&crop=center",
        imageAlt: "Vaayura Zen Air Purifier",
      },
    },
  ],
}: ProductHighlightsProps) => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-6 px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-brand-grey-green leading-tight">
            Vaayura{" "}
            <span className="text-brand-pastel-green">Products</span>
          </h2>
          <div className="w-16 h-0.5 bg-brand-pastel-green mx-auto rounded-full"></div>
          <p className="text-lg md:text-xl text-brand-dark-grey font-body max-w-2xl mx-auto">
            Discover our flagship air purifiers designed to meet every need, from personal spaces to large environments.
          </p>
        </div>
        <Tabs defaultValue={tabs[0].value} className="mt-6">
          <TabsList className="container flex flex-col items-center justify-center gap-3 sm:flex-row md:gap-6 bg-transparent">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-brand-dark-grey data-[state=active]:bg-brand-pastel-green/10 data-[state=active]:text-brand-grey-green data-[state=active]:border-brand-pastel-green border border-transparent hover:bg-brand-pastel-green/5"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mx-auto mt-6 max-w-screen-xl rounded-2xl bg-white/50 p-6 lg:p-12">
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="grid place-items-center gap-12 lg:grid-cols-2 lg:gap-8"
              >
                <div className="flex flex-col gap-4">
                  <Badge variant="outline" className="w-fit bg-white border-brand-pastel-green text-brand-grey-green">
                    {tab.content.badge}
                  </Badge>
                  <h3 className="text-3xl font-semibold lg:text-5xl text-brand-grey-green font-display">
                    {tab.content.title}
                  </h3>
                  <p className="text-brand-dark-grey lg:text-lg font-body">
                    {tab.content.description}
                  </p>
                  <Button className="mt-1 w-fit gap-2 bg-brand-grey-green hover:bg-brand-grey-green/90 text-white" size="lg">
                    {tab.content.buttonText}
                  </Button>
                </div>
                <img
                  src={tab.content.imageSrc}
                  alt={tab.content.imageAlt}
                  className="rounded-xl shadow-lg"
                />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export { ProductHighlights };