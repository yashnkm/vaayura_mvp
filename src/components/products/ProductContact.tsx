import { Phone, Mail, MessageCircle } from "lucide-react";

interface ContactMethod {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  action?: string;
}

const contactMethods: ContactMethod[] = [
  {
    icon: <Phone className="h-12 w-12" />,
    title: "You can call us",
    subtitle: "1-800-258-6688",
    action: "tel:+18002586688"
  },
  {
    icon: <Mail className="h-12 w-12" />,
    title: "Email us at",
    subtitle: "ask@dyson.in",
    action: "mailto:ask@dyson.in"
  },
  {
    icon: <MessageCircle className="h-12 w-12" />,
    title: "Start a WhatsApp conversation",
    subtitle: "",
    action: "https://wa.me/your-whatsapp-number"
  },
];

export function ProductContact() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-brand-grey-green leading-tight mb-4">
              Talking to us is <span className="text-brand-pastel-green">easy</span>.
            </h2>
            <p className="text-lg text-brand-dark-grey font-body max-w-2xl mx-auto">
              Get in touch with our air quality experts. We're here to help you breathe easier.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {contactMethods.map((method, index) => (
              <div 
                key={index}
                className="text-center group cursor-pointer"
                onClick={() => method.action && window.open(method.action, '_self')}
              >
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg group-hover:shadow-xl transition-shadow duration-300 group-hover:scale-105 transition-transform">
                    <div className="text-brand-grey-green group-hover:text-brand-pastel-green transition-colors duration-300">
                      {method.icon}
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-brand-grey-green font-subheading group-hover:text-brand-pastel-green transition-colors duration-300">
                    {method.title}
                  </h3>
                  {method.subtitle && (
                    <p className="text-brand-dark-grey font-body text-lg">
                      {method.subtitle}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-2xl font-semibold text-brand-grey-green mb-4 font-subheading">
                Ready to improve your air quality?
              </h3>
              <p className="text-brand-dark-grey font-body mb-6 max-w-xl mx-auto">
                Our team of air quality specialists is standing by to help you find the perfect solution for your space.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className="bg-brand-pastel-green hover:bg-brand-pastel-green/90 text-brand-grey-green px-8 py-3 rounded-full font-medium transition-colors"
                  onClick={() => window.open('tel:+18002586688', '_self')}
                >
                  Call Now
                </button>
                <button 
                  className="border border-brand-pastel-green text-brand-grey-green hover:bg-brand-pastel-green/10 px-8 py-3 rounded-full font-medium transition-colors"
                  onClick={() => window.open('/contact', '_self')}
                >
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}