import React from 'react'
import { motion } from 'framer-motion'

// Import filter images
import primaryFilter from "@/assets/sections/homepage/filtration/primary.png"
import antibacterialFilter from "@/assets/sections/homepage/filtration/anit bacterial.png"
import hepaFilter from "@/assets/sections/homepage/filtration/true hepa.png"
import honeycombFilter from "@/assets/sections/homepage/filtration/honeycomb.png"


export function FiltrationTechnologyReference() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-black"></div>
      
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left side - Text content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-5xl lg:text-6xl font-sora font-bold text-white mb-4 leading-tight">
                Breathe <span className="text-cyan-400">Healthy</span>
              </h1>
              <h2 className="text-xl lg:text-2xl font-montserrat text-cyan-300 font-semibold tracking-wide">
                FILTER THE HIDDEN DANGERS
              </h2>
            </div>

            {/* Info box */}
            <div className="bg-gray-800/60 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6">
              <p className="text-white font-montserrat leading-relaxed">
                <strong className="text-cyan-400">Four-layer filtration</strong> in the air purifier traps{' '}
                <strong className="text-cyan-400">99.99%</strong> of invisible but harmful{' '}
                <strong className="text-cyan-400">~PM0.1</strong> and{' '}
                <strong className="text-cyan-400">PM2.5</strong> level pollutants from the air around you.
              </p>
            </div>

            {/* Filter layer descriptions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                <span className="text-white font-montserrat">Pre-filter - Captures large particles</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-white font-montserrat">HEPA-13 - 99.97% efficiency</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <span className="text-white font-montserrat">Activated Carbon - Odor elimination</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-white font-montserrat">Anti-Bacterial - Germ protection</span>
              </div>
            </div>
          </motion.div>

          {/* Right side - 3D Filter visualization */}
          <div className="relative h-[600px] flex items-center justify-center">
            
            {/* Filter layers in 3D perspective */}
            <div className="relative" style={{ perspective: '1000px' }}>
              
              {/* Pre-filter (outermost) */}
              <motion.div
                initial={{ opacity: 0, rotateY: -30, x: -100 }}
                whileInView={{ opacity: 1, rotateY: -15, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="absolute"
                style={{ 
                  transform: 'rotateY(-15deg) translateZ(150px)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="relative">
                  <img 
                    src={primaryFilter} 
                    alt="Pre-filter" 
                    className="w-56 h-72 object-contain drop-shadow-2xl border-2 border-cyan-400/30"
                    onError={(e) => {
                      console.log('Primary filter image failed to load:', primaryFilter)
                      e.currentTarget.style.border = '2px solid red'
                    }}
                    onLoad={() => console.log('Primary filter loaded successfully')}
                  />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/70 px-3 py-1 rounded text-white text-sm font-montserrat whitespace-nowrap">
                    Pre-filter
                  </div>
                </div>
              </motion.div>

              {/* HEPA-13 filter */}
              <motion.div
                initial={{ opacity: 0, rotateY: -20, x: -80 }}
                whileInView={{ opacity: 1, rotateY: -10, x: 20 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
                className="absolute"
                style={{ 
                  transform: 'rotateY(-10deg) translateZ(100px)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="relative">
                  <img 
                    src={hepaFilter} 
                    alt="HEPA-13" 
                    className="w-52 h-68 object-contain drop-shadow-2xl border-2 border-cyan-400/30 bg-white/10"
                    onError={(e) => {
                      console.log('HEPA filter image failed to load:', hepaFilter)
                      e.currentTarget.style.border = '2px solid red'
                    }}
                  />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/70 px-3 py-1 rounded text-white text-sm font-montserrat whitespace-nowrap">
                    HEPA-13
                  </div>
                </div>
              </motion.div>

              {/* Activated Carbon Filter */}
              <motion.div
                initial={{ opacity: 0, rotateY: -10, x: -60 }}
                whileInView={{ opacity: 1, rotateY: -5, x: 40 }}
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: true }}
                className="absolute"
                style={{ 
                  transform: 'rotateY(-5deg) translateZ(50px)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="relative">
                  <img 
                    src={honeycombFilter} 
                    alt="Activated Carbon Filter" 
                    className="w-48 h-64 object-contain drop-shadow-2xl border-2 border-cyan-400/30 bg-white/10"
                    onError={(e) => {
                      console.log('Honeycomb filter image failed to load:', honeycombFilter)
                      e.currentTarget.style.border = '2px solid red'
                    }}
                  />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/70 px-3 py-1 rounded text-white text-sm font-montserrat whitespace-nowrap">
                    Activated<br/>Carbon Filter
                  </div>
                </div>
              </motion.div>

              {/* Anti-Bacterial Filter (innermost) */}
              <motion.div
                initial={{ opacity: 0, rotateY: 0, x: -40 }}
                whileInView={{ opacity: 1, rotateY: 0, x: 60 }}
                transition={{ duration: 1, delay: 0.8 }}
                viewport={{ once: true }}
                className="absolute"
                style={{ 
                  transform: 'rotateY(0deg) translateZ(0px)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="relative">
                  <img 
                    src={antibacterialFilter} 
                    alt="Anti-Bacterial Filter" 
                    className="w-44 h-60 object-contain drop-shadow-2xl border-2 border-cyan-400/30 bg-white/10"
                    onError={(e) => {
                      console.log('Anti-bacterial filter image failed to load:', antibacterialFilter)
                      e.currentTarget.style.border = '2px solid red'
                    }}
                  />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/70 px-3 py-1 rounded text-white text-sm font-montserrat whitespace-nowrap">
                    Anti-Bacterial<br/>Coating
                  </div>
                </div>
              </motion.div>
            </div>


            {/* Airflow lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <defs>
                <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(34, 211, 238, 0)" />
                  <stop offset="50%" stopColor="rgba(34, 211, 238, 0.6)" />
                  <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
                </linearGradient>
              </defs>
              
              {/* Curved flow lines */}
              <motion.path
                d="M 50 150 Q 200 200 400 180 Q 500 170 550 150"
                stroke="url(#flowGradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <motion.path
                d="M 30 300 Q 180 350 380 320 Q 480 300 530 280"
                stroke="url(#flowGradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, delay: 0.5, repeat: Infinity, ease: "linear" }}
              />
              <motion.path
                d="M 70 450 Q 220 500 420 470 Q 520 450 570 430"
                stroke="url(#flowGradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, delay: 1, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}