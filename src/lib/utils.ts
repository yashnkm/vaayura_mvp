import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Utility for creating conditional classes based on boolean conditions
 */
export function conditionalClass(condition: boolean, trueClass: string, falseClass: string = '') {
  return condition ? trueClass : falseClass
}

/**
 * Utility for creating focus ring classes that match the Vaayura brand
 */
export function focusRing(variant: 'default' | 'brand' = 'default') {
  const base = 'focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  switch (variant) {
    case 'brand':
      return `${base} focus:ring-brand-pastel-green focus:ring-offset-brand-white`
    default:
      return `${base} focus:ring-blue-500 focus:ring-offset-white`
  }
}

/**
 * Utility for creating consistent transitions that match the Vaayura brand feel
 */
export function brandTransition(property: string = 'all') {
  return `transition-${property} duration-300 ease-in-out`
}

/**
 * Utility for creating responsive spacing classes
 */
export function responsiveSpacing(base: string, md?: string, lg?: string) {
  let classes = base
  if (md) classes += ` md:${md}`
  if (lg) classes += ` lg:${lg}`
  return classes
}
