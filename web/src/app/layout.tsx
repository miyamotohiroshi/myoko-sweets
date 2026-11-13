import type { Metadata } from 'next'
import './globals.css'
import { SITE_INFO, SITE_OPEN } from '@/config/site'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: `${SITE_INFO.name} | ${SITE_INFO.description}`,
    template: `%s | ${SITE_INFO.name}`,
  },
  description: SITE_INFO.description,
  // 公開前は検索エンジンに載せない（src/config/site.ts の SITE_OPEN で切り替え）
  robots: SITE_OPEN ? undefined : { index: false, follow: false },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: SITE_INFO.url,
    siteName: SITE_INFO.name,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="bg-white text-brand-brown-main font-sans">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
