import Image from 'next/image'
import HeroFade from './HeroFade'

// 1440px 基準の座標を % に変換（PC は画面幅に合わせて比率維持）
const pcX = (px: number) => `${(px / 1440) * 100}%`

type Deco = { src: string; w: number; h: number; style: React.CSSProperties; opacity?: number }

// 左の画像（妙高山の景色 → 野尻湖のSUP をフェードで切り替え）
const LEFT_SLIDES = [
  { src: '/images/top/hero-left.png',   alt: '妙高山の景色' },
  { src: '/images/top/hero-left-2.png', alt: '野尻湖でSUPを楽しむ様子' },
]

// Figma（Section - HERO）のデコレーション配置
const PC_DECOS: Deco[] = [
  { src: 'spark-1.svg',   w: 30, h: 30, style: { left: '11.55%', top: 134 }, opacity: 0.8 },
  { src: 'spark-2.svg',   w: 26, h: 26, style: { left: '95.75%', top: 158 }, opacity: 0.85 },
  { src: 'spark-3.svg',   w: 34, h: 34, style: { left: '90.47%', bottom: 130 }, opacity: 0.7 },
  { src: 'heart-1.svg',   w: 22, h: 22, style: { left: '8.47%',  bottom: 130 } },
  { src: 'heart-2.svg',   w: 20, h: 20, style: { left: '69.31%', top: 150 }, opacity: 0.85 },
  { src: 'hero-deco.svg', w: 17, h: 20, style: { left: pcX(970), top: 358 } },
]

const SP_DECOS: Deco[] = [
  { src: 'heart-1.svg',   w: 12, h: 12, style: { left: 24,  top: 108 } },
  { src: 'spark-2.svg',   w: 13, h: 16, style: { left: 181, top: 133 } },
  { src: 'heart-2.svg',   w: 11, h: 11, style: { left: 356, top: 222 } },
  { src: 'spark-1.svg',   w: 14, h: 18, style: { left: 275, top: 254 } },
  { src: 'hero-deco.svg', w: 17, h: 20, style: { left: 370, top: 408 } },
  { src: 'spark-3.svg',   w: 11, h: 14, style: { left: 286, top: 443 } },
]

function Decos({ items }: { items: Deco[] }) {
  return items.map(d => (
    <Image
      key={`${d.src}-${d.w}`}
      src={`/images/top/icons/${d.src}`}
      alt=""
      width={d.w}
      height={d.h}
      className="absolute z-20 pointer-events-none"
      style={{ ...d.style, opacity: d.opacity }}
    />
  ))
}

function Dot({ size, color, style }: { size: number; color: string; style: React.CSSProperties }) {
  return (
    <span
      aria-hidden="true"
      className="absolute z-20 rounded-full"
      style={{ width: size, height: size, background: color, ...style }}
    />
  )
}

function Catch({ className }: { className: string }) {
  return (
    <div className={`absolute z-20 ${className}`}>
      <h1 className="font-black leading-[1.1] tracking-[1.5px] text-brand-brown-main text-[32px] md:text-[clamp(40px,3.34vw,48px)]">
        TRIP <span className="text-brand-green tracking-[-1px]">so</span> Sweets
      </h1>
      <p className="mt-1.5 md:mt-2 font-bold tracking-[0.32px] text-brand-brown-sub text-[15px] md:text-[18px]">
        スイーツで旅を笑顔に
      </p>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden h-[510px] md:h-[468px]">

      {/* 背景（空のグラデーション） */}
      <Image
        src="/images/top/hero-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-top opacity-80 pointer-events-none select-none"
      />

      {/* ===== PC（md 以上）：1440px 基準 ===== */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] hidden md:block">
        <div className="absolute z-10" style={{ left: pcX(261), top: 88, width: pcX(254) }}>
          <HeroFade slides={LEFT_SLIDES} width={254} height={234} priority />
        </div>
        <div className="absolute z-10" style={{ left: pcX(574), top: 88, width: pcX(350) }}>
          <Image src="/images/top/hero-center.png" alt="いちごのショートケーキ" width={350} height={336} priority className="w-full h-auto" />
        </div>
        <div className="absolute z-10" style={{ left: pcX(1005), top: 117, width: pcX(278) }}>
          <Image src="/images/top/hero-right.png" alt="プリン" width={278} height={233} priority className="w-full h-auto" />
        </div>

        <Decos items={PC_DECOS} />
        <Dot size={18} color="#E7E4BD" style={{ left: '2.67%', top: 202 }} />
        <Dot size={16} color="#E5DFAE" style={{ left: '40.69%', top: 145, opacity: 0.8 }} />
        <Dot size={16} color="#E7E4BD" style={{ left: pcX(1226), top: 384, opacity: 0.8 }} />

        <Catch className="left-[23%] top-[308px]" />
      </div>

      {/* ===== SP（md 未満）：390px 基準 ===== */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[390px] md:hidden">
        <div className="absolute z-10" style={{ left: -58, top: 115, width: 307 }}>
          <Image src="/images/top/hero-center.png" alt="いちごのショートケーキ" width={350} height={336} priority className="w-full h-auto" />
        </div>
        <div className="absolute z-10" style={{ left: 234, top: 99, width: 132 }}>
          <Image src="/images/top/hero-right.png" alt="プリン" width={278} height={233} priority className="w-full h-auto" />
        </div>
        <div className="absolute z-10" style={{ left: 236, top: 260, width: 176 }}>
          <HeroFade slides={LEFT_SLIDES} width={254} height={234} priority />
        </div>

        <Decos items={SP_DECOS} />
        <Dot size={8} color="#E7E4BD" style={{ left: 103, top: 92 }} />
        <Dot size={12} color="#E5DFAE" style={{ left: 245, top: 83 }} />

        <Catch className="left-[28px] top-[371px]" />
      </div>

      {/* ===== 下部の白い曲線 ===== */}
      <div className="absolute bottom-0 left-0 right-0 z-10 hidden md:block pointer-events-none">
        <svg viewBox="0 0 1440 164" preserveAspectRatio="none" className="block w-full" height="164" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#hero-curve-pc)">
            <path d="M-47.7142 0C-37.7621 90.9834 233.399 163.911 566.573 164H-48V0H-47.7142Z" fill="white"/>
            <path d="M571 164H567.797C568.865 164 569.933 163.995 571 163.994V164Z" fill="white"/>
            <path d="M1486.73 0C1477.42 90.9834 1223.79 163.911 912.141 164H1487V0H1486.73Z" fill="white"/>
            <path d="M908 164H910.996C909.997 164 908.998 163.995 908 163.994V164Z" fill="white"/>
          </g>
          <defs>
            <clipPath id="hero-curve-pc">
              <rect width="1440" height="164" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-10 md:hidden pointer-events-none">
        <svg viewBox="0 0 390 123" preserveAspectRatio="none" className="block w-full" height="123" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#hero-curve-sp)">
            <path d="M-36.8892 0C-33.0305 67.6827 72.1045 121.934 201.284 122H-37V0H-36.8892Z" fill="white"/>
            <path d="M203 122H201.758C202.172 122 202.586 121.997 203 121.995V122Z" fill="white"/>
            <path d="M425.897 1C422.295 68.6827 324.169 122.934 203.602 123H426V1H425.897Z" fill="white"/>
            <path d="M202 123H203.159C202.773 123 202.386 122.997 202 122.995V123Z" fill="white"/>
          </g>
          <defs>
            <clipPath id="hero-curve-sp">
              <rect width="390" height="123" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </div>

    </section>
  )
}
