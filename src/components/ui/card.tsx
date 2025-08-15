import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "border-border bg-card",
        
        // Vaayura Brand Variants
        "brand-primary": "bg-gradient-to-br from-brand-pastel-green/10 to-brand-pastel-green/5 border-brand-pastel-green/20 shadow-lg hover:shadow-xl transition-all duration-200",
        "brand-secondary": "bg-gradient-to-br from-brand-grey-green-light/10 to-brand-grey-green-light/5 border-brand-grey-green-light/20 shadow-lg hover:shadow-xl transition-all duration-200",
        "brand-soft": "bg-brand-white border-brand-pastel-green/30 shadow-md hover:shadow-lg transition-all duration-200",
        "brand-elevated": "bg-brand-white border-brand-grey-green/20 shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-y-1",
        "brand-elevated-tinted": "bg-gradient-to-br from-brand-pastel-green/8 to-brand-grey-green-light/5 border-brand-pastel-green/25 shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-y-1",
        "brand-glass": "bg-brand-white/80 backdrop-blur-sm border-brand-pastel-green/30 shadow-lg",
        "brand-minimal": "bg-transparent border-brand-pastel-green/20 hover:bg-brand-pastel-green/5 transition-all duration-200",
        "brand-wellness": "bg-gradient-to-br from-brand-pastel-green/15 to-brand-grey-green-light/10 border-brand-pastel-green/25 shadow-lg hover:shadow-xl transition-all duration-200",
      },
      padding: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        xl: "p-10",
        none: "p-0",
      },
      rounded: {
        default: "rounded-lg",
        sm: "rounded-md",
        lg: "rounded-xl",
        xl: "rounded-2xl",
        full: "rounded-3xl",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
      rounded: "default",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, rounded, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding, rounded, className }))}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & { 
    level?: 1 | 2 | 3 | 4 | 5 | 6 
    variant?: "default" | "brand-heading" | "brand-display" | "brand-editorial"
  }
>(({ className, level = 3, variant = "default", ...props }, ref) => {
  const Comp = `h${level}` as keyof JSX.IntrinsicElements
  
  const titleVariants = {
    default: "text-2xl font-semibold leading-none tracking-tight",
    "brand-heading": "font-heading text-2xl font-semibold text-brand-grey-green leading-tight tracking-tight",
    "brand-display": "font-display text-3xl font-medium text-brand-grey-green leading-tight",
    "brand-editorial": "font-editorial text-2xl font-medium text-brand-grey-green leading-tight",
  }
  
  return (
    <Comp
      ref={ref}
      className={cn(titleVariants[variant], className)}
      {...props}
    />
  )
})
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    variant?: "default" | "brand-body" | "brand-accent"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const descriptionVariants = {
    default: "text-sm text-muted-foreground",
    "brand-body": "font-body text-brand-grey-green/70 leading-relaxed",
    "brand-accent": "font-accent text-brand-grey-green/70 italic",
  }
  
  return (
    <p
      ref={ref}
      className={cn(descriptionVariants[variant], className)}
      {...props}
    />
  )
})
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants }
