import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Shop, ShopACF, Spot, WPImage } from '@/types'
import { getShopBySlug, getNearbySpots } from '@/lib/wordpress'
import { SITE_INFO } from '@/config/site'
import { SWEETS_CATEGORY_MAP, SWEETS_ICON_MAP, FEATURES_MAP } from '@/lib/terms'
import {
  stripTags,
  sanitizeHtml,
  parseMenu,
  parseListHtml,
  formatSeason,
  PAYMENT_LABELS,
} from '@/lib/utils'
import { toCardData, getGallery, AccessTime, ShopLabel, AreaBadge, Tags, Features } from '@/components/top/ShopCard'
import ShopGallery from '@/components/shop/ShopGallery'
import ShopMenu from '@/components/shop/ShopMenu'
import HashtagCopy from '@/components/shop/HashtagCopy'
import ShopReview from '@/components/shop/ShopReview'
import {
  DetailHeading,
  Breadcrumb,
  MapButton,
  PopularList,
  SpotAccordion,
  MonthCalendar,
  type PopularItem,
} from '@/components/shop/ShopParts'

type Props = { params: Promise<{ slug: string }> }

// ============================================================
// データ取得・整形
// ============================================================
async function loadShop(slug: string): Promise<Shop | null> {
  try {
    return await getShopBySlug(slug)
  } catch {
    return null
  }
}

async function loadSpots(acf: ShopACF): Promise<Spot[]> {
  if (!acf.location) return []
  const featuredIds = (acf.featured_spots ?? []).map(s => (typeof s === 'number' ? s : s.ID))
  try {
    return await getNearbySpots(acf.location, featuredIds)
  } catch {
    return []
  }
}

function getPopular(acf: ShopACF, kind: 'sweets' | 'food'): PopularItem[] {
  return [1, 2, 3]
    .map(n => ({
      image: acf[`popular_${kind}_${n}_image` as keyof ShopACF] as WPImage | null,
      name:  (acf[`popular_${kind}_${n}_name` as keyof ShopACF] as string) ?? '',
      price: (acf[`popular_${kind}_${n}_price` as keyof ShopACF] as string) ?? '',
    }))
    .filter(item => item.name)
}

// X の投稿URL（1行に1件。x.com / twitter.com の status URL だけ通す）
function getXPosts(acf: ShopACF): string[] {
  return (acf.x_post_urls ?? '')
    .split(/\s+/)
    .map(s => s.trim())
    .filter(url => /^https:\/\/(x|twitter)\.com\/\w+\/status\/\d+/.test(url))
}

// ============================================================
// メタデータ
// ============================================================
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const shop = await loadShop(slug)
  if (!shop) return { title: 'お店が見つかりません' }
  const name = stripTags(shop.title.rendered)
  const description = shop.acf.catchcopy || stripTags(shop.acf.shop_description ?? '')
  return {
    title: name,
    description,
    openGraph: {
      title: name,
      description,
      images: shop.acf.image_main ? [shop.acf.image_main.url] : undefined,
    },
  }
}

