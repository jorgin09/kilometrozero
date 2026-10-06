// Script de una sola vez para poblar productos de prueba en varias categorías.
// Uso: node --env-file=.env.local scripts/seed-demo-products.mjs
//
// Usa fetch directo contra la API REST de Supabase (en vez de @supabase/supabase-js)
// porque el cliente de Realtime de esa librería requiere Node 22+.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

const headers = {
  apikey: SERVICE_ROLE_KEY,
  Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
  'Content-Type': 'application/json',
}

async function rest(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: { ...headers, ...(options.headers ?? {}) },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`${res.status} ${path}: ${text}`)
  }
  const text = await res.text()
  return text ? JSON.parse(text) : null
}

const PRODUCTS = [
  // ---- Camisetas ----
  {
    category_slug: 'camisetas',
    title: 'Camiseta Trail Ultra',
    slug: 'camiseta-trail-ultra',
    brand: 'TrailCo',
    description:
      'Camiseta ultraligera de secado rápido con costuras planas, ideal para carreras de larga distancia en climas cálidos.',
    base_price: 219.0,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'],
    variants: [
      { sku: 'CTU-S-BLA', price: 219.0, stock: 10, options: { talla: 'S', color: 'Blanco' } },
      { sku: 'CTU-M-BLA', price: 219.0, stock: 14, options: { talla: 'M', color: 'Blanco' } },
      { sku: 'CTU-L-BLA', price: 219.0, stock: 6, options: { talla: 'L', color: 'Blanco' } },
      { sku: 'CTU-M-NEG', price: 219.0, stock: 9, options: { talla: 'M', color: 'Negro' } },
    ],
  },
  {
    category_slug: 'camisetas',
    title: 'Camiseta Térmica Manga Larga',
    slug: 'camiseta-termica-manga-larga',
    brand: 'AltaMontaña',
    description:
      'Camiseta térmica de manga larga con tejido interior afelpado, perfecta para carreras de montaña en clima frío.',
    base_price: 249.0,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'],
    variants: [
      { sku: 'CTM-S-NEG', price: 249.0, stock: 8, options: { talla: 'S', color: 'Negro' } },
      { sku: 'CTM-M-NEG', price: 249.0, stock: 2, options: { talla: 'M', color: 'Negro' } },
      { sku: 'CTM-L-GRI', price: 249.0, stock: 11, options: { talla: 'L', color: 'Gris' } },
    ],
  },

  // ---- Calzado ----
  {
    category_slug: 'calzado',
    title: 'Zapatilla Trail Grip X',
    slug: 'zapatilla-trail-grip-x',
    brand: 'RockRunner',
    description:
      'Suela con tacos de alta tracción para terrenos técnicos y mediasuela amortiguada para largas distancias.',
    base_price: 649.0,
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800',
      'https://images.unsplash.com/photo-1483721310020-03333e577078?w=800',
    ],
    variants: [
      { sku: 'ZGX-39-NEG', price: 649.0, stock: 5, options: { talla: '39', color: 'Negro' } },
      { sku: 'ZGX-40-NEG', price: 649.0, stock: 7, options: { talla: '40', color: 'Negro' } },
      { sku: 'ZGX-41-MUL', price: 649.0, stock: 4, options: { talla: '41', color: 'Multicolor' } },
      { sku: 'ZGX-42-MUL', price: 649.0, stock: 0, options: { talla: '42', color: 'Multicolor' } },
    ],
  },
  {
    category_slug: 'calzado',
    title: 'Zapatilla Trail Ligera',
    slug: 'zapatilla-trail-ligera',
    brand: 'RockRunner',
    description:
      'Diseño minimalista y liviano pensado para entrenamientos rápidos y carreras cortas en sendero.',
    base_price: 549.0,
    images: ['https://images.unsplash.com/photo-1483721310020-03333e577078?w=800'],
    variants: [
      { sku: 'ZTL-38-NEG', price: 549.0, stock: 6, options: { talla: '38', color: 'Negro' } },
      { sku: 'ZTL-39-NEG', price: 549.0, stock: 3, options: { talla: '39', color: 'Negro' } },
      { sku: 'ZTL-40-NEG', price: 549.0, stock: 12, options: { talla: '40', color: 'Negro' } },
    ],
  },
  {
    category_slug: 'calzado',
    title: 'Zapatilla Montaña Impermeable',
    slug: 'zapatilla-montana-impermeable',
    brand: 'AltaMontaña',
    description:
      'Membrana impermeable y refuerzo en punta, pensada para senderos húmedos y terreno rocoso. Actualmente agotada.',
    base_price: 799.0,
    images: ['https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800'],
    variants: [
      { sku: 'ZMI-40-NEG', price: 799.0, stock: 0, options: { talla: '40', color: 'Negro' } },
      { sku: 'ZMI-41-NEG', price: 799.0, stock: 0, options: { talla: '41', color: 'Negro' } },
    ],
  },

  // ---- Accesorios ----
  {
    category_slug: 'accesorios',
    title: 'Reloj GPS Running',
    slug: 'reloj-gps-running',
    brand: 'PulseTech',
    description:
      'Reloj deportivo con GPS integrado, monitor de ritmo cardíaco y hasta 20 horas de batería en modo entrenamiento.',
    base_price: 899.0,
    images: ['https://images.unsplash.com/photo-1722445423163-f57f92ea9f78?w=800'],
    variants: [
      { sku: 'RGP-UNI-NEG', price: 899.0, stock: 8, options: { color: 'Negro' } },
      { sku: 'RGP-UNI-AZU', price: 899.0, stock: 5, options: { color: 'Azul' } },
    ],
  },
  {
    category_slug: 'accesorios',
    title: 'Mochila Hidratación 10L',
    slug: 'mochila-hidratacion-10l',
    brand: 'TrailCo',
    description:
      'Mochila técnica de 10 litros con sistema de hidratación incluido, bolsillos de acceso rápido y ajuste ergonómico.',
    base_price: 379.0,
    images: ['https://images.unsplash.com/photo-1551632811-561732d1e306?w=800'],
    variants: [
      { sku: 'MH10-UNI-NEG', price: 379.0, stock: 15, options: { color: 'Negro' } },
      { sku: 'MH10-UNI-ROJ', price: 379.0, stock: 3, options: { color: 'Rojo' } },
    ],
  },
  {
    category_slug: 'accesorios',
    title: 'Auriculares Inalámbricos Trail',
    slug: 'auriculares-inalambricos-trail',
    brand: 'PulseTech',
    description:
      'Auriculares inalámbricos resistentes al sudor y al agua, con ajuste seguro para actividades de alto impacto.',
    base_price: 459.0,
    images: ['https://images.unsplash.com/photo-1585155770447-2f66e2a397b5?w=800'],
    variants: [
      { sku: 'AIT-UNI-BLA', price: 459.0, stock: 20, options: { color: 'Blanco' } },
      { sku: 'AIT-UNI-NEG', price: 459.0, stock: 13, options: { color: 'Negro' } },
    ],
  },
  {
    category_slug: 'accesorios',
    title: 'Lentes de Sol Trail',
    slug: 'lentes-de-sol-trail',
    brand: 'AltaMontaña',
    description:
      'Lentes de sol con protección UV400 y lentes polarizados, ideales para largas jornadas de sol intenso en montaña.',
    base_price: 329.0,
    images: ['https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800'],
    variants: [
      { sku: 'LST-UNI-ROS', price: 329.0, stock: 9, options: { color: 'Rosa' } },
      { sku: 'LST-UNI-NEG', price: 329.0, stock: 1, options: { color: 'Negro' } },
    ],
  },

  // ---- Eventos ----
  {
    category_slug: 'eventos',
    title: 'Carrera Trail 10K',
    slug: 'carrera-trail-10k',
    brand: 'Kilómetro Zero Eventos',
    description:
      'Inscripción a la carrera de 10K por senderos de bosque. Incluye chip de cronometraje, hidratación en ruta y medalla de finalista.',
    base_price: 250.0,
    images: ['https://images.unsplash.com/photo-1588038265723-9bd2a2b03a82?w=800'],
    variants: [
      { sku: 'EVT-10K-GEN', price: 250.0, stock: 40, options: { color: 'Inscripción general' } },
    ],
  },
  {
    category_slug: 'eventos',
    title: 'Ultra Trail 42K',
    slug: 'ultra-trail-42k',
    brand: 'Kilómetro Zero Eventos',
    description:
      'Inscripción a la ultra distancia de 42K en terreno de montaña. Incluye avituallamiento, rescate en ruta y kit del corredor.',
    base_price: 450.0,
    images: ['https://images.unsplash.com/photo-1739416729276-23deaf06a982?w=800'],
    variants: [
      { sku: 'EVT-42K-GEN', price: 450.0, stock: 25, options: { color: 'Inscripción general' } },
    ],
  },
  {
    category_slug: 'eventos',
    title: 'Reto Virtual 21K – Volcán de Agua',
    slug: 'reto-virtual-21k-volcan-de-agua',
    brand: 'Kilómetro Zero Eventos',
    description:
      'Recorré virtualmente el sendero del Volcán de Agua (15.4 km, 1,565 m D+) sumando los kilómetros que ya corrés cada semana. Sincronizá Strava, Garmin, Suunto, Coros o Apple Health y avanzá un marcador real sobre la ruta con cada actividad validada. Al llegar a la cima, desbloqueás medalla 3D y dorsal digital.',
    base_price: 180.0,
    images: ['https://images.unsplash.com/photo-1514441522986-1a15ae47bd0c?w=800'],
    variants: [
      { sku: 'EVT-RV21-DIG', price: 180.0, stock: 60, options: { color: 'Solo Digital' } },
      { sku: 'EVT-RV21-KIT', price: 329.0, stock: 30, options: { color: 'Kit Físico' } },
    ],
  },
]

