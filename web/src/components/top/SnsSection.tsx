import Image from 'next/image'
import { SITE_INFO } from '@/config/site'

const SNS = '/images/top/sns'

// 回転した要素を Figma の中心座標に配置する（左右どちらの端から測るかを指定）
type Placement = { x: number; from: 'left' | 'right'; y: number; w: number; h: number; rot: number }

function placed({ x, from, y, w, h, rot }: Placement): React.CSSProperties {
  return {
    [from]: x - w / 2,
    top: y - h / 2,
    width: w,
    height: h,
    transform: `rotate(${rot}deg)`,
  }
}

const PHOTOS: (Placement & { src: string; inset?: boolean })[] = [
  { src: 'photo-1.png', x: 99.3,   from: 'left',  y: 149.9, w: 182,   h: 207,   rot: -9.43 },
  { src: 'photo-2.png', x: 226.25, from: 'left',  y: 280.3, w: 149.5, h: 155.6, rot: 5.86 },
  { src: 'photo-3.png', x: 119.55, from: 'right', y: 113,   w: 150,   h: 153,   rot: 7.73 },
  { src: 'photo-4.png', x: 153,    from: 'right', y: 294.5, w: 143,   h: 133.6, rot: -6.61, inset: true },
]

const TAPES: (Placement & { src: string })[] = [
  { src: 'tape-1.svg', x: 81.2,   from: 'left',  y: 43.3,  w: 60.5, h: 21.4, rot: -10.49 },
  { src: 'tape-2.svg', x: 242.9,  from: 'left',  y: 200.1, w: 62.2, h: 18.7, rot: 7.72 },
  { src: 'tape-3.svg', x: 103.95, from: 'right', y: 32.05, w: 57.8, h: 18.4, rot: 1.42 },
  { src: 'tape-4.svg', x: 163.4,  from: 'right', y: 224.4, w: 61,   h: 17.8, rot: -4.52 },
]

// シェア先（SNS アカウント開設前なので、ハッシュタグ投稿・ページ共有へのリンク）
const TAG = SITE_INFO.hashtag.replace('#', '')
const SHARE_LINKS = [
  {
    label: 'X でシェア',
    icon:  'icon-x.svg',
    size:  47.66,
    href:  `https://x.com/intent/post?hashtags=${encodeURIComponent(TAG)}&url=${encodeURIComponent(SITE_INFO.url)}`,
  },
  {
    label: 'Instagram で #妙高スイーツ を見る',
    icon:  'icon-instagram.svg',
    size:  47.66,
    href:  `https://www.instagram.com/explore/tags/${encodeURIComponent(TAG)}/`,
  },
  {
    label: 'LINE で送る',
    icon:  'icon-line.svg',
    size:  46,
    href:  `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(SITE_INFO.url)}`,
  },
]

function Line() {
  return <Image src={`${SNS}/line.svg`} alt="" width={30} height={1} className="w-[30px] h-px" />
}

export default function SnsSection() {
  return (
    <section className="px-4 md:px-5 py-12 md:py-[60px]">
      <div className="relative isolate max-w-[1241px] mx-auto overflow-hidden xl:overflow-visible rounded-[16px] px-5 md:px-10 pt-8 pb-10 flex flex-col items-center gap-6 md:gap-7 text-center">
        {/* 背景 */}
        <Image src={`${SNS}/sns-bg.png`} alt="" fill sizes="(max-width: 1280px) 100vw, 1241px" className="object-cover rounded-[16px] -z-10" />
        <div aria-hidden="true" className="absolute inset-0 rounded-[16px] bg-[rgba(255,245,189,0.1)] -z-10" />

        {/* ---- 見出し ---- */}
        <div className="flex flex-col items-center gap-3">
          <p className="flex items-center gap-5 text-[14px] md:text-[16px] font-bold leading-[29.6px] tracking-[0.32px] text-brand-brown-sub">
            <Line />ご協力お願いします<Line />
          </p>
          <h2 className="text-[22px] md:text-[32px] font-medium leading-[1.5] tracking-[0.32px] text-brand-brown-main">
            妙高・野尻湖を盛り上げる
            <br />
            お一人になってくれませんか？
          </h2>
        </div>

        {/* ---- 本文 ---- */}
        <div className="text-[15px] md:text-[18px] font-bold leading-[33.3px] tracking-[0.32px] text-brand-brown-sub">
          <p className="flex flex-wrap items-center justify-center gap-x-3">
            SNSで
            <span className="bg-white rounded-[4px] px-4 py-0.5">#妙高スイーツ</span>
            をつけて
          </p>
          <p>旅の思い出を、みんなで共有してください。</p>
        </div>

        {/* ---- SNS ---- */}
        <div className="flex items-center justify-center gap-4">
          <span className="pr-1.5 font-klee text-[15px] leading-[27.75px] tracking-[0.32px] text-brand-brown-sub">SHARE :</span>
          {SHARE_LINKS.map(sns => (
            <a key={sns.label} href={sns.href} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
              <Image src={`${SNS}/${sns.icon}`} alt={sns.label} width={sns.size} height={sns.size} />
            </a>
          ))}
        </div>

        {/* ---- デコレーション（広い画面のみ。狭い画面では文字と重なるため非表示） ---- */}
        <div aria-hidden="true" className="hidden xl:block">
          <Image src={`${SNS}/leaves.svg`} alt="" width={51} height={44} className="absolute left-[52px] top-[321px]" />
          <Image src={`${SNS}/birds.svg`} alt="" width={80} height={31} className="absolute" style={placed({ x: 252.1, from: 'left', y: 72.8, w: 79.8, h: 31, rot: -9.84 })} />
          <Image src={`${SNS}/trees.svg`} alt="" width={83} height={81} className="absolute right-[248px] top-[328px]" />

          {PHOTOS.map(p => (
            <div
              key={p.src}
              className="absolute overflow-hidden border-[7px] border-white shadow-[1px_3px_6px_0_rgba(100,65,37,0.2)]"
              style={placed(p)}
            >
              <Image src={`${SNS}/${p.src}`} alt="" fill sizes="182px" className="object-cover" />
              {p.inset && <div className="absolute inset-0 shadow-[inset_0_4px_18px_12px_rgba(0,0,0,0.25)]" />}
            </div>
          ))}
          {TAPES.map(t => (
            <Image key={t.src} src={`${SNS}/${t.src}`} alt="" width={t.w} height={t.h} className="absolute" style={placed(t)} />
          ))}
        </div>
      </div>
    </section>
  )
}
