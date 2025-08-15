import { useEffect } from 'react'
import Lenis from 'lenis'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Problem } from './components/sections/Problem'
import { ProductHighlights } from './components/sections/ProductHighlights'
import { WhyChoose } from './components/sections/WhyChoose'
// import { VaayuraFoundationDemo } from './components/demo'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Hero />
      <About />
      <Problem />
      <ProductHighlights />
      <WhyChoose />
    </>
  )
}

export default App
