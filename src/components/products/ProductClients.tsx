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

// Array of client logos using actual images
const allLogos: Logo[] = [
  { name: "Airtel", id: 1, img: airtelLogo },
  { name: "American Express", id: 2, img: amexLogo },
  { name: "BHEL", id: 3, img: bhelLogo },
  { name: "Delhi Metro", id: 4, img: delhiMetroLogo },
  { name: "Delhi Airport", id: 5, img: delhiAirportLogo },
  { name: "DLF", id: 6, img: dlfLogo },
  { name: "Emaar", id: 7, img: emaarLogo },
  { name: "Hyatt", id: 8, img: hyattLogo },
];

export function ProductClients() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto">
        <div className="space-y-8">
          <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center space-y-8">
            <div className="text-center space-y-4">
              <p className="text-lg text-brand-dark-grey font-body">
                Trusted by Industry Leaders
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-brand-grey-green leading-tight">
                Join the <span className="text-brand-pastel-green">Clean Air Revolution</span>
              </h2>
              <p className="text-lg text-brand-dark-grey font-body max-w-2xl mx-auto">
                Leading organizations trust Vaayura for their air purification needs.
              </p>
            </div>

            <LogoCarousel columnCount={5} logos={allLogos} />
          </div>
        </div>
      </div>
    </section>
  );
}