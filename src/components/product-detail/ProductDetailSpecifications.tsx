import { useState } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";

// Define types locally to avoid import issues
interface ProductFeature {
  title: string
  description: string
  icon: string
}

interface ProductSpecifications {
  [key: string]: string
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  features: ProductFeature[]
  specifications: ProductSpecifications
  published: boolean
  slug: string
  created_at: string
}

interface ProductDetailSpecificationsProps {
  product: Product;
}

export function ProductDetailSpecifications({ product }: ProductDetailSpecificationsProps) {
  const [showPopup, setShowPopup] = useState(false);
  
  const TRANSITION = {
    type: "spring",
    bounce: 0.05,
    duration: 0.3,
  };

  const exitTransition = {
    type: "spring",
    bounce: 0,
    duration: 0.25,
  };

  // Fallback specifications if none provided
  const defaultSpecifications = {
    "Cord length": "1.8m",
    "Length": "220 mm", 
    "Width": "220 mm",
    "Height": "1050 mm",
    "Weight": "4.65kg",
    "Oscillation/Angle": "350°",
    "Filter life": "1 year for HEPA+Carbon filter",
    "Standby power consumption": "< 0.5W",
    "Room coverage": "81m² (according to POLAR)",
    "Sound level": "59.8dB"
  };

  let specifications = (product.specifications && Object.keys(product.specifications).length > 0) 
    ? product.specifications 
    : defaultSpecifications;

  // Get all specification entries and limit to 10 items for better layout
  const specEntries = Object.entries(specifications).slice(0, 10);

  // Detailed technical specifications for popup
  const detailedSpecs = [
    { category: "Physical Dimensions", specs: [
      { label: "Height", value: "1050 mm" },
      { label: "Width", value: "220 mm" },
      { label: "Length", value: "220 mm" },
      { label: "Weight", value: "4.65 kg" }
    ]},
    { category: "Performance", specs: [
      { label: "Room coverage", value: "81m² (according to POLAR)" },
      { label: "Sound level", value: "59.8 dB" },
      { label: "Oscillation/Angle", value: "350°" },
      { label: "Filter life", value: "1 year for HEPA+Carbon filter" }
    ]},
    { category: "Power & Connectivity", specs: [
      { label: "Cord length", value: "1.8m" },
      { label: "Standby power consumption", value: "< 0.5W" },
      { label: "Voltage", value: "220-240V AC" },
      { label: "Power consumption", value: "60W" }
    ]},
    { category: "Filtration System", specs: [
      { label: "Filter stages", value: "4-layer system" },
      { label: "HEPA grade", value: "True HEPA 13" },
      { label: "Particle capture", value: "99.97% at 0.3μm" },
      { label: "Activated carbon", value: "Honeycomb structure" }
    ]}
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left side: Specifications */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Specifications
              </h2>
            </div>

            {/* Two-column specifications layout */}
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              {specEntries.map(([key, value], index) => (
                <div key={index} className="space-y-2">
                  <div className="text-gray-700 font-medium text-sm">{key}:</div>
                  <div className="text-gray-900 font-semibold">{value}</div>
                  {index < specEntries.length - 1 && (
                    <div className="border-b border-gray-200 mt-4"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right side: Product Image */}
          <div className="relative flex justify-center items-start">
            <div className="relative">
              <img 
                src={product.images[0] || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"}
                alt={`${product.name} - Specifications`}
                className="w-96 h-[500px] object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Useful Documents Section */}
      <div className="container mx-auto px-6 mt-24">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12">
          Useful documents
        </h3>
        
        <div className="w-full">
          <div className="w-full">
            <div 
              className="bg-white hover:bg-gray-50 transition-colors duration-200 p-6 rounded-xl cursor-pointer shadow-sm border border-gray-200"
              onClick={() => setShowPopup(!showPopup)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-gray-900 font-semibold mb-2">
                    Technical specification, PDF, 8MB
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Detailed technical specifications and performance data
                  </p>
                </div>
                <div className={`transform transition-transform duration-200 ${showPopup ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Inline Technical Specs Expansion */}
            <AnimatePresence mode="wait">
              {showPopup && (
                <motion.div
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{
                    height: { ...exitTransition, duration: showPopup ? TRANSITION.duration : exitTransition.duration },
                    opacity: { duration: showPopup ? TRANSITION.duration : exitTransition.duration * 0.5 },
                    marginTop: { ...exitTransition, duration: showPopup ? TRANSITION.duration : exitTransition.duration }
                  }}
                  className="overflow-hidden"
                  style={{ willChange: "height, opacity, margin-top" }}
                >
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ 
                      y: { ...TRANSITION, delay: showPopup ? 0.1 : 0 },
                      opacity: { duration: showPopup ? TRANSITION.duration : exitTransition.duration * 0.3 }
                    }}
                    className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                  >
                    {/* Header */}
                    <motion.div 
                      className="bg-gray-50 p-6 border-b border-gray-200"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h2 className="text-xl font-bold text-gray-900">Technical Specifications</h2>
                    </motion.div>

                    {/* Content */}
                    <div className="p-6 space-y-8">
                      {/* Grid layout for sections */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {detailedSpecs.map((section, sectionIndex) => (
                          <motion.div 
                            key={sectionIndex}
                            className="space-y-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                              ...TRANSITION, 
                              delay: 0.3 + (sectionIndex * 0.1) 
                            }}
                          >
                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                              {section.category}
                            </h3>
                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead>
                                  <tr className="border-b border-gray-200">
                                    <th className="text-left py-2 px-3 font-semibold text-gray-700 text-sm">Parameter</th>
                                    <th className="text-left py-2 px-3 font-semibold text-gray-700 text-sm">Value</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {section.specs.map((spec, specIndex) => (
                                    <motion.tr 
                                      key={specIndex}
                                      className="border-b border-gray-100 hover:bg-gray-50"
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ 
                                        ...TRANSITION,
                                        delay: 0.4 + (sectionIndex * 0.1) + (specIndex * 0.02)
                                      }}
                                      whileHover={{ 
                                        backgroundColor: "rgb(249 250 251)", 
                                        transition: { duration: 0.15 } 
                                      }}
                                    >
                                      <td className="py-2 px-3 text-gray-600 text-sm">{spec.label}</td>
                                      <td className="py-2 px-3 text-gray-900 font-medium text-sm">{spec.value}</td>
                                    </motion.tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}