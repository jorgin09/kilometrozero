import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import type Stripe from 'stripe'

// Usamos el service_role key aquí porque el webhook corre sin sesión de usuario
// y necesita saltarse RLS para crear la orden y actualizar inventario.
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return NextResponse.json({ error: 'Firma inválida' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const cartId = session.metadata?.cart_id

    if (!cartId) {
      return NextResponse.json({ error: 'Sin cart_id' }, { status: 400 })
    }

    const { data: items } = await supabaseAdmin
      .from('cart_items')
      .select('id, quantity, variant:product_variants(id, price, inventory_quantity)')
      .eq('cart_id', cartId)

    if (!items || items.length === 0) {
      return NextResponse.json({ received: true })
    }

    // Crear la orden
    const total = (session.amount_total ?? 0) / 100
    const { data: order } = await supabaseAdmin
      .from('orders')
      .insert({
        status: 'paid',
        total,
        shipping_address: session.customer_details?.address ?? {},
      })
      .select('id')
      .single()

    if (order) {
      // Crear order_items y descontar inventario
      for (const item of items as any[]) {
        await supabaseAdmin.from('order_items').insert({
          order_id: order.id,
          variant_id: item.variant.id,
          quantity: item.quantity,
          unit_price: item.variant.price,
        })

        await supabaseAdmin
          .from('product_variants')
          .update({
            inventory_quantity: item.variant.inventory_quantity - item.quantity,
          })
          .eq('id', item.variant.id)
      }

      // Vaciar el carrito
      await supabaseAdmin.from('cart_items').delete().eq('cart_id', cartId)
    }
  }

  return NextResponse.json({ received: true })
}
