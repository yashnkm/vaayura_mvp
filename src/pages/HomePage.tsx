import { Hero } from '@/components/homepage/Hero'
import { FiltrationTechnology } from '@/components/homepage/FiltrationTechnology'
import { ProductHighlights } from '@/components/homepage/ProductHighlights'
import { Specifications } from '@/components/homepage/Specifications'
import { Stats } from '@/components/homepage/Stats'
import { FAQ } from '@/components/homepage/FAQ'
import { Footer } from '@/components/shared/Footer'

export function HomePage() {
  return (
    <>
      <Hero />
      <FiltrationTechnology />
      <ProductHighlights />
      <Specifications />
      <Stats />
      <FAQ />
      <Footer />
    </>
  )
}