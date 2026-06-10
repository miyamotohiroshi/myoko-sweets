'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/',        label: 'TOP' },
  { href: '/feature', label: '特集' },
  { href: '/spots',   label: '観光スポット' },
]

export default function Header() {
  const pathname = usePathname()
  const isTop = pathname === '/'

  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 470)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  const headerBg = (() => {
    if (isTop && !scrolled) return 'bg-transparent'
    return 'bg-white/80 backdrop-blur-md border-b border-brand-beige/50'
  })()

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          h-[90px] md:h-[64px]
          transition-all duration-300
          ${headerBg}
        `}
      >
        <div className="w-full max-w-[1440px] mx-auto px-10 md:px-4 h-full flex items-center justify-between">

          {/* ロゴ */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/logo/logo.svg"
              alt="myoko sweets"
              width={160}
              height={40}
              priority
              className="h-9 w-auto md:h-7"
            />
          </Link>

          {/* PCナビ（md以上で表示） */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => {
              const isActive = pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative text-sm tracking-wider pb-1
                    transition-colors duration-200
                    ${isActive
                      ? 'text-brand-brownMain font-medium'
                      : 'text-brand-brownSub hover:text-brand-brownMain'
                    }
                  `}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ backgroundColor: '#DADF81' }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* 右側：言語切替＋ハンバーガー */}
          <div className="flex items-center gap-3">

            {/* 言語切替（仮実装） */}
            <button className="flex items-center gap-1 text-sm text-brand-brownSub hover:text-brand-brownMain transition-colors duration-200">
              <span>JP</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* ハンバーガーボタン */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="w-10 h-10 md:w-8 md:h-8 rounded-full border border-brand-beige flex items-center justify-center hover:bg-brand-ivory transition-colors duration-200"
              aria-label="メニューを開く"
            >
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path d="M0 1H16M0 6H16M0 11H16" stroke="#5C4A2A" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

          </div>
        </div>
      </header>

      {/* ドロワーメニュー */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[100] flex">

          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
          />

          <div className="relative ml-auto w-[280px] md:w-full h-full bg-white flex flex-col">

            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-beige">
              <Image
                src="/logo/logo.svg"
                alt="myoko sweets"
                width={120}
                height={30}
                className="h-7 w-auto"
              />
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-8 h-8 rounded-full border border-brand-beige flex items-center justify-center hover:bg-brand-ivory transition-colors duration-200"
                aria-label="メニューを閉じる"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1L11 11M11 1L1 11" stroke="#5C4A2A" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <nav className="flex flex-col px-6 py-8 gap-6">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setDrawerOpen(false)}
                  className="text-base text-brand-brownMain tracking-wider hover:text-brand-brownSub transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto px-6 pb-8 border-t border-brand-beige pt-6">
              <div className="flex gap-4">
                <button className="text-sm text-brand-brownMain font-medium">JP</button>
                <span className="text-brand-beige">|</span>
                <button className="text-sm text-brand-brownSub hover:text-brand-brownMain transition-colors duration-200">EN</button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  )
}
