// Common types used across the application

// Product Types
export interface ProductFeature {
  title: string
  description: string
  icon: string
}

export interface ProductSpecifications {
  [key: string]: string
}

export interface Product {
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

// Auth Types
export interface AdminUser {
  id: string
  email: string
  role: 'admin'
}

// API Response Types
export interface SupabaseResponse<T> {
  data: T | null
  error: any
}

export interface SupabaseListResponse<T> {
  data: T[] | null
  error: any
}