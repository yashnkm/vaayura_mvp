import { Header1 } from '@/components/ui/header';
import { Hero3DFinal } from '@/components/3d-demo/Hero3DFinal';
import { Footer } from '@/components/shared/Footer';

export function ThreeDemoPage() {
  return (
    <div className="min-h-screen">
      <Header1 />
      <Hero3DFinal />
      <Footer />
    </div>
  );
}