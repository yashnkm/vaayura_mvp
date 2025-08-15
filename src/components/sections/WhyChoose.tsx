import { Card } from "@/components/ui/card"

export function WhyChoose() {
  return (
    <section className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto text-center space-y-16">
        
        {/* Section Header - following established pattern */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-brand-grey-green leading-tight">
            Trusted by Thousands,{" "}
            <span className="text-brand-pastel-green">Engineered for Excellence</span>
          </h2>
          <div className="w-24 h-1 bg-brand-pastel-green mx-auto rounded-full"></div>
          <p className="text-xl md:text-2xl text-brand-dark-grey font-body max-w-4xl mx-auto leading-relaxed">
            Our commitment to innovation and quality has earned the trust of customers nationwide. 
            Sleek design, our products are built to impress and deliver results.
          </p>
        </div>

        {/* Trust Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          
          <Card variant="brand-elevated" className="p-6 bg-white">
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 bg-brand-pastel-green/10 rounded-full flex items-center justify-center mx-auto">
                <div className="text-3xl">🏆</div>
              </div>
              <h3 className="text-2xl md:text-3xl font-heading text-brand-grey-green font-bold">
                50K+ Units
              </h3>
              <p className="text-brand-dark-grey font-body">
                Our purifiers have reached over 50,000 satisfied customers across India
              </p>
            </div>
          </Card>

          <Card variant="brand-elevated" className="p-6 bg-brand-pastel-green">
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center mx-auto">
                <div className="text-3xl">⭐</div>
              </div>
              <h3 className="text-2xl md:text-3xl font-heading text-white font-bold">
                4.8/5 Rating
              </h3>
              <p className="text-white font-body">
                Thousands of reviews praise our superior air purification quality
              </p>
            </div>
          </Card>

          <Card variant="brand-elevated" className="p-6 bg-white">
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 bg-brand-pastel-green/10 rounded-full flex items-center justify-center mx-auto">
                <div className="text-3xl">🌍</div>
              </div>
              <h3 className="text-2xl md:text-3xl font-heading text-brand-grey-green font-bold">
                Pan-India
              </h3>
              <p className="text-brand-dark-grey font-body">
                Our products are trusted and delivered across all major Indian cities
              </p>
            </div>
          </Card>

        </div>

      </div>
    </section>
  )
}