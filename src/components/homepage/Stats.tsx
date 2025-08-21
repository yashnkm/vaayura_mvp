import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function Stats() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-emerald-900">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container mx-auto px-4 text-center"
      >
        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-sora text-white mb-8">
            Trusted by Thousands, Engineered for Excellence
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <div className="text-3xl font-sora font-bold text-white mb-2">99%+ Users Solid</div>
            <div className="text-emerald-100 font-montserrat">Air purification efficiency rated by our customers</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <div className="text-3xl font-sora font-bold text-white mb-2">4.9/5 Average Rating</div>
            <div className="text-emerald-100 font-montserrat">Thousands of verified customer reviews</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <div className="text-3xl font-sora font-bold text-white mb-2">100% Coverage</div>
            <div className="text-emerald-100 font-montserrat">Complete room air purification guaranteed</div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}