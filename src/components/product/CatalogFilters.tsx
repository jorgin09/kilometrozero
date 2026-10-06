'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import type { Category } from '@/lib/types'

const TALLAS = ['XS', 'S', 'M', 'L', 'XL']

export function CatalogFilters({ categories }: { categories: Category[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function updateFilter(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  const categoriaActiva = searchParams.get('categoria')
  const tallaActiva = searchParams.get('talla')

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-black mb-3">
          Categoría
        </h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                updateFilter(
                  'categoria',
                  categoriaActiva === cat.slug ? null : cat.slug
                )
              }
              className={`block text-sm ${
                categoriaActiva === cat.slug
                  ? 'font-semibold text-black'
                  : 'text-stone-500 hover:text-black'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-black mb-3">
          Talla
        </h3>
        <div className="flex flex-wrap gap-2">
          {TALLAS.map((talla) => (
            <button
              key={talla}
              onClick={() =>
                updateFilter('talla', tallaActiva === talla ? null : talla)
              }
              className={`h-8 w-8 text-xs border ${
                tallaActiva === talla
                  ? 'border-black bg-black text-white'
                  : 'border-stone-300 text-stone-700 hover:border-black'
              }`}
            >
              {talla}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
