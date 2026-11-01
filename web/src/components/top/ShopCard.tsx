import Image from 'next/image'
import Link from 'next/link'
import type { Shop, ShopACF, WPImage } from '@/types'
import {
  SWEETS_CATEGORY_MAP,
  AREA_MAP,
  SHOP_TYPE_MAP,
  DRINK_ICON_MAP,
} from '@/lib/terms'
import { stripTags } from '@/lib/utils'
import ShopPhotos from './ShopPhotos'

const ICON = '/images/top/icons'

// ============================================================
// データ整形
// ============================================================
export function getPhotos(acf: ShopACF): WPImage[] {
  const photos: WPImage[] = []
  for (let i = 1; i <= 20; i++) {
    const img = acf[`photo_${String(i).padStart(2, '0')}_image` as keyof ShopACF] as WPImage | null
    if (img?.url) photos.push(img)
  }
  return photos
}

// メイン → サブ → photo_01〜20 の順に並べた全写真（重複は除く）
export function getGallery(acf: ShopACF): WPImage[] {
  const all = [acf.image_main, acf.image_sub, ...getPhotos(acf)].filter((img): img is WPImage => Boolean(img?.url))
  return all.filter((img, i) => all.findIndex(x => x.ID === img.ID) === i)
}

export type AccessLine = { from: string; time: string }

export function getAccessLines(acf: ShopACF): { main: string | null; sub: AccessLine[] } {
  const sub = [
    acf.access_from_myoko_ic        && { from: '妙高高原IC', time: acf.access_from_myoko_ic },
    acf.access_from_shinanomachi_ic && { from: '信濃町IC',   time: acf.access_from_shinanomachi_ic },
    acf.access_from_nojiriko        && { from: '野尻湖畔',   time: acf.access_from_nojiriko },
  ].filter((v): v is AccessLine => Boolean(v))
  const main = acf.access ? stripTags(acf.access) : null
  return { main, sub }
}

/** 「妙高高原ICより車で 約4分」：所要時間だけ太字＋マーカーで目立たせる */
export function AccessTime({ from, time }: AccessLine) {
  const [, before = time, minutes = ''] = time.match(/^(.*?)(約?\s*\d+\s*分.*)$/) ?? []
  return (
    <span className="block">
      {from}より{before}
      {minutes && (
        <strong className="ml-1 font-bold text-[1.1em] bg-[linear-gradient(transparent_62%,rgba(218,223,129,0.75)_62%)] px-0.5">
          {minutes}
        </strong>
      )}
    </span>
  )
}

export function toCardData(shop: Shop) {
  const { acf } = shop
  return {
    name:       stripTags(shop.title.rendered),
    label:      acf.shop_label || SHOP_TYPE_MAP[shop.shop_type?.[0]] || '',
    area:       shop.area?.map(id => AREA_MAP[id]).find(Boolean) ?? '',
    categories: (shop.sweets_category ?? []).map(id => SWEETS_CATEGORY_MAP[id]).filter(Boolean).slice(0, 3),
    drinks:     [...new Set((shop.drink_category ?? []).map(id => DRINK_ICON_MAP[id]).filter(Boolean))],
    features:   shop.features ?? [],
    text:       acf.catchcopy || stripTags(acf.shop_description ?? ''),
    hours:      acf.opening_hours ? stripTags(acf.opening_hours) : '',
    holiday:    acf.holiday ?? '',
    access:     getAccessLines(acf),
    mainImg:    acf.image_main,
    subImg:     acf.image_sub,
    photos:     getPhotos(acf),
    gallery:    getGallery(acf),
    mapUrl:     acf.google_map_url,
    href:       `/shop/${shop.slug}`,
  }
}

type CardData = ReturnType<typeof toCardData>

// ============================================================
// パーツ
// ============================================================
export function Icon({ name, size = 24, label }: { name: string; size?: number; label?: string }) {
  return (
    <Image
      src={`${ICON}/${name}.svg`}
      alt={label ?? ''}
      title={label}
      width={size}
      height={size}
      className="shrink-0"
    />
  )
}

export function ShopLabel({ label }: { label: string }) {
  if (!label) return null
  return (
    <p className="flex items-center gap-1.5 text-[13px] font-bold leading-6 tracking-[0.32px] text-brand-brown-sub">
      <span className="size-[7px] rounded-full bg-brand-green" />
      {label}
    </p>
  )
}

export function AreaBadge({ area }: { area: string }) {
  if (!area) return null
  return (
    <span className="shrink-0 bg-white border border-[#E6E6E6] rounded-[2px] px-[13px] pt-[3px] pb-1 text-[12px] font-bold leading-[22px] tracking-[0.32px] text-brand-brown-main">
      {area}
    </span>
  )
}

export function Tags({ categories, drinks }: Pick<CardData, 'categories' | 'drinks'>) {
  if (!categories.length && !drinks.length) return null
  return (
    <div className="flex flex-wrap items-center gap-3">
      {categories.map(cat => (
        <span key={cat} className="bg-brand-tag rounded-[2px] px-3 py-1 text-[13px] font-bold leading-6 tracking-[0.32px] text-brand-brown-main">
          {cat}
        </span>
      ))}
      {drinks.length > 0 && (
        <span className="flex items-center gap-2">
          {drinks.map(d => <Icon key={d} name={d} />)}
        </span>
      )}
    </div>
  )
}

const FEATURE_TEXT_ICONS: { id: number; icon: string; label: string }[] = [
  { id: 29, icon: 'seat',    label: '座席あり' },
  { id: 30, icon: 'takeout', label: '持ち帰り可' },
  { id: 31, icon: 'takeout', label: '持ち帰りのみ' },
]
const FEATURE_ONLY_ICONS: { id: number; icon: string; label: string }[] = [
  { id: 34, icon: 'power', label: '電源あり' },
  { id: 33, icon: 'wifi',  label: 'Wi-Fiあり' },
]

