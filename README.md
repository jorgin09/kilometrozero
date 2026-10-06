# Kilómetro Zero

E-commerce de equipo de trail running construido con Next.js (App Router),
Supabase (base de datos, auth, storage) y Stripe (pagos).

## 1. Requisitos

- Node.js 18+
- Una cuenta de [Supabase](https://supabase.com) (plan gratuito es suficiente para empezar)
- Una cuenta de [Stripe](https://stripe.com) (modo test)

## 2. Configurar Supabase

1. Crea un proyecto nuevo en [supabase.com](https://supabase.com).
2. Ve a **SQL Editor** y ejecuta todo el contenido de `schema.sql` (crea las
   tablas, políticas de RLS, y algunos productos de ejemplo).
3. Ve a **Settings -> API** y copia:
   - `Project URL` -> `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` -> `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role key` -> `SUPABASE_SERVICE_ROLE_KEY` (¡nunca la expongas al frontend!)

## 3. Configurar Stripe

1. Crea una cuenta en [stripe.com](https://stripe.com) (o usa el modo test de una existente).
2. Ve a **Developers -> API keys** y copia la `Secret key` -> `STRIPE_SECRET_KEY`.
3. Para probar el webhook en local, instala el [Stripe CLI](https://docs.stripe.com/stripe-cli)
   y corre:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
   Esto te da un `whsec_...` que va en `STRIPE_WEBHOOK_SECRET`.

## 4. Variables de entorno

Copia `.env.local.example` a `.env.local` y llena los valores:

```bash
cp .env.local.example .env.local
```

## 5. Instalar y correr

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## 6. Probar el flujo completo

1. Ve a `/productos` — deberías ver la "Camiseta Trail Pro" de ejemplo (del `schema.sql`).
2. Entra a la ficha de producto, elige talla/color y agrégala al carrito.
3. Abre el carrito y dale a "Ir a pagar" — te redirige a Stripe Checkout.
4. Usa una [tarjeta de prueba de Stripe](https://docs.stripe.com/testing#cards),
   por ejemplo `4242 4242 4242 4242`, cualquier fecha futura y CVC.
5. Si tienes `stripe listen` corriendo, verás en la terminal cómo el webhook
   crea la orden y descuenta inventario en Supabase.

## Estructura del proyecto

```
src/
  app/
    (shop)/productos/          Catálogo y ficha de producto
    api/checkout/               Crea la sesión de Stripe Checkout
    api/webhooks/stripe/        Confirma el pago y crea la orden
    checkout/exito/             Página de confirmación
  components/
    product/                    ProductCard, CatalogFilters, ProductVariantSelector
    cart/                       CartDrawer
    layout/                     Header, Footer
  hooks/
    useCart.ts                  Lógica del carrito (Supabase)
  lib/
    api.ts                      Queries a Supabase (productos, categorías)
    stripe.ts                   Cliente de Stripe
    supabase/                   Clientes de Supabase (server/client)
    types.ts                    Tipos compartidos
schema.sql                      Esquema de base de datos + RLS + datos de ejemplo
```

## Próximos pasos sugeridos

- Autenticación de usuarios con Supabase Auth (login, registro, historial de órdenes)
- Panel de administración para gestionar productos e inventario
- Reseñas de producto
- Envío de correo de confirmación tras la compra (ej. con Resend)
