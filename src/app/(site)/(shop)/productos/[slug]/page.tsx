import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getProductBySlug } from '@/lib/api'
import { ProductVariantSelector } from '@/components/product/ProductVariantSelector'
import { ProductImageZoom } from '@/components/product/ProductImageZoom'

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) notFound()

  const images = product.images?.sort((a, b) => a.position - b.position) ?? []

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Galería */}
        <div className="space-y-3">
          {images[0] && (
            <ProductImageZoom src={images[0].url} alt={product.title} />
          )}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {images.slice(1).map((img) => (
                <div
                  key={img.id}
                  className="relative aspect-square bg-stone-100"
                >
                  <Image
                    src={img.url}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="20vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info + selector */}
        <div>
          <p className="text-xs text-stone-500 uppercase tracking-widest">
            {product.brand}
          </p>
          <h1 className="mt-1 text-3xl font-extrabold uppercase tracking-tight text-black">
            {product.title}
          </h1>

          <ProductVariantSelector product={product} />

          {product.description && (
            <div className="mt-8 border-t border-stone-200 pt-6">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-black mb-2">
                Descripción
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
