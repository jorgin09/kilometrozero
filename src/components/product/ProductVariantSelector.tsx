'use client'

import { useMemo, useState } from 'react'
import type { Product, ProductVariant } from '@/lib/types'
import { useCart } from '@/hooks/useCart'

export function ProductVariantSelector({ product }: { product: Product }) {
  const variants = product.variants ?? []
  const { addItem, loading } = useCart()

  // Extrae valores únicos de cada opción (talla, color) a partir de las variantes reales
  const tallas = useMemo(
    () => [...new Set(variants.map((v) => v.options.talla).filter(Boolean))],
    [variants]
  )
  const colores = useMemo(
    () => [...new Set(variants.map((v) => v.options.color).filter(Boolean))],
    [variants]
  )

  const [talla, setTalla] = useState<string | undefined>(tallas[0])
  const [color, setColor] = useState<string | undefined>(colores[0])
  const [feedback, setFeedback] = useState<string | null>(null)

  const variantSeleccionada: ProductVariant | undefined = variants.find(
    (v) => v.options.talla === talla && v.options.color === color
  )

  const sinStock =
    !variantSeleccionada || variantSeleccionada.inventory_quantity === 0

  async function handleAddToCart() {
    if (!variantSeleccionada) return
    await addItem(variantSeleccionada.id, 1)
    setFeedback('Agregado al carrito')
    setTimeout(() => setFeedback(null), 2000)
  }

  return (
    <div className="mt-4 space-y-6">
      <p className="text-2xl font-bold text-black">
        Q{(variantSeleccionada?.price ?? product.base_price).toFixed(2)}
      </p>

      {colores.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-black mb-2">
            Color
          </h3>
          <div className="flex flex-wrap gap-2">
            {colores.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`px-3 py-1.5 text-sm border ${
                  color === c
                    ? 'border-black bg-black text-white'
                    : 'border-stone-300 text-stone-700'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {tallas.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-black mb-2">
            Talla
          </h3>
          <div className="flex flex-wrap gap-2">
            {tallas.map((t) => (
              <button
                key={t}
                onClick={() => setTalla(t)}
                className={`h-10 w-10 text-sm border ${
                  talla === t
                    ? 'border-black bg-black text-white'
                    : 'border-stone-300 text-stone-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleAddToCart}
        disabled={sinStock || loading}
        className="w-full bg-black text-white py-4 text-xs font-semibold uppercase tracking-widest hover:bg-stone-800 disabled:bg-stone-300 disabled:cursor-not-allowed"
      >
        {sinStock ? 'Agotado' : loading ? 'Agregando...' : 'Agregar al carrito'}
      </button>

      {feedback && <p className="text-sm text-green-700">{feedback}</p>}

      {variantSeleccionada &&
        variantSeleccionada.inventory_quantity <= 3 &&
        !sinStock && (
          <p className="text-xs text-amber-600">
            Quedan {variantSeleccionada.inventory_quantity} unidades
          </p>
        )}
    </div>
  )
}
