import { useAuth } from '@/hooks/useAuth'
import { useAdminProducts } from '@/hooks/useProducts'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductForm } from './ProductForm'
import { ProductList } from './ProductList'
import { useState } from 'react'

export function AdminDashboard() {
  const { user, signOut } = useAuth()
  const { products, loading, refetch } = useAdminProducts()
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const handleSignOut = async () => {
    await signOut()
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setShowProductForm(true)
  }

  const handleEditProduct = (product: any) => {
    setEditingProduct(product)
    setShowProductForm(true)
  }

  const handleCloseForm = () => {
    setShowProductForm(false)
    setEditingProduct(null)
    // Refresh the product list when form closes
    refetch()
  }

  if (showProductForm) {
    return (
      <ProductForm
        product={editingProduct}
        onClose={handleCloseForm}
      />
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-heading text-brand-grey-green">
              Vaayura Admin Dashboard
            </h1>
            <p className="text-brand-dark-grey font-body">
              Welcome back, {user?.email}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="bg-white border-brand-pastel-green text-brand-grey-green hover:bg-brand-pastel-green/10"
          >
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Stats Cards */}
          <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="text-brand-grey-green">Total Products</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-brand-grey-green">
                  {loading ? '...' : products.length}
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="text-brand-grey-green">Published</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-brand-pastel-green">
                  {loading ? '...' : products.filter(p => p.published).length}
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="text-brand-grey-green">Drafts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-brand-dark-grey">
                  {loading ? '...' : products.filter(p => !p.published).length}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Products Section */}
          <div className="lg:col-span-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-heading text-brand-grey-green">
                Products Management
              </h2>
              <Button
                variant="brand-primary"
                size="brand-default"
                onClick={handleAddProduct}
                className="bg-brand-pastel-green text-brand-grey-green hover:bg-brand-pastel-green/90"
              >
                Add New Product
              </Button>
            </div>
            
            <ProductList
              products={products}
              loading={loading}
              onEdit={handleEditProduct}
            />
          </div>
        </div>
      </main>
    </div>
  )
}