async function main() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error('Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en el entorno.')
    process.exit(1)
  }

  const categories = await rest('categories?select=id,slug')
  const catMap = Object.fromEntries(categories.map((c) => [c.slug, c.id]))

  for (const p of PRODUCTS) {
    const categoryId = catMap[p.category_slug]
    if (!categoryId) {
      console.error(`Categoría "${p.category_slug}" no existe, se omite "${p.slug}"`)
      continue
    }

    try {
      const [product] = await rest('products?on_conflict=slug', {
        method: 'POST',
        headers: { Prefer: 'return=representation,resolution=merge-duplicates' },
        body: JSON.stringify({
          title: p.title,
          slug: p.slug,
          description: p.description,
          brand: p.brand,
          category_id: categoryId,
          base_price: p.base_price,
          status: 'published',
        }),
      })

      await rest(`product_images?product_id=eq.${product.id}`, { method: 'DELETE' })
      await rest(`product_variants?product_id=eq.${product.id}`, { method: 'DELETE' })

      await rest('product_images', {
        method: 'POST',
        body: JSON.stringify(
          p.images.map((url, i) => ({ product_id: product.id, url, position: i }))
        ),
      })

      await rest('product_variants', {
        method: 'POST',
        body: JSON.stringify(
          p.variants.map((v) => ({
            product_id: product.id,
            sku: v.sku,
            price: v.price,
            inventory_quantity: v.stock,
            options: v.options,
          }))
        ),
      })

      console.log(`✓ ${p.slug}`)
    } catch (err) {
      console.error(`✗ ${p.slug}:`, err.message)
    }
  }

  console.log('Listo.')
}

main()
