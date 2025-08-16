import { Layout } from '@/components/layout/Layout'
import { BlogHero } from '@/components/blog/BlogHero'
import { BlogGrid } from '@/components/blog/BlogGrid'

export function BlogPage() {
  return (
    <Layout>
      <BlogHero />
      <BlogGrid />
    </Layout>
  )
}