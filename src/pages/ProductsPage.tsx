import { Layout } from '@/components/layout/Layout'
import { ProductHero } from '@/components/products/ProductHero'
import { ProductCatalog } from '@/components/products/ProductCatalog'
import { ProductContact } from '@/components/products/ProductContact'
import { FAQ } from '@/components/homepage/FAQ'

export function ProductsPage() {
  return (
    <Layout>
      <ProductHero />
      <ProductCatalog />
      <FAQ />
      <ProductContact />
    </Layout>
  )
}