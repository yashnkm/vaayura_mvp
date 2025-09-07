import { Phone, Mail, MessageCircle, Calendar } from "lucide-react";
import { useState } from "react";
import { DemoBookingModal } from "@/components/contact/DemoBookingModal";

interface ContactMethod {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  action?: string;
  isDemo?: boolean;
}

const contactMethods: ContactMethod[] = [
  {
    icon: <Phone className="h-12 w-12" />,
    title: "Call us",
    subtitle: "+91-XXXX-XXXX",
    action: "tel:+91XXXXXXXXXX"
  },
  {
    icon: <Mail className="h-12 w-12" />,
    title: "Email us",
    subtitle: "info@vaayura.com",
    action: "mailto:info@vaayura.com"
  },
  {
    icon: <MessageCircle className="h-12 w-12" />,
    title: "WhatsApp us",
    subtitle: "Chat instantly",
    action: "https://wa.me/91XXXXXXXXXX"
  },
  {
    icon: <Calendar className="h-12 w-12" />,
    title: "Book a demo",
    subtitle: "Schedule now",
    isDemo: true
  },
];

export function ProductContact() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleMethodClick = (method: ContactMethod) => {
    if (method.isDemo) {
      setIsDemoModalOpen(true);
    } else if (method.action) {
      window.open(method.action, '_self');
    }
  };

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora text-brand-grey-green leading-tight mb-4">
              Ready to improve your <span className="text-brand-pastel-green">air quality</span>?
            </h2>
            <p className="text-lg text-brand-dark-grey font-montserrat max-w-2xl mx-auto">
              Get in touch with our air quality experts. We're here to help you breathe easier.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {contactMethods.map((method, index) => (
              <div 
                key={index}
                className="text-center group cursor-pointer"
                onClick={() => handleMethodClick(method)}
              >
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full group-hover:scale-105 transition-transform">
                    <div className="text-brand-grey-green group-hover:text-brand-pastel-green transition-colors duration-300">
                      {method.icon}
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-brand-grey-green font-montserrat group-hover:text-brand-pastel-green transition-colors duration-300">
                    {method.title}
                  </h3>
                  {method.subtitle && (
                    <p className="text-brand-dark-grey font-montserrat text-lg">
                      {method.subtitle}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Demo Booking Modal */}
      <DemoBookingModal 
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </section>
  );
}