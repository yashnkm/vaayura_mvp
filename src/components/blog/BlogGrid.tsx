import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'

// Mock blog data - this would come from a CMS or API in production
const blogPosts = [
  {
    id: 1,
    slug: 'benefits-of-clean-air',
    title: 'The Health Benefits of Clean Indoor Air',
    excerpt: 'Discover how clean indoor air can significantly improve your health, productivity, and overall well-being.',
    category: 'Health',
    date: '2024-01-15',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop&crop=center'
  },
  {
    id: 2,
    slug: 'choosing-right-air-purifier',
    title: 'How to Choose the Right Air Purifier for Your Home',
    excerpt: 'A comprehensive guide to selecting the perfect air purifier based on your room size, needs, and budget.',
    category: 'Guide',
    date: '2024-01-10',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=250&fit=crop&crop=center'
  },
  {
    id: 3,
    slug: 'air-quality-myths-debunked',
    title: 'Common Air Quality Myths Debunked',
    excerpt: 'Separating fact from fiction when it comes to indoor air quality and air purification technology.',
    category: 'Education',
    date: '2024-01-05',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop&crop=center'
  }
]

export function BlogGrid() {
  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-brand-dark-grey font-body">
                      {post.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-heading text-brand-grey-green leading-tight">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-brand-dark-grey font-body">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-brand-dark-grey font-body">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}