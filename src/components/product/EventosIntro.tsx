import Image from 'next/image'

const RUTAS = [
  { reto: 'Sendero Volcán de Agua', distancia: '15.4 km', dplus: '1,565 m', ventana: '4 semanas' },
  { reto: 'Cráter de Acatenango', distancia: '11.8 km', dplus: '1,700 m', ventana: '4 semanas' },
  { reto: 'Anillo Pacaya–Fuego', distancia: '32.0 km', dplus: '2,900 m', ventana: '8 semanas' },
]

const PROVEEDORES = [
  { nombre: 'Strava', via: 'OAuth2 + webhook', nota: 'Push en tiempo real al terminar la actividad.' },
  { nombre: 'Garmin Connect', via: 'Activity API', nota: 'Requiere aprobación de partner; lead time 2–4 semanas.' },
  { nombre: 'Suunto', via: 'Suunto App API', nota: 'Sync por polling cada 15 min, sin webhook nativo.' },
  { nombre: 'Coros', via: 'Coros Open API', nota: 'Igual que Suunto; catálogo de campos más limitado.' },
  { nombre: 'Apple Health', via: 'Export manual', nota: 'Sin API en la nube: se resuelve con un shortcut/app puente.' },
]

const KITS = [
  { modalidad: 'Solo Digital', incluye: 'Medalla 3D, dorsal digital, certificado PDF', precio: 'Q250' },
  { modalidad: 'Kit Físico', incluye: '+ medalla coleccionable, dorsal impreso, buff técnico', precio: 'Q450' },
]

const PASOS = [
  { n: '01', t: 'Hero del reto', d: 'Nombre, distancia/D+, fecha límite y cupos restantes.' },
  { n: '02', t: 'Selector de modalidad', d: 'Solo Digital / Kit Físico, con precio visible antes del checkout.' },
  { n: '03', t: 'Conectar cuenta', d: 'Un botón por proveedor: Strava, Garmin, Suunto, Coros, Apple Health.' },
  { n: '04', t: 'Confirmar unidades', d: 'Km/mi y el nombre que aparecerá en el dorsal digital.' },
  { n: '05', t: 'Primer registro', d: 'La primera actividad sincronizada mueve el marcador en el mapa.' },
]

const PRECIOS = [
  { producto: 'Reto individual', cobertura: '1 evento, Solo Digital', precio: 'Q150–250' },
  { producto: 'Reto individual + kit', cobertura: '1 evento, Kit Físico', precio: 'Q329–450' },
  { producto: 'Pase de temporada', cobertura: '4 retos / 12 meses', precio: 'Q999' },
]

const RETENCION = [
  'Inmediata: email con la medalla digital adjunta y el certificado, más un código de 48 h para el siguiente reto.',
  'A mitad de ventana: recordatorio de racha si el corredor lleva 3+ días sin registrar kilómetros y el cierre está a menos de una semana.',
  'A los 30 días de inactividad: email de reactivación — "tu ruta a la cima del Acatenango sigue esperando" con el % ya avanzado.',
]

function Tramo({
  numero,
  titulo,
  marcador,
  children,
}: {
  numero: string
  titulo: string
  marcador: string
  children: React.ReactNode
}) {
  return (
    <div className="border-t border-stone-200 py-10">
      <div className="flex flex-wrap items-baseline gap-3">
        <span className="rounded bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
          {numero}
        </span>
        <span className="ml-auto text-xs text-stone-400">{marcador}</span>
      </div>
      <h3 className="mt-2 text-xl font-extrabold uppercase tracking-tight text-black md:text-2xl">
        {titulo}
      </h3>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-stone-600">
        {children}
      </div>
    </div>
  )
}

export function EventosBanner() {
  return (
    <div className="relative -mx-[calc(50vw-50%)] mb-10 h-[45vh] min-h-[280px] w-screen overflow-hidden bg-stone-900">
      <Image
        src="https://images.unsplash.com/photo-1504025468847-0e438279542c?w=1800&q=80"
        alt="Corredor de trail frente a una montaña nevada"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
    </div>
  )
}

