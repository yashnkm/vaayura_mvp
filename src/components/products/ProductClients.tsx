import React from "react";
import { LogoCarousel, type Logo } from "@/components/ui/logo-carousel";

// Import actual client logos
import airtelLogo from "@/assets/clients/airtel.png";
import amexLogo from "@/assets/clients/american-express.png";
import bhelLogo from "@/assets/clients/bhel.png";
import delhiMetroLogo from "@/assets/clients/delhi-metro.png";
import delhiAirportLogo from "@/assets/clients/delhi-airport.png";
import dlfLogo from "@/assets/clients/dlf.png";
import emaarLogo from "@/assets/clients/emaar.png";
import hyattLogo from "@/assets/clients/hyatt.png";
import client9Logo from "@/assets/clients/9.png";
import client10Logo from "@/assets/clients/10.png";
import client11Logo from "@/assets/clients/11.png";
import client12Logo from "@/assets/clients/12.png";
import client13Logo from "@/assets/clients/13.png";
import client14Logo from "@/assets/clients/14.png";
import client15Logo from "@/assets/clients/15.png";

// Array of all 15 client logos
const allLogos: Logo[] = [
  { name: "Airtel", id: 1, img: airtelLogo },
  { name: "American Express", id: 2, img: amexLogo },
  { name: "BHEL", id: 3, img: bhelLogo },
  { name: "Delhi Metro", id: 4, img: delhiMetroLogo },
  { name: "Delhi Airport", id: 5, img: delhiAirportLogo },
  { name: "DLF", id: 6, img: dlfLogo },
  { name: "Emaar", id: 7, img: emaarLogo },
  { name: "Hyatt", id: 8, img: hyattLogo },
  { name: "Client 9", id: 9, img: client9Logo },
  { name: "Client 10", id: 10, img: client10Logo },
  { name: "Client 11", id: 11, img: client11Logo },
  { name: "Client 12", id: 12, img: client12Logo },
  { name: "Client 13", id: 13, img: client13Logo },
  { name: "Client 14", id: 14, img: client14Logo },
  { name: "Client 15", id: 15, img: client15Logo },
];

export function ProductClients() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto">
        <div className="space-y-8">
          <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center space-y-8">
            <div className="text-center space-y-4">
              <p className="text-lg text-brand-dark-grey font-subheading">
                Trusted by Industry Leaders
              </p>
              <h2 className="text-4xl lg:text-5xl font-sora font-bold text-[#36454F] leading-tight mb-6">
                Join the <span className="text-brand-pastel-green">Clean Air Revolution</span>
              </h2>
              <p className="text-lg text-brand-dark-grey font-subheading max-w-2xl mx-auto">
                Leading organizations trust Vaayura for their air purification needs.
              </p>
            </div>

            <LogoCarousel columnCount={5} logos={allLogos} />
          </div>
        </div>
      </div>
      
      {/* Gradient Transition to Gray */}
      <div className="absolute -bottom-4 left-0 right-0 h-20 bg-gradient-to-b from-white to-gray-50 pointer-events-none z-10"></div>
    </section>
  );
}