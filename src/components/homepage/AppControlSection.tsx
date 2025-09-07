import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check } from 'lucide-react'
import appHomescreenImg from '@/assets/Mobile app/phone_ss.jpg'

const features = [
  {
    id: 'turn-on-off',
    name: 'Turn On/Off',
    description: 'Enable smart air purification from anywhere with Vaayura App and come back to pure air even when you\'re away from home!',
    appHighlight: 'power-button'
  },
  {
    id: 'choose-mode',
    name: 'Mode',
    description: 'Select from multiple purification modes based on your needs',
    appHighlight: 'mode-controls'
  },
  {
    id: 'speed',
    name: 'Speed',
    description: 'Adjust fan speed levels for optimal air circulation and noise control',
    appHighlight: 'speed-controls'
  },
  {
    id: 'settings',
    name: 'Settings',
    description: 'Configure device preferences, schedules, and advanced options',
    appHighlight: 'settings'
  },
  {
    id: 'countdown-timer',
    name: 'Countdown timer',
    description: 'Set automatic shutdown timers to save energy and customize operation duration',
    appHighlight: 'countdown-timer'
  },
  {
    id: 'schedule-power',
    name: 'Schedule power on/off',
    description: 'Create custom schedules to automatically turn your air purifier on or off at specific times',
    appHighlight: 'schedule-power'
  }
]

