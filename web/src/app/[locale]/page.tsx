import { Locale } from '@/types'

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
