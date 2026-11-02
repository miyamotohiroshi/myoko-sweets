import Image from 'next/image'
import { TRAVEL_LINKS } from '@/lib/spotsContent'

// グリーン・ウィンターで共通の部品

export function Heading({ en, ja }: { en: string; ja: string }) {
  return (
    <h2 className="flex items-baseline gap-3">
      <span className="font-klee font-semibold text-[26px] md:text-[32px] leading-none tracking-[0.5px] [-webkit-text-stroke:0.6px_currentColor]">{en}</span>
      <span className="text-[13px] md:text-[14px] font-bold text-brand-brown-sub">{ja}</span>
    </h2>
  )
}

export const Arrow = () => (
  <Image src="/images/top/icons/card-arrow.svg" alt="" width={60} height={8} className="transition-transform group-hover:translate-x-1" />
)

/** 写真（なければシーズンに合わせた仮表示） */
export function Thumb({ src, sizes, season = 'green' }: { src: string | null; sizes: string; season?: 'green' | 'winter' }) {
  if (src) {
    return <Image src={src} alt="" fill sizes={sizes} className="object-cover transition-transform duration-700 group-hover:scale-105" />
  }
  return (
    <div className={`absolute inset-0 grid place-items-center ${season === 'winter' ? 'bg-[#EEF4F8]' : 'bg-brand-store-bg'}`}>
      {season === 'winter' ? (
        // 雪の結晶
        <svg aria-hidden="true" width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#9DB7C9" strokeWidth="2" strokeLinecap="round">
          <path d="M20 4v32M6.1 12l27.8 16M6.1 28l27.8-16" />
          <path d="M16 7l4 4 4-4M16 33l4-4 4 4M7.5 17.2l5.5-1.5-1.5-5.5M32.5 22.8l-5.5 1.5 1.5 5.5M7.5 22.8l5.5 1.5-1.5 5.5M32.5 17.2l-5.5-1.5 1.5-5.5" />
        </svg>
      ) : (
        <Image src="/images/top/icons/mountain-line.svg" alt="" width={96} height={32} className="opacity-60" />
      )}
    </div>
  )
}

/** 旅のお役立ち（丸ボタン） */
export function TravelSection() {
  return (
    <section>
      <Heading en="Travel" ja="旅のお役立ち" />
      <p className="mt-3 text-[13px] text-brand-brown-sub">妙高高原周辺を Google マップで探せます</p>
      <ul className="mt-6 grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 max-w-[760px]">
        {TRAVEL_LINKS.map(item => (
          <li key={item.label}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mx-auto flex aspect-square w-full max-w-[110px] flex-col items-center justify-center gap-0.5 rounded-full border border-brand-line bg-white text-center transition-all hover:-translate-y-0.5 hover:border-brand-green hover:bg-brand-store-bg"
            >
              <span className="font-klee font-semibold text-[12px] md:text-[13px] leading-none text-brand-brown-sub">{item.en}</span>
              <span className="text-[12px] md:text-[13px] font-bold leading-[1.5]">#{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

/** 地図（Google マップ埋め込み＋外部リンクのボタン） */
export function MapSection({ ja, embed, link, label, title }: { ja: string; embed: string; link: string; label: string; title: string }) {
  return (
    <section>
      <Heading en="Map" ja={ja} />
      <div className="mt-6 overflow-hidden rounded-[18px] border border-brand-line bg-brand-ivory">
        <iframe
          src={embed}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[320px] md:h-[440px] w-full"
        />
      </div>
      <div className="mt-4 flex justify-center md:justify-end">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-brand-brown-main bg-white px-5 h-11 text-[13px] font-bold transition-colors hover:bg-brand-ivory"
        >
          <Image src="/images/top/icons/google-map.svg" alt="" width={16} height={16} />
          {label}
          <Image src="/images/top/icons/external-link.svg" alt="" width={11} height={11} />
        </a>
      </div>
    </section>
  )
}
