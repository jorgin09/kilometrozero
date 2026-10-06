import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-archivo',
})

export const metadata: Metadata = {
  title: 'Tienda Trail Running',
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
