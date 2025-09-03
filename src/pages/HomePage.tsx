import { Header1 } from '@/components/ui/header'
import { Hero3DSection } from '@/components/homepage/Hero3DSection'
import { ProductsShowcase } from '@/components/homepage/ProductsShowcase'
import { ProductDetailFeatures } from '@/components/product-detail/ProductDetailFeatures'
import { AppControlSection } from '@/components/homepage/AppControlSection'
import { FAQ } from '@/components/homepage/FAQ'
import { ProductShowcaseSection } from '@/components/homepage/ProductShowcaseSection'
import { ProductClients } from '@/components/products/ProductClients'
import { Footer } from '@/components/shared/Footer'

export function HomePage() {
  return (
    <>
      <Header1 />
      <Hero3DSection />
      {/* About Us Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl md:text-2xl text-brand-dark-grey font-montserrat leading-relaxed">
            Breathe clean, live healthy. Vaayura's advanced air purification technology ensures your home has the cleanest air possible.
          </p>
        </div>
      </section>
      <ProductsShowcase />
      <ProductDetailFeatures product={{ 
        id: "vaayura-air-purifier",
        name: "Vaayura Air Purifier", 
        description: "Advanced air purification technology", 
        price: 0, 
        images: [], 
        features: [], 
        specifications: {}, 
        published: true, 
        slug: "vaayura-air-purifier", 
        created_at: "" 
      }} />
      <AppControlSection />
      <ProductClients />
      <FAQ />
      <ProductShowcaseSection />
      <Footer />
    </>
  )
}