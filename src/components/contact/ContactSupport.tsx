import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import stormImg from "@/assets/storm.png"
import nestImg from "@/assets/nest.png"

export function ContactSupport() {
  const navigate = useNavigate()

  const handleStormClick = () => {
    navigate('/products/storm')
  }

  const handleNestClick = () => {
    navigate('/products/nest')
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section with White Background */}
      <section className="relative bg-white pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold leading-tight mb-6 text-gray-800"
          >
            Welcome to Vaayura Support
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-800 font-montserrat max-w-2xl mx-auto leading-relaxed"
          >
            Get support, find answers, access manuals and more.
          </motion.p>
        </div>
        
        {/* Gradient Transition to Gray */}
        <div className="absolute -bottom-4 left-0 right-0 h-20 bg-gradient-to-b from-white to-gray-50 pointer-events-none z-10"></div>
      </section>

      {/* Four Action Cards Section */}
      <section className="py-16 px-6 bg-gray-50 relative overflow-visible">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
            {/* Filter Replacement Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="bg-white border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-sora font-semibold text-gray-800">Filter Replacement</h3>
                </div>
                <div className="flex-grow">
                  <p className="text-gray-800 text-sm font-montserrat leading-relaxed mb-6">
                    Order replacement filters for your
                    <br />
                    Vaayura air purifiers and extend
                    <br />
                    device life.
                  </p>
                </div>
                <Button className="w-full bg-green-800 hover:bg-green-900 text-white font-montserrat font-semibold py-3 px-4 rounded-full transition-all duration-200 hover:scale-105 mt-auto">
                  Order Filters
                </Button>
              </Card>
            </motion.div>

            {/* Track Your Order Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="bg-white border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-sora font-semibold text-gray-800">Track your Order</h3>
                </div>
                <div className="flex-grow">
                  <p className="text-gray-800 text-sm font-montserrat leading-relaxed mb-6">
                    Track your Vaayura products
                    <br />
                    with real-time delivery
                    <br />
                    updates.
                  </p>
                </div>
                <Button className="w-full bg-green-800 hover:bg-green-900 text-white font-montserrat font-semibold py-3 px-4 rounded-full transition-all duration-200 hover:scale-105 mt-auto">
                  Track Now
                </Button>
              </Card>
            </motion.div>

            {/* Chat With Us Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="bg-white border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-sora font-semibold text-gray-800">Chat With Us</h3>
                </div>
                <div className="flex-grow">
                  <p className="text-gray-800 text-sm font-montserrat leading-relaxed mb-6">
                    Get 24/7 Chat on Whatsapp at
                    <br />
                    <span className="font-semibold text-gray-800 font-montserrat">+91-8766802724</span> or just
                  </p>
                </div>
                <Button className="w-full bg-green-800 hover:bg-green-900 text-white font-montserrat font-semibold py-3 px-4 rounded-full transition-all duration-200 hover:scale-105 mt-auto">
                  Chat Now
                </Button>
              </Card>
            </motion.div>

            {/* Installation Support Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="bg-white border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-sora font-semibold text-gray-800">Installation Support</h3>
                </div>
                <div className="flex-grow">
                  <p className="text-gray-800 text-sm font-montserrat leading-relaxed mb-6">
                    Get support from live experts and
                    <br />
                    we will take care of the rest.
                  </p>
                </div>
                <Button className="w-full bg-green-800 hover:bg-green-900 text-white font-montserrat font-semibold py-3 px-4 rounded-full transition-all duration-200 hover:scale-105 mt-auto">
                  Schedule Now
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
        
        {/* Gradient Transition to White */}
        <div className="absolute -bottom-4 left-0 right-0 h-20 bg-gradient-to-b from-gray-50 to-white pointer-events-none z-10"></div>
      </section>

      {/* Get Support by Product Category Section */}
      <section className="py-20 px-6 bg-white relative overflow-visible">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-gray-800 mb-4">
              Get Support by Product Category
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pb-8">
            {/* Vaayura Storm */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card 
                className="bg-white border-0 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={handleStormClick}
              >
                <div className="relative mb-6 w-full max-w-sm mx-auto">
                  <div className="aspect-square rounded-3xl overflow-hidden bg-gray-50">
                    <img
                      src={stormImg}
                      alt="Vaayura Storm"
                      className="w-full h-full object-contain p-8"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-sora font-semibold text-gray-800 mb-4 text-center">
                  Vaayura Storm
                </h3>
                <p className="text-gray-800 font-montserrat leading-relaxed mb-6 text-center">
                  Powerful air purifier for living rooms, dining rooms, and kitchens
                </p>
                <div className="flex justify-center">
                  <Button
                    className="bg-sky-500 hover:bg-sky-600 text-gray-800 px-8 py-3 rounded-full font-montserrat font-semibold transition-all duration-200 hover:scale-105"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Get Support
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Vaayura Nest */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card 
                className="bg-white border-0 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={handleNestClick}
              >
                <div className="relative mb-6 w-full max-w-sm mx-auto">
                  <div className="aspect-square rounded-3xl overflow-hidden bg-gray-50">
                    <img
                      src={nestImg}
                      alt="Vaayura Nest"
                      className="w-full h-full object-contain p-8"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-sora font-semibold text-gray-800 mb-4 text-center">
                  Vaayura Nest
                </h3>
                <p className="text-gray-800 font-montserrat leading-relaxed mb-6 text-center">
                  Compact air purifier great for bedrooms, home offices, or bathrooms
                </p>
                <div className="flex justify-center">
                  <Button
                    className="bg-sky-500 hover:bg-sky-600 text-gray-800 px-8 py-3 rounded-full font-montserrat font-semibold transition-all duration-200 hover:scale-105"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Get Support
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
        
        {/* Gradient Transition to Gray */}
        <div className="absolute -bottom-4 left-0 right-0 h-20 bg-gradient-to-b from-white to-gray-50 pointer-events-none z-10"></div>
      </section>

      {/* Additional Help Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-gray-800 mb-8">
              Still need help?
            </h2>
            <p className="text-lg text-gray-800 font-montserrat mb-8 max-w-2xl mx-auto leading-relaxed">
              Our support team is here to help you with any questions or issues you may have with your Vaayura products.
            </p>
            <Button className="bg-green-800 hover:bg-green-900 text-white px-8 py-3 rounded-full text-lg font-montserrat font-semibold transition-all duration-200 hover:scale-105">
              Visit Help Center
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}