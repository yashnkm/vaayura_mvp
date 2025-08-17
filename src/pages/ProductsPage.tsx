import { Layout } from '@/components/layout/Layout'
import { ProductHero } from '@/components/products/ProductHero'
import { ProductFeatures } from '@/components/products/ProductFeatures'
import { ProductCatalog } from '@/components/products/ProductCatalog'
import { ProductClients } from '@/components/products/ProductClients'
import { ProductContact } from '@/components/products/ProductContact'

export function ProductsPage() {
  return (
    <Layout>
      <ProductHero />
      <ProductCatalog />
      <ProductFeatures />
      <ProductClients />
      <ProductContact />
    </Layout>
  )
}