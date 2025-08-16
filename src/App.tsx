import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { ProductsPage } from './pages/ProductsPage'
import { ContactPage } from './pages/ContactPage'
import { BlogPage } from './pages/BlogPage'
import { BlogPostPage } from './pages/BlogPostPage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'

function LenisScrollProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  useEffect(() => {
    // Initialize Lenis on main content pages, not auth pages
    const contentPages = ['/', '/about', '/products', '/contact', '/blog']
    const isContentPage = contentPages.includes(location.pathname) || location.pathname.startsWith('/blog/')
    
    if (isContentPage) {
      const lenis = new Lenis({
        duration: 1.2,
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
    }
  }, [location.pathname])

  return <>{children}</>
}

function App() {
  return (
    <Router>
      <LenisScrollProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </LenisScrollProvider>
    </Router>
  )
}

export default App
