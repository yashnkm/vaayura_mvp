import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function ContactSupport() {
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
            variant="brand-primary" 
            size="brand-default"
            className="bg-brand-pastel-green hover:bg-brand-pastel-green/90 text-white px-8 py-3 rounded-full text-lg font-semibold"
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
            <Card className="p-8 bg-white border-0 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-heading text-brand-grey-green mb-4">
                Track your order
              </h3>
              <p className="text-brand-dark-grey font-body mb-6 leading-relaxed">
                See the status and tracking information
                <br />
                for your order.
              </p>
              <Button 
                variant="outline" 
                className="text-brand-pastel-green border-brand-pastel-green hover:bg-brand-pastel-green hover:text-white"
              >
                Track your order →
              </Button>
            </Card>

            {/* Manage Subscription Card */}
            <Card className="p-8 bg-white border-0 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-heading text-brand-grey-green mb-4">
                Need to manage your
                <br />
                subscription?
              </h3>
              <p className="text-brand-dark-grey font-body mb-6 leading-relaxed">
                Log in to your account portal.
              </p>
              <Button 
                variant="outline" 
                className="text-brand-pastel-green border-brand-pastel-green hover:bg-brand-pastel-green hover:text-white"
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
              <Card className="p-8 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-heading text-brand-grey-green mb-6 text-center">
                  Product issues
                </h3>
                <div className="text-center">
                  <a 
                    href="/support/product-issues" 
                    className="text-brand-pastel-green hover:text-brand-pastel-green/80 font-medium inline-flex items-center"
                  >
                    Learn more →
                  </a>
                </div>
              </Card>

              {/* App connectivity */}
              <Card className="p-8 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-heading text-brand-grey-green mb-6 text-center">
                  App connectivity
                </h3>
                <div className="text-center">
                  <a 
                    href="/support/app-connectivity" 
                    className="text-brand-pastel-green hover:text-brand-pastel-green/80 font-medium inline-flex items-center"
                  >
                    Learn more →
                  </a>
                </div>
              </Card>

              {/* Warranty & returns */}
              <Card className="p-8 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-heading text-brand-grey-green mb-6 text-center">
                  Warranty & returns
                </h3>
                <div className="text-center">
                  <a 
                    href="/support/warranty-returns" 
                    className="text-brand-pastel-green hover:text-brand-pastel-green/80 font-medium inline-flex items-center"
                  >
                    Learn more →
                  </a>
                </div>
              </Card>
            </div>
          </div>

          {/* Product information Section - From image2.png */}
          <div className="text-center pt-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-brand-grey-green leading-tight mb-12">
                Product information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Vaayura Pro */}
                <Card className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
                  <div className="h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    <div className="w-16 h-24 bg-gray-300 rounded-lg"></div>
                  </div>
                  <h3 className="text-lg font-heading text-brand-grey-green text-center">
                    Vaayura Pro
                  </h3>
                </Card>

                {/* Replacement Filters */}
                <Card className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
                  <div className="h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    <div className="flex space-x-1">
                      <div className="w-6 h-16 bg-gray-300 rounded"></div>
                      <div className="w-6 h-16 bg-gray-400 rounded"></div>
                      <div className="w-6 h-16 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                  <h3 className="text-lg font-heading text-brand-grey-green text-center">
                    Replacement Filters
                  </h3>
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
            variant="brand-primary" 
            size="brand-default"
            className="bg-brand-pastel-green hover:bg-brand-pastel-green/90 text-white px-8 py-3 rounded-full text-lg font-semibold"
          >
            Visit help center
          </Button>
        </div>
      </section>
    </div>
  )
}