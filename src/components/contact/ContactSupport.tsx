import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
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
    <div className="bg-white">
      {/* Hero Section - From image.png */}
      <section className="pt-32 pb-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-brand-grey-green leading-tight mb-6">
            How can we help?
          </h1>
          <p className="text-lg md:text-xl text-brand-dark-grey font-body max-w-2xl mx-auto leading-relaxed mb-8">
            Start here with articles to answer your questions,
            <br />
            and reach out through chat to talk to us 24/7
          </p>
          <Button 
            className="bg-green-800 hover:bg-green-900 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-200 hover:scale-105"
          >
            Chat with us
          </Button>
        </div>
      </section>

      {/* Quick Actions Section - From image.png bottom */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Track Order Card */}
            <Card className="p-8 bg-white border-0 hover:shadow-lg transition-shadow duration-300 rounded-3xl">
              <h3 className="text-2xl font-display text-brand-grey-green mb-4">
                Track your order
              </h3>
              <p className="text-brand-dark-grey font-body mb-6 leading-relaxed">
                See the status and tracking information
                <br />
                for your order.
              </p>
              <Button 
                className="bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105"
              >
                Track your order →
              </Button>
            </Card>

            {/* Manage Subscription Card */}
            <Card className="p-8 bg-white border-0 hover:shadow-lg transition-shadow duration-300 rounded-3xl">
              <h3 className="text-2xl font-display text-brand-grey-green mb-4">
                Need to manage your
                <br />
                subscription?
              </h3>
              <p className="text-brand-dark-grey font-body mb-6 leading-relaxed">
                Log in to your account portal.
              </p>
              <Button 
                className="bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105"
              >
                Manage subscription →
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* We're here to help Section - From image2.png */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-brand-grey-green leading-tight mb-12">
              We're here to help
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Product issues */}
              <Card className="p-8 bg-white border-0 rounded-3xl hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-display text-brand-grey-green mb-6 text-center">
                  Product issues
                </h3>
                <div className="text-center">
                  <Button
                    className="bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105"
                  >
                    Learn more →
                  </Button>
                </div>
              </Card>

              {/* App connectivity */}
              <Card className="p-8 bg-white border-0 rounded-3xl hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-display text-brand-grey-green mb-6 text-center">
                  App connectivity
                </h3>
                <div className="text-center">
                  <Button
                    className="bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105"
                  >
                    Learn more →
                  </Button>
                </div>
              </Card>

              {/* Warranty & returns */}
              <Card className="p-8 bg-white border-0 rounded-3xl hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-display text-brand-grey-green mb-6 text-center">
                  Warranty & returns
                </h3>
                <div className="text-center">
                  <Button
                    className="bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105"
                  >
                    Learn more →
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Product information Section */}
          <div className="text-center pt-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-brand-grey-green leading-tight mb-12">
                Product information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Storm */}
                <Card 
                  className="p-6 bg-white border-0 rounded-3xl hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                  onClick={handleStormClick}
                >
                  <div className="relative mb-6 w-full max-w-sm mx-auto">
                    <div className="aspect-square rounded-3xl overflow-hidden">
                      <img
                        src={stormImg}
                        alt="Vaayura Storm"
                        className="w-full h-full object-contain p-8"
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-brand-grey-green mb-4">
                    Vaayura Storm
                  </h3>
                  <p className="text-brand-dark-grey font-body leading-relaxed mb-6">
                    Powerful air purifier for living rooms, dining rooms, and kitchens
                  </p>
                  <div className="space-y-3">
                    <Button
                      className="bg-green-800 hover:bg-green-900 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 w-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleStormClick()
                      }}
                    >
                      Shop Storm
                    </Button>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 w-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Bulk Order
                    </Button>
                  </div>
                </Card>

                {/* Nest */}
                <Card 
                  className="p-6 bg-white border-0 rounded-3xl hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                  onClick={handleNestClick}
                >
                  <div className="relative mb-6 w-full max-w-sm mx-auto">
                    <div className="aspect-square rounded-3xl overflow-hidden">
                      <img
                        src={nestImg}
                        alt="Vaayura Nest"
                        className="w-full h-full object-contain p-8"
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-brand-grey-green mb-4">
                    Vaayura Nest
                  </h3>
                  <p className="text-brand-dark-grey font-body leading-relaxed mb-6">
                    Compact air purifier great for bedrooms, home offices, or bathrooms
                  </p>
                  <div className="space-y-3">
                    <Button
                      className="bg-green-800 hover:bg-green-900 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 w-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNestClick()
                      }}
                    >
                      Shop Nest
                    </Button>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 w-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Bulk Order
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Still have questions Section - From image2.png */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-brand-grey-green leading-tight mb-8">
            Still have questions?
          </h2>
          <Button 
            className="bg-green-800 hover:bg-green-900 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-200 hover:scale-105"
          >
            Visit help center
          </Button>
        </div>
      </section>
    </div>
  )
}