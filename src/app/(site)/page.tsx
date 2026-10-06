import Image from 'next/image'
import Link from 'next/link'

const CATEGORIAS = [
  {
    slug: 'camisetas',
    label: 'Camisetas',
    image: 'https://images.unsplash.com/photo-1679216129923-ad1bedf399e5?w=900&q=80',
  },
  {
    slug: 'calzado',
    label: 'Calzado',
    image: 'https://images.unsplash.com/photo-1580058572462-98e2c0e0e2f0?w=900&q=80',
  },
  {
    slug: 'accesorios',
    label: 'Accesorios',
    image: 'https://images.unsplash.com/photo-1722445423163-f57f92ea9f78?w=900&q=80',
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden bg-stone-900">
        <Image
          src="https://images.unsplash.com/photo-1594882645126-14020914d58d?w=1800&q=80"
          alt="Corredor de trail en la montaña"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 flex h-full flex-col items-start justify-end px-6 pb-20 md:px-16">
          <h1 className="max-w-2xl text-5xl font-extrabold uppercase leading-[1.05] tracking-tight text-white md:text-7xl">
            Eventos
          </h1>
          <p className="mt-4 max-w-md text-sm text-white/80 md:text-base">
            Carreras, ultras y clínicas de entrenamiento para vivir el trail
            al máximo.
          </p>
          <Link
            href="/productos?categoria=eventos"
            className="mt-8 inline-block border-2 border-white px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white hover:bg-white hover:text-black"
          >
            Eventos
          </Link>
        </div>
      </section>

      {/* Editorial banner */}
      <section className="relative mt-10 h-[70vh] min-h-[420px] w-full overflow-hidden bg-stone-900">
        <Image
          src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=1800&q=80"
          alt="Equipo técnico de trail running"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex h-full flex-col items-start justify-end px-6 pb-20 md:px-16">
          <h2 className="max-w-2xl text-5xl font-extrabold uppercase leading-[1.05] tracking-tight text-white md:text-7xl">
            Tienda
          </h2>
          <p className="mt-4 max-w-md text-sm text-white/80 md:text-base">
            Materiales técnicos, transpirables y resistentes, probados en
            montaña.
          </p>
          <Link
            href="/productos"
            className="mt-8 inline-block border-2 border-white px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white hover:bg-white hover:text-black"
          >
            Ver catálogo
          </Link>
        </div>
      </section>

      {/* Categorías */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <h2 className="text-center text-2xl font-extrabold uppercase tracking-tight text-black md:text-3xl">
          Comprá por categoría
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {CATEGORIAS.map((cat) => (
            <Link
              key={cat.slug}
              href={`/productos?categoria=${cat.slug}`}
              className="group relative block aspect-[3/4] overflow-hidden bg-stone-100"
            >
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/35" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="inline-block border-b-2 border-white pb-1 text-lg font-bold uppercase tracking-wide text-white">
                  {cat.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
