import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Motif } from '../templates/motifs'
import { whenLabel, daysUntil } from '../data/festivals'
import { templatesFor } from '../data/templates'

export default function FestivalCard({ festival: f }) {
  const p = f.palette
  const d = daysUntil(f.date)
  return (
    <Link
      to={`/festival/${f.id}`}
      className="group relative flex aspect-[4/5] flex-col overflow-hidden rounded-3xl p-4 text-white card-shadow transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl sm:p-5"
      style={{ background: `radial-gradient(120% 90% at 50% 20%, ${p.rich} 0%, ${p.deep} 85%)` }}
    >
      <div className="flex items-start justify-between">
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur ${d !== null && d <= 30 ? 'bg-white text-ink' : 'bg-white/15'}`}>
          {whenLabel(f.date)}
        </span>
        <span className="grid size-8 place-items-center rounded-full bg-white/15 transition group-hover:bg-white group-hover:text-ink">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
      <div className="mx-auto my-auto w-[68%] transition duration-500 group-hover:scale-110">
        <Motif festival={f} />
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold leading-tight sm:text-2xl">{f.name}</h3>
        <p className="mt-0.5 text-xs text-white/70">
          {f.tagline} · {templatesFor(f.id).length} designs
        </p>
      </div>
    </Link>
  )
}
