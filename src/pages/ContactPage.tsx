import { Layout } from '@/components/layout/Layout'
import { ContactSupport } from '@/components/contact/ContactSupport'
import { ContactForm } from '@/components/contact/ContactForm'

export function ContactPage() {
  return (
    <Layout>
      <ContactSupport />
      <ContactForm />
    </Layout>
  )
}