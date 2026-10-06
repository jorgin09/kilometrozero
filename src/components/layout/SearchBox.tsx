'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export function SearchBox() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get('busqueda') ?? '')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (value.trim()) params.set('busqueda', value.trim())
    router.push(`/productos${params.size > 0 ? `?${params.toString()}` : ''}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="hidden items-center rounded-full border border-stone-300 pl-4 pr-1.5 py-1.5 focus-within:border-black lg:flex"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Búsqueda"
        className="w-32 bg-transparent text-sm text-black placeholder:text-stone-400 outline-none"
      />
      <button
        type="submit"
        aria-label="Buscar"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-stone-500 hover:text-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </form>
  )
}
