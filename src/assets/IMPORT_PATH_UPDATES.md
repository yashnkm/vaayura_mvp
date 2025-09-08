# Import Path Updates Required

## Files that need import path updates:

### Homepage Components:
1. **Hero3DSection.tsx**: `productHeroSection.jpg` → `sections/homepage/hero/productHeroSection.jpg`
2. **AppControlSection.tsx**: `screenshot_new.png` → `sections/homepage/features/screenshot_new.png`
3. **ProductsShowcase.tsx**: Product images → `sections/products/product-images/`
4. **FiltrationTechnology.tsx**: Filtration images → `sections/homepage/filtration/`
5. **Hero2.tsx**: Multiple hero and feature images need updates

### Products Components:
1. **ProductHero.tsx**: `product_hero_image.png` → `sections/products/hero/product_hero_image.png`
2. **ProductFeatures.tsx**: All feature images → `sections/products/features/`
3. **ProductDetailSpecifications.tsx**: Product images → `sections/products/product-images/`

### About Components:
1. **AboutVaayura.tsx**: Background and problem images → `sections/shared/backgrounds/` and `sections/about/`

### Shared Components:
1. **Header.tsx**: Logo → `sections/shared/logos/logo_2.png`
2. **Footer.tsx**: Logo → `sections/shared/logos/logo_2.png`
3. **Auth components**: Logo and backgrounds → `sections/shared/`

### Blog Components:
1. **BlogGrid.tsx**: Blog images → `sections/blog/`
2. **BlogPostPage.tsx**: Blog images → `sections/blog/`

## Update Strategy:
1. Update most critical components first (Header, ProductHero, etc.)
2. Update homepage components
3. Update product components
4. Update remaining components
5. Test all imports work correctly