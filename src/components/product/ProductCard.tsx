import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/types'

export function ProductCard({ product }: { product: Product }) {
  const mainImage = product.images?.sort((a, b) => a.position - b.position)[0]
  const prices = product.variants?.map((v) => v.price) ?? [product.base_price]
  const minPrice = Math.min(...prices)

  const totalStock =
    product.variants?.reduce((sum, v) => sum + v.inventory_quantity, 0) ?? 0

  return (
    <Link href={`/productos/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
        {mainImage ? (
          <Image
            src={mainImage.url}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-stone-400 text-sm">
            Sin imagen
          </div>
        )}

        {totalStock === 0 && (
          <span className="absolute top-3 left-3 bg-black text-white text-[11px] font-semibold uppercase tracking-widest px-2 py-1">
            Agotado
          </span>
        )}
      </div>

      <div className="mt-4 space-y-1">
        <p className="text-xs text-stone-500 uppercase tracking-widest">
          {product.brand}
        </p>
        <h3 className="text-sm font-semibold text-black">{product.title}</h3>
        <p className="text-sm text-stone-600">Desde Q{minPrice.toFixed(2)}</p>
      </div>
    </Link>
  )
}
