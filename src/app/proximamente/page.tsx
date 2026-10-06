import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Kilómetro Zero — Próximamente',
  description: 'Equipo técnico para trail running y montaña. Muy pronto.',
}

export default function ProximamentePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-ink px-6 py-16 text-center">
      <Image
        src="/logo-km0.png"
        alt="Kilómetro Zero — Adventure"
        width={850}
        height={537}
        priority
        className="w-full max-w-md shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] md:max-w-lg"
      />

      <p className="text-6xl font-light uppercase tracking-[0.4em] text-moss md:text-8xl">
        Muy pronto
      </p>
    </div>
  )
}
