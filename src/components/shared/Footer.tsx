import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logoImage from "@/assets/sections/shared/logos/logo_2.png";

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
      { name: "Vaayura Storm", href: "/products/storm" },
      { name: "Vaayura Nest", href: "/products/nest" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", href: "/contact" },
      { name: "Installation Guide", href: "/contact" },
      { name: "Warranty", href: "/contact" },
      { name: "Contact Us", href: "/contact" },
    ],
  },
];

const defaultLegalLinks: Array<{ name: string; href: string }> = [];

export const Footer = ({
  sections = defaultSections,
  description = "Breathe clean, live healthy. Vaayura's advanced air purification technology ensures your home has the cleanest air possible.",
  copyright = "© 2025 Vaayura. All rights reserved.",
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
        {/* Mobile: Different layout */}
        <div className="block md:hidden">
          {/* Logo and Description */}
          <motion.div variants={fadeInUp} className="mb-8">
            <motion.div 
              className="mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={logoImage} 
                alt="Vaayura" 
                className="h-10 filter brightness-0 invert mb-4" 
                style={{ 
                  width: 'auto',
                  height: '2.5rem',
                  objectFit: 'contain'
                }}
                loading="lazy"
              />
            </motion.div>
            <p className="text-white text-lg mb-6 font-subheading">{description}</p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 justify-center">
              <motion.a
                href="#"
                className="text-white hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.2, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </motion.a>

              <motion.a
                href="#"
                className="text-white hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.2, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M8 11v5M8 8v.01M12 16v-5M16 16v-3a2 2 0 0 0-4 0"/>
                </svg>
              </motion.a>

              <motion.a
                href="#"
                className="text-white hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.2, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Mobile: Left (Company + Products) and Right (Support) - 2 columns only */}
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column: Company + Products */}
            <motion.div variants={fadeInUp} className="space-y-8">
              {/* Company Section */}
              <div>
                <h5 className="font-semibold mb-4 text-lg text-white">Company</h5>
                <ul className="space-y-3">
                  {sections[0].links.map((item) => (
                    <motion.li key={item.name}>
                      <motion.div
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          to={item.href}
                          className="text-white hover:text-white transition-colors duration-200"
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Products Section */}
              <div>
                <h5 className="font-semibold mb-4 text-lg text-white">Products</h5>
                <ul className="space-y-3">
                  {sections[1].links.map((item) => (
                    <motion.li key={item.name}>
                      <motion.div
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          to={item.href}
                          className="text-white hover:text-white transition-colors duration-200"
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right Column: Support */}
            <motion.div variants={fadeInUp}>
              <h5 className="font-semibold mb-4 text-lg text-white">Support</h5>
              <ul className="space-y-3">
                {sections[2].links.map((item) => (
                  <motion.li key={item.name}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        to={item.href}
                        className="text-white hover:text-white transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Desktop: Original layout */}
        <div className="hidden md:grid md:grid-cols-7 gap-8">
          <motion.div variants={fadeInUp} className="col-span-1 md:col-span-3">
            <motion.div 
              className="mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={logoImage} 
                alt="Vaayura" 
                className="h-10 filter brightness-0 invert mb-4" 
                style={{ 
                  width: 'auto',
                  height: '2.5rem',
                  objectFit: 'contain'
                }}
                loading="lazy"
              />
            </motion.div>
            <p className="text-white text-lg mb-6 font-subheading">{description}</p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="text-white hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.2, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </motion.a>

              <motion.a
                href="#"
                className="text-white hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.2, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M8 11v5M8 8v.01M12 16v-5M16 16v-3a2 2 0 0 0-4 0"/>
                </svg>
              </motion.a>

              <motion.a
                href="#"
                className="text-white hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.2, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
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
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        to={item.href}
                        className="text-white hover:text-white transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
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
                <motion.div
                  key={link.name}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.href === "#" ? (
                    <span className="text-white cursor-not-allowed opacity-60">
                      {link.name}
                    </span>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-white hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};