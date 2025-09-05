import { Layout } from '@/components/layout/Layout'
import { ContactSupport } from '@/components/contact/ContactSupport'
import { ContactForm } from '@/components/contact/ContactForm'
import { ProductContact } from '@/components/products/ProductContact'

export function ContactPage() {
  return (
    <Layout>
      <ContactSupport />
      <ProductContact />
      <ContactForm />
    </Layout>
  )
}