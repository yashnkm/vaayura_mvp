import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FAQ {
  question: string;
  answer: string;
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const faqs: FAQ[] = [
    {
      question: "What makes your purifiers stand out?",
      answer: "Our purifiers combine HEPA 13 filtration with smart sensors and a beautiful design, offering superior performance at a more accessible price point than leading brands."
    },
    {
      question: "Are your purifiers compatible with all rooms?",
      answer: "Yes, we offer different models for various room sizes. The Vaayura Zen is ideal for larger spaces up to 800 sq. ft, while the Vaayura Mini is perfect for personal spaces like bedrooms and offices up to 300 sq. ft."
    },
    {
      question: "How long does the filter last?",
      answer: "Our high-efficiency filters are designed to last approximately 6-12 months, depending on usage and air quality. The smart app will notify you when it's time for a replacement."
    },
    {
      question: "Are the purifiers silent at night?",
      answer: "Absolutely. All our models feature a whisper-quiet Sleep Mode that dims the lights and reduces fan speed to ensure an undisturbed night's sleep while continuing to purify your air."
    },
    {
      question: "Do you offer a warranty?",
      answer: "Yes, all Vaayura air purifiers come with a comprehensive 3-year warranty covering any manufacturing defects and performance issues."
    },
    {
      question: "How much electricity does it consume?",
      answer: "Vaayura air purifiers are Energy Star certified and highly efficient. The Mini uses only 25-35W on average (less than a light bulb), while the Zen uses 35-55W. Running 24/7, your monthly electricity cost will typically be under $5."
    },
    {
      question: "Can I control it with my smartphone?",
      answer: "Yes! The Vaayura Zen model includes full app connectivity, allowing you to monitor air quality, adjust settings, schedule operation, and receive filter replacement notifications."
    },
    {
      question: "Is it safe for children and pets?",
      answer: "Absolutely! Our air purifiers are designed with family safety in mind. They produce no harmful ozone, use child-safe materials, and operate with whisper-quiet technology that won't disturb sleep."
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-start"
      >
        <motion.div variants={fadeInUp}>
          <p className="text-sm text-gray-800 uppercase font-semibold tracking-wide">FAQ</p>
          <h3 className="text-4xl md:text-5xl font-bold mt-2 mb-6 text-gray-800">
            Everything You Need to Know About Our{' '}
            <span className="text-gray-800">Purifiers</span>
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            Have questions about our air purifiers? We've got answers. 
            Find everything you need to know about performance, maintenance, 
            and features.
          </p>
        </motion.div>
        
        <motion.div variants={fadeInUp} className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-b border-gray-200 pb-4"
            >
              <motion.button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left font-semibold text-lg text-gray-800 hover:text-gray-600 transition-colors duration-200"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <span>{faq.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="ml-4 flex-shrink-0"
                >
                  <svg 
                    fill="none" 
                    height="24" 
                    stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="1.5" 
                    viewBox="0 0 24 24" 
                    width="24"
                    className="text-gray-800"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </motion.span>
              </motion.button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <motion.p
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                      className="text-gray-700 mt-3 text-base leading-relaxed"
                    >
                      {faq.answer}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}