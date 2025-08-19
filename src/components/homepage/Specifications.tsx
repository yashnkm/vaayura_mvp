import heroV2 from "@/assets/HERO V2.PNG";

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

          {/* Right side: Product Image */}
          <div className="relative flex justify-center items-center">
            <div className="relative">
              <img 
                src={heroV2} 
                alt="Vaayura Air Purifier Hero" 
                className="w-96 h-[500px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}