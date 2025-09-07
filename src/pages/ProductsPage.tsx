import { Layout } from '@/components/layout/Layout'
import { ProductHero } from '@/components/products/ProductHero'
import { ProductCatalog } from '@/components/products/ProductCatalog'

export function ProductsPage() {
  return (
    <Layout>
      <ProductHero />
      <ProductCatalog />
    </Layout>
  )
}