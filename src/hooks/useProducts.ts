import { useState, useEffect } from 'react'
import { database } from '@/lib/supabase'

// Define types locally to avoid import issues
interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  features: Record<string, any>
  published: boolean
  created_at: string
}

interface ProductFormData {
  name: string
  description: string
  price: number
  images: string[]
  features: Record<string, any>
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
      const { data, error } = await database.products.update(id, updates)
      if (error) throw error
      
      // Refresh products list
      await fetchProducts()
      return { data, error: null }
    } catch (err: any) {
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

  useEffect(() => {
    const fetchAdminProducts = async () => {
      try {
        const { data, error } = await database.admin.getAllProducts()
        if (error) throw error
        setProducts(data || [])
      } catch (err) {
        console.error('Error fetching admin products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAdminProducts()
  }, [])

  return { products, loading, refetch: () => setLoading(true) }
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