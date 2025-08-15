import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, Zap } from "lucide-react"

export function Problem() {
  return (
    <section className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto text-center space-y-16">
        
        {/* Section Header - matching Hero/About pattern */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-brand-grey-green leading-tight">
            What You Can't See,{" "}
            <span className="text-red-600">You Still Breathe</span>
          </h2>
          <div className="w-24 h-1 bg-brand-pastel-green mx-auto rounded-full"></div>
          <p className="text-xl md:text-2xl text-brand-dark-grey font-body max-w-3xl mx-auto leading-relaxed">
            Every breath you take in India carries more than just oxygen—it carries dust, smoke, industrial particles, and invisible toxins.
          </p>
        </div>

        {/* WHO Statistic - elevated card like About section */}
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 bg-red-50 border-red-200 shadow-lg">
            <div className="text-center space-y-4">
              <Badge variant="outline" className="bg-red-100 border-red-300 text-red-700">
                WHO Report
              </Badge>
              <p className="text-lg text-red-700 font-body leading-relaxed">
                The WHO estimates that nearly{" "}
                <span className="font-bold text-2xl text-red-800">18% of all deaths in India</span>{" "}
                are linked to air pollution.
              </p>
            </div>
          </Card>
        </div>

        {/* Air Quality Comparison - matching About section card layout */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Polluted Air Card */}
          <Card variant="brand-elevated" className="p-6 bg-red-50">
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-heading text-red-700">
                Current Air Quality
              </h3>
              <p className="text-sm text-red-600 font-body">
                Hazardous pollution levels affecting millions daily
              </p>
              <Badge variant="outline" className="bg-red-100 border-red-300 text-red-700">
                PM 2.5: 150+ μg/m³
              </Badge>
            </div>
          </Card>

          {/* Clean Air Solution */}
          <Card variant="brand-elevated" className="p-6 bg-white">
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 bg-brand-pastel-green/20 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-6 h-6 text-brand-grey-green" />
              </div>
              <h3 className="text-lg font-heading text-brand-grey-green">
                Vaayura Solution
              </h3>
              <p className="text-sm text-brand-dark-grey font-body">
                Advanced filtration for cleaner, healthier air
              </p>
              <Badge className="bg-brand-pastel-green text-brand-grey-green">
                99.97% Purification
              </Badge>
            </div>
          </Card>
        </div>


      </div>
    </section>
  )
}