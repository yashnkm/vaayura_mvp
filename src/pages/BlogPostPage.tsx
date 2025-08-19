import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

// Blog data based on available documents
const blogPosts = [
  {
    id: 1,
    slug: 'hidden-dangers-indoor-air-pollution',
    title: 'Hidden Dangers of Indoor Air Pollution',
    excerpt: 'Uncover the invisible threats lurking in your home and learn how to protect your family from harmful indoor pollutants that affect your daily health.',
    content: `
      <p>Your home should be your sanctuary, but did you know that the air inside your house could be up to 5 times more polluted than outdoor air? Indoor air pollution is a silent threat that affects millions of people daily, yet most remain unaware of its presence and impact on their health.</p>
      
      <h2>The Invisible Enemy in Your Home</h2>
      <p>Indoor air pollution consists of various harmful particles and gases that accumulate in enclosed spaces. Unlike outdoor pollution, which is often visible, indoor pollutants are typically invisible, odorless, and tasteless, making them particularly dangerous as they go undetected for years.</p>
      
      <h2>Common Sources of Indoor Pollution</h2>
      <p><strong>Volatile Organic Compounds (VOCs):</strong> Released by furniture, carpets, paints, cleaning products, and building materials. These chemicals can cause headaches, dizziness, and long-term health issues.</p>
      
      <p><strong>Biological Contaminants:</strong> Dust mites, pet dander, mold spores, and bacteria thrive in humid environments and can trigger allergies and respiratory problems.</p>
      
      <p><strong>Combustion Byproducts:</strong> From gas stoves, fireplaces, candles, and tobacco smoke, producing carbon monoxide, nitrogen oxides, and particulate matter.</p>
      
      <h2>Health Impacts You Can't Ignore</h2>
      <p>Prolonged exposure to indoor air pollution can lead to:</p>
      <ul>
        <li>Respiratory issues including asthma and chronic cough</li>
        <li>Allergic reactions and skin irritation</li>
        <li>Fatigue and reduced cognitive function</li>
        <li>Headaches and sinus problems</li>
        <li>Long-term cardiovascular and lung diseases</li>
      </ul>
      
      <h2>Protecting Your Family</h2>
      <p>The good news is that indoor air pollution is preventable and treatable. Simple steps like improving ventilation, using natural cleaning products, maintaining optimal humidity levels, and investing in quality air purification systems can dramatically improve your indoor air quality.</p>
      
      <p>Don't let invisible pollutants compromise your family's health. Take action today to create the clean, healthy indoor environment your loved ones deserve.</p>
    `,
    category: 'Health',
    date: '2024-12-15',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop&crop=center',
    author: 'Dr. Vaayura Health Team'
  },
  {
    id: 2,
    slug: 'multi-layer-air-purifier-delhi',
    title: 'Multi-Layer Air Purifier Solutions in Delhi',
    excerpt: 'Discover how advanced multi-layer filtration technology tackles Delhi\'s unique air quality challenges with intelligent purification systems.',
    content: `
      <p>Delhi's air quality crisis demands more than conventional solutions. With PM2.5 levels often exceeding safe limits by 10x, residents need advanced multi-layer air purification technology that can handle the city's complex pollution profile.</p>
      
      <h2>Understanding Delhi's Air Quality Challenge</h2>
      <p>Delhi faces a unique combination of pollutants: vehicular emissions, industrial discharge, construction dust, crop burning residue, and seasonal allergens. This complex mix requires sophisticated filtration technology that can address multiple types of contaminants simultaneously.</p>
      
      <h2>The Multi-Layer Advantage</h2>
      <p>Multi-layer air purifiers use a systematic approach to clean air, with each layer targeting specific pollutant types:</p>
      
      <p><strong>Pre-Filter Layer:</strong> Captures large particles like dust, hair, and lint, extending the life of subsequent filters.</p>
      
      <p><strong>HEPA Filter:</strong> Removes 99.97% of particles as small as 0.3 microns, including PM2.5, pollen, and fine dust that plague Delhi's air.</p>
      
      <p><strong>Activated Carbon Layer:</strong> Absorbs odors, smoke, and harmful gases from vehicular emissions and industrial activities.</p>
      
      <p><strong>UV-C Sterilization:</strong> Eliminates bacteria, viruses, and other biological contaminants that thrive in Delhi's humid conditions.</p>
      
      <h2>Smart Technology for Delhi's Conditions</h2>
      <p>Modern multi-layer purifiers come equipped with:</p>
      <ul>
        <li>Real-time air quality monitoring with PM2.5 sensors</li>
        <li>Automatic speed adjustment based on pollution levels</li>
        <li>Filter replacement indicators</li>
        <li>App connectivity for remote monitoring</li>
        <li>Energy-efficient operation for 24/7 use</li>
      </ul>
      
      <h2>Choosing the Right System for Delhi</h2>
      <p>When selecting a multi-layer air purifier for Delhi conditions, consider:</p>
      <ul>
        <li>Coverage area matching your room size</li>
        <li>CADR (Clean Air Delivery Rate) appropriate for high pollution levels</li>
        <li>Filter availability and replacement costs</li>
        <li>Noise levels for continuous operation</li>
        <li>Energy efficiency ratings</li>
      </ul>
      
      <h2>The Future of Clean Air in Delhi</h2>
      <p>Multi-layer air purification technology represents a significant step forward in combating Delhi's air quality challenges. By investing in advanced filtration systems, residents can create clean, healthy indoor environments regardless of outdoor conditions.</p>
      
      <p>Don't let Delhi's air quality compromise your health. Explore multi-layer air purification solutions designed specifically for the challenges of urban India.</p>
    `,
    category: 'Technology',
    date: '2024-12-10',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=400&fit=crop&crop=center',
    author: 'Vaayura Engineering Team'
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
          <div className="max-w-4xl mx-auto">
            {/* Featured Product CTA */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-brand-grey-green/5 to-brand-pastel-green/10 p-12 border border-brand-pastel-green/20 mb-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-semibold font-heading text-brand-grey-green mb-4">
                    Experience Vaayura Technology
                  </h2>
                  <p className="text-brand-dark-grey font-body mb-6 leading-relaxed">
                    Put the insights from this article into practice. Our advanced air purification systems are designed to tackle the exact challenges discussed here, providing clean, healthy air for your home.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/products">
                      <Button variant="brand-primary" size="brand-default" className="w-full sm:w-auto">
                        View All Products
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop&crop=center"
                    alt="Vaayura Air Purifier"
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-grey-green/20 to-transparent rounded-xl"></div>
                </div>
              </div>
              <div className="pointer-events-none absolute -top-1 right-1 z-10 hidden h-full w-full bg-[linear-gradient(to_right,hsl(var(--brand-pastel-green))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--brand-pastel-green))_1px,transparent_1px)] bg-[size:80px_80px] opacity-15 [mask-image:linear-gradient(to_bottom_right,#000,transparent,transparent)] md:block"></div>
            </div>

            {/* Related Articles */}
            <div className="text-center bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold font-heading text-brand-grey-green mb-4">
                Continue Learning
              </h3>
              <p className="text-brand-dark-grey font-body mb-6">
                Explore more expert insights on air quality and healthy living.
              </p>
              <Link to="/blog">
                <Button variant="brand-ghost" size="brand-default">
                  Read More Articles
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}