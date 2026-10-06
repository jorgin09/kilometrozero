import { Suspense } from 'react'
import { getProducts, getCategories } from '@/lib/api'
import { ProductCard } from '@/components/product/ProductCard'
import { CatalogFilters } from '@/components/product/CatalogFilters'
import { EventosBanner, EventosIntro } from '@/components/product/EventosIntro'

interface SearchParams {
  categoria?: string
  talla?: string
  precio_max?: string
  busqueda?: string
}

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const [products, categories] = await Promise.all([
    getProducts(params.categoria),
    getCategories(),
  ])

  // Filtrado adicional en memoria (talla y precio no van bien como query de Supabase
  // porque están dentro del jsonb "options" de las variantes)
  const filtered = products.filter((product) => {
    if (params.talla) {
      const tieneTalla = product.variants?.some(
        (v) => v.options.talla === params.talla
      )
      if (!tieneTalla) return false
    }

    if (params.precio_max) {
      const max = Number(params.precio_max)
      const minPrice = Math.min(
        ...(product.variants?.map((v) => v.price) ?? [product.base_price])
      )
      if (minPrice > max) return false
    }

    if (params.busqueda) {
      const term = params.busqueda.toLowerCase()
      const coincide =
        product.title.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term) ||
        product.description?.toLowerCase().includes(term)
      if (!coincide) return false
    }

    return true
  })

  return (
    <div>
      {params.categoria === 'eventos' && <EventosBanner />}

      <div className="mx-auto max-w-7xl px-4 py-8">
        {params.categoria === 'eventos' && <EventosIntro />}

        <div className="mb-10">
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-black">
            Equipo de trail running
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            {filtered.length} productos
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
          <aside>
            <Suspense
              fallback={
                <div className="text-sm text-stone-400">Cargando filtros...</div>
              }
            >
              <CatalogFilters categories={categories} />
            </Suspense>
          </aside>

          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

            {filtered.length === 0 && (
              <p className="col-span-full py-12 text-center text-stone-500">
                No hay productos que coincidan con estos filtros.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
