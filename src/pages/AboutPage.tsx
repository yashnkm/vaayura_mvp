import { useEffect } from 'react'
import { AboutVaayura } from '@/components/about/AboutVaayura'
import { Layout } from '@/components/layout/Layout'
import Lenis from 'lenis'

export function AboutPage() {
  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Layout>
      <AboutVaayura />
    </Layout>
  )
}