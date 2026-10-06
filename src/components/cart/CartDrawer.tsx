'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/hooks/useCart'

export function CartDrawer() {
  const [open, setOpen] = useState(false)
  const [checkingOut, setCheckingOut] = useState(false)
  const { items, total, updateQuantity, removeItem } = useCart()

  async function handleCheckout() {
    const cartId = localStorage.getItem('cart_id')
    if (!cartId) return

    setCheckingOut(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartId }),
      })

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error ?? 'Error al procesar el pago')
      }
    } finally {
      setCheckingOut(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-xs font-semibold uppercase tracking-widest text-black hover:text-stone-500"
      >
        Carrito ({items.reduce((n, i) => n + i.quantity, 0)})
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white h-full p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-black">
                Tu carrito
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-xs font-semibold uppercase tracking-widest text-stone-500 hover:text-black"
              >
                Cerrar
              </button>
            </div>

            {items.length === 0 ? (
              <p className="text-sm text-stone-500">Tu carrito está vacío.</p>
            ) : (
              <div className="space-y-6">
                {items.map((item) => {
                  const image = item.variant?.product?.images?.[0]
                  return (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative h-20 w-16 bg-stone-100 shrink-0">
                        {image && (
                          <Image
                            src={image.url}
                            alt={item.variant?.product?.title ?? ''}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        )}
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-medium text-stone-900">
                          {item.variant?.product?.title}
                        </p>
                        <p className="text-xs text-stone-500">
                          {item.variant?.options.talla} /{' '}
                          {item.variant?.options.color}
                        </p>

                        <div className="mt-2 flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="h-6 w-6 border border-stone-300 text-xs"
                          >
                            −
                          </button>
                          <span className="text-sm">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="h-6 w-6 border border-stone-300 text-xs"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto text-xs text-stone-400 hover:text-stone-900"
                          >
                            Quitar
                          </button>
                        </div>
                      </div>

                      <p className="text-sm text-stone-900">
                        Q{((item.variant?.price ?? 0) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  )
                })}

                <div className="border-t border-stone-200 pt-4 flex justify-between text-sm font-medium">
                  <span>Total</span>
                  <span>Q{total.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={checkingOut}
                  className="w-full bg-black text-white py-4 text-xs font-semibold uppercase tracking-widest hover:bg-stone-800 disabled:bg-stone-300"
                >
                  {checkingOut ? 'Redirigiendo...' : 'Ir a pagar'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