export function AppControlSection() {
  const [activeFeature, setActiveFeature] = useState('turn-on-off')
  const [expandedFeature, setExpandedFeature] = useState<string | null>('turn-on-off')
  const [showModal, setShowModal] = useState<string | null>(null)
  const [selectedMode, setSelectedMode] = useState('Auto')
  const [selectedSpeed, setSelectedSpeed] = useState('Low')
  const [selectedTimer, setSelectedTimer] = useState('Off')
  const [showMobile, setShowMobile] = useState(true)
  const [childLock, setChildLock] = useState(true)
  const [ambientLight, setAmbientLight] = useState(true)
  
  const modeOptions = ['Manual', 'Auto', 'Sleep']
  const speedOptions = ['Low', 'Medium', 'High']
  const timerOptions = ['Off', '2h', '4h', '8h']
  
  const settingsOptions = [
    { name: 'Child lock', type: 'toggle', value: childLock },
    { name: 'Ambient light', type: 'toggle', value: ambientLight },
    { name: 'Reset filter', type: 'action' },
    { name: 'Countdown timer', type: 'setting', value: selectedTimer },
    { name: 'Schedule power on/off', type: 'action' }
  ]

  const activeFeatureData = features.find(f => f.id === activeFeature) || features[0]
  
  const handleFeatureClick = (featureId: string) => {
    // Toggle expanded state for accordion behavior
    if (expandedFeature === featureId) {
      setExpandedFeature(null) // Collapse if already expanded
      // For the last button, reset to default position to maintain line continuity
      if (featureId === 'schedule-power') {
        setActiveFeature('turn-on-off')
      }
    } else {
      setExpandedFeature(featureId) // Expand the clicked feature
      setActiveFeature(featureId) // Update active feature for visual indicator
    }
    
    if (featureId === 'turn-on-off') {
      // Always show mobile when Turn On/Off is clicked
      setShowMobile(true)
      // Close any open modal
      if (showModal) {
        setShowModal(null)
      }
    } else if (featureId === 'choose-mode' || featureId === 'speed' || featureId === 'countdown-timer' || featureId === 'schedule-power' || featureId === 'settings') {
      if (showMobile) {
        setShowModal(featureId)
      }
    }
  }

  const handleSettingsToggle = (settingName: string) => {
    if (settingName === 'Child lock') {
      setChildLock(!childLock)
    } else if (settingName === 'Ambient light') {
      setAmbientLight(!ambientLight)
    } else if (settingName === 'Countdown timer') {
      setShowModal('countdown-timer')
    } else if (settingName === 'Schedule power on/off') {
      setShowModal('schedule-power')
    }
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white text-[#36454F]">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-left mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sora font-bold mb-4 sm:mb-6 text-[#36454F]">
            Breathe <span className="text-brand-pastel-green">Smart</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 font-montserrat max-w-2xl">
            Purify air from the Vaayura app
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left side: App Control Features */}
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            <h3 className="text-xl sm:text-2xl font-sora font-semibold mb-6 sm:mb-8 text-green-800">App Control</h3>
            
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
              <div className="space-y-3 sm:space-y-2 pl-6 sm:pl-8">
                {features.map((feature) => (
                  <div key={feature.id}>
                    <motion.button
                      onClick={() => handleFeatureClick(feature.id)}
                      whileHover={{ 
                        x: 4,
                        scale: 1.02,
                        transition: { type: "spring", stiffness: 400, damping: 25 }
                      }}
                      whileTap={{ 
                        scale: 0.98,
                        x: 8,
                        transition: { duration: 0.1 }
                      }}
                      animate={activeFeature === feature.id ? {
                        x: 6,
                        textShadow: "0 0 8px rgba(34, 197, 94, 0.6)",
                        transition: { type: "spring", stiffness: 300, damping: 20 }
                      } : { x: 0 }}
                      className={`block text-left transition-all duration-300 font-sora py-3 px-4 rounded-lg relative w-full touch-manipulation text-sm sm:text-base min-h-[50px] sm:min-h-[auto] ${
                        activeFeature === feature.id
                          ? 'text-green-800 font-semibold bg-green-50/50 shadow-md'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50 active:bg-gray-100'
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
                    
                    {/* Expandable Description under each button */}
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: expandedFeature === feature.id ? "auto" : 0,
                        opacity: expandedFeature === feature.id ? 1 : 0,
                        marginTop: expandedFeature === feature.id ? 8 : 0
                      }}
                      transition={{ 
                        duration: 0.25, 
                        ease: [0.04, 0.62, 0.23, 0.98],
                        height: { duration: 0.25 },
                        opacity: { duration: 0.15, delay: expandedFeature === feature.id ? 0.1 : 0 }
                      }}
                      className="overflow-hidden ml-4"
                    >
                      <div className="bg-green-50 rounded-lg p-2.5 border border-green-200">
                        <h4 className="text-sm font-semibold font-sora text-green-800 mb-2">
                          Enable smart air {feature.name.toLowerCase()}
                        </h4>
                        <p className="text-gray-700 font-sora text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right side: Mobile App Mockup */}
          <div className="flex justify-center items-center min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] order-1 lg:order-2">
            <div className="relative w-[200px] h-[400px] sm:w-[240px] sm:h-[480px] lg:w-[280px] lg:h-[580px] flex-shrink-0"> {/* Responsive container */}
              <AnimatePresence mode="wait">
                {showMobile && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 w-full h-full"
                  >
                  {/* iPhone 16 Pro Frame - Fixed Dimensions */}
                  <div className="absolute inset-0 w-[280px] h-[580px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.8rem] p-[3px]" 
                    style={{ 
                      filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2))' 
                    }}
                  >
                    {/* iPhone 16 Pro titanium frame edge */}
                    <div className="absolute inset-[3px] rounded-[2.6rem] bg-gradient-to-b from-gray-700 to-gray-800 p-[5px]">
                      
                      {/* Screen Content - Fixed Dimensions */}
                      <div className="w-full h-full rounded-[2.4rem] relative overflow-hidden bg-black">
                        
                        
                        {/* Screen area */}
                        <div className="w-full h-full relative overflow-hidden rounded-[2.4rem]">
                          
                          {/* Always show the static image */}
                          <img 
                            src={appHomescreenImg} 
                            alt="Vaayura App Homescreen" 
                            className="w-full h-full object-cover object-center rounded-[2.4rem]"
                            style={{ 
                              objectPosition: 'center center',
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                            loading="lazy"
                          />

                      {/* Modal Popup Overlay on Phone */}
                      <AnimatePresence>
                        {showModal && (
                          <>
                            {/* Black tint background - only for popups */}
                            {(showModal === 'choose-mode' || showModal === 'speed') && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black bg-opacity-50 rounded-[2.4rem]"
                              />
                            )}
                            
                            {/* Settings and Schedule Power Full Screen */}
                            {(showModal === 'settings' || showModal === 'schedule-power' || showModal === 'countdown-timer') && (
                              <motion.div
                                initial={{ x: 300, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 300, opacity: 0 }}
                                className="absolute inset-0 bg-gray-100 rounded-[2.4rem] z-10"
                              >
                                {/* Status Bar */}
                                <div className="flex justify-between items-center p-4 text-gray-800 text-sm">
                                  <span>12:06</span>
                                  <div className="flex items-center space-x-1">
                                    <span>66%</span>
                                    <div className="w-6 h-3 border border-gray-800 rounded-sm">
                                      <div className="w-4 h-full bg-gray-800 rounded-sm"></div>
                                    </div>
                                  </div>
                                </div>

                                {/* Header */}
                                <div className="flex items-center px-6 py-4">
                                  <button 
                                    onClick={() => setShowModal(null)}
                                    className="mr-4"
                                  >
                                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                  </button>
                                  <h1 className="text-lg font-semibold text-[#36454F]">
                                    {showModal === 'settings' ? 'Settings' : showModal === 'schedule-power' ? 'Schedule' : 'Settings'}
                                  </h1>
                                </div>

                                {/* Content List */}
                                <div className="px-4 pt-4">
                                  {(showModal === 'settings' || showModal === 'countdown-timer') ? (
                                    /* Settings List */
                                    settingsOptions.map((setting, index) => (
                                      <motion.button
                                        key={index}
                                        onClick={() => handleSettingsToggle(setting.name)}
                                        whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-white hover:bg-gray-50 border-b border-gray-100 last:border-b-0 px-4 py-4 transition-colors cursor-pointer"
                                      >
                                        <div className="flex justify-between items-center">
                                          <span className="text-xs font-normal text-[#36454F] text-left">{setting.name}</span>
                                          {setting.type === 'toggle' && (
                                            <div className={`w-11 h-6 rounded-full ${setting.value ? 'bg-blue-500' : 'bg-gray-300'} relative transition-colors`}>
                                              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${setting.value ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
                                            </div>
                                          )}
                                          {setting.type === 'setting' && (
                                            <div className="flex items-center space-x-2">
                                              <span className="text-gray-500 text-xs">{setting.value}</span>
                                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                              </svg>
                                            </div>
                                          )}
                                          {setting.type === 'action' && (
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                          )}
                                        </div>
                                      </motion.button>
                                    ))
                                  ) : (
                                    /* Schedule Power Content */
                                    <div className="px-3">
                                      {/* Time variance note */}
                                      <div className="px-1 py-2 mb-3">
                                        <p className="text-[10px] text-gray-500">Time variance is ±30s</p>
                                      </div>

                                      {/* Schedule Items */}
                                      <div className="space-y-3">
                                        {/* PM 6:30 Schedule */}
                                        <div className="bg-gray-50 rounded px-3 py-3">
                                          <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-light text-gray-300">PM 6:30</span>
                                            <div className="w-9 h-5 rounded-full bg-gray-300 relative transition-colors">
                                              <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 translate-x-0.5"></div>
                                            </div>
                                          </div>
                                          <p className="text-[10px] text-gray-400 mb-0.5">Once</p>
                                          <p className="text-[10px] text-gray-400">Switch:ON</p>
                                        </div>

                                        {/* PM 11:00 Schedule */}
                                        <div className="bg-white rounded px-3 py-3 border border-gray-200">
                                          <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-light text-[#36454F]">PM 11:00</span>
                                            <div className="w-9 h-5 rounded-full bg-green-500 relative transition-colors">
                                              <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 translate-x-4"></div>
                                            </div>
                                          </div>
                                          <p className="text-xs text-gray-600 mb-0.5">Every day</p>
                                          <p className="text-xs text-gray-600">Switch:OFF</p>
                                        </div>
                                      </div>

                                      {/* Add Schedule Button */}
                                      <motion.button
                                        whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full mt-6 mb-3 py-3 bg-white border-t border-gray-200 transition-colors"
                                      >
                                        <span className="text-base font-normal text-[#36454F]">Add Schedule</span>
                                      </motion.button>
                                    </div>
                                  )}
                                </div>

                                {/* Black overlay OVER the Settings screen content for countdown timer */}
                                {showModal === 'countdown-timer' && (
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-black bg-opacity-50 rounded-[2.4rem] z-10"
                                  />
                                )}
                              </motion.div>
                            )}


                            {/* Mode and Speed Popups */}
                            {(showModal === 'choose-mode' || showModal === 'speed') && (
                              <motion.div
                                initial={{ y: 300, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 300, opacity: 0 }}
                                className="absolute bottom-6 left-6 right-6 bg-white rounded-2xl shadow-2xl overflow-hidden z-10"
                              >
                                {showModal === 'choose-mode' && (
                                  <div>
                                    <h3 className="text-base font-medium text-center py-2 text-[#36454F]">Mode</h3>
                                    <div>
                                      {modeOptions.map((mode, index) => (
                                        <button
                                          key={mode}
                                          onClick={() => setSelectedMode(mode)}
                                          className={`w-full py-2 px-3 text-center flex justify-center items-center relative hover:bg-gray-50 transition-colors ${
                                            index < modeOptions.length - 1 ? 'border-b border-gray-100' : ''
                                          }`}
                                        >
                                          <span className="text-sm font-normal text-gray-800">{mode}</span>
                                          {selectedMode === mode && (
                                            <Check className="text-blue-500 absolute right-4" size={18} strokeWidth={2.5} />
                                          )}
                                        </button>
                                      ))}
                                    </div>
                                    
                                    {/* Separator */}
                                    <div className="border-t border-gray-200 my-2"></div>
                                    
                                    <button
                                      onClick={() => setShowModal(null)}
                                      className="w-full py-2 text-center text-sm font-normal text-gray-500 hover:bg-gray-50 transition-colors"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                )}

                                {showModal === 'speed' && (
                                  <div>
                                    <h3 className="text-base font-medium text-center py-2 text-[#36454F]">Speed</h3>
                                    <div>
                                      {speedOptions.map((speed, index) => (
                                        <button
                                          key={speed}
                                          onClick={() => setSelectedSpeed(speed)}
                                          className={`w-full py-2 px-3 text-center flex justify-center items-center relative hover:bg-gray-50 transition-colors ${
                                            index < speedOptions.length - 1 ? 'border-b border-gray-100' : ''
                                          }`}
                                        >
                                          <span className="text-sm font-normal text-gray-800">{speed}</span>
                                          {selectedSpeed === speed && (
                                            <Check className="text-blue-500 absolute right-4" size={18} strokeWidth={2.5} />
                                          )}
                                        </button>
                                      ))}
                                    </div>
                                    
                                    {/* Separator */}
                                    <div className="border-t border-gray-200 my-2"></div>
                                    
                                    <button
                                      onClick={() => setShowModal(null)}
                                      className="w-full py-2 text-center text-sm font-normal text-gray-500 hover:bg-gray-50 transition-colors"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                )}


                              </motion.div>
                            )}

                            {/* Countdown Timer Popup - separate from other popups */}
                            {showModal === 'countdown-timer' && (
                              <motion.div
                                initial={{ y: 300, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 300, opacity: 0 }}
                                className="absolute bottom-6 left-6 right-6 bg-white rounded-2xl shadow-2xl overflow-hidden z-20"
                              >
                                <div>
                                  <h3 className="text-base font-medium text-center py-2 text-[#36454F]">Countdown timer</h3>
                                  <div>
                                    {timerOptions.map((timer, index) => (
                                      <motion.button
                                        key={timer}
                                        onClick={() => setSelectedTimer(timer)}
                                        whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`w-full py-2 px-3 text-center flex justify-center items-center relative transition-colors ${
                                          index < timerOptions.length - 1 ? 'border-b border-gray-100' : ''
                                        }`}
                                      >
                                        <span className="text-sm font-normal text-gray-800">{timer}</span>
                                        {selectedTimer === timer && (
                                          <Check className="text-blue-500 absolute right-3" size={16} strokeWidth={2.5} />
                                        )}
                                      </motion.button>
                                    ))}
                                  </div>
                                  
                                  <div className="border-t border-gray-200"></div>
                                  
                                  <motion.button
                                    onClick={() => setShowModal(null)}
                                    whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-1.5 text-center text-xs font-normal text-gray-500 transition-colors"
                                  >
                                    Cancel
                                  </motion.button>
                                </div>
                              </motion.div>
                            )}

                          </>
                        )}
                      </AnimatePresence>
                      
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}