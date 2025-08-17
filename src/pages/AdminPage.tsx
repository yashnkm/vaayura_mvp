import { useAuth } from '@/hooks/useAuth'
import { AdminLogin } from '@/components/admin/AdminLogin'
import { AdminDashboard } from '@/components/admin/AdminDashboard'

export function AdminPage() {
  const { user, loading, isAdmin } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-brand-grey-green font-heading text-xl">Loading...</div>
      </div>
    )
  }

  // Show login if not authenticated or not admin
  if (!user || !isAdmin) {
    return <AdminLogin />
  }

  // Show dashboard if authenticated admin
  return <AdminDashboard />
}