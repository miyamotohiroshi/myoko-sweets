'use client'

import { useState } from 'react'
import Image from 'next/image'

type MenuItem = { name: string; price: string }
type MenuGroup = { label: string; items: MenuItem[] }

// 折りたたみ時に各グループで表示する件数
const COLLAPSED_COUNT = 3

/** メニュー表（スイーツ / ドリンク / 食事・他）。件数が多いグループは「すべて表示」で展開 */
export default function ShopMenu({ groups }: { groups: MenuGroup[] }) {
  const [open, setOpen] = useState<Record<string, boolean>>({})

  return (
    <div className="flex flex-col">
      {groups.map(group => {
        const isOpen = open[group.label]
        const items = isOpen ? group.items : group.items.slice(0, COLLAPSED_COUNT)
        const hasMore = group.items.length > COLLAPSED_COUNT
        return (
          <div key={group.label} className="border-b border-dashed border-brand-line py-5">
            <div className="grid grid-cols-[84px_1fr] md:grid-cols-[120px_1fr] gap-x-4">
              <h3 className="text-[14px] md:text-[15px] font-bold leading-[1.9]">{group.label}</h3>
              <ul className="flex flex-col gap-2 border-l border-brand-line pl-4">
                {items.map((item, i) => (
                  <li key={`${item.name}-${i}`} className="flex flex-col md:flex-row md:items-baseline md:justify-between md:gap-4 text-[14px] md:text-[15px] leading-[1.7]">
                    <span>・{item.name}</span>
                    {item.price && <span className="pl-3 md:pl-0 shrink-0 text-brand-brown-sub">{item.price}</span>}
                  </li>
                ))}
              </ul>
            </div>
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
          </div>
        )
      })}
    </div>
  )
}
