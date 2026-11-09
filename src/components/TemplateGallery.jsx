import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import TemplateCard from './TemplateCard'
import { CATEGORIES } from '../data/templates'
import { FESTIVALS, getFestival } from '../data/festivals'

/** Filterable template grid (category chips, optional festival filter + search). */
export default function TemplateGallery({ templates, showFestivalFilter = true, pageSize = 12 }) {
  const [cat, setCat] = useState('All')
  const [fest, setFest] = useState('all')
  const [q, setQ] = useState('')
  const [limit, setLimit] = useState(pageSize)

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return templates.filter(
      (t) =>
        (cat === 'All' || t.category === cat) &&
        (fest === 'all' || t.festivalId === fest) &&
        (!s || `${t.name} ${getFestival(t.festivalId).name} ${t.category}`.toLowerCase().includes(s)),
    )
  }, [templates, cat, fest, q])

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:px-0" role="tablist" aria-label="Design category">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={cat === c}
              onClick={() => {
                setCat(c)
                setLimit(pageSize)
              }}
              className={`chip shrink-0 ${cat === c ? 'chip-active' : ''}`}
            >
              {c}
            </button>
          ))}
        </div>
        {showFestivalFilter && (
          <div className="flex gap-2">
            <label className="relative flex-1 lg:w-56">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <span className="sr-only">Search templates</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search designs…"
                className="w-full rounded-full bg-white py-2.5 pl-10 pr-4 text-sm outline-none ring-1 ring-ink/10 focus:ring-2 focus:ring-brand/40"
              />
            </label>
            <select
              value={fest}
              onChange={(e) => setFest(e.target.value)}
              aria-label="Filter by festival"
              className="rounded-full bg-white px-4 py-2.5 text-sm outline-none ring-1 ring-ink/10 focus:ring-2 focus:ring-brand/40"
            >
              <option value="all">All festivals</option>
              {FESTIVALS.map((f) => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {list.length === 0 ? (
        <p className="py-16 text-center text-muted">No designs match — try another filter.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
          {list.slice(0, limit).map((t) => (
            <TemplateCard key={t.id} template={t} />
          ))}
        </div>
      )}
      {list.length > limit && (
        <div className="mt-10 text-center">
          <button className="btn-ghost" onClick={() => setLimit((l) => l + pageSize)}>
            Show more designs ({list.length - limit})
          </button>
        </div>
      )}
    </div>
  )
}
