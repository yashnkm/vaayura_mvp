import { Header1 } from '@/components/ui/header';
import { Hero3DSimple } from '@/components/3d-demo/Hero3DSimple';
import { Footer } from '@/components/shared/Footer';

export function ThreeDemoPage() {
  return (
    <div className="min-h-screen">
      <Header1 />
      <Hero3DSimple />
      <Footer />
    </div>
  );
}