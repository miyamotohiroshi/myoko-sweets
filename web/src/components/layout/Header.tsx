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
          h-[84px] md:h-[90px]
          transition-all duration-300
          ${headerBg}
        `}
      >
        <div className="w-full max-w-[1080px] mx-auto px-6 md:px-10 h-full flex items-center justify-between">

          {/* ロゴ */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/logo/logo.svg"
              alt="myoko sweets"
              width={160}
              height={40}
              priority
              className="h-7 w-auto"
            />
          </Link>

          {/* PCナビ（md以上で表示） */}
          <nav className="hidden md:flex items-center gap-[30px]">
            {NAV_LINKS.map(link => {
              const isActive = pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative px-0.5 pt-1 pb-1.5 text-[16px] font-bold leading-[27.75px] tracking-[0.32px]
                    text-brand-brown-main transition-opacity duration-200
                    ${isActive ? '' : 'hover:opacity-70'}
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
          <div className="flex items-center gap-3.5">

            {/* 言語切替（仮実装） */}
            <button className="flex items-center gap-1 text-[14px] font-bold leading-[25.9px] tracking-[0.32px] text-brand-brown-sub hover:opacity-70 transition-opacity duration-200">
              <span>JP</span>
              <Image src="/images/top/icons/chev-down.svg" alt="" width={14} height={14} />
            </button>

            {/* ハンバーガーボタン */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="size-[46px] rounded-full bg-white border border-brand-beige flex items-center justify-center hover:bg-brand-ivory transition-colors duration-200"
              aria-label="メニューを開く"
            >
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path d="M1 1H17M1 7H17M1 13H17" stroke="#5C4A2A" strokeWidth="2" strokeLinecap="round"/>
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

          <div className="relative ml-auto w-[280px] max-w-full h-full bg-white flex flex-col">

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
                  className="text-base font-bold text-brand-brown-main tracking-wider hover:text-brand-brown-sub transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto px-6 pb-8 border-t border-brand-beige pt-6">
              <div className="flex gap-4">
                <button className="text-sm text-brand-brown-main font-bold">JP</button>
                <span className="text-brand-beige">|</span>
                <button className="text-sm text-brand-brown-sub hover:text-brand-brown-main transition-colors duration-200">EN</button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  )
}
