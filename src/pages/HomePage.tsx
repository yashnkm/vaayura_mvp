import { Hero } from '@/components/sections/Hero'
// import { Problem } from '@/components/sections/Problem'
import { WhyChoose } from '@/components/sections/WhyChoose'
import { ProductHighlights } from '@/components/sections/ProductHighlights'
import { ProofTrust } from '@/components/sections/ProofTrust'
import { Footer } from '@/components/sections/Footer'

export function HomePage() {
  return (
    <>
      <Hero />
      {/* <Problem /> */}
      <WhyChoose />
      <ProductHighlights />
      <ProofTrust />
      <Footer />
    </>
  )
}