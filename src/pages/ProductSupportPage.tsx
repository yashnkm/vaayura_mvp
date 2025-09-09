import { Layout } from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  FileText, 
  Video, 
  HelpCircle, 
  Download, 
  Phone, 
  Mail, 
  MessageCircle,
  ChevronDown,
  ChevronUp,
  ArrowLeft
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import stormImg from "@/assets/sections/shared/products/storm.png"
import nestImg from "@/assets/sections/shared/products/nest.png"

interface FAQ {
  question: string
  answer: string
}

interface ProductData {
  name: string
  image: string
  description: string
  faqs: FAQ[]
  manuals: Array<{
    title: string
    description: string
    fileSize: string
    type: string
  }>
  videos: Array<{
    title: string
    duration: string
    description: string
  }>
}

const productData: Record<string, ProductData> = {
  storm: {
    name: "Vaayura Storm",
    image: stormImg,
    description: "Powerful air purifier for living rooms, dining rooms, and kitchens",
    faqs: [
      {
        question: "What is the coverage area for Vaayura Storm?",
        answer: "The Storm is designed for larger spaces up to 600 sq ft, making it perfect for living rooms, dining areas, and open kitchens."
      },
      {
        question: "How loud is the Storm at maximum speed?",
        answer: "At maximum speed, the Storm operates at approximately 45dB, comparable to a quiet library. Sleep mode operates at whisper-quiet 25dB."
      },
      {
        question: "What filters does the Storm use?",
        answer: "The Storm uses a 4-layer filtration system: Pre-filter, HEPA H13, Activated Carbon, and UV-C sterilization layer."
      },
      {
        question: "How do I schedule cleaning cycles?",
        answer: "Use the Vaayura mobile app to set up automated cleaning schedules. You can create custom schedules for different times of day and days of the week."
      },
      {
        question: "Can I control the Storm remotely?",
        answer: "Yes, the Storm comes with full WiFi connectivity and can be controlled remotely through the Vaayura mobile app from anywhere."
      }
    ],
    manuals: [
      {
        title: "Storm Quick Start Guide",
        description: "Get your Storm up and running quickly",
        fileSize: "2.1 MB",
        type: "PDF"
      },
      {
        title: "Storm Complete Manual",
        description: "Comprehensive guide for all Storm features",
        fileSize: "9.2 MB",
        type: "PDF"
      },
      {
        title: "Storm Filter Replacement Guide",
        description: "Step-by-step filter maintenance",
        fileSize: "1.5 MB",
        type: "PDF"
      },
      {
        title: "Storm App Setup Guide",
        description: "Mobile app connection and features",
        fileSize: "3.8 MB",
        type: "PDF"
      }
    ],
    videos: [
      {
        title: "Storm Unboxing & Setup",
        duration: "4:12",
        description: "Complete unboxing and initial setup process"
      },
      {
        title: "Storm Mobile App Tutorial",
        duration: "6:35",
        description: "How to use all Storm-specific app features"
      },
      {
        title: "Storm Filter Replacement",
        duration: "2:45",
        description: "Easy filter replacement walkthrough"
      },
      {
        title: "Storm Advanced Features",
        duration: "8:20",
        description: "Air quality monitoring and smart scheduling"
      }
    ]
  },
  nest: {
    name: "Vaayura Nest",
    image: nestImg,
    description: "Compact air purifier great for bedrooms, home offices, or bathrooms",
    faqs: [
      {
        question: "What is the coverage area for Vaayura Nest?",
        answer: "The Nest is optimized for smaller spaces up to 300 sq ft, perfect for bedrooms, home offices, or bathrooms."
      },
      {
        question: "Is the Nest suitable for overnight use?",
        answer: "Absolutely! The Nest has a special sleep mode that operates at ultra-quiet 20dB with dimmed lights for undisturbed sleep."
      },
      {
        question: "What makes the Nest different from the Storm?",
        answer: "The Nest is compact and portable, designed for personal spaces. It features the same filtration quality in a smaller form factor."
      },
      {
        question: "How often should I clean the Nest pre-filter?",
        answer: "The pre-filter should be cleaned monthly with a soft brush or vacuumed. The main filter should be replaced every 6-8 months."
      },
      {
        question: "Can I move the Nest between rooms?",
        answer: "Yes, the Nest is designed to be portable. Simply unplug and move it to any room. The app will automatically reconnect when plugged in."
      }
    ],
    manuals: [
      {
        title: "Nest Quick Start Guide",
        description: "Get your Nest running in minutes",
        fileSize: "1.8 MB",
        type: "PDF"
      },
      {
        title: "Nest Complete Manual",
        description: "Full feature guide for your Nest",
        fileSize: "6.5 MB",
        type: "PDF"
      },
      {
        title: "Nest Maintenance Guide",
        description: "Keep your Nest in perfect condition",
        fileSize: "1.2 MB",
        type: "PDF"
      },
      {
        title: "Nest Sleep Mode Guide",
        description: "Optimize for bedroom use",
        fileSize: "0.8 MB",
        type: "PDF"
      }
    ],
    videos: [
      {
        title: "Nest Unboxing & First Setup",
        duration: "3:20",
        description: "Quick setup guide for your new Nest"
      },
      {
        title: "Nest App Configuration",
        duration: "4:45",
        description: "Connect and configure your Nest"
      },
      {
        title: "Nest Sleep Mode Tutorial",
        duration: "2:10",
        description: "Perfect bedroom air purification"
      },
      {
        title: "Nest Maintenance Tips",
        duration: "3:55",
        description: "Keep your Nest running smoothly"
      }
    ]
  }
}

