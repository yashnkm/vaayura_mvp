import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        
        // Vaayura Brand Variants
        "brand-primary": "border-transparent bg-brand-pastel-green text-brand-dark-grey font-subheading",
        "brand-secondary": "border-transparent bg-brand-grey-green text-brand-white font-subheading",
        "brand-outline": "border border-brand-pastel-green text-brand-grey-green bg-transparent font-subheading",
        "brand-wellness": "border-transparent bg-gradient-to-r from-brand-pastel-green to-brand-grey-green-light text-brand-dark-grey font-subheading",
        "brand-soft": "border-transparent bg-brand-pastel-green/20 text-brand-grey-green font-subheading",
        
        // Air Quality Specific Variants
        "air-quality-good": "border-transparent bg-green-100 text-green-800 font-subheading animate-pulse-slow border border-green-300",
        "air-quality-moderate": "border-transparent bg-yellow-100 text-yellow-800 font-subheading animate-pulse border border-yellow-300",
        "air-quality-poor": "border-transparent bg-red-100 text-red-800 font-subheading animate-pulse border border-red-300",
        "filter-status": "border-transparent bg-blue-100 text-blue-800 font-subheading border border-blue-300",
        "wellness-metric": "border-transparent bg-gradient-to-r from-brand-pastel-green/30 to-brand-grey-green-light/30 text-brand-grey-green font-subheading border border-brand-pastel-green/50 animate-pulse-slow",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
