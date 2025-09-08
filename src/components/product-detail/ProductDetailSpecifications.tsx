import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";
import nestFrontView from "@/assets/sections/products/product-images/nestfrontview.png";
import nestSideView from "@/assets/sections/products/product-images/nestsideview.png";
import stormFrontView from "@/assets/sections/products/product-images/stormfrontview.png";
import stormSideView from "@/assets/sections/products/product-images/stormsideview.png";

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
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

  // Get product-specific images for carousel
  const getProductImages = () => {
    const productName = product.name.toLowerCase();
    
    if (productName.includes('nest')) {
      return [
        { src: product.images[0] || nestSideView, alt: 'Nest Side View' },
        { src: nestFrontView, alt: 'Nest Front View' }
      ];
    } else if (productName.includes('storm') || productName.includes('strom')) {
      return [
        { src: stormFrontView, alt: 'Storm Front View' },
        { src: product.images[0] || stormSideView, alt: 'Storm Side View' }
      ];
    } else {
      // Default fallback
      return [
        { src: product.images[0] || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", alt: 'Product View 1' },
        { src: product.images[1] || product.images[0] || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", alt: 'Product View 2' }
      ];
    }
  };

  const productImages = getProductImages();

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  // Get dynamic dimensions based on product
  const getDimensions = () => {
    const productName = product.name.toLowerCase();
    if (productName.includes('storm') || productName.includes('strom')) {
      return [
        { label: "Height", value: "447 mm" },
        { label: "Width", value: "254 mm" },
        { label: "Length", value: "254 mm" },
        { label: "Weight", value: "4.65 kg" }
      ];
    } else if (productName.includes('nest')) {
      return [
        { label: "Height", value: "317 mm" },
        { label: "Width", value: "213 mm" },
        { label: "Length", value: "210 mm" },
        { label: "Weight", value: "3.2 kg" }
      ];
    } else {
      return [
        { label: "Height", value: "1050 mm" },
        { label: "Width", value: "220 mm" },
        { label: "Length", value: "220 mm" },
        { label: "Weight", value: "4.65 kg" }
      ];
    }
  };

  // Detailed technical specifications for popup
  const detailedSpecs = [
    { category: "Physical Dimensions", specs: getDimensions() },
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
              <h2 className="text-3xl lg:text-4xl font-bold text-[#36454F] font-montserrat">
                Specifications
              </h2>
            </div>

            {/* Two-column specifications layout */}
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              {specEntries.map(([key, value], index) => (
                <div key={index} className="space-y-2">
                  <div className="text-gray-700 font-medium text-sm font-montserrat">{key}:</div>
                  <div className="text-[#36454F] font-semibold font-montserrat">{value}</div>
                  {/* Add divider under all items except the last one, plus special cases for "< 0.5W" and "350°" */}
                  {(index < specEntries.length - 1 || value === "< 0.5W" || value === "350°") && (
                    <div className="border-b border-gray-200 mt-4"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right side: Product Image Carousel */}
          <div className="relative flex justify-center items-center">
            <div className="relative w-96 h-[500px]">
              {/* Main Image Display */}
              <div className="relative w-full h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    className="w-full h-full flex items-center justify-center"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src={productImages[currentImageIndex].src}
                      alt={productImages[currentImageIndex].alt}
                      className="object-contain w-full h-full"
                      style={{ 
                        maxWidth: '100%',
                        maxHeight: '100%',
                        transform: productImages[currentImageIndex].alt.includes('Front View')
                          ? 'scale(1.5) translateY(-10px)' 
                          : 'none'
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-green-600 transition-all duration-300 hover:scale-125 group"
                style={{ filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2))' }}
              >
                <ChevronLeft className="w-8 h-8 transition-transform duration-300 group-hover:-translate-x-1" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-green-600 transition-all duration-300 hover:scale-125 group"
                style={{ filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2))' }}
              >
                <ChevronRight className="w-8 h-8 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* Useful Documents Section */}
      <div className="container mx-auto px-6 mt-24">
        <h3 className="text-2xl md:text-3xl font-bold text-[#36454F] mb-12 font-montserrat">
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
                  <h4 className="text-[#36454F] font-semibold mb-2 font-montserrat">
                    Technical Specifications
                  </h4>
                  <p className="text-gray-600 text-sm font-montserrat">
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
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                showPopup ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                {/* Header */}
                <div className="bg-gray-50 p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-[#36454F] font-montserrat">Technical Specifications</h2>
                </div>

                {/* Content */}
                <div className="p-6 space-y-8">
                  {/* Grid layout for sections */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {detailedSpecs.map((section, sectionIndex) => (
                      <div 
                        key={sectionIndex}
                        className="space-y-4"
                      >
                        <h3 className="text-lg font-semibold text-[#36454F] border-b pb-2 font-montserrat">
                          {section.category}
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-gray-200">
                                <th className="text-left py-2 px-3 font-semibold text-gray-700 text-sm font-montserrat">Parameter</th>
                                <th className="text-left py-2 px-3 font-semibold text-gray-700 text-sm font-montserrat">Value</th>
                              </tr>
                            </thead>
                            <tbody>
                              {section.specs.map((spec, specIndex) => (
                                <tr 
                                  key={specIndex}
                                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                                >
                                  <td className="py-2 px-3 text-gray-600 text-sm font-montserrat">{spec.label}</td>
                                  <td className="py-2 px-3 text-[#36454F] font-medium text-sm font-montserrat">{spec.value}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}