export function ProductSupportPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const product = slug ? productData[slug] : null

  if (!product) {
    return (
      <Layout>
        <div className="pt-32 pb-20 px-6 text-center">
          <h1 className="text-3xl font-sora font-bold text-[#36454F] mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/support')} className="bg-green-800 hover:bg-green-900">
            Back to Support
          </Button>
        </div>
      </Layout>
    )
  }

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Hero Section with Product */}
        <section className="pt-32 pb-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/contact')}
              className="mb-6 text-green-800 hover:text-green-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Contact
            </Button>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="aspect-square bg-gray-50 rounded-3xl p-8">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl font-sora font-bold leading-tight mb-6 text-[#36454F]">
                  {product.name} <span className="text-green-800">Support</span>
                </h1>
                <p className="text-lg text-[#36454F] font-montserrat leading-relaxed mb-8">
                  {product.description}. Find everything you need to get the most out of your air purifier.
                </p>
                
                {/* Quick Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button className="bg-green-800 hover:bg-green-900 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Manual
                  </Button>
                  <Button variant="outline" className="border-green-800 text-green-800 hover:bg-green-800 hover:text-white">
                    <Video className="w-4 h-4 mr-2" />
                    Videos
                  </Button>
                  <Button variant="outline" className="border-green-800 text-green-800 hover:bg-green-800 hover:text-white">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Contact Options */}
        <section className="py-12 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-sora font-bold text-[#36454F] text-center mb-8">
              Need immediate help with your {product.name}?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Phone className="w-8 h-8 text-green-800 mx-auto mb-3" />
                <h3 className="font-sora font-semibold text-[#36454F] mb-2">Product Support</h3>
                <p className="text-sm text-[#36454F] mb-3">Dedicated {product.name} experts</p>
                <Button className="bg-green-800 hover:bg-green-900 text-white">
                  +91-XXXX-XXXX
                </Button>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Mail className="w-8 h-8 text-green-800 mx-auto mb-3" />
                <h3 className="font-sora font-semibold text-[#36454F] mb-2">Email Support</h3>
                <p className="text-sm text-[#36454F] mb-3">Product-specific assistance</p>
                <Button className="bg-green-800 hover:bg-green-900 text-white">
                  {slug}@vaayura.com
                </Button>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <MessageCircle className="w-8 h-8 text-green-800 mx-auto mb-3" />
                <h3 className="font-sora font-semibold text-[#36454F] mb-2">Live Chat</h3>
                <p className="text-sm text-[#36454F] mb-3">Instant {product.name} support</p>
                <Button className="bg-green-800 hover:bg-green-900 text-white">
                  Start Chat
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Support Content */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="manuals" className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
                <TabsTrigger value="manuals" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Manuals
                </TabsTrigger>
                <TabsTrigger value="videos" className="flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Videos
                </TabsTrigger>
                <TabsTrigger value="faq" className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  FAQ
                </TabsTrigger>
              </TabsList>

              {/* Manuals Tab */}
              <TabsContent value="manuals">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl font-sora font-bold text-[#36454F] text-center mb-8">
                    {product.name} Manuals & Documents
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {product.manuals.map((manual, index) => (
                      <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-sora font-semibold text-[#36454F] mb-2">
                              {manual.title}
                            </h3>
                            <p className="text-[#36454F] text-sm mb-3 leading-relaxed">
                              {manual.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>{manual.type}</span>
                              <span>{manual.fileSize}</span>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            className="bg-green-800 hover:bg-green-900 text-white ml-4"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              {/* Videos Tab */}
              <TabsContent value="videos">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl font-sora font-bold text-[#36454F] text-center mb-8">
                    {product.name} Video Tutorials
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {product.videos.map((video, index) => (
                      <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                          <Video className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="font-sora font-semibold text-[#36454F] mb-2">
                          {video.title}
                        </h3>
                        <p className="text-[#36454F] text-sm mb-3 leading-relaxed">
                          {video.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{video.duration}</span>
                          <Button size="sm" className="bg-green-800 hover:bg-green-900 text-white">
                            Watch Now
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              {/* FAQ Tab */}
              <TabsContent value="faq">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl font-sora font-bold text-[#36454F] text-center mb-8">
                    {product.name} FAQ
                  </h2>
                  <div className="max-w-4xl mx-auto space-y-4">
                    {product.faqs.map((faq, index) => (
                      <Card key={index} className="overflow-hidden">
                        <button
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                          onClick={() => toggleFaq(index)}
                        >
                          <h3 className="font-sora font-semibold text-[#36454F]">
                            {faq.question}
                          </h3>
                          {expandedFaq === index ? (
                            <ChevronUp className="w-5 h-5 text-green-800 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-green-800 flex-shrink-0" />
                          )}
                        </button>
                        {expandedFaq === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="px-6 pb-6"
                          >
                            <p className="text-[#36454F] leading-relaxed">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </Card>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </Layout>
  )
}