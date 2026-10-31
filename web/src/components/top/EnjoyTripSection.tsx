import Image from 'next/image'
import Link from 'next/link'

// SP 用の写真（2段×3枚。Figma のコラージュに使われている元画像）
const SP_ROWS = [
  [
    { src: '/images/top/enjoy/enjoy-1.jpg', alt: 'スキー場でスノーボード' },
    { src: '/images/top/enjoy/enjoy-2.jpg', alt: '湖面に映る妙高の山' },
    { src: '/images/top/enjoy/enjoy-3.jpg', alt: '苗名滝' },
  ],
  [
    { src: '/images/top/enjoy/enjoy-4.jpg', alt: '野尻湖でSUP' },
    { src: '/images/top/enjoy/enjoy-5.jpg', alt: '高原でキャンプ' },
    { src: '/images/top/enjoy/enjoy-6.jpg', alt: '日帰り温泉' },
  ],
]

function Heading() {
  return (
    <>
      <h2 className="font-klee font-semibold text-[40px] md:text-[42px] leading-[1.4] md:leading-[77.7px] tracking-[0.5px] text-brand-brown-main">
        Enjoy TRIP
      </h2>
      <p className="md:pt-2 text-[18px] md:text-[20px] font-bold leading-[1.7] md:leading-[37px] tracking-[0.32px] text-brand-brown-main">
        妙高高原・野尻湖を
        <br className="md:hidden" />
        どう楽しむ？
      </p>
    </>
  )
}

function Lead() {
  return (
    <p className="text-[14px] md:text-[16px] font-bold leading-[27.75px] tracking-[0.32px] text-brand-brown-sub">
      わたしが推めるスポットや日帰り温泉、
      <br />
      お土産・映えスポットなど案内します！
    </p>
  )
}

function ViewMore() {
  return (
    <Link
      href="/spots"
      className="relative flex items-center w-[139px] h-12 pl-6 bg-white border border-brand-beige rounded-full text-[14px] font-bold tracking-[0.32px] text-brand-brown-main transition-colors hover:bg-brand-ivory"
    >
      view more
      <Image src="/images/top/icons/arrow-brown.svg" alt="" width={16} height={16} className="absolute left-[97px]" />
    </Link>
  )
}

export default function EnjoyTripSection() {
  return (
    <section className="relative py-12 md:py-20">

      {/* ==================== SP：見出し → 写真2段 → 本文 ==================== */}
      <div className="relative isolate md:hidden">
        {/* グレー背景：見出しの中ほど〜ボタンの中ほど、左端から右に余白を残す */}
        <div aria-hidden="true" className="absolute -z-10 left-0 right-7 top-[18px] bottom-[17px] bg-brand-gray" />

        <div className="px-5 text-center">
          <Heading />
        </div>

        {/* 1段目は左寄せ、2段目は右寄せで互い違いに */}
        <div className="mt-6 flex flex-col gap-3">
          {SP_ROWS.map((row, r) => (
            <div key={r} className={`grid grid-cols-3 gap-[3px] w-[88%] ${r === 0 ? 'mr-auto' : 'ml-auto'}`}>
              {row.map(photo => (
                <div key={photo.src} className="relative aspect-[5/6] overflow-hidden bg-brand-ivory">
                  <Image src={photo.src} alt={photo.alt} fill sizes="30vw" className="object-cover" />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="relative mt-6 px-5 flex flex-col items-center gap-5 text-center">
          <Lead />
          <ViewMore />
          <Image
            src="/images/top/icons/mountain-line.svg"
            alt=""
            width={96}
            height={32}
            className="absolute right-3 -bottom-9"
          />
        </div>
      </div>

      {/* ==================== PC：コラージュ ＋ テキスト ==================== */}
      {/* 右側のグレー背景（Figma: x=513〜, y=136〜445） */}
      <div aria-hidden="true" className="hidden md:block absolute right-0 top-[136px] w-[64.4%] h-[309px] bg-brand-gray" />

      <div className="relative hidden md:flex items-center gap-[5.5%]">
        <div className="flex flex-col gap-[18px] w-[63.2%] shrink-0">
          <div className="relative aspect-[910/320] overflow-hidden bg-white">
            <Image
              src="/images/top/enjoy/enjoy-collage.png"
              alt="妙高高原・野尻湖のアクティビティ（スノーボード・滝・湖・SUP・キャンプ・温泉）"
              width={1805}
              height={871}
              sizes="63vw"
              className="absolute max-w-none left-[-0.88%] top-[-17.8%] w-[100.9%] h-[138.4%]"
            />
          </div>
          <div aria-hidden="true" className="flex gap-[7px] px-10">
            <span className="h-[5px] w-[30px] rounded-[3px] bg-brand-brown-main" />
            <span className="h-[5px] w-[22px] rounded-[3px] bg-brand-beige" />
            <span className="h-[5px] w-[22px] rounded-[3px] bg-brand-beige" />
          </div>
        </div>

        <div className="relative flex flex-col gap-[9.4px] pb-10 max-w-[451px]">
          <Heading />
          <div className="pb-[14.6px]">
            <Lead />
          </div>
          <ViewMore />
          <Image
            src="/images/top/icons/mountain-line.svg"
            alt=""
            width={154}
            height={51}
            className="absolute left-[245px] top-[260px]"
          />
        </div>
      </div>
    </section>
  )
}
