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
  ChevronUp
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: "How often should I replace the filters?",
    answer: "We recommend replacing filters every 6-12 months depending on usage and air quality conditions. The device will indicate when filter replacement is needed."
  },
  {
    question: "What is the warranty period for Vaayura products?",
    answer: "All Vaayura air purifiers come with a 2-year comprehensive warranty covering all parts and manufacturing defects."
  },
  {
    question: "How do I connect my device to the mobile app?",
    answer: "Download the Vaayura app, ensure your device is in pairing mode, and follow the in-app setup wizard. Make sure your phone and purifier are on the same WiFi network."
  },
  {
    question: "Why is my air purifier making noise?",
    answer: "Some operational noise is normal, especially at higher fan speeds. If you notice unusual sounds, check if the filter is properly installed and not damaged."
  },
  {
    question: "How do I know if my air purifier is working effectively?",
    answer: "Monitor the air quality indicator on your device and app. You should see improvements in AQI readings within 30 minutes of operation in a closed room."
  }
]

const manuals = [
  {
    title: "Quick Start Guide",
    description: "Get your air purifier up and running in minutes",
    fileSize: "2.5 MB",
    type: "PDF"
  },
  {
    title: "Complete User Manual",
    description: "Comprehensive guide covering all features and troubleshooting",
    fileSize: "8.2 MB",
    type: "PDF"
  },
  {
    title: "Installation Instructions",
    description: "Step-by-step installation and setup instructions",
    fileSize: "1.8 MB",
    type: "PDF"
  },
  {
    title: "Maintenance Schedule",
    description: "Filter replacement and maintenance calendar",
    fileSize: "0.9 MB",
    type: "PDF"
  }
]

const videos = [
  {
    title: "Unboxing & Initial Setup",
    duration: "3:45",
    description: "Complete unboxing experience and first-time setup"
  },
  {
    title: "Mobile App Tutorial",
    duration: "5:20",
    description: "How to use all features of the Vaayura mobile app"
  },
  {
    title: "Filter Replacement Guide",
    duration: "2:15",
    description: "Step-by-step filter replacement process"
  },
  {
    title: "Troubleshooting Common Issues",
    duration: "7:30",
    description: "Solutions to the most common problems"
  }
]

export function SupportPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold leading-tight mb-6 text-[#36454F]"
            >
              Support Center
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-[#36454F] font-montserrat max-w-2xl mx-auto leading-relaxed"
            >
              Find manuals, video tutorials, FAQs, and get expert support for your Vaayura air purifier.
            </motion.p>
          </div>
        </section>

        {/* Quick Contact Options */}
        <section className="py-12 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-sora font-bold text-[#36454F] text-center mb-8">
              Need immediate help?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Phone className="w-8 h-8 text-green-800 mx-auto mb-3" />
                <h3 className="font-sora font-semibold text-[#36454F] mb-2">Call Support</h3>
                <p className="text-sm text-[#36454F] mb-3">Mon-Fri 9AM-6PM</p>
                <Button className="bg-green-800 hover:bg-green-900 text-white">
                  +91-XXXX-XXXX
                </Button>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Mail className="w-8 h-8 text-green-800 mx-auto mb-3" />
                <h3 className="font-sora font-semibold text-[#36454F] mb-2">Email Us</h3>
                <p className="text-sm text-[#36454F] mb-3">Response within 24hrs</p>
                <Button className="bg-green-800 hover:bg-green-900 text-white">
                  support@vaayura.com
                </Button>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <MessageCircle className="w-8 h-8 text-green-800 mx-auto mb-3" />
                <h3 className="font-sora font-semibold text-[#36454F] mb-2">Live Chat</h3>
                <p className="text-sm text-[#36454F] mb-3">Available 24/7</p>
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
                    Product Manuals & Documents
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {manuals.map((manual, index) => (
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
                    Video Tutorials
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {videos.map((video, index) => (
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
                    Frequently Asked Questions
                  </h2>
                  <div className="max-w-4xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
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

        {/* Still Need Help Section */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-[#36454F] mb-6">
              Still need help?
            </h2>
            <p className="text-lg text-[#36454F] font-montserrat mb-8 max-w-2xl mx-auto leading-relaxed">
              Our expert support team is ready to assist you with any questions about your Vaayura air purifier.
            </p>
            <Button className="bg-green-800 hover:bg-green-900 text-white px-8 py-3 text-lg font-montserrat font-semibold">
              Contact Support Team
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  )
}