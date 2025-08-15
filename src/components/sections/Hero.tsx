import { Button } from "@/components/ui/legacy-button"
import { Header1 } from "@/components/ui/header"
import heroProductImage from "@/assets/HERO V2.PNG"

export function Hero() {
  return (
    <>
      {/* New Navigation */}
      <Header1 />
      
      <section className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 py-20 pt-40">
        <div className="max-w-4xl mx-auto text-center space-y-8">

        {/* Hero Content */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display text-brand-grey-green leading-tight">
            Life Begins with{" "}
            <span className="text-brand-pastel-green">Clean Air</span>
          </h1>
          
          <p className="text-lg md:text-xl text-brand-dark-grey font-body max-w-2xl mx-auto leading-relaxed">
            Clean air is no longer a luxury—it's a daily necessity. Vaayura delivers world-class air purification with intelligent design.
          </p>

          {/* CTA */}
          <div className="flex justify-center items-center pt-8">
            <Button variant="brand-primary" size="brand-default">
              Explore Products
            </Button>
          </div>
        </div>

        {/* Product Hero Image */}
        <div className="pt-16 pb-8">
          <div className="relative mx-auto max-w-md md:max-w-lg">
            <img 
              src={heroProductImage} 
              alt="Vaayura Air Purifier" 
              className="w-full h-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        </div>
      </section>
    </>
  )
}