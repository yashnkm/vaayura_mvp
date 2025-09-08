# Image Organization Plan

## Current Structure Issues:
- Images scattered in root directory
- Hard to find specific images
- No logical grouping
- Mixed file naming conventions

## New Organized Structure:

### 1. `/sections/shared/`
- `logos/` - All logo variations (logo_2.png, etc.)
- `backgrounds/` - General background images (background.png, backgroundimage2.png, main.jpg)
- `products/` - General product images (storm.png, nest.png)

### 2. `/sections/homepage/`
- `hero/` - Hero section images (productHeroSection.jpg, hero2background.jpg, product_hero.png)
- `features/` - App control and feature images (screenshot_new.png, ambient_light_new.png)
- `filtration/` - Filter technology images (hepa_filtration_new.png, primary.png, true hepa.png, honeycomb.png, etc.)
- `showcases/` - Product showcase images (PRODUCTS1.png, PRODUCTS2.png, PRODUCTS3.png)
- `specs/` - Specification images (gg v1.png, storm.png for specs)

### 3. `/sections/products/`
- `hero/` - Product page hero images (product_hero_image.png)
- `features/` - Product feature images (Adobe_Express_-_file_1.png, aromatherapy_new.png, etc.)
- `product-images/` - Existing Productimages folder (nestfrontview.png, stormfrontview.png, etc.)

### 4. `/sections/about/`
- About page specific images (problem_img.png)

### 5. `/sections/auth/`
- Login/signup images

### 6. `/sections/blog/`
- Blog related images (blog1.png, blog2.png)

### 7. `/sections/contact/`
- Contact page images

### 8. `/clients/` (Keep existing)
- Client logos (already organized)

### 9. `/video/` (Keep existing)  
- Animation files (already organized)

### 10. `/filters/` (Keep existing or move to products/filters/)
- Filter specific images

## Benefits:
- Easy to locate images for specific sections
- Better maintainability
- Clear separation of concerns
- Easier for new developers to understand
- Consistent naming and organization