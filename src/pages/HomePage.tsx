import { Header1 } from '@/components/ui/header'
import { Hero2 } from '@/components/homepage/Hero2'
import { FiltrationTechnology } from '@/components/homepage/FiltrationTechnology'
import { ProductHighlights } from '@/components/homepage/ProductHighlights'
import { Specifications } from '@/components/homepage/Specifications'
import { Stats } from '@/components/homepage/Stats'
import { FAQ } from '@/components/homepage/FAQ'
import { Footer } from '@/components/shared/Footer'

export function HomePage() {
  return (
    <>
      <Header1 />
      <Hero2 />
      <FiltrationTechnology />
      <ProductHighlights />
      <Specifications />
      <Stats />
      <FAQ />
      <Footer />
    </>
  )
}