import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        
        // Vaayura Brand Variants
        "brand-primary": "bg-brand-pastel-green text-brand-grey-green font-heading font-medium tracking-wide shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 rounded-full",
        "brand-secondary": "bg-brand-grey-green text-brand-white font-heading font-medium tracking-wide shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 rounded-full",
        "brand-outline": "border-2 border-brand-pastel-green bg-transparent text-brand-grey-green font-heading font-medium tracking-wide hover:bg-brand-pastel-green hover:text-brand-grey-green transition-all duration-200 rounded-full",
        "brand-ghost": "bg-transparent text-brand-grey-green font-heading hover:bg-brand-pastel-green/20 hover:text-brand-grey-green transition-all duration-200 rounded-lg",
        "brand-soft": "bg-brand-pastel-green/20 text-brand-grey-green font-heading hover:bg-brand-pastel-green/30 transition-all duration-200 rounded-lg",
        "brand-wellness": "bg-gradient-to-r from-brand-pastel-green to-brand-grey-green-light text-brand-dark-grey font-heading font-medium shadow-lg hover:shadow-xl transition-all duration-200 rounded-full",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        
        // Vaayura Brand Sizes
        "brand-default": "h-12 px-6 min-w-[180px]",
        "brand-sm": "h-10 px-4 min-w-[140px]",
        "brand-lg": "h-14 px-8 min-w-[200px]",
        "brand-large": "h-16 px-12 min-w-[220px]",
        "brand-icon": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
