import { useState, useEffect } from 'react'
import { database } from '@/lib/supabase'

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

interface ProductFormData {
  name: string
  description: string
  price: number
  images: string[]
  features: ProductFeature[]
  specifications: ProductSpecifications
  slug: string
  published: boolean
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data, error } = await database.products.getAll()
      
      if (error) throw error
      setProducts(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createProduct = async (productData: ProductFormData) => {
    try {
      const { data, error } = await database.products.create(productData)
      if (error) throw error
      
      // Refresh products list
      await fetchProducts()
      return { data, error: null }
    } catch (err: any) {
      return { data: null, error: err.message }
    }
  }

  const updateProduct = async (id: string, updates: Partial<ProductFormData>) => {
    try {
      console.log('Database update - ID:', id, 'Updates:', updates)
      const { data, error } = await database.products.update(id, updates)
      console.log('Database response - Data:', data, 'Error:', error)
      
      if (error) throw error
      
      // Refresh products list
      await fetchProducts()
      return { data, error: null }
    } catch (err: any) {
      console.error('Database update error:', err)
      return { data: null, error: err.message }
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await database.products.delete(id)
      if (error) throw error
      
      // Refresh products list
      await fetchProducts()
      return { error: null }
    } catch (err: any) {
      return { error: err.message }
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchProducts
  }
}

// Hook for admin to get all products (including unpublished)
export function useAdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAdminProducts = async () => {
    try {
      setLoading(true)
      const { data, error } = await database.admin.getAllProducts()
      if (error) throw error
      setProducts(data || [])
    } catch (err) {
      console.error('Error fetching admin products:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdminProducts()
  }, [])

  return { products, loading, refetch: fetchAdminProducts }
}

// Hook for public product display (only published products)
export function usePublishedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPublishedProducts = async () => {
    try {
      setLoading(true)
      const { data, error } = await database.products.getPublished()
      
      if (error) throw error
      setProducts(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPublishedProducts()
  }, [])

  return {
    products,
    loading,
    error,
    refetch: fetchPublishedProducts
  }
}