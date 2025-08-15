import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

/**
 * Clean Vaayura component showcase demo
 * Features shadcn/ui components with Vaayura brand styling
 */
export function VaayuraFoundationDemo() {
  return (
    <div className="min-h-screen bg-brand-white p-8">
      <div className="mx-auto max-w-6xl space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-6">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand-grey-green">
            Vaayura Component System
          </h1>
          <p className="font-body text-lg leading-relaxed text-brand-grey-green max-w-2xl mx-auto">
            Clean air technology components showcasing shadcn/ui with Vaayura brand styling
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge variant="brand-primary">shadcn/ui</Badge>
            <Badge variant="brand-secondary">Vaayura Brand</Badge>
            <Badge variant="brand-soft">Component System</Badge>
          </div>
        </div>

        {/* Typography Showcase */}
        <Card className="bg-brand-white border-brand-pastel-green/20 p-6">
          <CardHeader>
            <CardTitle className="font-heading text-brand-grey-green">Typography System</CardTitle>
            <CardDescription className="font-body text-brand-grey-green">
              Vaayura's typography scale using Sora, Lora, Playfair Display, and Arapey fonts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h1 className="font-heading text-3xl font-bold text-brand-grey-green">Heading 1 - Sora Bold</h1>
              <h2 className="font-heading text-2xl font-semibold text-brand-grey-green">Heading 2 - Sora Semibold</h2>
              <h3 className="font-heading text-xl font-semibold text-brand-grey-green">Heading 3 - Sora Semibold</h3>
              <h4 className="font-editorial text-2xl italic text-brand-grey-green">Editorial Heading - Playfair Display</h4>
            </div>
            <div className="space-y-3 pt-4 border-t border-brand-pastel-green/20">
              <p className="font-body text-base text-brand-grey-green">Body text using Lora serif for comfortable reading and wellness feel.</p>
              <p className="font-subheading text-sm uppercase tracking-wide text-brand-grey-green">Subheading - Mont Sans Uppercase</p>
              <p className="font-accent text-base italic text-brand-grey-green-light">Accent text - Arapey italic for special emphasis</p>
              <p className="font-body text-xs text-brand-grey-green/80">Caption text for supporting information</p>
            </div>
          </CardContent>
        </Card>

        {/* Button Variants Showcase */}
        <Card className="bg-brand-white border-brand-pastel-green/20 p-6">
          <CardHeader>
            <CardTitle className="font-heading text-brand-grey-green">Button Components</CardTitle>
            <CardDescription className="font-body text-brand-grey-green">
              Vaayura brand button variants with different styles and sizes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Primary Buttons */}
              <div className="space-y-4">
                <h4 className="font-subheading text-sm uppercase tracking-wide text-brand-grey-green">Primary Variants</h4>
                <div className="space-y-3">
                  <Button variant="brand-primary" size="brand-default" className="w-full">
                    Brand Primary
                  </Button>
                  <Button variant="brand-secondary" size="brand-default" className="w-full">
                    Brand Secondary
                  </Button>
                  <Button variant="brand-outline" size="brand-default" className="w-full">
                    Brand Outline
                  </Button>
                </div>
              </div>
              
              {/* Style Variants */}
              <div className="space-y-4">
                <h4 className="font-subheading text-sm uppercase tracking-wide text-brand-grey-green">Style Variants</h4>
                <div className="space-y-3">
                  <Button variant="brand-soft" size="brand-default" className="w-full">
                    Brand Soft
                  </Button>
                  <Button variant="brand-ghost" size="brand-default" className="w-full">
                    Brand Ghost
                  </Button>
                  <Button variant="brand-wellness" size="brand-default" className="w-full">
                    Brand Wellness
                  </Button>
                </div>
              </div>
              
              {/* Size Variants */}
              <div className="space-y-4">
                <h4 className="font-subheading text-sm uppercase tracking-wide text-brand-grey-green">Size Variants</h4>
                <div className="space-y-3">
                  <Button variant="brand-primary" size="brand-sm" className="w-full">
                    Small Size
                  </Button>
                  <Button variant="brand-primary" size="brand-default" className="w-full">
                    Default Size
                  </Button>
                  <Button variant="brand-primary" size="brand-lg" className="w-full">
                    Large Size
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card Variants Showcase */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-brand-grey-green mb-2">Card Components</h2>
            <p className="font-body text-brand-grey-green/70">Different card variants with Vaayura brand styling</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Brand Primary Card */}
            <Card variant="brand-primary" className="p-6">
              <CardHeader>
                <CardTitle className="font-heading text-brand-grey-green">Brand Primary Card</CardTitle>
                <CardDescription className="font-body">Clean and modern primary card design</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-body text-brand-grey-green text-sm">
                  This card showcases the brand primary variant with subtle styling and clean typography.
                </p>
              </CardContent>
              <CardFooter>
                <Badge variant="brand-primary">Primary</Badge>
              </CardFooter>
            </Card>

            {/* Brand Soft Card */}
            <Card variant="brand-soft" className="p-6">
              <CardHeader>
                <CardTitle className="font-heading text-brand-grey-green">Brand Soft Card</CardTitle>
                <CardDescription className="font-body">Gentle and welcoming soft card design</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-body text-brand-grey-green text-sm">
                  The soft variant provides a gentle appearance perfect for wellness and health content.
                </p>
              </CardContent>
              <CardFooter>
                <Badge variant="brand-soft">Soft</Badge>
              </CardFooter>
            </Card>

            {/* Brand Elevated Card */}
            <Card variant="brand-elevated" className="p-6">
              <CardHeader>
                <CardTitle className="font-heading text-brand-grey-green">Brand Elevated Card</CardTitle>
                <CardDescription className="font-body">Premium elevated card with enhanced styling</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-body text-brand-grey-green text-sm">
                  Elevated cards provide more prominence and are perfect for featuring important content.
                </p>
              </CardContent>
              <CardFooter>
                <Badge variant="brand-secondary">Elevated</Badge>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Badge Showcase */}
        <Card className="bg-brand-white border-brand-pastel-green/20 p-6">
          <CardHeader>
            <CardTitle className="font-heading text-brand-grey-green">Badge Components</CardTitle>
            <CardDescription className="font-body text-brand-grey-green">
              Various badge styles for status indicators and labels
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {/* Brand Badges */}
              <div>
                <h4 className="font-subheading text-sm uppercase tracking-wide text-brand-grey-green mb-3">Brand Variants</h4>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="brand-primary">Primary</Badge>
                  <Badge variant="brand-secondary">Secondary</Badge>
                  <Badge variant="brand-soft">Soft</Badge>
                  <Badge variant="brand-wellness">Wellness</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </div>
              
              {/* Status Badges */}
              <div>
                <h4 className="font-subheading text-sm uppercase tracking-wide text-brand-grey-green mb-3">Status Indicators</h4>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="air-quality-good">Good Quality</Badge>
                  <Badge variant="air-quality-moderate">Moderate</Badge>
                  <Badge variant="wellness-metric">Wellness</Badge>
                  <Badge variant="filter-status">Filter OK</Badge>
                </div>
              </div>
              
              {/* Functional Badges */}
              <div>
                <h4 className="font-subheading text-sm uppercase tracking-wide text-brand-grey-green mb-3">Functional Labels</h4>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="destructive">Warning</Badge>
                  <Badge variant="secondary">Information</Badge>
                  <Badge variant="default">Default</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Color Palette Showcase */}
        <Card className="bg-brand-white border-brand-pastel-green/20 p-6">
          <CardHeader>
            <CardTitle className="font-heading text-brand-grey-green">Vaayura Color Palette</CardTitle>
            <CardDescription className="font-body text-brand-grey-green">
              Brand colors used throughout the component system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-3">
                <div className="w-full h-16 bg-brand-pastel-green rounded-lg"></div>
                <div className="text-center">
                  <p className="font-subheading text-xs uppercase tracking-wide text-brand-grey-green">Pastel Green</p>
                  <p className="font-body text-xs text-brand-grey-green/70">#A8D5BA</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="w-full h-16 bg-brand-grey-green-light rounded-lg"></div>
                <div className="text-center">
                  <p className="font-subheading text-xs uppercase tracking-wide text-brand-grey-green">Grey Green Light</p>
                  <p className="font-body text-xs text-brand-grey-green/70">#8BB18F</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="w-full h-16 bg-brand-grey-green rounded-lg"></div>
                <div className="text-center">
                  <p className="font-subheading text-xs uppercase tracking-wide text-brand-white">Grey Green</p>
                  <p className="font-body text-xs text-brand-white/70">#3A6B4E</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="w-full h-16 bg-brand-dark-grey rounded-lg"></div>
                <div className="text-center">
                  <p className="font-subheading text-xs uppercase tracking-wide text-brand-white">Dark Grey</p>
                  <p className="font-body text-xs text-brand-white/70">#333333</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8">
          <div className="space-y-4">
            <div className="flex justify-center gap-4 flex-wrap">
              <Badge variant="brand-primary">shadcn/ui</Badge>
              <Badge variant="brand-secondary">Vaayura Brand</Badge>
              <Badge variant="brand-soft">Clean Design</Badge>
            </div>
            <p className="font-body text-sm text-brand-grey-green/80 max-w-2xl mx-auto">
              Vaayura Component System built with shadcn/ui and brand-consistent styling for clean air technology interfaces.
            </p>
            <p className="font-accent text-xs text-brand-grey-green/60 italic">
              "Clean components for clean air"
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}