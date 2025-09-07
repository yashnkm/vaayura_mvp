import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import Lenis from 'lenis';
import { ProductDetailHero } from '@/components/product-detail/ProductDetailHero';
import { ProductFeatures } from '@/components/products/ProductFeatures';
import { ProductDetailSpecifications } from '@/components/product-detail/ProductDetailSpecifications';
import { ProductShowcaseSection } from '@/components/homepage/ProductShowcaseSection';
import { database } from '@/lib/supabase';

// Simple in-memory cache for product data
const productCache = new Map<string, { data: Product; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Define types locally to avoid import issues
interface ProductFeature {
  title: string
  description: string
  icon: string
}

interface ProductSpecifications {
  [key: string]: string
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  features: ProductFeature[]
  specifications: ProductSpecifications
  published: boolean
  slug: string
  created_at: string
}

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) {
        setError('Product not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Check cache first
        const cached = productCache.get(slug);
        const now = Date.now();
        
        if (cached && (now - cached.timestamp) < CACHE_DURATION) {
          // Use cached data if it's still fresh
          setProduct(cached.data);
          setLoading(false);
          return;
        }
        
        // Try to fetch by slug first, fallback to ID
        let { data, error } = await database.products.getBySlug(slug);
        
        if (error || !data) {
          // Fallback: try to fetch by ID if slug doesn't work
          const response = await database.products.getById(slug);
          data = response.data;
          error = response.error;
        }

        if (error) {
          throw error;
        }

        if (!data) {
          setError('Product not found');
          return;
        }

        // Cache the successful result
        productCache.set(slug, { data, timestamp: now });
        setProduct(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

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

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-pastel-green mx-auto mb-4"></div>
            <p className="text-brand-grey-green font-sora text-xl">Loading product...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-sora text-brand-grey-green">Product Not Found</h1>
            <p className="text-brand-dark-grey font-body text-lg">
              {error || 'The product you are looking for does not exist.'}
            </p>
            <button 
              onClick={() => window.history.back()}
              className="bg-brand-pastel-green hover:bg-brand-pastel-green/90 text-brand-grey-green px-8 py-3 rounded-full font-medium transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // Determine product filter based on product name or slug
  const getProductFilter = (product: Product): 'storm' | 'nest' | undefined => {
    const name = product.name.toLowerCase();
    const slug = product.slug.toLowerCase();
    if (name.includes('storm') || slug.includes('storm')) return 'storm';
    if (name.includes('nest') || slug.includes('nest')) return 'nest';
    return undefined;
  };

  return (
    <Layout>
      <ProductDetailHero product={product} />
      <ProductFeatures />
      <ProductDetailSpecifications product={product} />
      <ProductShowcaseSection productFilter={getProductFilter(product)} />
    </Layout>
  );
}