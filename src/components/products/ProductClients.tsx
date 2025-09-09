import React, { useState, useEffect } from "react";
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
  const [columnCount, setColumnCount] = useState(5);

  useEffect(() => {
    const updateColumnCount = () => {
      if (window.innerWidth < 640) {
        // Mobile: 3 columns
        setColumnCount(3);
      } else if (window.innerWidth < 1024) {
        // Tablet: 4 columns
        setColumnCount(4);
      } else {
        // Desktop: 5 columns
        setColumnCount(5);
      }
    };

    updateColumnCount();
    window.addEventListener('resize', updateColumnCount);

    return () => {
      window.removeEventListener('resize', updateColumnCount);
    };
  }, []);

  return (
    <section className="bg-white relative" style={{ padding: 'clamp(4rem, 8vh, 6rem) clamp(1rem, 4vw, 2rem)' }}>
      <div className="container mx-auto">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 4vh, 2.5rem)' }}>
          <div className="mx-auto flex w-full flex-col items-center" style={{ maxWidth: 'clamp(20rem, 90vw, 70rem)', gap: 'clamp(1.5rem, 4vh, 2.5rem)' }}>
            <div className="text-center" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem, 2vh, 1rem)' }}>
              <p className="text-brand-dark-grey font-subheading" style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}>
                Trusted by Industry Leaders
              </p>
              <h2 className="font-sora font-bold text-[#36454F] leading-tight" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', padding: 'clamp(0.5rem, 2vw, 1rem)', marginBottom: 'clamp(1rem, 2vh, 1.5rem)' }}>
                Join the <span className="text-brand-pastel-green">Clean Air Revolution</span>
              </h2>
              <p className="text-brand-dark-grey font-subheading mx-auto" style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)', maxWidth: 'clamp(20rem, 60vw, 40rem)', padding: 'clamp(0.5rem, 2vw, 1rem)' }}>
                Leading organizations trust Vaayura for their air purification needs.
              </p>
            </div>

            <LogoCarousel columnCount={columnCount} logos={allLogos} />
          </div>
        </div>
      </div>
      
      {/* Gradient Transition to Gray */}
      <div className="absolute -bottom-4 left-0 right-0 bg-gradient-to-b from-white to-gray-50 pointer-events-none z-10" style={{ height: 'clamp(1.25rem, 3vh, 1.5rem)' }}></div>
    </section>
  );
}