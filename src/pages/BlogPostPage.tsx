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
      <div class="blog-content">
        <div class="intro-section">
          <p>Your home should be your sanctuary, but did you know that the air inside your house could be <strong>up to 5 times more polluted</strong> than outdoor air? Indoor air pollution is a silent threat that affects millions of people daily, yet most remain unaware of its presence and impact on their health.</p>
        </div>
        
        <hr class="section-divider" />
        
        <section class="content-section">
          <h2>The Invisible Enemy in Your Home</h2>
          <p>Indoor air pollution consists of various harmful particles and gases that accumulate in enclosed spaces. Unlike outdoor pollution, which is often visible, indoor pollutants are typically invisible, odorless, and tasteless, making them particularly dangerous as they go undetected for years.</p>
          
          <div class="highlight-callout">
            <p><strong>Key Fact:</strong> The EPA ranks indoor air pollution among the top 5 environmental health risks, yet most people spend 90% of their time indoors.</p>
          </div>
        </section>
        
        <hr class="section-divider" />
        
        <section class="content-section">
          <h2>Common Sources of Indoor Pollution</h2>
          
          <div class="source-grid">
            <div class="source-card">
              <h3>Volatile Organic Compounds (VOCs)</h3>
              <p><strong>Sources:</strong> Furniture, carpets, paints, cleaning products, and building materials</p>
              <p><strong>Health Effects:</strong> Headaches, dizziness, and long-term organ damage</p>
            </div>
            
            <div class="source-card">
              <h3>Biological Contaminants</h3>
              <p><strong>Sources:</strong> Dust mites, pet dander, mold spores, and bacteria</p>
              <p><strong>Health Effects:</strong> Allergies and respiratory problems, especially in humid environments</p>
            </div>
            
            <div class="source-card">
              <h3>Combustion Byproducts</h3>
              <p><strong>Sources:</strong> Gas stoves, fireplaces, candles, and tobacco smoke</p>
              <p><strong>Health Effects:</strong> Carbon monoxide poisoning, nitrogen oxide exposure, and particulate matter accumulation</p>
            </div>
          </div>
        </section>
        
        <hr class="section-divider" />
        
        <section class="content-section">
          <h2>Health Impacts You Can't Ignore</h2>
          <p>Prolonged exposure to indoor air pollution can lead to serious health consequences across multiple body systems:</p>
          
          <div class="impact-categories">
            <div class="category-block">
              <h4>Respiratory System</h4>
              <ul>
                <li>Asthma and chronic cough</li>
                <li>Reduced lung function</li>
                <li>Bronchitis and pneumonia risk</li>
                <li>Increased susceptibility to respiratory infections</li>
              </ul>
            </div>
            
            <div class="category-block">
              <h4>Neurological Effects</h4>
              <ul>
                <li>Chronic fatigue and reduced cognitive function</li>
                <li>Persistent headaches and sinus problems</li>
                <li>Memory and concentration difficulties</li>
                <li>Mood changes and irritability</li>
              </ul>
            </div>
            
            <div class="category-block">
              <h4>Long-term Health Risks</h4>
              <ul>
                <li>Cardiovascular disease development</li>
                <li>Chronic allergic reactions and skin conditions</li>
                <li>Increased cancer risk from prolonged chemical exposure</li>
                <li>Compromised immune system function</li>
              </ul>
            </div>
          </div>
        </section>
        
        <hr class="section-divider" />
        
        <section class="content-section">
          <h2>Protecting Your Family: Actionable Solutions</h2>
          
          <div class="solution-list">
            <div class="solution-item">
              <h4>1. Improve Ventilation</h4>
              <p>Open windows regularly, install exhaust fans in kitchens and bathrooms, and ensure proper air circulation throughout your home. Consider upgrading to energy-efficient ventilation systems that filter incoming air.</p>
            </div>
            
            <div class="solution-item">
              <h4>2. Choose Natural and Low-VOC Products</h4>
              <p>Switch to natural cleaning products, low-VOC paints, and furniture made from sustainable materials. Read labels carefully and avoid products with strong chemical odors.</p>
            </div>
            
            <div class="solution-item">
              <h4>3. Control Indoor Humidity</h4>
              <p>Maintain humidity levels between 30-50% using dehumidifiers or humidifiers as needed. This prevents mold growth and reduces dust mite populations that thrive in humid conditions.</p>
            </div>
            
            <div class="solution-item">
              <h4>4. Invest in Quality Air Purification</h4>
              <p>HEPA air purifiers can remove 99.97% of airborne particles as small as 0.3 microns. Choose systems with activated carbon filters for comprehensive protection against both particles and gases.</p>
            </div>
          </div>
          
          <div class="conclusion-block">
            <h3>Take Action Today</h3>
            <p>Don't let invisible pollutants compromise your family's health. Start implementing these changes immediately and consider investing in advanced air purification technology to create the clean, healthy indoor environment your loved ones deserve.</p>
          </div>
        </section>
      </div>
      
      <style>
        .blog-content { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; line-height: 1.7; color: #374151; }
        .intro-section { font-size: 1.125rem; margin-bottom: 2.5rem; color: #4B5563; }
        .content-section { margin: 2.5rem 0; }
        .content-section h2 { font-size: 1.875rem; font-weight: 700; color: #111827; margin-bottom: 1.5rem; line-height: 1.3; }
        .content-section h3 { font-size: 1.25rem; font-weight: 600; color: #1F2937; margin-bottom: 1rem; }
        .content-section h4 { font-size: 1.125rem; font-weight: 600; color: #1F2937; margin-bottom: 0.75rem; }
        .content-section p { margin-bottom: 1.25rem; }
        .section-divider { border: none; height: 1px; background: #E5E7EB; margin: 3rem 0; }
        .highlight-callout { background: #F9FAFB; border-left: 4px solid #6B7280; padding: 1.5rem; margin: 2rem 0; }
        .source-grid { display: grid; gap: 1.5rem; margin: 2rem 0; }
        .source-card { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; padding: 1.5rem; }
        .impact-categories { display: grid; gap: 2rem; margin: 2rem 0; }
        .category-block { }
        .category-block ul { margin: 1rem 0; padding-left: 1.5rem; }
        .category-block li { margin-bottom: 0.5rem; }
        .solution-list { margin: 2rem 0; }
        .solution-item { margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid #F3F4F6; }
        .solution-item:last-child { border-bottom: none; }
        .conclusion-block { background: #F3F4F6; padding: 2rem; border-radius: 8px; margin-top: 2.5rem; }
        .conclusion-block h3 { color: #111827; margin-bottom: 1rem; }
        @media (min-width: 768px) {
          .source-grid { grid-template-columns: 1fr; }
          .impact-categories { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 1024px) {
          .source-grid { grid-template-columns: repeat(3, 1fr); }
        }
      </style>
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
      <div class="blog-content">
        <div class="intro-section">
          <p>Delhi's air quality crisis demands more than conventional solutions. With <strong>PM2.5 levels often exceeding safe limits by 10x</strong>, residents need advanced multi-layer air purification technology that can handle the city's complex pollution profile.</p>
        </div>
        
        <hr class="section-divider" />
        
        <section class="content-section">
          <h2>Understanding Delhi's Air Quality Challenge</h2>
          <p>Delhi faces a unique combination of pollutants that create one of the world's most challenging urban air environments. The city's pollution sources include vehicular emissions, industrial discharge, construction dust, crop burning residue, and seasonal allergens.</p>
          
          <div class="highlight-callout">
            <p><strong>Key Challenge:</strong> This complex mix requires sophisticated filtration technology that can address multiple types of contaminants simultaneously, something traditional single-filter systems simply cannot achieve.</p>
          </div>
        </section>
        
        <hr class="section-divider" />
        
        <section class="content-section">
          <h2>The Multi-Layer Advantage</h2>
          <p>Multi-layer air purifiers use a systematic approach to clean air, with each layer targeting specific pollutant types for comprehensive protection:</p>
          
          <div class="filter-layers">
            <div class="layer-card">
              <h3>Pre-Filter Layer</h3>
              <p><strong>Function:</strong> Captures large particles like dust, hair, and lint</p>
              <p><strong>Benefit:</strong> Extends the life of subsequent filters and reduces maintenance costs</p>
            </div>
            
            <div class="layer-card">
              <h3>True HEPA Filter</h3>
              <p><strong>Function:</strong> Removes 99.97% of particles as small as 0.3 microns</p>
              <p><strong>Benefit:</strong> Effectively captures PM2.5, pollen, and fine dust that plague Delhi's air</p>
            </div>
            
            <div class="layer-card">
              <h3>Activated Carbon Layer</h3>
              <p><strong>Function:</strong> Absorbs odors, smoke, and harmful gases</p>
              <p><strong>Benefit:</strong> Neutralizes pollutants from vehicular emissions and industrial activities</p>
            </div>
            
            <div class="layer-card">
              <h3>UV-C Sterilization</h3>
              <p><strong>Function:</strong> Eliminates bacteria, viruses, and biological contaminants</p>
              <p><strong>Benefit:</strong> Provides additional protection against pathogens that thrive in humid conditions</p>
            </div>
          </div>
        </section>
        
        <hr class="section-divider" />
        
        <section class="content-section">
          <h2>Smart Technology for Delhi's Conditions</h2>
          <p>Modern multi-layer purifiers integrate intelligent features specifically designed for high-pollution environments:</p>
          
          <div class="technology-features">
            <div class="feature-list">
              <div class="feature-item">
                <h4>Real-time Air Quality Monitoring</h4>
                <p>Advanced PM2.5 sensors provide continuous air quality assessment and display current pollution levels</p>
              </div>
              
              <div class="feature-item">
                <h4>Automatic Speed Adjustment</h4>
                <p>Smart algorithms automatically increase filtration power when pollution levels spike</p>
              </div>
              
              <div class="feature-item">
                <h4>Filter Replacement Indicators</h4>
                <p>Built-in sensors monitor filter condition and alert users when replacement is needed</p>
              </div>
              
              <div class="feature-item">
                <h4>App Connectivity</h4>
                <p>Remote monitoring and control capabilities allow users to manage air quality from anywhere</p>
              </div>
              
              <div class="feature-item">
                <h4>Energy-Efficient Operation</h4>
                <p>Optimized for 24/7 use with minimal power consumption, essential for continuous protection</p>
              </div>
            </div>
          </div>
        </section>
        
        <hr class="section-divider" />
        
        <section class="content-section">
          <h2>Choosing the Right System for Delhi</h2>
          <p>When selecting a multi-layer air purifier for Delhi's extreme conditions, consider these critical factors:</p>
          
          <div class="selection-criteria">
            <div class="criteria-item">
              <h4>Coverage Area</h4>
              <p>Ensure the purifier's capacity matches your room size for effective air circulation and filtration</p>
            </div>
            
            <div class="criteria-item">
              <h4>CADR Rating</h4>
              <p>Look for high Clean Air Delivery Rate (CADR) appropriate for Delhi's extreme pollution levels</p>
            </div>
            
            <div class="criteria-item">
              <h4>Filter Availability</h4>
              <p>Consider ongoing filter replacement costs and local availability of replacement filters</p>
            </div>
            
            <div class="criteria-item">
              <h4>Noise Levels</h4>
              <p>Choose systems with low noise output for comfortable continuous operation in living spaces</p>
            </div>
            
            <div class="criteria-item">
              <h4>Energy Efficiency</h4>
              <p>Select energy-efficient models to minimize electricity costs during extended use periods</p>
            </div>
          </div>
        </section>
        
        <hr class="section-divider" />
        
        <section class="content-section">
          <h2>The Future of Clean Air in Delhi</h2>
          <p>Multi-layer air purification technology represents a significant advancement in combating Delhi's air quality challenges. These systems offer residents the ability to create clean, healthy indoor environments regardless of outdoor conditions.</p>
          
          <div class="conclusion-block">
            <h3>Your Health Investment</h3>
            <p>Don't let Delhi's air quality compromise your family's health. Explore multi-layer air purification solutions designed specifically for the challenges of urban India. The investment in advanced filtration technology today protects your long-term health and quality of life.</p>
          </div>
        </section>
      </div>
      
      <style>
        .blog-content { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; line-height: 1.7; color: #374151; }
        .intro-section { font-size: 1.125rem; margin-bottom: 2.5rem; color: #4B5563; }
        .content-section { margin: 2.5rem 0; }
        .content-section h2 { font-size: 1.875rem; font-weight: 700; color: #111827; margin-bottom: 1.5rem; line-height: 1.3; }
        .content-section h3 { font-size: 1.25rem; font-weight: 600; color: #1F2937; margin-bottom: 1rem; }
        .content-section h4 { font-size: 1.125rem; font-weight: 600; color: #1F2937; margin-bottom: 0.75rem; }
        .content-section p { margin-bottom: 1.25rem; }
        .section-divider { border: none; height: 1px; background: #E5E7EB; margin: 3rem 0; }
        .highlight-callout { background: #F9FAFB; border-left: 4px solid #6B7280; padding: 1.5rem; margin: 2rem 0; }
        .filter-layers { display: grid; gap: 1.5rem; margin: 2rem 0; }
        .layer-card { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; padding: 1.5rem; }
        .technology-features { margin: 2rem 0; }
        .feature-list { display: grid; gap: 1.5rem; }
        .feature-item { margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid #F3F4F6; }
        .feature-item:last-child { border-bottom: none; }
        .selection-criteria { display: grid; gap: 1.5rem; margin: 2rem 0; }
        .criteria-item { margin-bottom: 1.5rem; }
        .conclusion-block { background: #F3F4F6; padding: 2rem; border-radius: 8px; margin-top: 2.5rem; }
        .conclusion-block h3 { color: #111827; margin-bottom: 1rem; }
        @media (min-width: 768px) {
          .filter-layers { grid-template-columns: repeat(2, 1fr); }
          .selection-criteria { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .filter-layers { grid-template-columns: repeat(4, 1fr); }
        }
      </style>
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