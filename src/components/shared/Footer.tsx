import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import logoImage from "@/assets/logo_2.png";

interface FooterProps {
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Products",
    links: [
      { name: "Vaayura Mini", href: "#" },
      { name: "Vaayura Zen", href: "#" },
      { name: "Replacement Filters", href: "#" },
      { name: "Compare Models", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "#" },
      { name: "Our Story", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
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

const defaultSocialLinks = [
  { icon: <FaInstagram className="size-5" />, href: "#", label: "Instagram" },
  { icon: <FaFacebook className="size-5" />, href: "#", label: "Facebook" },
  { icon: <FaTwitter className="size-5" />, href: "#", label: "Twitter" },
  { icon: <FaLinkedin className="size-5" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

export const Footer = ({
  sections = defaultSections,
  description = "Breathe clean, live healthy. Vaayura's advanced air purification technology ensures your home has the cleanest air possible.",
  socialLinks = defaultSocialLinks,
  copyright = "© 2024 Vaayura. All rights reserved.",
  legalLinks = defaultLegalLinks,
}: FooterProps) => {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* Logo */}
            <div className="flex lg:justify-start">
              <a href="/">
                <img src={logoImage} alt="Vaayura" className="h-10" />
              </a>
            </div>
            <p className="max-w-[70%] text-sm text-brand-dark-grey font-body">
              {description}
            </p>
            <ul className="flex items-center space-x-6 text-brand-dark-grey/70">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-brand-pastel-green transition-colors">
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold font-heading text-brand-grey-green">{section.title}</h3>
                <ul className="space-y-3 text-sm text-brand-dark-grey/70">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-brand-pastel-green transition-colors font-body"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-brand-pastel-green/20 py-8 text-xs font-medium text-brand-dark-grey/70 md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1 font-body">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-brand-pastel-green transition-colors font-body">
                <a href={link.href}> {link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};