import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

// Mock blog data - this would come from a CMS or API in production
const blogPosts = [
  {
    id: 1,
    slug: 'benefits-of-clean-air',
    title: 'The Health Benefits of Clean Indoor Air',
    excerpt: 'Discover how clean indoor air can significantly improve your health, productivity, and overall well-being.',
    content: `
      <p>Clean indoor air is not just a luxury—it's essential for optimal health and well-being. In this comprehensive guide, we'll explore the numerous benefits of maintaining high air quality in your home or office.</p>
      
      <h2>Respiratory Health Improvements</h2>
      <p>One of the most immediate benefits of clean air is improved respiratory function. When you breathe cleaner air, your lungs don't have to work as hard to filter out pollutants, allergens, and other harmful particles.</p>
      
      <h2>Enhanced Sleep Quality</h2>
      <p>Clean air can significantly improve your sleep quality. Pollutants and allergens in the air can cause congestion and breathing difficulties that disrupt sleep patterns.</p>
      
      <h2>Increased Productivity</h2>
      <p>Studies have shown that clean air can improve cognitive function and productivity. When your brain receives cleaner oxygen, it functions more efficiently.</p>
    `,
    category: 'Health',
    date: '2024-01-15',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop&crop=center',
    author: 'Dr. Sarah Johnson'
  },
  {
    id: 2,
    slug: 'choosing-right-air-purifier',
    title: 'How to Choose the Right Air Purifier for Your Home',
    excerpt: 'A comprehensive guide to selecting the perfect air purifier based on your room size, needs, and budget.',
    content: `
      <p>Choosing the right air purifier can seem overwhelming with so many options available. This guide will help you make an informed decision based on your specific needs.</p>
      
      <h2>Consider Your Room Size</h2>
      <p>The first step in choosing an air purifier is to consider the size of the room where you'll be using it. Air purifiers are rated for specific room sizes.</p>
      
      <h2>Understand Filter Types</h2>
      <p>Different filter types serve different purposes. HEPA filters are excellent for particles, while activated carbon filters are better for odors and gases.</p>
    `,
    category: 'Guide',
    date: '2024-01-10',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=400&fit=crop&crop=center',
    author: 'Mike Chen'
  }
]

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<typeof blogPosts[0] | null>(null)

  useEffect(() => {
    // In a real app, this would be an API call
    const foundPost = blogPosts.find(p => p.slug === slug)
    setPost(foundPost || null)
  }, [slug])

  if (!post) {
    return (
      <Layout>
        <div className="bg-slate-50 pt-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-heading text-brand-grey-green mb-4">Post Not Found</h1>
            <Link to="/blog">
              <Button variant="brand-primary" size="brand-default">
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="bg-slate-50">
        {/* Hero Section */}
        <section className="pt-32 pb-12 px-6">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-brand-pastel-green hover:text-brand-grey-green transition-colors mb-8">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Blog
            </Link>
            
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary">{post.category}</Badge>
                <span className="text-sm text-brand-dark-grey font-body">{post.readTime}</span>
                <span className="text-sm text-brand-dark-grey font-body">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-brand-grey-green leading-tight mb-4">
                {post.title}
              </h1>
              
              <p className="text-lg text-brand-dark-grey font-body mb-6">
                {post.excerpt}
              </p>
              
              <p className="text-sm text-brand-dark-grey font-body">
                By {post.author}
              </p>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="px-6 mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video overflow-hidden rounded-lg">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="px-6 pb-20">
          <div className="max-w-3xl mx-auto">
            <article className="prose prose-lg max-w-none">
              <div 
                className="text-brand-dark-grey font-body leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-6 pb-20">
          <div className="max-w-3xl mx-auto text-center bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-heading text-brand-grey-green mb-4">
              Ready to Improve Your Air Quality?
            </h2>
            <p className="text-brand-dark-grey font-body mb-6">
              Explore our range of premium air purifiers designed for your specific needs.
            </p>
            <Link to="/products">
              <Button variant="brand-primary" size="brand-default">
                View Products
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  )
}