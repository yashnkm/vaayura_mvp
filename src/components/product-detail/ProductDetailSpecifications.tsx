// Define types locally to avoid import issues
interface ProductFeature {
  title: string
  description: string
  icon: string
}

interface ProductSpecifications {
  [key: string]: string
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  features: ProductFeature[]
  specifications: ProductSpecifications
  published: boolean
  slug: string
  created_at: string
}

interface ProductDetailSpecificationsProps {
  product: Product;
}

export function ProductDetailSpecifications({ product }: ProductDetailSpecificationsProps) {
  // Fallback specifications if none provided
  const defaultSpecifications = {
    "Coverage Area": "Up to 500 sq ft",
    "Noise Level": "< 40 dB (Sleep Mode)",
    "Power Consumption": "45W",
    "Dimensions": "15 × 8 × 20 inches",
    "Weight": "12 lbs",
    "Filter Life": "12 months",
    "Filtration Stages": "4-layer system",
    "HEPA Grade": "True HEPA 13",
    "Air Changes": "5x per hour",
    "Warranty": "2 years comprehensive",
    "Connectivity": "Wi-Fi, Smart Life App",
    "Color Options": "Arctic White, Space Grey"
  };

  const specifications = (product.specifications && Object.keys(product.specifications).length > 0) 
    ? product.specifications 
    : defaultSpecifications;

  const specEntries = Object.entries(specifications);
  const midPoint = Math.ceil(specEntries.length / 2);
  const leftColumn = specEntries.slice(0, midPoint);
  const rightColumn = specEntries.slice(midPoint);

  return (
    <section className="py-32 bg-slate-50">
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-brand-grey-green leading-tight">
              Technical <span className="text-brand-pastel-green">Specifications</span>
            </h2>
            <p className="text-lg text-brand-dark-grey font-body max-w-3xl mx-auto">
              Detailed specifications for {product.name} - engineered for optimal performance 
              and reliability in every environment.
            </p>
          </div>

          {/* Specifications Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Column */}
            <div className="space-y-1">
              {leftColumn.map(([key, value], index) => (
                <div 
                  key={index}
                  className="flex justify-between items-center py-4 border-b border-slate-200 hover:bg-white/50 transition-colors duration-200 px-4 rounded-lg"
                >
                  <span className="font-semibold text-brand-grey-green font-subheading">
                    {key}
                  </span>
                  <span className="text-brand-dark-grey font-body text-right max-w-xs">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-1">
              {rightColumn.map(([key, value], index) => (
                <div 
                  key={index}
                  className="flex justify-between items-center py-4 border-b border-slate-200 hover:bg-white/50 transition-colors duration-200 px-4 rounded-lg"
                >
                  <span className="font-semibold text-brand-grey-green font-subheading">
                    {key}
                  </span>
                  <span className="text-brand-dark-grey font-body text-right max-w-xs">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Highlights */}
          <div className="mt-20">
            <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-100">
              <h3 className="text-2xl font-semibold text-brand-grey-green mb-8 font-subheading text-center">
                What Makes {product.name} Special
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-brand-pastel-green/10 rounded-xl flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold text-brand-grey-green">99.97%</span>
                  </div>
                  <h4 className="font-semibold text-brand-grey-green font-subheading">Filtration Efficiency</h4>
                  <p className="text-brand-dark-grey font-body text-sm">Removes particles as small as 0.3 microns</p>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-brand-pastel-green/10 rounded-xl flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold text-brand-grey-green">500</span>
                  </div>
                  <h4 className="font-semibold text-brand-grey-green font-subheading">Coverage Area</h4>
                  <p className="text-brand-dark-grey font-body text-sm">Square feet of purified air</p>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-brand-pastel-green/10 rounded-xl flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold text-brand-grey-green">2</span>
                  </div>
                  <h4 className="font-semibold text-brand-grey-green font-subheading">Year Warranty</h4>
                  <p className="text-brand-dark-grey font-body text-sm">Comprehensive coverage included</p>
                </div>
              </div>
            </div>
          </div>

          {/* Download Resources */}
          <div className="text-center mt-16">
            <h3 className="text-xl font-semibold text-brand-grey-green mb-6 font-subheading">
              Need More Information?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="border border-brand-pastel-green text-brand-grey-green hover:bg-brand-pastel-green/10 px-6 py-3 rounded-full font-medium transition-colors">
                Download Datasheet
              </button>
              <button className="border border-brand-pastel-green text-brand-grey-green hover:bg-brand-pastel-green/10 px-6 py-3 rounded-full font-medium transition-colors">
                Installation Guide
              </button>
              <button className="border border-brand-pastel-green text-brand-grey-green hover:bg-brand-pastel-green/10 px-6 py-3 rounded-full font-medium transition-colors">
                User Manual
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}