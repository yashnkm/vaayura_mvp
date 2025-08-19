import React from 'react';
import { motion } from 'framer-motion';
import logoImage from "@/assets/logo_2.png";

interface FooterProps {
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Products",
    links: [
      { name: "All Products", href: "/products" },
      { name: "Storm", href: "/products" },
      { name: "Nest", href: "/products" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", href: "#" },
      { name: "Installation Guide", href: "#" },
      { name: "Warranty", href: "#" },
      { name: "Contact Us", href: "#" },
    ],
  },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
  { name: "Cookie Policy", href: "#" },
];

export const Footer = ({
  sections = defaultSections,
  description = "Breathe clean, live healthy. Vaayura's advanced air purification technology ensures your home has the cleanest air possible.",
  copyright = "© 2024 Vaayura. All rights reserved.",
  legalLinks = defaultLegalLinks,
}: FooterProps) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <footer className="bg-emerald-900 text-white">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="container mx-auto py-12 px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-7 gap-8">
          <motion.div variants={fadeInUp} className="col-span-1 md:col-span-3">
            <motion.div 
              className="mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img src={logoImage} alt="Vaayura" className="h-10 filter brightness-0 invert mb-4" />
            </motion.div>
            <p className="text-white text-lg mb-6">{description}</p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="text-white hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.2, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                </svg>
              </motion.a>
              
              <motion.a
                href="#"
                className="text-white hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.2, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69.74 1.68 1.68 0 0 0 0 1.9c.46.52 1.1.83 1.69.83m.22 1.63h-2.79v8.37h2.79z"></path>
                </svg>
              </motion.a>
              
              <motion.a
                href="#"
                className="text-white hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.2, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                </svg>
              </motion.a>
            </div>
          </motion.div>
          
          {sections.map((section, sectionIdx) => (
            <motion.div key={sectionIdx} variants={fadeInUp} className="col-span-1">
              <h5 className="font-semibold mb-4 text-lg text-white">{section.title}</h5>
              <ul className="space-y-3">
                {section.links.map((item) => (
                  <motion.li key={item.name}>
                    <motion.a
                      href={item.href}
                      className="text-white hover:text-white transition-colors duration-200"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.name}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          variants={fadeInUp}
          className="border-t border-emerald-700 mt-8 pt-8 text-center"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white text-sm">
              {copyright}
            </p>
            
            <div className="flex space-x-6 text-sm">
              {legalLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-white hover:text-white transition-colors duration-200"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};