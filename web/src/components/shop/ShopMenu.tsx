'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { MenuItem } from '@/lib/utils'

type MenuGroup = {
  label:    string
  items:    MenuItem[]
  limited?: MenuItem[]  // 季節限定・月替り（スイーツのみ）
}

// 折りたたみ時に各グループで表示する件数（定番メニュー）
const COLLAPSED_COUNT = 3

// 商品名の末尾の（…）は補足として小さく出す（例：なごみブレンド（Hot / Iced））
function splitName(name: string): { main: string; sub: string } {
  const m = name.match(/^(.+?)[（(]([^（）()]+)[）)]$/)
  return m ? { main: m[1].trim(), sub: m[2].trim() } : { main: name, sub: '' }
}

/** 商品名（太め）と価格（右寄せ・太字）を同じ行に並べる。補足は商品名の下に小さく */
function ItemRow({ item, tag }: { item: MenuItem; tag?: string }) {
  const { main, sub } = splitName(item.name)
  return (
    <li className="flex items-baseline justify-between gap-3 py-2 [&+li]:border-t [&+li]:border-dotted [&+li]:border-brand-line">
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {tag && <span className="rounded-full bg-brand-green/70 px-2 py-0.5 text-[11px] font-bold leading-[1.5]">{tag}</span>}
          <span className="text-[14px] md:text-[15px] font-bold leading-[1.6]">{main}</span>
        </span>
        {sub && <span className="block text-[12px] leading-[1.6] text-brand-brown-sub">{sub}</span>}
      </span>
      {item.price && <span className="shrink-0 text-[14px] md:text-[15px] font-bold tabular-nums text-brand-brown-main">{item.price}</span>}
    </li>
  )
}

/** 季節限定・月替りの枠（時期のラベル付き） */
function LimitedBox({ items }: { items: MenuItem[] }) {
  return (
    <div className="mt-4 rounded-[12px] bg-brand-store-bg px-4 py-3.5">
      <p className="flex items-center gap-1.5 text-[13px] font-bold">
        <Image src="/images/top/icons/spark-1.svg" alt="" width={14} height={14} />
        季節限定・月替り
      </p>
      <ul className="mt-1.5 flex flex-col">
        {items.map((item, i) => <ItemRow key={`${item.name}-${i}`} item={item} tag={item.note} />)}
      </ul>
      <p className="mt-2.5 text-[11px] leading-[1.7] text-brand-brown-sub">
        ※時期によって内容が変わります。最新情報はお店のSNSなどでご確認ください
      </p>
    </div>
  )
}

/** メニュー表（スイーツ / ドリンク / 食事・他）。スイーツは定番と季節限定・月替りに分けて表示 */
export default function ShopMenu({ groups }: { groups: MenuGroup[] }) {
  const [open, setOpen] = useState<Record<string, boolean>>({})

  return (
    <div className="flex flex-col">
      {groups.map(group => {
        const isOpen = open[group.label]
        const items = isOpen ? group.items : group.items.slice(0, COLLAPSED_COUNT)
        const hasMore = group.items.length > COLLAPSED_COUNT
        const limited = group.limited ?? []
        return (
          <div key={group.label} className="border-b border-dashed border-brand-line py-5">
            <div className="grid grid-cols-[56px_1fr] md:grid-cols-[120px_1fr] gap-x-3 md:gap-x-4">
              <h3 className="pt-2 text-[13px] md:text-[15px] font-bold leading-[1.6] text-brand-brown-sub md:text-brand-brown-main">{group.label}</h3>
              <div className="min-w-0 border-l border-brand-line pl-3 md:pl-4">
                {items.length > 0 && (
                  <>
                    {limited.length > 0 && <p className="mb-1.5 text-[12px] font-bold text-brand-brown-sub">定番</p>}
                    <ul className="flex flex-col">
                      {items.map((item, i) => <ItemRow key={`${item.name}-${i}`} item={item} />)}
                    </ul>
                  </>
                )}
                {hasMore && (
                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setOpen(prev => ({ ...prev, [group.label]: !isOpen }))}
                      aria-expanded={isOpen}
                      className="flex items-center gap-1 text-[13px] font-bold text-brand-brown-sub hover:opacity-75"
                    >
                      {isOpen ? '閉じる' : 'すべて表示'}
                      <Image src="/images/top/icons/chev-down.svg" alt="" width={12} height={12} className={isOpen ? 'rotate-180' : ''} />
                    </button>
                  </div>
                )}
                {limited.length > 0 && <LimitedBox items={limited} />}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
