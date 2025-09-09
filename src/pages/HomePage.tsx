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
      {/* About Us Section - Zoom Resistant */}
      <section className="bg-white" style={{ padding: 'clamp(2rem, 6vh, 4rem) clamp(1rem, 4vw, 2rem)' }}>
        <div className="mx-auto text-center" style={{ maxWidth: 'clamp(20rem, 80vw, 60rem)' }}>
          <p className="text-brand-dark-grey font-subheading leading-relaxed" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', padding: 'clamp(0.5rem, 2vw, 2rem)' }}>
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
      
      {/* Subtle Divider */}
      <div className="h-px bg-gray-200/50"></div>
      
      <FAQ />
      {/* <ProductShowcaseSection /> */}
      <Footer />
    </>
  )
}