export function EventosIntro() {
  return (
    <section className="mb-14 border-b border-stone-200 pb-4">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
        <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">
          Kilómetro Zero · Propuesta de producto
        </span>
      </div>
      <h2 className="mt-3 text-3xl font-extrabold uppercase tracking-tight text-black md:text-5xl">
        Carreras y Retos Virtuales
      </h2>
      <p className="mt-4 max-w-2xl text-sm text-stone-600 md:text-base">
        Una sección permanente donde cualquier corredor —esté en cualquier ciudad de
        Guatemala o en su cinta en casa- convierte los kilómetros que ya corre en una
        carrera con dorsal, mapa y medalla.
      </p>

      <Tramo numero="TRAMO 01" titulo="Mecánica del reto" marcador="5K · 10K · 21K · acumulativos">
        <p>
          <strong className="text-black">Un solo intento (contra el reloj):</strong> el corredor
          elige 5K, 10K o 21K, tiene una ventana de inscripción a evento (ej. 01–31 oct 2026)
          y sube una actividad calificante, cronometrada por chip GPS del reloj/app.
        </p>
        <p>
          <strong className="text-black">Acumulativos (distancia o D+):</strong> el corredor suma
          kilómetros o desnivel positivo de varias actividades hasta completar una ruta real
          tematizada con los volcanes de Guatemala.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-widest text-stone-400">
                <th className="border-b border-stone-200 py-2 pr-4 font-semibold">Reto</th>
                <th className="border-b border-stone-200 py-2 pr-4 font-semibold">Distancia</th>
                <th className="border-b border-stone-200 py-2 pr-4 font-semibold">D+</th>
                <th className="border-b border-stone-200 py-2 font-semibold">Ventana</th>
              </tr>
            </thead>
            <tbody>
              {RUTAS.map((r) => (
                <tr key={r.reto}>
                  <td className="border-b border-stone-100 py-2 pr-4 text-black">{r.reto}</td>
                  <td className="border-b border-stone-100 py-2 pr-4">{r.distancia}</td>
                  <td className="border-b border-stone-100 py-2 pr-4">{r.dplus}</td>
                  <td className="border-b border-stone-100 py-2">{r.ventana}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          <strong className="text-black">Mapa de progreso:</strong> cada kilómetro validado
          avanza un marcador sobre la polilínea real de la ruta. Al llegar a un punto de
          interés se dispara una insignia y una postal descargable de esa parada.
        </p>
        <p>
          <strong className="text-black">Gamificación:</strong> medalla 3D (rotable al
          desbloquear), dorsal digital con nombre y número, e insignias por hito (10K, 1,000 m
          D+ acumulados, racha de 7 días).
        </p>
      </Tramo>

      <Tramo numero="TRAMO 02" titulo="Integración y antifraude" marcador="Strava · Garmin · Suunto · Coros · Apple Health">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-widest text-stone-400">
                <th className="border-b border-stone-200 py-2 pr-4 font-semibold">Proveedor</th>
                <th className="border-b border-stone-200 py-2 pr-4 font-semibold">Vía</th>
                <th className="border-b border-stone-200 py-2 font-semibold">Particularidad</th>
              </tr>
            </thead>
            <tbody>
              {PROVEEDORES.map((p) => (
                <tr key={p.nombre}>
                  <td className="border-b border-stone-100 py-2 pr-4 text-black">{p.nombre}</td>
                  <td className="border-b border-stone-100 py-2 pr-4">{p.via}</td>
                  <td className="border-b border-stone-100 py-2">{p.nota}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Tramo>

      <Tramo numero="TRAMO 03" titulo="Kits físicos y logística" marcador="Solo digital vs. kit físico">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-widest text-stone-400">
                <th className="border-b border-stone-200 py-2 pr-4 font-semibold">Modalidad</th>
                <th className="border-b border-stone-200 py-2 pr-4 font-semibold">Incluye</th>
                <th className="border-b border-stone-200 py-2 font-semibold">Precio</th>
              </tr>
            </thead>
            <tbody>
              {KITS.map((k) => (
                <tr key={k.modalidad}>
                  <td className="border-b border-stone-100 py-2 pr-4 text-black">{k.modalidad}</td>
                  <td className="border-b border-stone-100 py-2 pr-4">{k.incluye}</td>
                  <td className="border-b border-stone-100 py-2">{k.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          <strong className="text-black">Flujo de cumplimiento:</strong> corte de inscripción →
          producción consolidada de medallas 15 días después del cierre (para bajar costo
          unitario de fundición) → empaque y guía automática con el courier local → número de
          tracking por correo → SLA de entrega: 10 días hábiles.
        </p>
        <p className="border-l-2 border-blue-600 pl-3">
          <strong className="text-black">Nota de margen:</strong> el kit físico necesita
          mantener ≥35% de margen después de medalla + envío. Con MOQ de 150 medallas por
          corrida de fundición, el costo unitario baja de forma que el diferencial entre
          modalidades sigue siendo rentable.
        </p>
      </Tramo>

       <Tramo numero="TRAMO 04" titulo="Monetización y retención" marcador="Por evento + pase de temporada">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-widest text-stone-400">
                <th className="border-b border-stone-200 py-2 pr-4 font-semibold">Producto</th>
                <th className="border-b border-stone-200 py-2 pr-4 font-semibold">Cobertura</th>
                <th className="border-b border-stone-200 py-2 font-semibold">Precio</th>
              </tr>
            </thead>
            <tbody>
              {PRECIOS.map((p) => (
                <tr key={p.producto}>
                  <td className="border-b border-stone-100 py-2 pr-4 text-black">{p.producto}</td>
                  <td className="border-b border-stone-100 py-2 pr-4">{p.cobertura}</td>
                  <td className="border-b border-stone-100 py-2">{p.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          El pase de temporada representa un ahorro de ~20% frente a inscribirse suelto a
          los cuatro retos, y fija el flujo de caja del trimestre.
        </p>
        <p>
          <strong className="text-black">Automatizaciones al cruzar la meta virtual:</strong>
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          {RETENCION.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Tramo>
    </section>
  )
}
