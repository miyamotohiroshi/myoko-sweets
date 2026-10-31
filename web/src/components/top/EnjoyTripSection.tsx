import Image from 'next/image'
import Link from 'next/link'

export default function EnjoyTripSection() {
  return (
    <section className="relative py-12 md:py-20">
      {/* 右側のグレー背景（Figma: x=513〜, y=136〜445） */}
      <div aria-hidden="true" className="absolute right-0 bottom-12 md:bottom-auto md:top-[136px] w-full md:w-[64.4%] h-[300px] md:h-[309px] bg-brand-gray" />

      <div className="relative flex flex-col md:flex-row md:items-center gap-8 md:gap-[5.5%]">
        {/* ---- コラージュ写真 ---- */}
        <div className="flex flex-col gap-[18px] md:w-[63.2%] shrink-0">
          <div className="relative aspect-[910/320] overflow-hidden bg-white">
            <Image
              src="/images/top/enjoy/enjoy-collage.png"
              alt="妙高高原・野尻湖のアクティビティ（スノーボード・滝・湖・SUP・キャンプ・温泉）"
              width={1805}
              height={871}
              sizes="(max-width: 767px) 100vw, 63vw"
              className="absolute max-w-none left-[-0.88%] top-[-17.8%] w-[100.9%] h-[138.4%]"
            />
          </div>
          <div aria-hidden="true" className="flex gap-[7px] px-5 md:px-10">
            <span className="h-[5px] w-[30px] rounded-[3px] bg-brand-brown-main" />
            <span className="h-[5px] w-[22px] rounded-[3px] bg-brand-beige" />
            <span className="h-[5px] w-[22px] rounded-[3px] bg-brand-beige" />
          </div>
        </div>

        {/* ---- テキスト ---- */}
        <div className="relative flex flex-col gap-[9.4px] px-5 md:px-0 pb-10 md:max-w-[451px]">
          <h2 className="font-klee font-semibold text-[34px] md:text-[42px] leading-[1.6] md:leading-[77.7px] tracking-[0.5px] text-brand-brown-main">
            Enjoy TRIP
          </h2>
          <p className="pt-2 text-[18px] md:text-[20px] font-bold leading-[37px] tracking-[0.32px] text-brand-brown-main">
            妙高高原・野尻湖をどう楽しむ？
          </p>
          <p className="pb-[14.6px] text-[14px] md:text-[16px] font-bold leading-[27.75px] tracking-[0.32px] text-brand-brown-sub">
            わたしが推めるスポットや日帰り温泉、
            <br />
            お土産・映えスポットなど案内します！
          </p>
          <Link
            href="/spots"
            className="relative flex items-center w-[139px] h-12 pl-6 bg-white border border-brand-beige rounded-full text-[14px] font-bold tracking-[0.32px] text-brand-brown-main transition-colors hover:bg-brand-ivory"
          >
            view more
            <Image src="/images/top/icons/arrow-brown.svg" alt="" width={16} height={16} className="absolute left-[97px]" />
          </Link>
          <Image
            src="/images/top/icons/mountain-line.svg"
            alt=""
            width={154}
            height={51}
            className="absolute right-5 md:right-auto md:left-[245px] bottom-6 md:bottom-auto md:top-[260px]"
          />
        </div>
      </div>
    </section>
  )
}
