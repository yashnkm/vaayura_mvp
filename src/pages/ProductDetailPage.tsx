import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProductDetailHero } from '@/components/product-detail/ProductDetailHero';
import { ProductDetailFeatures } from '@/components/product-detail/ProductDetailFeatures';
import { ProductDetailSpecifications } from '@/components/product-detail/ProductDetailSpecifications';
import { ProductClients } from '@/components/products/ProductClients';
import { ProductContact } from '@/components/products/ProductContact';
import { database } from '@/lib/supabase';

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

        setProduct(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-pastel-green mx-auto mb-4"></div>
            <p className="text-brand-grey-green font-heading text-xl">Loading product...</p>
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
            <h1 className="text-4xl font-display text-brand-grey-green">Product Not Found</h1>
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

  return (
    <Layout>
      <ProductDetailHero product={product} />
      <ProductDetailFeatures product={product} />
      <ProductDetailSpecifications product={product} />
      <ProductClients />
      <ProductContact />
    </Layout>
  );
}