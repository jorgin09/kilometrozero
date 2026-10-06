export function Footer() {
  return (
    <footer className="border-t border-stone-200 mt-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 grid grid-cols-1 gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-black">
            Mantente al día
          </h3>
          <p className="mt-3 text-sm text-stone-500 max-w-xs">
            Suscribite para recibir lanzamientos, ofertas y novedades del
            sendero antes que nadie.
          </p>
          <form className="mt-4 flex max-w-sm border border-stone-300">
            <input
              type="email"
              placeholder="Tu correo"
              className="w-full px-3 py-3 text-sm outline-none"
            />
            <button
              type="submit"
              className="shrink-0 bg-black px-5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-stone-800"
            >
              Enviar
            </button>
          </form>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-black">
            Tienda
          </h3>
          <div className="mt-4 flex flex-col gap-2 text-sm text-stone-500">
            <a href="/productos?categoria=camisetas" className="hover:text-black">
              Camisetas
            </a>
            <a href="/productos?categoria=calzado" className="hover:text-black">
              Calzado
            </a>
            <a href="/productos?categoria=accesorios" className="hover:text-black">
              Accesorios
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-black">
            Ayuda
          </h3>
          <div className="mt-4 flex flex-col gap-2 text-sm text-stone-500">
            <a href="#" className="hover:text-black">
              Envíos
            </a>
            <a href="#" className="hover:text-black">
              Devoluciones
            </a>
            <a href="#" className="hover:text-black">
              Contacto
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-200">
        <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-stone-400 uppercase tracking-wide">
          © {new Date().getFullYear()} Kilómetro Zero. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  )
}
