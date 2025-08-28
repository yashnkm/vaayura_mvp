import { Hero } from '@/components/homepage/Hero'
import { FiltrationTechnology } from '@/components/homepage/FiltrationTechnology'
import { ProductHighlights } from '@/components/homepage/ProductHighlights'
import { Specifications } from '@/components/homepage/Specifications'
import { Stats } from '@/components/homepage/Stats'
import { FAQ } from '@/components/homepage/FAQ'
import { Footer } from '@/components/shared/Footer'

export function Home2Page() {
  return (
    <>
      <Hero />
      {/* About Us Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl md:text-2xl text-brand-dark-grey font-montserrat leading-relaxed">
            Breathe clean, live healthy. Vaayura's advanced air purification technology ensures your home has the cleanest air possible.
          </p>
        </div>
      </section>
      <FiltrationTechnology />
      <ProductHighlights />
      <Specifications />
      <Stats />
      <FAQ />
      <Footer />
    </>
  )
}