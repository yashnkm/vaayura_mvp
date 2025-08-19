import { Shield, Zap, Leaf, Moon, Sparkles, Wifi, Wind, Heart, Timer, Volume2 } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

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

interface ProductDetailFeaturesProps {
  product: Product;
}

// Icon mapping for feature icons
const iconMap = {
  shield: Shield,
  zap: Zap,
  leaf: Leaf,
  moon: Moon,
  sparkles: Sparkles,
  wifi: Wifi,
  wind: Wind,
  heart: Heart,
  timer: Timer,
  volume2: Volume2,
};

export function ProductDetailFeatures({ product }: ProductDetailFeaturesProps) {
  // Fallback features if none provided - ensure we have exactly 5
  const defaultFeatures = [
    {
      title: "Advanced HEPA Filtration",
      description: "Multi-layer HEPA filtration system removes 99.97% of ultra-fine particles including allergens, dust, and pollutants.",
      icon: "shield"
    },
    {
      title: "Smart Auto Detection", 
      description: "Intelligent sensors automatically detect air quality.",
      icon: "zap"
    },
    {
      title: "Ambient Air Quality Display",
      description: "Real-time visual air quality indicator with ambient light functionality that displays current air quality at a glance.",
      icon: "leaf"
    },
    {
      title: "Aromatherapy Function",
      description: "Built-in aromatherapy functionality to add your favourite essential oils and keep your room smelling fresh.",
      icon: "sparkles"
    },
    {
      title: "Silent Sleep Mode",
      description: "Ambient light turns off and operates in near silence (quieter than a silent library at 40 dB) for undisturbed rest.",
      icon: "volume2"
    }
  ];

  // Use product features if available, otherwise use defaults
  let features = product.features && product.features.length > 0 ? [...product.features] : [...defaultFeatures];
  
  // Ensure we have at least 5 features - add fallbacks if needed
  if (features.length < 5) {
    const needed = 5 - features.length;
    features.push(...defaultFeatures.slice(0, needed));
  }

  // Limit to 5 features for the bento grid
  features = features.slice(0, 5);

  // Feature-specific background images using Unsplash URLs for air purifier features
  const getFeatureImage = (title: string, index: number) => {
    // Match features to relevant air purifier/technology images
    if (title.toLowerCase().includes('hepa') || title.toLowerCase().includes('filtration')) {
      return "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=60";
    }
    if (title.toLowerCase().includes('smart') || title.toLowerCase().includes('auto') || title.toLowerCase().includes('sensor')) {
      return "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&auto=format&fit=crop&q=60";
    }
    if (title.toLowerCase().includes('ambient') || title.toLowerCase().includes('light') || title.toLowerCase().includes('display')) {
      return "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60";
    }
    if (title.toLowerCase().includes('aroma') || title.toLowerCase().includes('essential')) {
      return "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=800&auto=format&fit=crop&q=60";
    }
    if (title.toLowerCase().includes('silent') || title.toLowerCase().includes('sleep') || title.toLowerCase().includes('quiet')) {
      return "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&auto=format&fit=crop&q=60";
    }
    if (title.toLowerCase().includes('wifi') || title.toLowerCase().includes('app') || title.toLowerCase().includes('connect')) {
      return "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&auto=format&fit=crop&q=60";
    }
    if (title.toLowerCase().includes('timer') || title.toLowerCase().includes('schedule')) {
      return "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=800&auto=format&fit=crop&q=60";
    }
    // Default air purifier images for other features
    const defaultImages = [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&auto=format&fit=crop&q=60"
    ];
    return defaultImages[index % defaultImages.length];
  };

  // Convert to BentoCard format
  const bentoFeatures = features.map((feature, index) => {
    const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Shield;
    const featureImage = getFeatureImage(feature.title, index);
    
    return {
      Icon: IconComponent,
      name: feature.title,
      description: feature.description,
      href: "#",
      cta: "Learn more",
      background: (
        <div className="absolute inset-0">
          <img 
            src={featureImage} 
            alt={feature.title}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-pastel-green/30 to-brand-pastel-green/50" />
        </div>
      ),
      // Assign different grid positions for varied layout matching the reference
      className: index === 0 
        ? "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3" // Large center card
        : index === 1
        ? "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3" // Tall left card
        : index === 2
        ? "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4" // Small left bottom
        : index === 3
        ? "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2" // Small right top
        : "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-4" // Tall right card
    };
  });

  return (
    <section className="py-20 lg:py-32 bg-slate-50">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col gap-12">
          
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-brand-grey-green leading-tight">
              Advanced <span className="text-brand-pastel-green">Features</span>
            </h2>
            <p className="text-lg text-brand-dark-grey font-body max-w-3xl mx-auto leading-relaxed">
              Every feature in {product.name} is engineered to provide you with the cleanest, healthiest air while maintaining 
              the perfect balance of performance and tranquility.
            </p>
          </div>

          {/* Bento Grid Features */}
          <BentoGrid className="lg:grid-rows-3">
            {bentoFeatures.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>

          
        </div>
      </div>
    </section>
  );
}