import { Suspense } from 'react'
import Link from 'next/link'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { SearchBox } from '@/components/layout/SearchBox'

const NAV_LINK_CLASS =
  'relative py-2 hover:text-stone-500 before:absolute before:-top-2 before:left-0 before:h-0.5 before:w-full before:origin-center before:scale-x-0 before:bg-blue-600 before:transition-transform before:duration-200 hover:before:scale-x-100'

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="bg-black text-white text-center text-[11px] font-medium uppercase tracking-widest py-2">
        Envío gratis en compras mayores a Q500
      </div>

      <div className="border-b border-stone-200">
        <div className="mx-auto max-w-7xl px-4 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-extrabold uppercase tracking-tight"
          >
            Kilómetro Zero
          </Link>

          <nav className="hidden md:flex gap-8 text-xs font-semibold uppercase tracking-widest text-black">
            <Link href="/productos?categoria=eventos" className={NAV_LINK_CLASS}>
              Eventos
            </Link>
            <Link href="/productos" className={NAV_LINK_CLASS}>
              Todo
            </Link>
            <Link href="/productos?categoria=camisetas" className={NAV_LINK_CLASS}>
              Camisetas
            </Link>
            <Link href="/productos?categoria=calzado" className={NAV_LINK_CLASS}>
              Calzado
            </Link>
            <Link href="/productos?categoria=accesorios" className={NAV_LINK_CLASS}>
              Accesorios
            </Link>
          </nav>

          <div className="flex items-center gap-6">
            <Suspense fallback={<div className="hidden h-9 w-40 lg:block" />}>
              <SearchBox />
            </Suspense>
            <CartDrawer />
          </div>
        </div>
      </div>
    </header>
  )
}
