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
  // Fallback specifications if none provided - limited to 8 specs max
  const defaultSpecifications = {
    "Width": "220 mm", 
    "Height": "1050 mm",
    "Length": "220 mm",
    "Weight": "4.65kg",
    "Cord length": "1.8m",
    "Oscillation/Angle": "350°",
    "Room coverage": "81m² (according to POLAR)",
    "Sound level": "59.8dB"
  };

  let specifications = (product.specifications && Object.keys(product.specifications).length > 0) 
    ? product.specifications 
    : defaultSpecifications;

  // Get all specification entries
  const specEntries = Object.entries(specifications);

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-display text-brand-grey-green mb-4">
            Specifications
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left - Product Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="w-80 h-96 bg-gradient-to-b from-slate-100 to-slate-200 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={product.images[0] || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"}
                alt={`${product.name}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                }}
              />
            </div>
          </div>

          {/* Right - Specifications in single column */}
          <div className="space-y-6">
            {specEntries.map(([key, value], index) => (
              <div key={index} className="space-y-1">
                <div className="text-brand-grey-green font-semibold font-subheading text-base md:text-lg">
                  {key}::
                </div>
                <div className="text-brand-dark-grey font-body text-base md:text-lg">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Useful Documents Section */}
        <div className="mt-24">
          <h3 className="text-2xl md:text-3xl font-display text-brand-grey-green mb-12">
            Useful documents
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-slate-50 hover:bg-slate-100 transition-colors duration-200 p-6 rounded-xl cursor-pointer">
                <h4 className="text-brand-grey-green font-semibold font-subheading mb-2">
                  Operating manual, PDF, 7.5MB
                </h4>
                <p className="text-brand-dark-grey font-body text-sm">
                  Complete guide for setup, operation, and maintenance
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-slate-50 hover:bg-slate-100 transition-colors duration-200 p-6 rounded-xl cursor-pointer">
                <h4 className="text-brand-grey-green font-semibold font-subheading mb-2">
                  Technical specification, PDF, 8MB
                </h4>
                <p className="text-brand-dark-grey font-body text-sm">
                  Detailed technical specifications and performance data
                </p>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}