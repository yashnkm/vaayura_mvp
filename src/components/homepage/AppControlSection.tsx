import React, { useState } from 'react'
import { motion } from 'framer-motion'

const features = [
  {
    id: 'turn-on-off',
    name: 'Turn On/Off',
    description: 'Enable smart air purification from anywhere with Vaayura App and come back to pure air even when you\'re away from home!',
    appHighlight: 'power-button'
  },
  {
    id: 'choose-mode',
    name: 'Choose Mode',
    description: 'Select from multiple purification modes based on your needs',
    appHighlight: 'mode-controls'
  },
  {
    id: 'child-lock',
    name: 'Child Lock',
    description: 'Keep your device safe with child lock functionality',
    appHighlight: 'child-lock'
  },
  {
    id: 'schedule',
    name: 'Schedule',
    description: 'Set automatic schedules for optimal air purification',
    appHighlight: 'schedule'
  },
  {
    id: 'filter-life',
    name: 'Filter Life',
    description: 'Monitor and track your filter\'s remaining life',
    appHighlight: 'filter-status'
  }
]

export function AppControlSection() {
  const [activeFeature, setActiveFeature] = useState('turn-on-off')

  const activeFeatureData = features.find(f => f.id === activeFeature) || features[0]

  return (
    <section className="py-20 bg-white text-gray-900">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-sora font-bold mb-6">
            Breathe <span className="text-green-600">Smart</span>
          </h2>
          <p className="text-xl text-gray-600 font-sora max-w-2xl mx-auto">
            PURIFY AIR FROM THE VAAYURA APP
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side: App Control Features */}
          <div className="space-y-8">
            <h3 className="text-2xl font-sora font-semibold mb-8 text-green-800">App Control</h3>
            
            {/* Active Feature Description */}
            <motion.div 
              key={activeFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-green-50 rounded-2xl p-6 mb-8 border border-green-200"
            >
              <h4 className="text-lg font-semibold font-sora text-green-800 mb-2">
                Enable smart air {activeFeatureData.name.toLowerCase()}
              </h4>
              <p className="text-gray-700 font-sora leading-relaxed">
                {activeFeatureData.description}
              </p>
            </motion.div>

            {/* Feature List with Vertical Line */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-600"></div>
              
              {/* Active Feature Indicator */}
              <motion.div
                className="absolute left-0 w-0.5 bg-green-600 rounded-full"
                animate={{
                  top: `${features.findIndex(f => f.id === activeFeature) * 60 + 10}px`,
                  height: '40px'
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />

              {/* Feature Items */}
              <div className="space-y-6 pl-8">
                {features.map((feature) => (
                  <motion.button
                    key={feature.id}
                    onClick={() => setActiveFeature(feature.id)}
                    whileHover={{ 
                      x: 8,
                      scale: 1.05,
                      transition: { type: "spring", stiffness: 400, damping: 25 }
                    }}
                    whileTap={{ 
                      scale: 0.98,
                      x: 12,
                      transition: { duration: 0.1 }
                    }}
                    animate={activeFeature === feature.id ? {
                      x: 10,
                      textShadow: "0 0 8px rgba(34, 197, 94, 0.6)",
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    } : { x: 0 }}
                    className={`block text-left transition-all duration-300 font-sora py-2 px-3 rounded-lg relative ${
                      activeFeature === feature.id
                        ? 'text-green-800 font-semibold bg-green-50/50 shadow-md'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    {activeFeature === feature.id && (
                      <motion.div
                        layoutId="activeFeatureGlow"
                        className="absolute inset-0 bg-gradient-to-r from-green-100/80 to-green-50/80 rounded-lg border border-green-200/50"
                        initial={false}
                        animate={{
                          boxShadow: "0 4px 12px rgba(34, 197, 94, 0.15), 0 0 20px rgba(34, 197, 94, 0.1)"
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <span className="relative z-10">{feature.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Right side: Mobile App Mockup */}
          <div className="flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Phone Frame */}
              <div className="relative w-80 h-[600px] bg-gray-800 rounded-[3rem] p-4 border-4 border-gray-600">
                {/* Screen */}
                <div className="w-full h-full bg-gradient-to-b from-green-900 to-gray-900 rounded-[2rem] p-6 relative overflow-hidden">
                  
                  {/* Status Bar */}
                  <div className="flex justify-between items-center text-white text-sm mb-6">
                    <span>Vaayura</span>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                  </div>

                  {/* Air Quality Display */}
                  <div className="text-center mb-8">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <div className="w-full h-full rounded-full border-4 border-green-500 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-white">35</div>
                          <div className="text-xs text-green-300">AQI</div>
                        </div>
                      </div>
                    </div>
                    <p className="text-green-300 text-sm">Air Quality: Good</p>
                  </div>

                  {/* Power Button - Highlighted when Turn On/Off is active */}
                  <motion.div 
                    className="text-center mb-6 relative"
                    animate={activeFeature === 'turn-on-off' ? { 
                      scale: 1.3,
                      y: -10,
                      z: 50,
                      transition: { type: "spring", stiffness: 200, damping: 15 }
                    } : { 
                      scale: 1,
                      y: 0,
                      z: 0,
                      transition: { type: "spring", stiffness: 250, damping: 20 }
                    }}
                  >
                    {activeFeature === 'turn-on-off' && (
                      <>
                        {/* Multiple glow layers */}
                        <motion.div
                          className="absolute -inset-8 rounded-full blur-2xl opacity-60"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ 
                            scale: [1, 1.4, 1],
                            opacity: [0.6, 1, 0.6],
                            backgroundColor: ["rgba(34, 197, 94, 0.4)", "rgba(34, 197, 94, 0.8)", "rgba(34, 197, 94, 0.4)"]
                          }}
                          transition={{ 
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <motion.div
                          className="absolute -inset-4 rounded-full blur-lg opacity-80"
                          initial={{ scale: 0.7, opacity: 0 }}
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.8, 1, 0.8],
                            backgroundColor: ["rgba(34, 197, 94, 0.6)", "rgba(34, 197, 94, 0.9)", "rgba(34, 197, 94, 0.6)"]
                          }}
                          transition={{ 
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </>
                    )}
                    <motion.div 
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full transition-all duration-500 relative z-10 ${
                        activeFeature === 'turn-on-off' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-green-900/50 text-green-300'
                      }`}
                      animate={activeFeature === 'turn-on-off' ? {
                        boxShadow: [
                          "0 0 30px rgba(34, 197, 94, 0.8), 0 0 60px rgba(34, 197, 94, 0.5), 0 0 90px rgba(34, 197, 94, 0.3)",
                          "0 0 40px rgba(34, 197, 94, 1), 0 0 80px rgba(34, 197, 94, 0.7), 0 0 120px rgba(34, 197, 94, 0.4)",
                          "0 0 30px rgba(34, 197, 94, 0.8), 0 0 60px rgba(34, 197, 94, 0.5), 0 0 90px rgba(34, 197, 94, 0.3)"
                        ],
                        scale: [1, 1.1, 1]
                      } : {
                        boxShadow: "0 0 0px rgba(34, 197, 94, 0)",
                        scale: 1
                      }}
                      transition={{ 
                        boxShadow: { 
                          duration: 1.5, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        },
                        scale: { 
                          duration: 1.5, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }
                      }}
                    >
                      <motion.div 
                        className="text-2xl"
                        animate={activeFeature === 'turn-on-off' ? {
                          rotate: [0, 360],
                          scale: [1, 1.3, 1]
                        } : {}}
                        transition={{ 
                          duration: 1.2, 
                          repeat: activeFeature === 'turn-on-off' ? Infinity : 0,
                          ease: "easeInOut"
                        }}
                      >
                        ⚡
                      </motion.div>
                    </motion.div>
                    <motion.p 
                      className="text-white text-sm mt-2 relative z-10"
                      animate={activeFeature === 'turn-on-off' ? {
                        textShadow: "0 0 10px rgba(34, 197, 94, 0.8)"
                      } : {}}
                    >
                      Power On
                    </motion.p>
                  </motion.div>

                  {/* Control Grid - Mode controls highlighted */}
                  <motion.div 
                    className="grid grid-cols-4 gap-3 mb-6 relative"
                    animate={activeFeature === 'choose-mode' ? { 
                      scale: 1.15,
                      y: -8,
                      z: 30,
                      transition: { type: "spring", stiffness: 200, damping: 15 }
                    } : { 
                      scale: 1,
                      y: 0,
                      z: 0,
                      transition: { type: "spring", stiffness: 250, damping: 20 }
                    }}
                  >
                    {activeFeature === 'choose-mode' && (
                      <>
                        <motion.div
                          className="absolute -inset-6 rounded-xl opacity-60 blur-2xl"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.9, 0.5],
                            backgroundColor: ["rgba(34, 197, 94, 0.3)", "rgba(34, 197, 94, 0.6)", "rgba(34, 197, 94, 0.3)"]
                          }}
                          transition={{ 
                            duration: 1.6,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <motion.div
                          className="absolute -inset-3 rounded-xl opacity-70 blur-lg"
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ 
                            scale: [1, 1.1, 1],
                            opacity: [0.6, 0.9, 0.6],
                            backgroundColor: ["rgba(34, 197, 94, 0.4)", "rgba(34, 197, 94, 0.7)", "rgba(34, 197, 94, 0.4)"]
                          }}
                          transition={{ 
                            duration: 1.3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </>
                    )}
                    {['Auto', 'Sleep', 'Turbo', 'Manual'].map((mode, index) => (
                      <motion.div 
                        key={mode}
                        className={`p-3 rounded-lg text-center transition-all duration-300 relative z-10 ${
                          activeFeature === 'choose-mode' && index === 0
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-700/50 text-gray-300'
                        }`}
                        animate={activeFeature === 'choose-mode' && index === 0 ? {
                          boxShadow: [
                            "0 0 25px rgba(34, 197, 94, 0.7), 0 0 50px rgba(34, 197, 94, 0.4)",
                            "0 0 35px rgba(34, 197, 94, 0.9), 0 0 70px rgba(34, 197, 94, 0.6)",
                            "0 0 25px rgba(34, 197, 94, 0.7), 0 0 50px rgba(34, 197, 94, 0.4)"
                          ],
                          scale: [1, 1.1, 1],
                          y: [-2, -4, -2]
                        } : activeFeature === 'choose-mode' ? {
                          scale: [1, 1.02, 1]
                        } : {}}
                        transition={{ 
                          duration: 1.4, 
                          repeat: activeFeature === 'choose-mode' ? Infinity : 0,
                          ease: "easeInOut"
                        }}
                      >
                        <motion.div 
                          className="text-xs"
                          animate={activeFeature === 'choose-mode' && index === 0 ? {
                            textShadow: "0 0 8px rgba(255, 255, 255, 0.8)"
                          } : {}}
                        >
                          {mode}
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Bottom Controls */}
                  <motion.div 
                    className="grid grid-cols-3 gap-4 relative"
                    animate={['child-lock', 'schedule', 'filter-life'].includes(activeFeature) ? { 
                      scale: 1.12,
                      y: -6,
                      z: 25,
                      transition: { type: "spring", stiffness: 200, damping: 15 }
                    } : { 
                      scale: 1,
                      y: 0,
                      z: 0,
                      transition: { type: "spring", stiffness: 250, damping: 20 }
                    }}
                  >
                    {['child-lock', 'schedule', 'filter-life'].includes(activeFeature) && (
                      <>
                        <motion.div
                          className="absolute -inset-4 rounded-lg opacity-50 blur-xl"
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ 
                            scale: [1, 1.15, 1],
                            opacity: [0.4, 0.8, 0.4],
                            backgroundColor: ["rgba(34, 197, 94, 0.25)", "rgba(34, 197, 94, 0.5)", "rgba(34, 197, 94, 0.25)"]
                          }}
                          transition={{ 
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <motion.div
                          className="absolute -inset-2 rounded-lg opacity-60 blur-md"
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ 
                            scale: [1, 1.08, 1],
                            opacity: [0.5, 0.8, 0.5],
                            backgroundColor: ["rgba(34, 197, 94, 0.3)", "rgba(34, 197, 94, 0.6)", "rgba(34, 197, 94, 0.3)"]
                          }}
                          transition={{ 
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </>
                    )}
                    
                    <motion.div 
                      className={`p-3 rounded-lg text-center transition-all duration-300 relative z-10 ${
                        activeFeature === 'child-lock' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-700/50 text-gray-300'
                      }`}
                      animate={activeFeature === 'child-lock' ? {
                        boxShadow: [
                          "0 0 20px rgba(34, 197, 94, 0.7), 0 0 40px rgba(34, 197, 94, 0.4)",
                          "0 0 30px rgba(34, 197, 94, 0.9), 0 0 60px rgba(34, 197, 94, 0.6)",
                          "0 0 20px rgba(34, 197, 94, 0.7), 0 0 40px rgba(34, 197, 94, 0.4)"
                        ],
                        scale: [1, 1.08, 1],
                        y: [-2, -4, -2]
                      } : {}}
                      transition={{ 
                        duration: 1.3, 
                        repeat: activeFeature === 'child-lock' ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    >
                      <motion.div 
                        className="text-xs mb-1"
                        animate={activeFeature === 'child-lock' ? {
                          rotate: [0, -15, 15, 0],
                          scale: [1, 1.2, 1]
                        } : {}}
                        transition={{ 
                          duration: 1.8, 
                          repeat: activeFeature === 'child-lock' ? Infinity : 0,
                          ease: "easeInOut"
                        }}
                      >
                        🔒
                      </motion.div>
                      <motion.div 
                        className="text-xs"
                        animate={activeFeature === 'child-lock' ? {
                          textShadow: "0 0 6px rgba(255, 255, 255, 0.8)"
                        } : {}}
                      >
                        Child Lock
                      </motion.div>
                    </motion.div>
                    
                    <motion.div 
                      className={`p-3 rounded-lg text-center transition-all duration-300 relative z-10 ${
                        activeFeature === 'schedule' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-700/50 text-gray-300'
                      }`}
                      animate={activeFeature === 'schedule' ? {
                        boxShadow: [
                          "0 0 20px rgba(34, 197, 94, 0.7), 0 0 40px rgba(34, 197, 94, 0.4)",
                          "0 0 30px rgba(34, 197, 94, 0.9), 0 0 60px rgba(34, 197, 94, 0.6)",
                          "0 0 20px rgba(34, 197, 94, 0.7), 0 0 40px rgba(34, 197, 94, 0.4)"
                        ],
                        scale: [1, 1.08, 1],
                        y: [-2, -4, -2]
                      } : {}}
                      transition={{ 
                        duration: 1.3, 
                        repeat: activeFeature === 'schedule' ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    >
                      <motion.div 
                        className="text-xs mb-1"
                        animate={activeFeature === 'schedule' ? {
                          scale: [1, 1.3, 1],
                          rotate: [0, 10, -10, 0]
                        } : {}}
                        transition={{ 
                          duration: 1.5, 
                          repeat: activeFeature === 'schedule' ? Infinity : 0,
                          ease: "easeInOut"
                        }}
                      >
                        ⏰
                      </motion.div>
                      <motion.div 
                        className="text-xs"
                        animate={activeFeature === 'schedule' ? {
                          textShadow: "0 0 6px rgba(255, 255, 255, 0.8)"
                        } : {}}
                      >
                        Schedule
                      </motion.div>
                    </motion.div>
                    
                    <motion.div 
                      className={`p-3 rounded-lg text-center transition-all duration-300 relative z-10 ${
                        activeFeature === 'filter-life' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-700/50 text-gray-300'
                      }`}
                      animate={activeFeature === 'filter-life' ? {
                        boxShadow: [
                          "0 0 20px rgba(34, 197, 94, 0.7), 0 0 40px rgba(34, 197, 94, 0.4)",
                          "0 0 30px rgba(34, 197, 94, 0.9), 0 0 60px rgba(34, 197, 94, 0.6)",
                          "0 0 20px rgba(34, 197, 94, 0.7), 0 0 40px rgba(34, 197, 94, 0.4)"
                        ],
                        scale: [1, 1.08, 1],
                        y: [-2, -4, -2]
                      } : {}}
                      transition={{ 
                        duration: 1.3, 
                        repeat: activeFeature === 'filter-life' ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    >
                      <motion.div 
                        className="text-xs mb-1"
                        animate={activeFeature === 'filter-life' ? {
                          scale: [1, 1.4, 1],
                          opacity: [1, 0.6, 1]
                        } : {}}
                        transition={{ 
                          duration: 1.1, 
                          repeat: activeFeature === 'filter-life' ? Infinity : 0,
                          ease: "easeInOut"
                        }}
                      >
                        🟢
                      </motion.div>
                      <motion.div 
                        className="text-xs"
                        animate={activeFeature === 'filter-life' ? {
                          textShadow: "0 0 6px rgba(255, 255, 255, 0.8)"
                        } : {}}
                      >
                        Filter: 89%
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}