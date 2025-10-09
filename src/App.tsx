import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { HomePage } from './pages/HomePage'
import { HomePage2 } from './pages/HomePage2'
import { HomePage3 } from './pages/HomePage3'
import { AboutPage } from './pages/AboutPage'
import { ProductsPage } from './pages/ProductsPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { CheckoutPage2 } from './pages/CheckoutPage2'
import { BulkOrderPage } from './pages/BulkOrderPage'
import { ContactPage } from './pages/ContactPage'
import { BlogPage } from './pages/BlogPage'
import { BlogPostPage } from './pages/BlogPostPage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { AdminPage } from './pages/AdminPage'
import { ThreeDemoPage } from './pages/3DemoPage'
import { SupportPage } from './pages/SupportPage'
import { ProductSupportPage } from './pages/ProductSupportPage'
import { InvoicePreviewPage } from './pages/InvoicePreviewPage'

function LenisScrollProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  useEffect(() => {
    // Force scroll to top immediately on route change - CRITICAL
    // Use multiple methods and multiple timings to ensure it works
    const scrollToTop = () => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }

    // Immediate scroll
    scrollToTop()

    // Multiple delayed scrolls to catch async rendering at different stages
    const timeouts: NodeJS.Timeout[] = []
    timeouts.push(setTimeout(scrollToTop, 0))
    timeouts.push(setTimeout(scrollToTop, 10))
    timeouts.push(setTimeout(scrollToTop, 50))
    timeouts.push(setTimeout(scrollToTop, 100))

    // Also use requestAnimationFrame for next paint
    let rafId = requestAnimationFrame(() => {
      scrollToTop()
      rafId = requestAnimationFrame(scrollToTop)
    })

    // Initialize Lenis on main content pages, not auth pages
    const contentPages = ['/', '/home2', '/home3', '/about', '/products', '/contact', '/blog', '/3d-demo', '/support', '/bulk-order']
    const isContentPage = contentPages.includes(location.pathname) ||
                          location.pathname.startsWith('/blog/') ||
                          location.pathname.startsWith('/support/') ||
                          location.pathname.startsWith('/products/')

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
        timeouts.forEach(timeout => clearTimeout(timeout))
        cancelAnimationFrame(rafId)
        lenis.destroy()
      }
    }

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout))
      cancelAnimationFrame(rafId)
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
          <Route path="/home2" element={<HomePage2 />} />
          <Route path="/home3" element={<HomePage3 />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage2 />} />
          <Route path="/checkout-original" element={<CheckoutPage />} />
          <Route path="/bulk-order" element={<BulkOrderPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/3d-demo" element={<ThreeDemoPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/support/:slug" element={<ProductSupportPage />} />
          <Route path="/invoice-preview" element={<InvoicePreviewPage />} />
        </Routes>
      </LenisScrollProvider>
    </Router>
  )
}

export default App
