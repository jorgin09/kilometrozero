import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kilómetro Zero — Próximamente',
  description: 'Equipo técnico para trail running y montaña. Muy pronto.',
}

export default function ProximamentePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
      <h1 className="text-4xl font-extrabold uppercase tracking-tight md:text-6xl">
        Kilómetro Zero
      </h1>
      <p className="mt-6 max-w-md text-sm text-white/70 md:text-base">
        Equipo técnico para trail running y montaña.
      </p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-blue-500">
        Muy pronto
      </p>
    </div>
  )
}