// ============================================================
// ページ
// ============================================================
export default async function ShopDetailPage({ params }: Props) {
  const { slug } = await params
  const shop = await loadShop(slug)
  if (!shop) notFound()

  const { acf } = shop
  const d = toCardData(shop)
  const spots = await loadSpots(acf)

  const gallery     = getGallery(acf)
  const categories  = (shop.sweets_category ?? []).map(id => SWEETS_CATEGORY_MAP[id]).filter(Boolean)
  const description = acf.shop_description ? sanitizeHtml(acf.shop_description) : ''
  const menuGroups  = [
    { label: 'スイーツ', items: parseMenu(acf.menu_sweets), limited: parseMenu(acf.menu_sweets_limited) },
    { label: 'ドリンク', items: parseMenu(acf.menu_drinks) },
    { label: '食事・他', items: parseMenu(acf.menu_food) },
  ].filter(g => g.items.length > 0 || (g.limited?.length ?? 0) > 0)
  const popularSweets = getPopular(acf, 'sweets')
  const popularFood   = getPopular(acf, 'food')
  const reviews       = parseListHtml(acf.review_summary ?? '')
  const xPosts        = getXPosts(acf)
  const featureLabels = (shop.features ?? []).map(id => FEATURES_MAP[id]).filter(Boolean)
  const payments      = (acf.payment_methods ?? []).map(p => PAYMENT_LABELS[p]).filter(Boolean)
  const hashtags      = [SITE_INFO.hashtag, `#${d.name.replace(/\s+/g, '')}`]
  const hasMenu       = menuGroups.length > 0 || popularSweets.length > 0 || popularFood.length > 0

  const anchors = [
    hasMenu            && { href: '#menu',   en: 'MENU',   label: 'メニュー' },
    (reviews.length > 0 || xPosts.length > 0) && { href: '#review', en: 'REVIEW', label: 'レビュー' },
    spots.length > 0   && { href: '#spot',   en: 'SPOT',   label: '近くの施設' },
    { href: '#info', en: 'INFO', label: 'お店情報' },
  ].filter((a): a is { href: string; en: string; label: string } => Boolean(a))

  // 営業時間・アクセス（PC サイドバーと INFO で共用）
  const hoursBlock = (
    <dl className="grid grid-cols-[64px_1fr] gap-y-3 text-[14px] leading-[1.8]">
      {d.hours && <><dt className="font-bold">営業</dt><dd className="whitespace-pre-line">{d.hours}</dd></>}
      {acf.holiday && <><dt className="font-bold">定休日</dt><dd>{acf.holiday}</dd></>}
      {acf.season && <><dt className="font-bold">シーズン</dt><dd>{formatSeason(acf.season)}{acf.operating_months_note && `（${acf.operating_months_note}）`}</dd></>}
    </dl>
  )

  return (
    <main className="overflow-x-clip pt-16 md:pt-[72px] text-brand-brown-main">
      {/* ==================== ページ内リンク（横いっぱい・スクロールで上部固定） ==================== */}
      {/* SP はヘッダーが隠れている間（html[data-header-hidden]）は画面の一番上に付く */}
      <nav
        aria-label="ページ内リンク"
        className="sticky z-40 top-16 md:top-[72px] max-md:[html[data-header-hidden]_&]:top-0 transition-[top] duration-300 bg-brand-store-bg/95 backdrop-blur-sm border-b border-brand-line"
      >
        <ul className="max-w-[1080px] mx-auto md:px-10 flex">
          {anchors.map(a => (
            <li key={a.href} className="relative flex-1 [&+li]:before:absolute [&+li]:before:left-0 [&+li]:before:top-1/2 [&+li]:before:-translate-y-1/2 [&+li]:before:h-6 [&+li]:before:w-px [&+li]:before:bg-brand-line">
              <a
                href={a.href}
                className="group relative flex flex-col items-center gap-0.5 py-3 md:py-4 transition-colors hover:bg-white"
              >
                <span className="font-klee font-semibold text-[11px] md:text-[13px] leading-none tracking-[1.5px] text-brand-brown-sub">{a.en}</span>
                <span className="flex items-center gap-1 text-[12px] md:text-[14px] font-bold leading-[1.5] whitespace-nowrap">
                  {a.label}
                  <Image src="/images/top/icons/chev-down.svg" alt="" width={10} height={10} className="transition-transform group-hover:translate-y-0.5" />
                </span>
                {/* ホバーで下に緑のラインが伸びる */}
                <span aria-hidden="true" className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-0 rounded-full bg-brand-green transition-all duration-300 group-hover:w-10" />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="max-w-[1080px] mx-auto px-5 md:px-10">
        {/* ==================== 店名・タグ ==================== */}
        <header className="pt-6 md:pt-8">
          <ShopLabel label={d.label} />
          <div className="flex items-start justify-between gap-3 border-b border-brand-brown-main pt-1 pb-3">
            <h1 className="text-[24px] md:text-[30px] font-bold leading-[1.4] tracking-[0.32px]">{d.name}</h1>
            <AreaBadge area={d.area} />
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 pt-4">
            <Tags categories={categories} drinks={d.drinks} />
            <Features features={d.features} />
          </div>
        </header>
      </div>

      {/* ==================== 写真 ==================== */}
      <div className="max-w-[1080px] mx-auto md:px-10 pt-5 md:pt-6">
        <ShopGallery photos={gallery} name={d.name} />
      </div>

      <div className="max-w-[1080px] mx-auto px-5 md:px-10 pt-8 md:pt-10 md:pb-24 md:grid md:grid-cols-[1fr_300px] md:gap-12 lg:gap-16">

        {/* ==================== メインカラム ==================== */}
        {/* SP はセクションの間を太いグレーの帯で区切る（左右いっぱい） */}
        <div className="min-w-0 flex flex-col md:gap-16 max-md:[&>section]:-mx-5 max-md:[&>section]:px-5 max-md:[&>section]:py-10 max-md:[&>section:first-child]:pt-0 max-md:[&>section+section]:border-t-8 max-md:[&>section+section]:border-solid max-md:[&>section+section]:border-brand-gray">

          {/* 紹介文 */}
          <section>
            {acf.catchcopy && <p className="text-[18px] md:text-[21px] font-bold leading-[1.7] tracking-[0.32px]">{acf.catchcopy}</p>}
            {description && (
              <div
                className="mt-3 text-[14px] md:text-[15px] leading-[1.9] [&_p+p]:mt-3"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
          </section>

          {/* MENU */}
          {hasMenu && (
            <section>
              <DetailHeading en="MENU" ja="メニュー" id="menu" />
              {menuGroups.length > 0 && (
                <div className="mt-4">
                  <ShopMenu groups={menuGroups} />
                  <p className="pt-3 text-[12px] leading-[1.8] text-brand-brown-sub">
                    ※価格は税込みです<br />
                    ※メニュー・価格は変更の場合があります。詳しくはお店でご確認ください
                  </p>
                </div>
              )}
              <PopularList title="人気のスイーツ" items={popularSweets} />
              <PopularList title="人気の食事" items={popularFood} />
            </section>
          )}

          {/* REVIEW */}
          {(reviews.length > 0 || xPosts.length > 0) && (
            <section>
              <DetailHeading en="REVIEW" ja="レビュー" id="review" />
              <p className="mt-4 mb-5 text-[13px] leading-[1.8] text-brand-brown-sub">
                各種SNS、口コミ、実際のお店に来る方などの声を総合してサマリーしています
              </p>
              <ShopReview summary={reviews} xPosts={xPosts} hashtags={hashtags} />
            </section>
          )}

          {/* SPOT */}
          {spots.length > 0 && (
            <section>
              <DetailHeading en="SPOT" ja="近くの施設" id="spot" />
              <div className="mt-4">
                <SpotAccordion spots={spots} />
              </div>
            </section>
          )}

          {/* SNS 投稿のお願い */}
          <section className="relative md:border-y border-brand-line md:py-8 text-center">
            <p className="mb-2 md:mb-0 md:absolute md:left-1/2 md:-top-3 md:-translate-x-1/2 bg-white md:px-4 text-[14px] font-bold tracking-[0.32px]">ご協力お願いします</p>
            <p className="text-[18px] md:text-[20px] font-bold leading-[1.7]">このお店が良かったら</p>
            <p className="mt-1 mb-5 text-[14px] leading-[1.8]">
              タグを付けてSNSに<br className="md:hidden" />写真の投稿をお願いします！
            </p>
            <HashtagCopy tags={hashtags} />
          </section>

          {/* INFO */}
          <section>
            <DetailHeading en="INFO" ja="お店情報" id="info" />
            <div className="mt-5 flex items-center gap-4">
              <div className="relative size-[88px] md:size-[110px] shrink-0 overflow-hidden rounded-[8px] bg-[#E5E5E5]">
                {acf.image_main && <Image src={acf.image_main.url} alt={d.name} fill sizes="110px" className="object-cover" />}
              </div>
              <p className="text-[17px] md:text-[18px] font-bold leading-[1.5]">{d.name}</p>
            </div>

            <dl className="mt-5 grid grid-cols-[80px_1fr] md:grid-cols-[110px_1fr] text-[14px] leading-[1.8] [&>dt]:py-3 [&>dd]:py-3 [&>dt]:border-t [&>dd]:border-t [&>dt]:border-dashed [&>dd]:border-dashed [&>dt]:border-brand-line [&>dd]:border-brand-line [&>dt]:font-bold">
              {acf.address && (
                <>
                  <dt>住所</dt>
                  <dd className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    {acf.address}
                    {acf.google_map_url && <MapButton href={acf.google_map_url} small />}
                  </dd>
                </>
              )}
              {acf.tel && <><dt>TEL</dt><dd><a href={`tel:${acf.tel.replace(/[^\d+]/g, '')}`} className="underline underline-offset-2">{acf.tel}</a></dd></>}
              {acf.website_url && (
                <><dt>HP</dt><dd><a href={acf.website_url} target="_blank" rel="noopener noreferrer" className="break-all underline underline-offset-2">{acf.website_url}</a></dd></>
              )}
              {(acf.instagram_url || acf.twitter_url) && (
                <>
                  <dt>SNS</dt>
                  <dd className="flex flex-col gap-1.5">
                    {acf.instagram_url && (
                      <a href={acf.instagram_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:opacity-75">
                        <Image src="/images/top/sns/icon-instagram.svg" alt="" width={18} height={18} />Instagram
                      </a>
                    )}
                    {acf.twitter_url && (
                      <a href={acf.twitter_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:opacity-75">
                        <Image src="/images/top/sns/icon-x.svg" alt="" width={18} height={18} />X（旧Twitter）
                      </a>
                    )}
                  </dd>
                </>
              )}
              {(d.access.main || d.access.sub.length > 0) && (
                <>
                  <dt>アクセス</dt>
                  <dd className="flex flex-col">
                    {d.access.main && <span>{d.access.main}</span>}
                    {d.access.sub.map(line => <AccessTime key={line.from} {...line} />)}
                  </dd>
                </>
              )}
              {featureLabels.length > 0 && (
                <><dt>その他</dt><dd><ul>{featureLabels.map(f => <li key={f}>・{f}</li>)}</ul></dd></>
              )}
              {payments.length > 0 && <><dt>支払い</dt><dd>{payments.join(' / ')}</dd></>}
              {d.hours && <><dt>営業</dt><dd className="whitespace-pre-line">{d.hours}</dd></>}
              {acf.holiday && <><dt>定休日</dt><dd>{acf.holiday}</dd></>}
              {acf.operating_months?.length > 0 && (
                <>
                  <dt>営業月</dt>
                  <dd className="flex flex-col gap-2">
                    <MonthCalendar months={acf.operating_months} />
                    {acf.operating_months_note && <span className="text-[13px] text-brand-brown-sub">{acf.operating_months_note}</span>}
                  </dd>
                </>
              )}
            </dl>
          </section>
        </div>

        {/* ==================== PC サイドバー（営業・アクセス） ==================== */}
        <aside className="hidden md:block">
          <div className="sticky top-[168px] flex flex-col gap-6">
            <div className="rounded-[14px] border border-brand-line bg-brand-store-bg p-6">
              <h2 className="flex items-baseline gap-2 font-klee font-semibold text-[22px] leading-none"><span className="[-webkit-text-stroke:0.5px_currentColor]">OPEN</span><span className="font-sans text-[13px] font-bold text-brand-brown-sub">営業</span></h2>
              <div className="mt-4">{hoursBlock}</div>
            </div>
            <div className="rounded-[14px] border border-brand-line bg-brand-store-bg p-6">
              <h2 className="flex items-baseline gap-2 font-klee font-semibold text-[22px] leading-none"><span className="[-webkit-text-stroke:0.5px_currentColor]">ACCESS</span><span className="font-sans text-[13px] font-bold text-brand-brown-sub">アクセス</span></h2>
              <dl className="mt-4 flex flex-col gap-3 text-[14px] leading-[1.8]">
                {acf.tel && <div><dt className="font-bold">TEL</dt><dd><a href={`tel:${acf.tel.replace(/[^\d+]/g, '')}`}>{acf.tel}</a></dd></div>}
                {acf.address && <div><dt className="font-bold">住所</dt><dd>{acf.address}</dd></div>}
                {(d.access.main || d.access.sub.length > 0) && (
                  <div>
                    <dt className="font-bold">アクセス</dt>
                    <dd className="flex flex-col">
                      {d.access.main && <span>{d.access.main}</span>}
                      {d.access.sub.map(line => <AccessTime key={line.from} {...line} />)}
                    </dd>
                  </div>
                )}
              </dl>
              {acf.google_map_url && <div className="mt-4"><MapButton href={acf.google_map_url} /></div>}
            </div>
          </div>
        </aside>
      </div>

      {/* ==================== スイーツで探す ==================== */}
      <section className="bg-brand-gray py-10 md:py-14">
        <div className="max-w-[1080px] mx-auto px-5 md:px-10">
          <h2 className="text-[17px] md:text-[18px] font-bold tracking-[0.32px]">スイーツでお店を探す</h2>
          {/* 枠線なしの白いカード。アイコンは左上にはみ出させる */}
          <ul className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-1.5 md:gap-x-4 md:gap-y-2.5">
            {Object.entries(SWEETS_CATEGORY_MAP).map(([id, name]) => (
              <li key={id} className="pt-3">
                <Link
                  href={`/?sweets=${encodeURIComponent(name)}#store`}
                  className="group relative flex items-center gap-1 h-12 md:h-[52px] pl-[58px] md:pl-[70px] pr-3 bg-white rounded-[14px] shadow-[0_4px_14px_rgba(92,74,42,0.07)] text-[12px] md:text-[14px] font-bold leading-[1.4] whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(92,74,42,0.12)]"
                >
                  <Image
                    src={`/images/sweets/${SWEETS_ICON_MAP[Number(id)]}.svg`}
                    alt=""
                    width={60}
                    height={60}
                    className="absolute left-1.5 md:left-2 -top-[18px] md:-top-5 size-[50px] md:size-[60px] drop-shadow-[0_3px_3px_rgba(92,74,42,0.12)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                  />
                  {name}
                  <Image src="/images/top/icons/arrow-brown.svg" alt="" width={14} height={14} className="hidden md:block ml-auto shrink-0 opacity-40 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ==================== パンくず（ページ最下部） ==================== */}
      <div className="max-w-[1080px] mx-auto px-5 md:px-10 py-4 md:py-5">
        <Breadcrumb
          items={[
            { label: 'TOP', href: '/' },
            ...(d.area ? [{ label: `${d.area}エリア`, href: '/#store' }] : []),
            { label: d.name },
          ]}
        />
      </div>
    </main>
  )
}
