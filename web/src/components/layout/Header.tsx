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
  // 店舗詳細ページの SP は、下スクロールでヘッダーを隠し、上スクロールで上から出す
  const autoHide = pathname.startsWith('/shop/')

  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 470)
      if (y <= 64) setHidden(false)
      else if (y > lastY + 4) setHidden(true)
      else if (y < lastY - 4) setHidden(false)
      lastY = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerHidden = autoHide && hidden && !drawerOpen

  // ページ内ナビ（固定表示）がヘッダーの出し入れに合わせて位置を変えられるよう、html に状態を出す
  useEffect(() => {
    document.documentElement.toggleAttribute('data-header-hidden', headerHidden)
  }, [headerHidden])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  const headerBg = (() => {
    if (drawerOpen) return 'bg-white border-b border-brand-beige/50'
    if (isTop && !scrolled) return 'bg-transparent'
    return 'bg-white/80 backdrop-blur-md border-b border-brand-beige/50'
  })()

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 ${drawerOpen ? 'z-[110]' : 'z-50'}
          h-16 md:h-[72px]
          transition-all duration-300
          ${headerHidden ? 'max-md:-translate-y-full' : ''}
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
              className="h-8 md:h-9 w-auto"
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

            {/* ハンバーガーボタン（開くと 2 本線が ✗ に変わる） */}
            <button
              type="button"
              onClick={() => setDrawerOpen(v => !v)}
              aria-expanded={drawerOpen}
              aria-controls="site-drawer"
              aria-label={drawerOpen ? 'メニューを閉じる' : 'メニューを開く'}
              className="group flex items-center gap-2.5 h-10 pl-2 text-brand-brown-main"
            >
              <span className="hidden md:block w-[44px] text-right font-klee font-semibold text-[13px] leading-none tracking-[1.5px]">
                {drawerOpen ? 'CLOSE' : 'MENU'}
              </span>
              <span className="relative block w-[26px] h-[9px]">
                <span
                  className={`absolute right-0 h-[2px] w-full rounded-full bg-current transition-all duration-300 ease-out ${drawerOpen ? 'top-[3.5px] rotate-45' : 'top-0'}`}
                />
                <span
                  className={`absolute right-0 h-[2px] rounded-full bg-current transition-all duration-300 ease-out ${drawerOpen ? 'bottom-[3.5px] w-full -rotate-45' : 'bottom-0 w-[58%] group-hover:w-full'}`}
                />
              </span>
            </button>

          </div>
        </div>
      </header>

      {/* ドロワーメニュー（ヘッダーの下から右側にスライド） */}
      <div
        id="site-drawer"
        inert={!drawerOpen}
        className={`fixed inset-0 top-16 md:top-[72px] z-[100] flex transition-opacity duration-300 ${drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div
          className="absolute inset-0 bg-brand-brown-main/30 backdrop-blur-[2px]"
          onClick={() => setDrawerOpen(false)}
        />

        <div
          className={`relative ml-auto w-[300px] max-w-full h-full bg-white flex flex-col transition-transform duration-300 ease-out ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <nav className="flex flex-col px-8 pt-8">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                className="group flex items-center justify-between py-4 border-b border-dashed border-brand-line text-[16px] font-bold tracking-[0.32px] text-brand-brown-main"
              >
                {link.label}
                <Image src="/images/top/icons/arrow-brown.svg" alt="" width={16} height={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </nav>

          <div className="mt-auto px-8 pb-10 pt-6">
            <div className="flex gap-4 text-sm">
              <button className="font-bold text-brand-brown-main">JP</button>
              <span className="text-brand-beige">|</span>
              <button className="text-brand-brown-sub hover:text-brand-brown-main transition-colors duration-200">EN</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
