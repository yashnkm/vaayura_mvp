"use client";

import React, { type SVGProps } from "react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { LogoCarousel, type Logo } from "@/components/ui/logo-carousel";

// Mercedes-Benz Logo - Three-pointed star in circle
const MercedesLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" className="h-12 w-auto" {...props}>
    <circle cx="50" cy="50" r="48" fill="none" stroke="#191919" strokeWidth="2"/>
    <path d="M50 15 L50 50 M50 50 L25 75 M50 50 L75 75" stroke="#191919" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

// MG Logo - Red circle with MG text
const MGLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 80 80" className="h-12 w-auto" {...props}>
    <circle cx="40" cy="40" r="38" fill="#C41E3A"/>
    <text x="40" y="50" textAnchor="middle" fontSize="28" fill="white" fontWeight="bold" fontFamily="Arial, sans-serif">MG</text>
  </svg>
);

// DLF Logo - Simple text logo
const DLFLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 120 40" className="h-12 w-auto" {...props}>
    <text x="60" y="28" textAnchor="middle" fontSize="24" fill="#2B5AA0" fontWeight="bold" fontFamily="Arial, sans-serif">DLF</text>
  </svg>
);

// Airtel Logo - Red oval with text
const AirtelLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 140 60" className="h-12 w-auto" {...props}>
    <ellipse cx="25" cy="30" rx="18" ry="25" fill="#E31E24"/>
    <text x="90" y="38" fontSize="22" fill="#E31E24" fontWeight="bold" fontFamily="Arial, sans-serif">airtel</text>
  </svg>
);

// L&T Logo - Blue circle with L&T
const LTLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 60" className="h-12 w-auto" {...props}>
    <circle cx="30" cy="30" r="25" fill="#003F72"/>
    <text x="30" y="38" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold" fontFamily="Arial, sans-serif">L&T</text>
  </svg>
);

// Reliance Jio Logo - Blue design with text
const JioLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 120 50" className="h-12 w-auto" {...props}>
    <circle cx="25" cy="25" r="20" fill="#1565C0"/>
    <text x="25" y="30" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold" fontFamily="Arial, sans-serif">Jio</text>
    <text x="75" y="20" fontSize="12" fill="#D4AF37" fontWeight="bold" fontFamily="Arial, sans-serif">Reliance</text>
    <text x="75" y="35" fontSize="8" fill="#666" fontFamily="Arial, sans-serif">Industries Limited</text>
  </svg>
);

// Hyatt Logo - Clean text
const HyattLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 140 40" className="h-12 w-auto" {...props}>
    <text x="70" y="28" textAnchor="middle" fontSize="20" fill="#1B365D" fontWeight="300" fontFamily="Arial, sans-serif" letterSpacing="2px">HYATT</text>
  </svg>
);

// American Express Logo - Blue rectangle with text
const AmexLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 160 60" className="h-12 w-auto" {...props}>
    <rect x="5" y="5" width="150" height="50" fill="#006FCF" rx="4"/>
    <text x="80" y="25" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold" fontFamily="Arial, sans-serif">AMERICAN</text>
    <text x="80" y="42" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold" fontFamily="Arial, sans-serif">EXPRESS</text>
  </svg>
);

// Array of client logos using SVG components based on actual brand designs
const allLogos: Logo[] = [
  { name: "Mercedes-Benz", id: 1, img: MercedesLogo },
  { name: "MG Motor", id: 2, img: MGLogo },
  { name: "DLF", id: 3, img: DLFLogo },
  { name: "Airtel", id: 4, img: AirtelLogo },
  { name: "L&T", id: 5, img: LTLogo },
  { name: "Reliance Jio", id: 6, img: JioLogo },
  { name: "Hyatt", id: 7, img: HyattLogo },
  { name: "American Express", id: 8, img: AmexLogo },
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