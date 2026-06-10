export default function HomePage() {
  return (
    <main>
      {/* 仮MV（470px・スクロール確認用） */}
      <div
        className="w-full h-hero"
        style={{ background: 'linear-gradient(180deg, #EEF4F7 0%, #F5F0E8 100%)' }}
      />

      {/* 仮コンテンツ（スクロール確認用） */}
      <div className="py-20 flex flex-col items-center gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="w-full max-w-content mx-auto px-5 h-16 bg-brand-ivory rounded-lg"
          />
        ))}
      </div>
    </main>
  )
}
