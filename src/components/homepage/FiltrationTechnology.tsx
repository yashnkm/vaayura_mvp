import filterationImage from "@/ref_images/filterationimage-03.png";

export function FiltrationTechnology() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-emerald-900 mb-6">
            Filtration Technology
          </h2>
        </div>

        {/* Key Features Summary */}
        <div className="mb-16 grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="font-semibold text-emerald-900 mb-2">HEPA-13</h3>
            <p className="text-sm text-gray-600">99.97% efficiency</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <h3 className="font-semibold text-emerald-900 mb-2">Carbon Layer</h3>
            <p className="text-sm text-gray-600">Odor elimination</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
              </svg>
            </div>
            <h3 className="font-semibold text-emerald-900 mb-2">Pre-Filter</h3>
            <p className="text-sm text-gray-600">Large particle capture</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 className="font-semibold text-emerald-900 mb-2">UV-C Light</h3>
            <p className="text-sm text-gray-600">Virus elimination</p>
          </div>
        </div>
      </div>

      {/* Main Filtration Process Image - Full Width */}
      <div className="relative w-screen h-[80vh] overflow-hidden -mx-6">
        <img 
          src={filterationImage} 
          alt="Filtration Technology Process" 
          className="w-full h-full object-contain"
        />
      </div>
    </section>
  )
}