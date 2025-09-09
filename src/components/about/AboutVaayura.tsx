import { Button } from "@/components/ui/button";
import { ProductClients } from "@/components/products/ProductClients";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TreePine, Target } from 'lucide-react';
import heroImage from "@/assets/sections/about/aboutus1.png";
import productImage from "@/assets/sections/shared/backgrounds/background.png";
import problemImage from "@/assets/sections/about/problem_img.png";
import lowAirQualityImage from "@/assets/sections/about/lowairquality.png";
import pollutedAirImage from "@/assets/sections/about/poluttedair.png";

interface AboutVaayuraProps {
  title?: string;
  description?: string;
  mainImage?: {
    src: string;
    alt: string;
  };
  secondaryImage?: {
    src: string;
    alt: string;
  };
  breakout?: {
    src: string;
    alt: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: Array<{
    label: string;
    value: string;
  }>;
}

const defaultAchievements = [
  { label: "Years of Engineering Excellence", value: "29+" },
  { label: "Air Quality Improved", value: "99.95%" },
  { label: "Customer Satisfaction", value: "100%" },
  { label: "Cities Served", value: "50+" },
];

// Animation variants for scroll effects
const fadeInUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.2
    }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.3
    }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.3
    }
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

export const AboutVaayura = ({
  title = "About Vaayura",
  description = "Our Story Begins with a Breath. In 2025, we asked a simple question: Why is clean air still considered a privilege? Returning from abroad, our founders saw loved ones breathing 'Hazardous' air daily without even realizing it. It wasn't just a statistic, it was personal. That moment became our mission.",
  mainImage = {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center",
    alt: "Air purification technology",
  },
  secondaryImage = {
    src: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=600&fit=crop&crop=center",
    alt: "Modern air purifier",
  },
  breakout = {
    src: "/logo_2.png",
    alt: "Vaayura logo",
    title: "Built on Engineering Excellence",
    description: "Vaayura is built on the foundation of Grasp Enterprises, an engineering leader since 1996. With decades of experience in air conditioning, renewable energy, and automation.",
    buttonText: "Learn More",
    buttonUrl: "#",
  },
  achievementsTitle = "Our Promise in Numbers",
  achievementsDescription = "We promise cutting-edge air purification technology, built to last and backed by robust service. Our purifiers combine multi-layer filtration with intelligent sensors, delivering exceptional performance while operating quietly in the background.",
  achievements = defaultAchievements,
}: AboutVaayuraProps = {}) => {
  return (
    <>
      {/* Full-Screen Hero Section */}
      <section className="min-h-screen bg-white flex items-center pt-24 pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center min-h-[80vh]">
            
            {/* Left Column: Text Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora text-brand-grey-green leading-tight">
                  About Us
                </h1>
                <div className="w-16 h-1 bg-brand-pastel-green rounded-full"></div>
                
                <h2 className="text-xl md:text-2xl font-semibold font-sora text-brand-grey-green">
                  Our Story Begins with a Breath.
                </h2>
                
                <div className="space-y-4 text-lg text-brand-dark-grey font-montserrat leading-relaxed">
                  <p>
                    In 2025, we asked a simple question: Why is clean air still considered a privilege?
                  </p>
                  <p>
                    Returning from abroad, our founders saw loved ones breathing "Hazardous" air daily without even realizing it. 
                    It wasn't just a statistic, it was personal. That moment became our mission.
                  </p>
                </div>
              </div>

              {/* Our Roots Section with Visual Element */}
              <div className="relative space-y-6">
                {/* First section with dot */}
                <div className="relative flex gap-4">
                  <div className="relative">
                    <div className="flex w-12 h-12 items-center justify-center overflow-hidden rounded-full border-2 border-brand-pastel-green/30 bg-brand-pastel-green/10">
                      <TreePine className="w-6 h-6 text-brand-pastel-green" />
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-semibold font-sora text-brand-grey-green mb-3">Our Roots</h3>
                    <p className="text-base text-brand-dark-grey font-montserrat leading-relaxed">
                      Vaayura is built on the foundation of Grasp Enterprises, an engineering leader since 1996. 
                      With decades of experience in air conditioning, renewable energy, and automation, 
                      we know how to build systems that work beautifully and last.
                    </p>
                  </div>
                </div>

                {/* Second section with dot */}
                <div className="relative flex gap-4">
                    <div className="relative">
                      <div className="flex w-12 h-12 items-center justify-center overflow-hidden rounded-full border-2 border-brand-pastel-green/30 bg-brand-pastel-green/10">
                        <Target className="w-6 h-6 text-brand-pastel-green" />
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="text-xl font-semibold font-sora text-brand-grey-green mb-3">Our Mission</h3>
                      <p className="text-base text-brand-dark-grey font-montserrat leading-relaxed">
                        To make clean air accessible to every Indian home, transforming the way families breathe, live, and thrive in their indoor spaces.
                      </p>
                    </div>
                  </div>
              </div>
            </div>

            {/* Right Column: Hero Image */}
            <div className="relative">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-2xl">
                <img
                  src={heroImage}
                  alt="Pure nature - representing clean air and environmental wellness"
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition: '50% center'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-grey-green/30 to-transparent"></div>
                
                {/* Floating Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-brand-pastel-green/20">
                  <h4 className="text-lg font-semibold font-sora text-brand-grey-green mb-2">
                    Pure Air Technology
                  </h4>
                  <p className="text-sm text-brand-dark-grey font-montserrat leading-relaxed">
                    Inspired by nature's own air purification systems, we bring you technology that works in harmony with the environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* The Problem We Solve Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, threshold: 0.3, margin: "-100px" }}
        variants={staggerContainer}
        className="w-full py-16 lg:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-12">
            
            {/* Section Header */}
            <motion.div variants={fadeInUp} className="text-left space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora text-brand-grey-green leading-tight">
                The Problem We Solve
              </h2>
              <div className="w-16 h-1 bg-brand-pastel-green rounded-full"></div>
              <p className="text-lg text-brand-dark-grey font-montserrat max-w-3xl leading-relaxed">
                "What You Can't See, You Still Breathe."
              </p>
            </motion.div>

            {/* Problem Content */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              {/* Problem Content */}
              <motion.div variants={fadeInLeft} className="flex-1 space-y-6">
                {/* Problem Number */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-pastel-green flex items-center justify-center">
                    <span className="text-brand-grey-green font-bold text-lg">01</span>
                  </div>
                  <div className="h-px bg-brand-pastel-green/30 flex-1" />
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-sora text-brand-grey-green leading-tight">
                  The Invisible Threat
                </h3>

                {/* Description */}
                <p className="text-brand-dark-grey font-montserrat leading-relaxed text-lg">
                  Every breath you take in India carries more than just oxygen - it carries dust, smoke, industrial particles, and invisible toxins. The WHO estimates that nearly 18% of all deaths in India are linked to air pollution. Vaayura exists to change that by making clean air effortless, affordable, and accessible.
                </p>

                {/* Critical Statistics */}
                <div className="space-y-2">
                  <div className="text-sm font-medium font-sora text-brand-grey-green">
                    Critical Statistics
                  </div>
                  <div className="text-brand-dark-grey font-montserrat text-sm">
                    18% Deaths Linked to Air Pollution • PM2.5 Levels 10x WHO Limits • 1.7M Annual Deaths
                  </div>
                </div>
              </motion.div>

              {/* Problem Image */}
              <motion.div variants={fadeInRight} className="flex-1 relative max-w-lg">
                <div className="aspect-[4/3] w-full">
                  <img 
                    src={lowAirQualityImage} 
                    alt="Air pollution in urban India - industrial emissions"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Why Clean Air Matters Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, threshold: 0.3, margin: "-100px" }}
        variants={staggerContainer}
        className="w-full py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-12">
            
            {/* Section Header */}
            <motion.div variants={fadeInUp} className="text-left space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora text-brand-grey-green leading-tight">
                Why Clean Air Matters
              </h2>
              <div className="w-16 h-1 bg-brand-pastel-green rounded-full"></div>
              <p className="text-lg text-brand-dark-grey font-subheading max-w-3xl leading-relaxed">
                "Polluted air: the silent killer in Indian cities."
              </p>
            </motion.div>

            {/* Health Impact Content */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16">
              {/* Health Impact Image */}
              <motion.div variants={fadeInRight} className="flex-1 relative max-w-lg">
                <div className="aspect-[4/3] w-full">
                  <img 
                    src={pollutedAirImage}
                    alt="Polluted air impact - health and environmental concerns"
                    className="w-full h-full object-cover rounded-xl"
                    style={{
                      objectPosition: 'center 95%'
                    }}
                  />
                </div>
              </motion.div>

              {/* Health Impact Content */}
              <motion.div variants={fadeInLeft} className="flex-1 space-y-6">
                {/* Health Number */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-pastel-green flex items-center justify-center">
                    <span className="text-brand-grey-green font-bold text-lg">02</span>
                  </div>
                  <div className="h-px bg-brand-pastel-green/30 flex-1" />
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-sora text-brand-grey-green leading-tight">
                  The Health Impact
                </h3>

                {/* Description */}
                <p className="text-brand-dark-grey font-subheading leading-relaxed text-lg">
                  WHO estimates that 7 million people die every year from exposure to fine particles in polluted air that lead to diseases such as stroke, heart disease, lung cancer, chronic obstructive pulmonary diseases and respiratory infections, including pneumonia.
                </p>

                {/* Vulnerable Groups */}
                <div className="space-y-4">
                  <h4 className="text-lg font-sora font-semibold text-brand-grey-green mb-3">Most Vulnerable Groups</h4>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-brand-pastel-green mt-2 flex-shrink-0"></div>
                        <div>
                          <h5 className="font-semibold text-brand-pastel-green mb-1">Children</h5>
                          <p className="text-sm text-brand-dark-grey">May develop lung issues in early stage of development</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-brand-pastel-green mt-2 flex-shrink-0"></div>
                        <div>
                          <h5 className="font-semibold text-brand-pastel-green mb-1">Pregnant Women</h5>
                          <p className="text-sm text-brand-dark-grey">Increased risk of low birth weight & preterm birth</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-brand-pastel-green mt-2 flex-shrink-0"></div>
                        <div>
                          <h5 className="font-semibold text-brand-pastel-green mb-1">Elderly</h5>
                          <p className="text-sm text-brand-dark-grey">Increased risk of poor health</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-brand-pastel-green mt-2 flex-shrink-0"></div>
                        <div>
                          <h5 className="font-semibold text-brand-pastel-green mb-1">Pre-existing Conditions</h5>
                          <p className="text-sm text-brand-dark-grey">Increased risk of complications</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WHO Recommendation */}
                <div>
                  <p className="text-sm font-medium text-brand-dark-grey">
                    WHO Recommendation: Use of air purifiers in India to minimize indoor air pollution.
                  </p>
                </div>

                {/* At Risk Groups */}
                <div className="space-y-2">
                  <div className="text-sm font-medium font-sora text-brand-grey-green">
                    High Risk Groups
                  </div>
                  <div className="text-brand-dark-grey font-subheading text-sm">
                    City Residents • Construction Areas • Vehicular Emissions • Crop Burning Zones • Pet Allergies
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Why Choose Vaayura Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, threshold: 0.3, margin: "-100px" }}
        variants={staggerContainer}
        className="w-full py-16 lg:py-24 bg-gray-100">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-12">
            
            {/* Section Header */}
            <motion.div variants={fadeInUp} className="text-left space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora text-brand-grey-green leading-tight">
                Why Choose Vaayura?
              </h2>
              <div className="w-16 h-1 bg-brand-pastel-green rounded-full"></div>
            </motion.div>

            {/* Features Content */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16">
              {/* Features Image */}
              <motion.div variants={fadeInRight} className="flex-1 relative max-w-lg">
                <div className="aspect-[4/3] w-full">
                  <img 
                    src={productImage} 
                    alt="Vaayura air purifier - premium design and technology"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </motion.div>

              {/* Features Content */}
              <motion.div variants={fadeInLeft} className="flex-1 space-y-6">
                {/* Features Number */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-pastel-green flex items-center justify-center">
                    <span className="text-brand-grey-green font-bold text-lg">03</span>
                  </div>
                  <div className="h-px bg-brand-pastel-green/30 flex-1" />
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-sora text-brand-grey-green leading-tight">
                  Our Solution Advantage
                </h3>

                {/* Features List */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-pastel-green mt-2 flex-shrink-0"></div>
                    <p className="text-brand-dark-grey font-montserrat leading-relaxed">
                      <strong>World-class multi-layer filtration</strong> removing up to 99.97% of harmful airborne particles
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-pastel-green mt-2 flex-shrink-0"></div>
                    <p className="text-brand-dark-grey font-montserrat leading-relaxed">
                      <strong>Real-time air quality monitoring</strong> for complete control and transparency
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-pastel-green mt-2 flex-shrink-0"></div>
                    <p className="text-brand-dark-grey font-montserrat leading-relaxed">
                      <strong>Designed to complement your interiors</strong> - elegant, minimal, and timeless
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-pastel-green mt-2 flex-shrink-0"></div>
                    <p className="text-brand-dark-grey font-montserrat leading-relaxed">
                      <strong>Long-lasting performance</strong> with low maintenance needs and energy efficiency
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-pastel-green mt-2 flex-shrink-0"></div>
                    <p className="text-brand-dark-grey font-montserrat leading-relaxed">
                      <strong>Backed by exceptional after-sales support</strong> and comprehensive warranty coverage
                    </p>
                  </div>
                </div>

                {/* Performance Guarantee */}
                <div className="space-y-2">
                  <div className="text-sm font-medium font-sora text-brand-grey-green">
                    Performance Guarantee
                  </div>
                  <div className="text-brand-dark-grey font-montserrat text-sm">
                    99.97% Filtration • Real-time Monitoring • 29+ Years Engineering Excellence
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Achievements Section - Our Promise in Numbers */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, threshold: 0.3, margin: "-100px" }}
        variants={staggerContainer}
        className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeInUp} className="flex flex-col gap-4 text-left mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold font-sora text-brand-grey-green">{achievementsTitle}</h2>
            <div className="w-16 h-1 bg-brand-pastel-green rounded-full"></div>
            <p className="max-w-4xl text-lg text-brand-dark-grey font-montserrat">
              {achievementsDescription}
            </p>
          </motion.div>
          <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl">
            {achievements.map((item, idx) => (
              <motion.div variants={fadeInUp} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center" key={item.label + idx}>
                <span className="text-3xl md:text-4xl lg:text-5xl font-semibold font-sora text-brand-grey-green block mb-3">
                  {item.value}
                </span>
                <p className="text-brand-dark-grey font-montserrat text-sm md:text-base">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Trusted by Industry Leaders Section */}
      <ProductClients />

    </>
  );
};