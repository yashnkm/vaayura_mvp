// Common types used across the application
// Note: Product types are defined locally in components to avoid circular imports

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