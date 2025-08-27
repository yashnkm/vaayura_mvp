import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check } from 'lucide-react'
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
    setActiveFeature(featureId)
    
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
                    onClick={() => handleFeatureClick(feature.id)}
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
          <div className="flex justify-center items-center min-h-[600px]">
            <div className="relative w-[280px] h-[580px] flex-shrink-0"> {/* Fixed container */}
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
                        
                        {/* Dynamic Island */}
                        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-full z-40 shadow-inner border border-gray-800"></div>
                        
                        {/* Screen area */}
                        <div className="w-full h-full relative overflow-hidden rounded-[2.4rem]">
                          
                          {/* Always show the static image */}
                          <img 
                            src={appHomescreenImg} 
                            alt="Vaayura App Homescreen" 
                            className="w-full h-full object-cover object-top rounded-[2.4rem]"
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
                                  <h1 className="text-xl font-semibold text-gray-900">
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
                                          <span className="text-base font-normal text-gray-900 text-left">{setting.name}</span>
                                          {setting.type === 'toggle' && (
                                            <div className={`w-11 h-6 rounded-full ${setting.value ? 'bg-blue-500' : 'bg-gray-300'} relative transition-colors`}>
                                              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${setting.value ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
                                            </div>
                                          )}
                                          {setting.type === 'setting' && (
                                            <div className="flex items-center space-x-2">
                                              <span className="text-gray-500 text-sm">{setting.value}</span>
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
                                        <p className="text-xs text-gray-500">Time variance is ±30s</p>
                                      </div>

                                      {/* Schedule Items */}
                                      <div className="space-y-3">
                                        {/* PM 6:30 Schedule */}
                                        <div className="bg-gray-50 rounded px-3 py-3">
                                          <div className="flex justify-between items-center mb-1">
                                            <span className="text-lg font-light text-gray-300">PM 6:30</span>
                                            <div className="w-9 h-5 rounded-full bg-gray-300 relative transition-colors">
                                              <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 translate-x-0.5"></div>
                                            </div>
                                          </div>
                                          <p className="text-xs text-gray-400 mb-0.5">Once</p>
                                          <p className="text-xs text-gray-400">Switch:ON</p>
                                        </div>

                                        {/* PM 11:00 Schedule */}
                                        <div className="bg-white rounded px-3 py-3 border border-gray-200">
                                          <div className="flex justify-between items-center mb-1">
                                            <span className="text-lg font-light text-gray-900">PM 11:00</span>
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
                                        <span className="text-base font-normal text-gray-900">Add Schedule</span>
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
                                className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl shadow-2xl overflow-hidden z-10"
                              >
                                {showModal === 'choose-mode' && (
                                  <div>
                                    <h3 className="text-lg font-medium text-center py-3 text-gray-900">Mode</h3>
                                    <div>
                                      {modeOptions.map((mode, index) => (
                                        <button
                                          key={mode}
                                          onClick={() => setSelectedMode(mode)}
                                          className={`w-full py-3 px-4 text-center flex justify-center items-center relative hover:bg-gray-50 transition-colors ${
                                            index < modeOptions.length - 1 ? 'border-b border-gray-100' : ''
                                          }`}
                                        >
                                          <span className="text-base font-normal text-gray-800">{mode}</span>
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
                                      className="w-full py-3 text-center text-base font-normal text-gray-500 hover:bg-gray-50 transition-colors"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                )}

                                {showModal === 'speed' && (
                                  <div>
                                    <h3 className="text-lg font-medium text-center py-3 text-gray-900">Speed</h3>
                                    <div>
                                      {speedOptions.map((speed, index) => (
                                        <button
                                          key={speed}
                                          onClick={() => setSelectedSpeed(speed)}
                                          className={`w-full py-3 px-4 text-center flex justify-center items-center relative hover:bg-gray-50 transition-colors ${
                                            index < speedOptions.length - 1 ? 'border-b border-gray-100' : ''
                                          }`}
                                        >
                                          <span className="text-base font-normal text-gray-800">{speed}</span>
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
                                      className="w-full py-3 text-center text-base font-normal text-gray-500 hover:bg-gray-50 transition-colors"
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
                                className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl shadow-2xl overflow-hidden z-20"
                              >
                                <div>
                                  <h3 className="text-base font-medium text-center py-2 text-gray-900">Countdown timer</h3>
                                  <div>
                                    {timerOptions.map((timer, index) => (
                                      <motion.button
                                        key={timer}
                                        onClick={() => setSelectedTimer(timer)}
                                        whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`w-full py-3 px-3 text-center flex justify-center items-center relative transition-colors ${
                                          index < timerOptions.length - 1 ? 'border-b border-gray-100' : ''
                                        }`}
                                      >
                                        <span className="text-base font-normal text-gray-800">{timer}</span>
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
                                    className="w-full py-2 text-center text-sm font-normal text-gray-500 transition-colors"
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