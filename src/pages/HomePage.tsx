import { Hero } from '@/components/homepage/Hero'
import { WhyChoose } from '@/components/homepage/WhyChoose'
import { ProductHighlights } from '@/components/homepage/ProductHighlights'
import { ProofTrust } from '@/components/homepage/ProofTrust'
import { Footer } from '@/components/shared/Footer'

export function HomePage() {
  return (
    <>
      <Hero />
      <WhyChoose />
      <ProductHighlights />
      <ProofTrust />
      <Footer />
    </>
  )
}