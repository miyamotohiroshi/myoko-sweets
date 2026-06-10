import type { Metadata } from 'next'
import './globals.css'
import { SITE_INFO } from '@/config/site'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: `${SITE_INFO.name} | ${SITE_INFO.description}`,
    template: `%s | ${SITE_INFO.name}`,
  },
  description: SITE_INFO.description,
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
      <body className="bg-white text-brand-brownMain font-sans">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
