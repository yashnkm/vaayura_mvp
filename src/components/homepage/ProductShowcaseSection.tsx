import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { PhoneCall } from 'lucide-react'
import { motion } from 'framer-motion'
import stormImg from "@/assets/storm.png"
import nestImg from "@/assets/nest.png"
import filterImg from "@/assets/4 layer filter.jpg"

const models = [
  { id: 'storm', name: 'Storm', price: 15990, originalPrice: 21990, image: stormImg },
  { id: 'nest', name: 'Nest', price: 8990, originalPrice: 12990, image: nestImg }
]

const filters = [
  { id: 'storm-filter', name: 'Storm Filter', price: 2990 },
  { id: 'nest-filter', name: 'Nest Filter', price: 1990 }
]

export function ProductShowcaseSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedFilter, setSelectedFilter] = useState(filters[0])

  // Get current product data
  const currentProduct = models[currentImageIndex]
  const discountPercentage = Math.round(((currentProduct.originalPrice - currentProduct.price) / currentProduct.originalPrice) * 100)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % models.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + models.length) % models.length)
  }

  return (
    <section className="py-20 bg-white text-gray-900">
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-gpu {
          transform-style: preserve-3d;
        }
        .rotate-y-20 {
          transform: rotateY(20deg);
        }
        .-rotate-y-20 {
          transform: rotateY(-20deg);
        }
      `}</style>
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Main Product Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-sora font-bold text-gray-900 mb-6">
              Choose Your Perfect Air Purifier
            </h1>
            <p className="text-xl text-gray-600 font-sora max-w-3xl mx-auto">
              Advanced filtration technology meets elegant design. Select from our premium collection.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Right side: 3D Carousel - EXACT COPY from Specifications */}
            <div className="relative flex justify-center items-center">
              <div className="relative w-96 h-[500px] perspective-1000">
                
                {/* Carousel Container */}
                <div className="relative w-full h-full overflow-hidden rounded-2xl">
                  {models.map((product, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        index === currentImageIndex
                          ? 'opacity-100 scale-100 translate-x-0 z-20'
                          : index === (currentImageIndex + 1) % models.length
                          ? 'opacity-50 scale-75 translate-x-24 z-10'
                          : index === (currentImageIndex - 1 + models.length) % models.length
                          ? 'opacity-50 scale-75 -translate-x-24 z-10'
                          : 'opacity-0 scale-75 z-0'
                      }`}
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: index === currentImageIndex
                          ? 'translateX(0px) scale(1) rotateY(0deg)'
                          : index === (currentImageIndex + 1) % models.length
                          ? 'translateX(96px) scale(0.75) rotateY(20deg)'
                          : index === (currentImageIndex - 1 + models.length) % models.length
                          ? 'translateX(-96px) scale(0.75) rotateY(-20deg)'
                          : 'scale(0.75) rotateY(0deg)'
                      }}
                    >
                      <img 
                        src={product.image} 
                        alt={`Vaayura ${product.name}`} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                </div>


                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
                  {models.map((_, index) => (
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
                
                {/* Discount Badge */}
                <motion.div 
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-4 -right-4 z-30 bg-red-600 text-white px-4 py-2 rounded-full font-sora font-semibold shadow-lg"
                >
                  {discountPercentage}% OFF
                </motion.div>
              </div>
            </div>

            {/* Product Details */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <motion.h2 
                  key={currentProduct.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-3xl lg:text-4xl font-sora font-bold text-gray-900 mb-4"
                >
                  Vaayura {currentProduct.name}
                </motion.h2>
                
                <div className="space-y-3">
                  <span className="text-gray-500 line-through font-sora text-lg">
                    MRP ₹{currentProduct.originalPrice.toLocaleString()}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-bold text-brand-pastel-green font-sora">
                      ₹{currentProduct.price.toLocaleString()}
                    </span>
                    <span className="text-gray-600 font-sora">
                      (inclusive of all taxes)
                    </span>
                  </div>
                </div>
              </div>

              {/* Clean Model Selection */}
              <div>
                <h4 className="text-lg font-semibold mb-4 font-sora text-gray-900">Select Your Model:</h4>
                <div className="flex gap-3">
                  {models.map((model, index) => (
                    <motion.button
                      key={model.id}
                      onClick={() => setCurrentImageIndex(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 font-sora ${
                        index === currentImageIndex
                          ? 'bg-green-800 hover:bg-green-900 text-white'
                          : 'bg-transparent border-2 border-green-800 text-green-800 hover:bg-green-800 hover:text-white'
                      }`}
                    >
                      {model.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Single Buy Button */}
              <div className="pt-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-green-800 hover:bg-green-900 text-white font-semibold px-6 py-3 rounded-full font-sora transition-all duration-200">
                    BUY NOW - ₹{currentProduct.price.toLocaleString()}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Filters Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 shadow-lg"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Filter Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl lg:text-4xl font-sora font-bold mb-2">
                  Premium <span className="text-brand-pastel-green">Filters</span>
                </h2>
                <p className="text-xl text-gray-600 mb-6 font-sora font-semibold">HIGH EFFICIENCY, LOW COST</p>
                
                <p className="text-gray-700 leading-relaxed mb-8 font-sora text-lg">
                  Our premium filters deliver exceptional performance while saving you from expensive replacements. 
                  Engineered for longevity and superior air purification.
                </p>

                {/* Filter Selection */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-4 font-sora">Select Filter:</h4>
                  <div className="flex gap-3">
                    {filters.map((filter) => (
                      <motion.button
                        key={filter.id}
                        onClick={() => setSelectedFilter(filter)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 font-sora ${
                          selectedFilter.id === filter.id
                            ? 'bg-green-800 hover:bg-green-900 text-white'
                            : 'bg-transparent border-2 border-green-800 text-green-800 hover:bg-green-800 hover:text-white'
                        }`}
                      >
                        {filter.name}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-green-800 hover:bg-green-900 text-white font-semibold px-8 py-3 rounded-full font-sora transition-all duration-200">
                    BUY FILTER - ₹{selectedFilter.price.toLocaleString()}
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Filter Image - Card sized to match image with rounded edges */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="inline-block rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={filterImg}
                  alt="Vaayura Air Purifier Filter"
                  className="w-80 h-80 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}