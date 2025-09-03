import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import stormImg from "@/assets/storm.png"
import nestImg from "@/assets/nest.png"
import stormFrontView from "@/assets/Productimages/stormfrontview.png"
import stormSideView from "@/assets/Productimages/stormsideview.png"
import nestFrontView from "@/assets/Productimages/nestfrontview.png"
import nestSideView from "@/assets/Productimages/nestsideview.png"
import backgroundImg from "@/assets/background.png"
import backgroundimage2 from "@/assets/backgroundimage2.png"
import products1 from "@/assets/PRODUCTS1.png"
import products2 from "@/assets/PRODUCTS2.png"
import products3 from "@/assets/PRODUCTS3.png"

const models = [
  { id: 'storm', name: 'Storm', price: 15990, originalPrice: 21990, image: stormImg },
  { id: 'nest', name: 'Nest', price: 8990, originalPrice: 12990, image: nestImg }
]

const heroBackgrounds = [
  { id: 'products1', name: 'Office Space', image: products1 },
  { id: 'products2', name: 'Living Room', image: products2 },
  { id: 'products3', name: 'Modern Living', image: products3 },
  { id: 'background', name: 'Background', image: backgroundImg },
  { id: 'background2', name: 'Background 2', image: backgroundimage2 }
]

export function ProductShowcaseSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [heroCarouselIndex, setHeroCarouselIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)

  // Memoized product data to prevent recalculation
  const currentProduct = useMemo(() => models[currentImageIndex], [currentImageIndex])
  const discountPercentage = useMemo(() => 
    Math.round(((currentProduct.originalPrice - currentProduct.price) / currentProduct.originalPrice) * 100),
    [currentProduct]
  )

  // Preload images for smooth transitions
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = [
        ...heroBackgrounds.map(bg => {
          const img = new Image()
          img.src = bg.image
          return new Promise(resolve => {
            img.onload = resolve
            img.onerror = resolve
          })
        }),
        ...models.map(model => {
          const img = new Image()
          img.src = model.image
          return new Promise(resolve => {
            img.onload = resolve
            img.onerror = resolve
          })
        })
      ]
      
      await Promise.all(imagePromises)
      setImagesLoaded(true)
    }
    
    preloadImages()
  }, [])

  // Scroll detection to pause background carousel during scroll
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout
    
    const handleScroll = () => {
      setIsScrolling(true)
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
      }, 150) // Stop scrolling after 150ms of no scroll
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  // Optimized auto-carousel that pauses during scroll
  useEffect(() => {
    if (isScrolling) return // Don't change background while scrolling
    
    const backgroundInterval = setInterval(() => {
      if (!isScrolling) { // Double check before changing
        setHeroCarouselIndex(prev => (prev + 1) % heroBackgrounds.length)
      }
    }, 3000) // Increased to 3000ms for smoother experience
    
    return () => clearInterval(backgroundInterval)
  }, [isScrolling])

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % models.length)
  }, [])

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + models.length) % models.length)
  }, [])

  return (
    <section className="py-20 bg-white text-[#36454F]">
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
        .carousel-item {
          will-change: transform, opacity;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        }
        .bg-carousel {
          will-change: opacity;
          transform: translate3d(0, 0, 0);
        }
        .product-image {
          will-change: transform;
          transform: translate3d(0, 0, 0);
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
            <h1 className="text-4xl lg:text-5xl font-sora font-bold text-[#36454F] mb-6">
              Choose Your Perfect Air Purifier
            </h1>
            <p className="text-xl text-gray-600 font-montserrat max-w-3xl mx-auto">
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
                      key={product.id}
                      className={`carousel-item absolute inset-0 transition-all duration-700 ease-in-out ${
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
                        className="product-image w-full h-full object-contain"
                        loading="eager"
                        decoding="async"
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
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-4 -right-4 z-30 bg-red-500 text-white px-4 py-2 rounded-full font-sora font-semibold shadow-lg"
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-3xl lg:text-4xl font-sora font-bold text-[#36454F] mb-4"
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
                <h4 className="text-lg font-semibold mb-4 font-sora text-[#36454F]">Select Your Model:</h4>
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
                  <Link to="/checkout">
                    <Button className="bg-green-800 hover:bg-green-900 text-white font-semibold px-6 py-3 rounded-full font-sora transition-all duration-200">
                      BUY NOW - ₹{currentProduct.price.toLocaleString()}
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* New Hero Section - Bigger. Faster. Stronger. */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 relative overflow-hidden rounded-3xl shadow-2xl"
          style={{ height: '600px' }}
        >
          {/* Optimized Background Image Carousel */}
          <div className="absolute inset-0">
            {heroBackgrounds.map((bg, index) => (
              <div
                key={bg.id}
                className={`bg-carousel absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out ${
                  index === heroCarouselIndex ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  backgroundImage: `url(${bg.image})`
                }}
              >
                <div className="absolute inset-0 bg-black/25"></div>
              </div>
            ))}
          </div>

          {/* Content Container */}
          <div className="relative z-10 flex flex-col justify-between h-full p-8 lg:p-16">
            
            {/* Top Section - Typography */}
            <div className="text-center mb-8">
              <motion.h1 
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl lg:text-6xl font-sora font-bold text-white mb-4 leading-tight"
              >
                Bigger. Faster. <span className="text-blue-400">Stronger</span>.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg lg:text-xl text-gray-300 font-montserrat font-light tracking-wider"
              >
                PURE AIR EVERYWHERE
              </motion.p>
            </div>

            {/* Center Section - Products Display */}
            <div className="flex-1 relative">
              

            </div>
          </div>
        </motion.div>

        {/* Information Badges with Product Images - Below Background Container */}
        <div className="mt-8 flex justify-center items-center relative">
          {/* Storm Specs - Left Side */}
          <div className="text-center mr-8">
            <h4 className="text-[#36454F] font-sora font-semibold text-lg mb-3">Storm</h4>
            <div className="flex gap-3">
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center shadow-md">
                <div className="text-gray-600 text-xs font-montserrat font-medium">Area Coverage</div>
                <div className="text-green-800 font-sora font-bold text-sm">1000 sq. ft.</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center shadow-md">
                <div className="text-gray-600 text-xs font-montserrat font-medium">CADR</div>
                <div className="text-green-800 font-sora font-bold text-sm">600m³/h</div>
              </div>
            </div>
          </div>

          {/* Product Images - Center with Overlap */}
          <div className="relative flex items-center justify-center mx-8 -mt-96">
            {/* Storm Image - No Animation */}
            <div className="relative z-30">
              <img
                src={stormSideView}
                alt="Vaayura Storm"
                className="product-image h-80 lg:h-96 w-auto object-contain"
                style={{ 
                  filter: 'drop-shadow(0 25px 60px rgba(0, 0, 0, 0.4))',
                  transform: 'translate3d(0, 0, 0)' // GPU acceleration
                }}
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Nest Image - No Animation */}
            <div className="relative z-40 -ml-48 mt-16">
              <img
                src={nestFrontView}
                alt="Vaayura Nest"
                className="product-image h-80 lg:h-96 w-auto object-contain"
                style={{ 
                  filter: 'drop-shadow(0 15px 40px rgba(0, 0, 0, 0.3))',
                  transform: 'translate3d(0, 0, 0)' // GPU acceleration
                }}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Nest Specs - Right Side */}
          <div className="text-center ml-8">
            <h4 className="text-[#36454F] font-sora font-semibold text-lg mb-3">Nest</h4>
            <div className="flex gap-3">
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center shadow-md">
                <div className="text-gray-600 text-xs font-montserrat font-medium">Area Coverage</div>
                <div className="text-green-800 font-sora font-bold text-sm">600 sq. ft.</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center shadow-md">
                <div className="text-gray-600 text-xs font-montserrat font-medium">CADR</div>
                <div className="text-green-800 font-sora font-bold text-sm">450m³/h</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}