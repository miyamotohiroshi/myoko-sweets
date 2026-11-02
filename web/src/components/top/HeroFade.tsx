'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

type Slide = { src: string; alt: string }

// 何秒ごとに切り替えるか
const INTERVAL_MS = 5000

/** ヒーローの画像を一定時間ごとにフェードで切り替える（同じ大きさ・同じ形の画像を重ねる） */
export default function HeroFade({ slides, width, height, priority = false }: {
  slides: Slide[]
  width: number
  height: number
  priority?: boolean
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return
    const timer = setInterval(() => setIndex(i => (i + 1) % slides.length), INTERVAL_MS)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="relative">
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={i === index ? slide.alt : ''}
          aria-hidden={i !== index}
          width={width}
          height={height}
          priority={priority && i === 0}
          className={`w-full h-auto transition-opacity duration-[1500ms] ease-in-out ${i === 0 ? 'relative' : 'absolute inset-0'} ${i === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
    </div>
  )
}
