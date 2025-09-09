import { Header1 } from '@/components/ui/header'
import { HeroVideoScroll } from '@/components/homepage/HeroVideoScroll'
import { ProductsShowcase } from '@/components/homepage/ProductsShowcase'
import { ProductDetailFeatures } from '@/components/product-detail/ProductDetailFeatures'
import { AppControlSection } from '@/components/homepage/AppControlSection'
import { FAQ } from '@/components/homepage/FAQ'
import { ProductShowcaseSection } from '@/components/homepage/ProductShowcaseSection'
import { ProductClients } from '@/components/products/ProductClients'
import { Footer } from '@/components/shared/Footer'
import filterationImage from '@/assets/sections/homepage/filtration/filterationimage.png'

export function HomePage() {
  return (
    <>
      <Header1 />
      <HeroVideoScroll />
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
      
      {/* Filteration Technology Section */}
      <section className="w-full py-16" style={{ backgroundColor: '#fafafa' }}>
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora text-brand-grey-green leading-tight">
            Filteration Technology
          </h2>
          <div className="w-16 h-1 bg-brand-pastel-green rounded-full mx-auto mt-4"></div>
        </div>
        
        <div className="flex justify-center items-center">
          <div className="w-[70vw] h-auto relative">
            <img
              src={filterationImage}
              alt="Filteration Technology - Advanced air purification system"
              className="w-full h-auto object-contain border-0"
              style={{
                border: 'none',
                outline: 'none',
                boxShadow: 'none'
              }}
              loading="lazy"
            />
            
            {/* Four Circular Overlay Cards */}
            {/* Pre-Filter Card */}
            <div className="absolute top-[20%] left-[15%] w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex flex-col items-center justify-center shadow-lg border border-gray-200">
              <div className="text-xs font-bold text-gray-800 text-center">Pre-Filter</div>
              <div className="text-xs text-gray-600 text-center mt-1">Large Dust</div>
            </div>
            
            {/* HEPA Filter Card */}
            <div className="absolute top-[30%] left-[40%] w-22 h-22 bg-white/90 backdrop-blur-sm rounded-full flex flex-col items-center justify-center shadow-lg border border-gray-200">
              <div className="text-xs font-bold text-gray-800 text-center">True HEPA</div>
              <div className="text-xs text-gray-600 text-center mt-1">99.97%</div>
            </div>
            
            {/* Carbon Filter Card */}
            <div className="absolute top-[40%] left-[60%] w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex flex-col items-center justify-center shadow-lg border border-gray-200">
              <div className="text-xs font-bold text-gray-800 text-center">Carbon</div>
              <div className="text-xs text-gray-600 text-center mt-1">Odors</div>
            </div>
            
            {/* Clean Air Output Card */}
            <div className="absolute top-[25%] right-[10%] w-20 h-20 bg-green-50/90 backdrop-blur-sm rounded-full flex flex-col items-center justify-center shadow-lg border border-green-200">
              <div className="text-xs font-bold text-green-800 text-center">Clean Air</div>
              <div className="text-xs text-green-600 text-center mt-1">Pure</div>
            </div>
            
          </div>
        </div>
      </section>
      
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