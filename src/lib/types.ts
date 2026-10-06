export interface Category {
  id: string
  name: string
  slug: string
  parent_id: string | null
}

export interface ProductImage {
  id: string
  product_id: string
  url: string
  position: number
}

export interface ProductVariant {
  id: string
  product_id: string
  sku: string
  price: number
  inventory_quantity: number
  options: {
    talla?: string
    color?: string
    [key: string]: string | undefined
  }
}

export interface Product {
  id: string
  title: string
  slug: string
  description: string
  brand: string
  category_id: string
  base_price: number
  status: 'draft' | 'published'
  created_at: string
  // Relaciones (cuando se hace join en la query)
  images?: ProductImage[]
  variants?: ProductVariant[]
  category?: Category
}

export interface CartItem {
  id: string
  cart_id: string
  variant_id: string
  quantity: number
  variant?: ProductVariant & { product?: Product }
}