export function Features({ features }: { features: number[] }) {
  const texts = FEATURE_TEXT_ICONS.filter(f => features.includes(f.id))
  const icons = FEATURE_ONLY_ICONS.filter(f => features.includes(f.id))
  if (!texts.length && !icons.length) return null
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 py-1">
      {texts.map(f => (
        <span key={f.id} className="flex items-center gap-1 text-[14px] leading-[25.9px] tracking-[0.32px]">
          <Icon name={f.icon} />
          {f.label}
        </span>
      ))}
      {texts.length > 0 && icons.length > 0 && (
        <Image src={`${ICON}/separator.svg`} alt="" width={6} height={18} />
      )}
      {icons.length > 0 && (
        <span className="flex items-center gap-2">
          {icons.map(f => <Icon key={f.id} name={f.icon} label={f.label} />)}
        </span>
      )}
    </div>
  )
}

export function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <>
      <dt className="mt-[1px] self-start rounded-[3px] bg-brand-gray py-0.5 text-center text-[11px] font-bold leading-[1.7] tracking-[0.5px] text-brand-brown-sub">
        {label}
      </dt>
      <dd>{children}</dd>
    </>
  )
}

function Buttons({ mapUrl, href, className = '' }: Pick<CardData, 'mapUrl' | 'href'> & { className?: string }) {
  return (
    <div className={`flex items-center justify-between gap-3 ${className}`}>
      {mapUrl ? (
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 h-12 w-[140px] shrink-0 bg-white border border-brand-brown-main rounded-full text-[13px] font-bold tracking-[0.32px] text-brand-brown-main transition-colors hover:bg-brand-ivory"
        >
          <Image src={`${ICON}/google-map.svg`} alt="" width={18} height={18} />
          GoogleMap
          <Image src={`${ICON}/external-link.svg`} alt="" width={12} height={12} className="ml-1" />
        </a>
      ) : <span />}
      <Link
        href={href}
        className="relative flex items-center justify-center h-12 w-[210px] bg-brand-brown-sub border border-brand-beige rounded-full text-[14px] font-bold tracking-[0.32px] text-white transition-opacity hover:opacity-85"
      >
        お店の詳細へ
        <Image src={`${ICON}/arrow-white.svg`} alt="" width={16} height={16} className="absolute right-[18px]" />
      </Link>
    </div>
  )
}

// ============================================================
// リスト表示カード（Figma: Article - card）
// ============================================================
export default function ShopCard({ shop }: { shop: Shop }) {
  const d = toCardData(shop)

  const hasAccess = Boolean(d.access.main || d.access.sub.length > 0)

  // 営業・定休日・アクセス：見出しを同じ幅のチップにして、値の頭をそろえる
  const infoList = (d.hours || d.holiday || hasAccess) && (
    <dl className="grid grid-cols-[56px_1fr] gap-x-3 gap-y-2.5 text-[13px] md:text-[14px] leading-[1.7] tracking-[0.32px]">
      {d.hours && <InfoRow label="営業">{d.hours}</InfoRow>}
      {d.holiday && <InfoRow label="定休日">{d.holiday}</InfoRow>}
      {hasAccess && (
        <InfoRow label="アクセス">
          {d.access.main && <span className="block">{d.access.main}</span>}
          {d.access.sub.map(line => <AccessTime key={line.from} {...line} />)}
        </InfoRow>
      )}
    </dl>
  )

  return (
    <article className="flex flex-col md:flex-row md:justify-between gap-5 md:gap-6 text-brand-brown-main">

      {/* ---- 写真 ---- */}
      <div className="order-2 md:order-1 flex flex-col gap-3 md:gap-5 md:w-[570px] shrink-0 -mx-5 md:mx-0">
        <ShopPhotos images={d.gallery} thumbs={d.photos.slice(0, 8)} name={d.name} />
      </div>

      {/* ---- テキスト ---- */}
      <div className="order-1 md:order-2 md:w-[366px] shrink-0 flex flex-col">
        <ShopLabel label={d.label} />
        <div className="flex items-start justify-between gap-3 border-b border-brand-brown-main pt-[5px] pb-4">
          <h3 className="text-[20px] md:text-[22px] font-bold leading-[33.6px] tracking-[0.32px]">{d.name}</h3>
          <AreaBadge area={d.area} />
        </div>
        <div className="pt-5 pb-2">
          <Tags categories={d.categories} drinks={d.drinks} />
        </div>

        {/* PC のみここに説明・詳細（SP は写真の下に表示） */}
        <div className="hidden md:flex flex-col">
          {d.text && <p className="py-4 text-[16px] font-medium leading-[1.8]">{d.text}</p>}
          <div className="pb-2">
            <Features features={d.features} />
          </div>
          {infoList && <div className="border-t border-dashed border-brand-line pt-4">{infoList}</div>}
          <Buttons mapUrl={d.mapUrl} href={d.href} className="pt-5 mt-auto" />
        </div>
      </div>

      {/* ---- SP：説明・詳細ボックス ---- */}
      <div className="order-3 md:hidden flex flex-col">
        {d.text && <p className="pb-4 text-[14px] font-medium leading-[1.9]">{d.text}</p>}
        <div className="bg-white border border-[#E6E6E6] rounded-[4px] px-4 py-3">
          <div className="border-b border-dashed border-brand-line pb-2 mb-3">
            <Features features={d.features} />
          </div>
          {infoList}
        </div>
        <Buttons mapUrl={d.mapUrl} href={d.href} className="pt-6" />
      </div>
    </article>
  )
}
