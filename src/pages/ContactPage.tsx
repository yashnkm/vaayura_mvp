import { Layout } from '@/components/layout/Layout'
import { ContactHero } from '@/components/contact/ContactHero'
import { ContactForm } from '@/components/contact/ContactForm'

export function ContactPage() {
  return (
    <Layout>
      <ContactHero />
      <ContactForm />
    </Layout>
  )
}