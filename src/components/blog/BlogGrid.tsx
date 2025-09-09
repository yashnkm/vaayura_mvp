import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'
import blog1Img from '@/assets/sections/blog/blog1.png'
import blog2Img from '@/assets/sections/blog/blog2.png'

// Blog data based on available documents
const blogPosts = [
  {
    id: 1,
    slug: 'hidden-dangers-indoor-air-pollution',
    title: 'Hidden Dangers of Indoor Air Pollution',
    excerpt: 'Uncover the invisible threats lurking in your home and learn how to protect your family from harmful indoor pollutants that affect your daily health.',
    category: 'Health',
    date: '2024-12-15',
    readTime: '7 min read',
    image: blog1Img,
    featured: true
  },
  {
    id: 2,
    slug: 'multi-layer-air-purifier-delhi',
    title: 'Multi-Layer Air Purifier Solutions in Delhi',
    excerpt: 'Discover how advanced multi-layer filtration technology tackles Delhi\'s unique air quality challenges with intelligent purification systems.',
    category: 'Technology',
    date: '2024-12-10',
    readTime: '9 min read',
    image: blog2Img,
    featured: true
  }
]

export function BlogGrid() {
  return (
    <section className="pb-32 bg-white">
      <div className="container mx-auto">
        {/* Featured Articles Grid - Inspired by About section layout */}
        <div className="grid gap-7 lg:grid-cols-2">
          {blogPosts.map((post, index) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group">
              <div className="relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge 
                      variant={post.category === 'Health' ? 'default' : 'secondary'} 
                      className="text-sm font-medium bg-brand-pastel-green/20 text-brand-grey-green hover:bg-brand-pastel-green/30"
                    >
                      {post.category}
                    </Badge>
                    <span className="text-sm text-brand-dark-grey/70 font-subheading">
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-sora font-bold text-brand-grey-green mb-4 leading-tight group-hover:text-brand-pastel-green transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-brand-dark-grey font-subheading mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-brand-dark-grey/70 font-subheading">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <span className="text-brand-pastel-green font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
                      Read Article →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-20 text-center">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-brand-grey-green/5 to-brand-pastel-green/10 p-16 border border-brand-pastel-green/20">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-[#36454F] mb-4">
              More Insights Coming Soon
            </h3>
            <p className="text-brand-dark-grey font-subheading max-w-2xl mx-auto mb-8 leading-relaxed">
              We're constantly researching and sharing the latest insights on air quality, health, and clean living. 
              Subscribe to our newsletter to stay updated with our latest articles and expert tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="px-6 py-3 rounded-full border border-brand-grey-green/20 focus:outline-none focus:ring-2 focus:ring-brand-pastel-green text-brand-dark-grey font-subheading min-w-[300px]"
              />
              <button className="bg-brand-grey-green text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-grey-green/90 transition-colors duration-300">
                Subscribe
              </button>
            </div>
            <div className="pointer-events-none absolute -top-1 right-1 z-10 hidden h-full w-full bg-[linear-gradient(to_right,hsl(var(--brand-pastel-green))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--brand-pastel-green))_1px,transparent_1px)] bg-[size:80px_80px] opacity-15 [mask-image:linear-gradient(to_bottom_right,#000,transparent,transparent)] md:block"></div>
          </div>
        </div>
      </div>
    </section>
  )
}