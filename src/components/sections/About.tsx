import { FeatureSteps } from "@/components/feature-section"

export function About() {
  const features = [
    {
      step: "Advanced Filtration",
      title: "Multi-Layer Protection",
      content: "HEPA-13 filters combined with activated carbon remove 99.97% of pollutants, allergens, and odors.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop&crop=center"
    },
    {
      step: "Smart Technology",
      title: "Intelligent Air Monitoring",
      content: "Real-time air quality sensors automatically adjust purification levels for optimal performance.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=400&fit=crop&crop=center"
    },
    {
      step: "Elegant Design",
      title: "Beautiful Integration",
      content: "Sleek, modern aesthetics that complement any space while delivering powerful air purification.",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=400&fit=crop&crop=center"
    }
  ]

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto">
        {/* Compact Section Header */}
        <div className="text-center space-y-4 mb-6 px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-brand-grey-green leading-tight">
            Breathing{" "}
            <span className="text-brand-pastel-green">Redefined</span>
          </h2>
          <div className="w-16 h-0.5 bg-brand-pastel-green mx-auto rounded-full"></div>
          <p className="text-lg md:text-xl text-brand-dark-grey font-body max-w-2xl mx-auto">
            Backed by 30+ years of engineering excellence from Grasp Enterprises, Vaayura blends innovation, craftsmanship, and care into every device we create.
          </p>
        </div>

        {/* Feature Steps Component */}
        <FeatureSteps 
          features={features}
          title=""
          autoPlayInterval={4000}
          className="px-0"
        />
      </div>
    </section>
  )
}