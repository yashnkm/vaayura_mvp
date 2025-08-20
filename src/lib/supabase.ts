import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions for database operations
export const database = {
  // Products
  products: {
    getAll: () => supabase.from('products').select('*').eq('published', true).order('created_at', { ascending: false }),
    getPublished: () => supabase
      .from('products')
      .select('*')
      .eq('published', true)
      .order('name', { ascending: true })
      .then(({ data, error }) => {
        if (data) {
          // Custom sort: Storm first, then Nest, then alphabetical
          const sorted = data.sort((a, b) => {
            const aIsStorm = a.name.toLowerCase().includes('storm');
            const bIsStorm = b.name.toLowerCase().includes('storm');
            const aIsNest = a.name.toLowerCase().includes('nest');
            const bIsNest = b.name.toLowerCase().includes('nest');
            
            if (aIsStorm && !bIsStorm) return -1;
            if (bIsStorm && !aIsStorm) return 1;
            if (aIsNest && !bIsNest && !bIsStorm) return -1;
            if (bIsNest && !aIsNest && !aIsStorm) return 1;
            
            return a.name.localeCompare(b.name);
          });
          return { data: sorted, error };
        }
        return { data, error };
      }),
    getById: (id: string) => supabase.from('products').select('*').eq('id', id).single(),
    getBySlug: (slug: string) => supabase.from('products').select('*').eq('slug', slug).eq('published', true).single(),
    create: (product: any) => supabase.from('products').insert([product]).select(),
    update: (id: string, updates: any) => supabase.from('products').update(updates).eq('id', id).select(),
    delete: (id: string) => supabase.from('products').delete().eq('id', id),
  },
  
  // Blogs
  blogs: {
    getAll: () => supabase.from('blogs').select('*').eq('published', true).order('created_at', { ascending: false }),
    getById: (id: string) => supabase.from('blogs').select('*').eq('id', id).single(),
    getBySlug: (slug: string) => supabase.from('blogs').select('*').eq('slug', slug).eq('published', true).single(),
    create: (blog: any) => supabase.from('blogs').insert([blog]).select(),
    update: (id: string, updates: any) => supabase.from('blogs').update(updates).eq('id', id).select(),
    delete: (id: string) => supabase.from('blogs').delete().eq('id', id),
  },

  // Admin functions (for unpublished content)
  admin: {
    getAllProducts: () => supabase.from('products').select('*').order('created_at', { ascending: false }),
    getAllBlogs: () => supabase.from('blogs').select('*').order('created_at', { ascending: false }),
  }
}

// Auth helpers
export const auth = {
  signIn: (email: string, password: string) => supabase.auth.signInWithPassword({ email, password }),
  signOut: () => supabase.auth.signOut(),
  getUser: () => supabase.auth.getUser(),
  onAuthStateChange: (callback: (event: any, session: any) => void) => supabase.auth.onAuthStateChange(callback),
}

// Storage helpers
export const storage = {
  uploadFile: (bucket: string, path: string, file: File) => supabase.storage.from(bucket).upload(path, file),
  deleteFile: (bucket: string, path: string) => supabase.storage.from(bucket).remove([path]),
  getPublicUrl: (bucket: string, path: string) => supabase.storage.from(bucket).getPublicUrl(path),
}