'use client'

import { useState } from 'react'
import Image from 'next/image'

export function ProductImageZoom({
  src,
  alt,
}: {
  src: string
  alt: string
}) {
  const [isHovering, setIsHovering] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPosition({ x, y })
  }

  return (
    <div
      className="relative aspect-[3/4] overflow-hidden bg-stone-100 md:cursor-zoom-in"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />

      {isHovering && (
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: `url(${src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '200%',
            backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
          }}
        />
      )}
    </div>
  )
}
