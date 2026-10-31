export default function AboutSection() {
  return (
    /* -mt でヒーロー下部の白い曲線と重ねる（Figma: ヒーロー 468px / 紹介文 450px〜） */
    <section className="relative z-10 -mt-[27px] md:-mt-[18px]">
      <div className="max-w-[620px] mx-auto px-5 text-center pb-10 md:pb-[54px]">
        <h2 className="font-black text-[18px] md:text-[22px] leading-[40.7px] tracking-[1.32px] text-brand-brown-main">
          「 妙高スイーツ 」では
        </h2>
        <p className="mt-1 text-[13px] md:text-[16px] leading-[2] md:leading-[31.45px] tracking-[0.32px] text-brand-brown-main">
          妙高高原・野尻湖エリアの飲食店のおすすめスイーツと
          <br className="md:hidden" />
          観光スポットなど
          <br className="hidden md:block" />
          妙高の魅力を
          <br className="md:hidden" />
          スイーツ好き地元民が案内しています！
        </p>
      </div>
    </section>
  )
}
