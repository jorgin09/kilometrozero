import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const { cartId } = await req.json()

  if (!cartId) {
    return NextResponse.json({ error: 'Falta cartId' }, { status: 400 })
  }

  const supabase = await createClient()

  const { data: items, error } = await supabase
    .from('cart_items')
    .select(
      `
      id, quantity,
      variant:product_variants(id, price, inventory_quantity, options, product:products(title))
    `
    )
    .eq('cart_id', cartId)

  if (error || !items || items.length === 0) {
    return NextResponse.json({ error: 'Carrito vacío o inválido' }, { status: 400 })
  }

  // Validar stock antes de crear la sesión de pago
  for (const item of items as any[]) {
    if (item.variant.inventory_quantity < item.quantity) {
      return NextResponse.json(
        { error: `Sin stock suficiente para ${item.variant.product.title}` },
        { status: 400 }
      )
    }
  }

  const line_items = (items as any[]).map((item) => ({
    price_data: {
      currency: 'gtq',
      product_data: {
        name: `${item.variant.product.title} (${item.variant.options.talla ?? ''} ${
          item.variant.options.color ?? ''
        })`.trim(),
      },
      unit_amount: Math.round(item.variant.price * 100), // Stripe usa centavos
    },
    quantity: item.quantity,
  }))

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items,
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/exito?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/productos`,
    metadata: {
      cart_id: cartId,
    },
  })

  return NextResponse.json({ url: session.url })
}
