import { Locale } from '@/types'

export const dynamicParams = false

export function generateStaticParams(): { locale: Locale }[] {
  return [{ locale: 'ja' }, { locale: 'en' }]
}

type Props = {
  params: Promise<{ locale: Locale }>
}

export default async function LocalePage({ params }: Props) {
  const { locale } = await params
  return (
    <main>
      <h1>MYOKOスイーツ</h1>
      <p>locale: {locale}</p>
    </main>
  )
}
