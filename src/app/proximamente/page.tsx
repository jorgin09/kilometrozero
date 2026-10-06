import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Kilómetro Zero — Próximamente',
  description: 'Equipo técnico para trail running y montaña. Muy pronto.',
}

export default function ProximamentePage() {
  return (
    <div className="group relative flex min-h-screen flex-col items-center justify-center gap-10 overflow-hidden bg-ink px-6 py-16 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22220%22%20height%3D%22220%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.85%22%20numOctaves%3D%222%22%20stitchTiles%3D%22stitch%22%2F%3E%3CfeColorMatrix%20type%3D%22matrix%22%20values%3D%220%200%200%200%201%20%200%200%200%200%201%20%200%200%200%200%201%20%200%200%200%200.4%200%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E')] opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-20"
      />

      <Image
        src="/logo-km0.png"
        alt="Kilómetro Zero — Adventure"
        width={850}
        height={537}
        priority
        className="h-auto w-full max-w-md shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] transition-[transform,box-shadow] duration-500 ease-out hover:scale-105 hover:shadow-[0_45px_90px_-15px_rgba(0,0,0,0.75)] md:max-w-lg"
      />

      <div className="flex flex-col items-center gap-4">
        <p className="text-4xl font-light uppercase tracking-[0.25em] text-moss sm:text-5xl sm:tracking-[0.3em] md:text-6xl lg:text-8xl lg:tracking-[0.35em] xl:text-9xl">
          Muy pronto
        </p>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#cfcabb]">
          Guatemala
        </p>
      </div>
    </div>
  )
}
