import { createClient } from '@/lib/supabase/server'
import type { Product } from '@/lib/types'

// Trae todos los productos publicados, con imágenes y variantes
export async function getProducts(categorySlug?: string): Promise<Product[]> {
  const supabase = await createClient()

  // Cuando se filtra por categoría, la relación embebida necesita el hint
  // "!inner": sin él, Supabase/PostgREST no descarta las filas que no
  // coinciden, solo deja "category" en null, y el filtro no hace nada.
  const categoryRelation = categorySlug ? 'categories!inner' : 'categories'

  let query = supabase
    .from('products')
    .select(
      `
      *,
      images:product_images(*),
      variants:product_variants(*),
      category:${categoryRelation}(*)
    `
    )
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (categorySlug) {
    query = query.eq('category.slug', categorySlug)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data as Product[]
}

// Trae un solo producto por su slug (para la ficha de producto)
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .select(
      `
      *,
      images:product_images(*),
      variants:product_variants(*),
      category:categories(*)
    `
    )
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data as Product
}

// Trae todas las categorías (para navegación / filtros)
export async function getCategories() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('categories').select('*')

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data
}
