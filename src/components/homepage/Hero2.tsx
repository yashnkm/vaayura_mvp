"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero2background.jpg"
import product1 from "@/assets/product_hero.png"
import product2 from "@/ref_images/product1.png"
import product3 from "@/ref_images/product2.jpg"
import ambientLight from "@/assets/Ambiend light.jpg"
import aromaTep from "@/assets/aroma_tep.jpg"
import intSensor from "@/assets/int_sensor.jpg"
import realtimeAQI from "@/assets/realtime AQI.jpg"

const ProductCarouselColumn = (props: {
  className?: string;
  products: typeof products;
  direction: "up" | "down";
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: props.direction === "up" ? "-50%" : "-50%",
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className={`flex flex-col gap-8 pb-8 ${props.direction === "down" ? "flex-col-reverse" : ""}`}
        initial={{
          translateY: "0%"
        }}
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.products.map(({ image, name, description }, i) => (
                <div className="p-8 rounded-3xl border border-brand-grey-green/20 shadow-lg bg-brand-white/90 backdrop-blur-sm w-80" key={i}>
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-60 object-cover rounded-2xl mb-6"
                  />
                  <div className="space-y-3">
                    <div className="font-subheading font-semibold text-brand-grey-green text-xl">{name}</div>
                    <div className="text-base text-brand-dark-grey/70 font-body leading-relaxed">{description}</div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

const products = [
  {
    image: product1,
    name: "Vaayura Mini",
    description: "Compact power for personal spaces with advanced filtration technology."
  },
  {
    image: product2,
    name: "Vaayura Zen",
    description: "Smart, app-connected purification for larger living areas."
  },
  {
    image: product3,
    name: "Vaayura Pro",
    description: "Professional-grade air purification for commercial spaces."
  },
  {
    image: ambientLight,
    name: "Ambient Light Feature",
    description: "Soothing ambient lighting that adapts to your environment."
  },
  {
    image: aromaTep,
    name: "Aroma Therapy",
    description: "Integrated aromatherapy system for enhanced wellness experience."
  },
  {
    image: intSensor,
    name: "Intelligent Sensors",
    description: "Advanced sensors for real-time air quality monitoring."
  },
  {
    image: realtimeAQI,
    name: "Real-time AQI",
    description: "Live air quality index display with detailed analytics."
  },
];

const firstColumn = products.slice(0, 4);
const secondColumn = products.slice(3, 7);

export function Hero2() {

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Subtle Fade */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBackground} 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        {/* Subtle Right to Left Fade */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          
          {/* Left Side - Text Content */}
          <div className="space-y-8 max-w-2xl">
            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-display font-bold leading-tight text-white">
                Life Begins with<br />
                <span className="text-brand-pastel-green">Clean Air</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-white/90 font-body leading-relaxed">
                Vaayura delivers intelligent air purification that transforms your space into a sanctuary of health.
              </p>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/products">
                <Button 
                  className="bg-green-800 hover:bg-green-900 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105"
                >
                  Shop Now
                </Button>
              </a>
              <Button 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-800 px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105"
              >
                Book a Demo
              </Button>
            </div>
          </div>

          {/* Right Side - Product Carousel */}
          <div className="relative">
            <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[800px] overflow-hidden">
              <ProductCarouselColumn products={firstColumn} direction="up" />
              <ProductCarouselColumn products={secondColumn} direction="down" />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 opacity-20">
        <div className="w-2 h-2 bg-brand-grey-green rounded-full animate-ping"></div>
      </div>
      <div className="absolute bottom-32 left-10 opacity-30">
        <div className="w-1 h-1 bg-brand-pastel-green rounded-full animate-pulse"></div>
      </div>
    </section>
  );
}