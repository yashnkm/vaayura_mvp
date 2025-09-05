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

interface ProductShowcaseSectionProps {
  productFilter?: 'storm' | 'nest'
}

export function ProductShowcaseSection({ productFilter }: ProductShowcaseSectionProps = {}) {
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
      <style>{`
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
          {/* Show both products if no filter, otherwise show only the filtered product */}
          {!productFilter ? (
            <>
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
            </>
          ) : (
            <>
              {/* Show only Storm */}
              {productFilter === 'storm' && (
                <>
                  <div className="text-center -mt-96">
                    <div className="relative flex justify-center mb-8">
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
                    <h4 className="text-[#36454F] font-sora font-semibold text-2xl mb-4">Storm</h4>
                    <div className="flex gap-4 justify-center">
                      <div className="bg-white border border-gray-200 rounded-lg px-6 py-4 text-center shadow-md">
                        <div className="text-gray-600 text-sm font-montserrat font-medium">Area Coverage</div>
                        <div className="text-green-800 font-sora font-bold text-lg">1000 sq. ft.</div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg px-6 py-4 text-center shadow-md">
                        <div className="text-gray-600 text-sm font-montserrat font-medium">CADR</div>
                        <div className="text-green-800 font-sora font-bold text-lg">600m³/h</div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Show only Nest */}
              {productFilter === 'nest' && (
                <>
                  <div className="text-center -mt-80">
                    <div className="relative flex justify-center mb-8">
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
                    <h4 className="text-[#36454F] font-sora font-semibold text-2xl mb-2 -mt-18">Nest</h4>
                    <div className="flex gap-4 justify-center mt-8">
                      <div className="bg-white border border-gray-200 rounded-lg px-6 py-4 text-center shadow-md">
                        <div className="text-gray-600 text-sm font-montserrat font-medium">Area Coverage</div>
                        <div className="text-green-800 font-sora font-bold text-lg">600 sq. ft.</div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg px-6 py-4 text-center shadow-md">
                        <div className="text-gray-600 text-sm font-montserrat font-medium">CADR</div>
                        <div className="text-green-800 font-sora font-bold text-lg">450m³/h</div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>

      </div>
    </section>
  )
}