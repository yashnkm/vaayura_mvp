import specifications9933 from "@/assets/storm.png";
import ggV1 from "@/assets/gg v1.png";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Specifications() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Array of products with images and specifications
  const products = [
    {
      name: "Vaayura Storm",
      image: { src: specifications9933, alt: "Vaayura Storm Air Purifier" },
      specifications: [
        { label: "Cord length:", value: "1.8m" },
        { label: "Length:", value: "220 mm" },
        { label: "Width:", value: "220 mm" },
        { label: "Height:", value: "1050 mm" },
        { label: "Weight:", value: "4.65kg" },
        { label: "Oscillation/Angle:", value: "350°" },
        { label: "Filter life:", value: "1 year for HEPA+Carbon filter" },
        { label: "Standby power consumption:", value: "< 0.5W" },
        { label: "Room coverage:", value: "81m² (according to POLAR)" },
        { label: "Sound level:", value: "59.8dB" }
      ]
    },
    {
      name: "Vaayura Nest",
      image: { src: ggV1, alt: "Vaayura Nest Air Purifier" },
      specifications: [
        { label: "Cord length:", value: "1.2m" },
        { label: "Length:", value: "180 mm" },
        { label: "Width:", value: "180 mm" },
        { label: "Height:", value: "650 mm" },
        { label: "Weight:", value: "2.8kg" },
        { label: "Oscillation/Angle:", value: "270°" },
        { label: "Filter life:", value: "8 months for HEPA+Carbon filter" },
        { label: "Standby power consumption:", value: "< 0.3W" },
        { label: "Room coverage:", value: "45m² (according to POLAR)" },
        { label: "Sound level:", value: "45.2dB" }
      ]
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % products.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  // Get current product data
  const currentProduct = products[currentImageIndex];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left side: Specifications */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-sora font-bold text-[#36454F] transition-opacity duration-300">
                {currentProduct.name} Specifications
              </h2>
            </div>

            {/* Two-column specifications layout */}
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 transition-opacity duration-500">
              {currentProduct.specifications.map((spec, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-gray-700 font-montserrat font-medium text-sm">{spec.label}</div>
                  <div className="text-[#36454F] font-sora font-semibold">{spec.value}</div>
                  {index < currentProduct.specifications.length - 1 && (
                    <div className="border-b border-gray-200 mt-4"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right side: 3D Carousel */}
          <div className="relative flex justify-center items-center">
            <div className="relative w-96 h-[500px] perspective-1000">
              
              {/* Carousel Container */}
              <div className="relative w-full h-full overflow-hidden rounded-2xl">
                {products.map((product, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out transform-gpu ${
                      index === currentImageIndex
                        ? 'opacity-100 scale-100 translate-x-0 z-20'
                        : index === (currentImageIndex + 1) % products.length
                        ? 'opacity-50 scale-75 translate-x-24 rotate-y-20 z-10'
                        : index === (currentImageIndex - 1 + products.length) % products.length
                        ? 'opacity-50 scale-75 -translate-x-24 -rotate-y-20 z-10'
                        : 'opacity-0 scale-75 z-0'
                    }`}
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <img 
                      src={product.image.src} 
                      alt={product.image.alt} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>

              {/* Left Arrow */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 group"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-emerald-600" />
              </button>

              {/* Right Arrow */}
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 group"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-emerald-600" />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
                {products.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'bg-emerald-600 scale-110'
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}