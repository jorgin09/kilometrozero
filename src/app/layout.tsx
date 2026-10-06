import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-archivo',
})

export const metadata: Metadata = {
  title: 'Kilómetro Zero',
  description: 'Equipo técnico para trail running y montaña',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={archivo.variable}>
      <body className="min-h-screen flex flex-col bg-white text-black antialiased">
        {children}
      </body>
    </html>
  )
}
