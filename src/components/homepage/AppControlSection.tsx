import React, { useState } from 'react'
import { motion } from 'framer-motion'
import appHomescreenImg from '@/assets/Mobile app/AppHomescreen.jpeg'

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
          <h2 className="text-4xl lg:text-5xl font-sora font-bold mb-6 text-gray-900">
            Breathe <span className="text-brand-pastel-green">Smart</span>
          </h2>
          <p className="text-xl text-gray-600 font-subheading max-w-2xl mx-auto">
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
              {/* Phone Frame with App Screenshot */}
              <div className="relative w-80 h-[600px] bg-gray-800 rounded-[3rem] p-4 border-4 border-gray-600">
                {/* Screen with App Image */}
                <div className="w-full h-full rounded-[2rem] relative overflow-hidden">
                  <img 
                    src={appHomescreenImg} 
                    alt="Vaayura App Homescreen" 
                    className="w-full h-full object-cover object-top rounded-[2rem]"
                  />
                  
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}