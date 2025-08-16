import { Header1 } from '@/components/ui/header'
import { Footer } from '@/components/shared/Footer'

interface LayoutProps {
  children: React.ReactNode
  showFooter?: boolean
}

export function Layout({ children, showFooter = true }: LayoutProps) {
  return (
    <>
      <Header1 />
      <main className="min-h-screen">
        {children}
      </main>
      {showFooter && <Footer />}
    </>
  )
}

export default Layout