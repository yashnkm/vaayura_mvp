export function Specifications() {
  const specifications = [
    { label: "Cord length:", value: "1.8m" },
    { label: "Length:", value: "220 mm" },
    { label: "Width:", value: "220 mm" },
    { label: "Height:", value: "1050 mm" },
    { label: "Weight:", value: "4.65kg" },
    { label: "Oscillation/Angle:", value: "350°" },
    { label: "Filter life:", value: "1 year for HEPA+Carbon filter" },
    { label: "Standby power consumption:", value: "< 0.5W" },
    { label: "Room coverage:", value: "81m² (according to POLAR)" },
    { label: "Sound level:", value: "59.8dB" }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left side: Specifications */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Specifications
              </h2>
            </div>

            {/* Two-column specifications layout */}
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              {specifications.map((spec, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-gray-700 font-medium text-sm">{spec.label}</div>
                  <div className="text-gray-900 font-semibold">{spec.value}</div>
                  {index < specifications.length - 1 && (
                    <div className="border-b border-gray-200 mt-4"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right side: Product Images */}
          <div className="relative flex justify-center items-center space-x-8">
            {/* Product Image 1 */}
            <div className="relative">
              <div className="w-32 h-80 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Product Image 2 */}
            <div className="relative">
              <div className="w-32 h-80 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-24 h-24 bg-gray-500 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Navigation arrows similar to Dyson */}
            <div className="absolute -left-8 top-1/2 transform -translate-y-1/2">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                <span className="ml-2 text-white font-bold">20</span>
              </div>
            </div>

            <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
                <span className="mr-2 text-white font-bold">30</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}