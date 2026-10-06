'use client'

import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { CartItem } from '@/lib/types'

const CART_ID_KEY = 'cart_id'

export function useCart() {
  const supabase = createClient()
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)

  const getOrCreateCartId = useCallback(async () => {
    const existing = localStorage.getItem(CART_ID_KEY)
    if (existing) return existing

    const { data, error } = await supabase
      .from('carts')
      .insert({})
      .select('id')
      .single()

    if (error || !data) throw error

    localStorage.setItem(CART_ID_KEY, data.id)
    return data.id as string
  }, [supabase])

  const fetchCart = useCallback(async () => {
    const cartId = localStorage.getItem(CART_ID_KEY)
    if (!cartId) return

    const { data, error } = await supabase
      .from('cart_items')
      .select(
        `
        *,
        variant:product_variants(*, product:products(*))
      `
      )
      .eq('cart_id', cartId)

    if (!error && data) setItems(data as unknown as CartItem[])
  }, [supabase])

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  const addItem = useCallback(
    async (variantId: string, quantity: number) => {
      setLoading(true)
      try {
        const cartId = await getOrCreateCartId()

        // Si ya existe esa variante en el carrito, incrementa cantidad
        const existing = items.find((i) => i.variant_id === variantId)

        if (existing) {
          await supabase
            .from('cart_items')
            .update({ quantity: existing.quantity + quantity })
            .eq('id', existing.id)
        } else {
          await supabase
            .from('cart_items')
            .insert({ cart_id: cartId, variant_id: variantId, quantity })
        }

        await fetchCart()
      } finally {
        setLoading(false)
      }
    },
    [items, supabase, getOrCreateCartId, fetchCart]
  )

  const updateQuantity = useCallback(
    async (itemId: string, quantity: number) => {
      if (quantity <= 0) {
        await supabase.from('cart_items').delete().eq('id', itemId)
      } else {
        await supabase.from('cart_items').update({ quantity }).eq('id', itemId)
      }
      await fetchCart()
    },
    [supabase, fetchCart]
  )

  const removeItem = useCallback(
    async (itemId: string) => {
      await supabase.from('cart_items').delete().eq('id', itemId)
      await fetchCart()
    },
    [supabase, fetchCart]
  )

  const total = items.reduce(
    (sum, item) => sum + (item.variant?.price ?? 0) * item.quantity,
    0
  )

  return { items, loading, addItem, updateQuantity, removeItem, total }
}
