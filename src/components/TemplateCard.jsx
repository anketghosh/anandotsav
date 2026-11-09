import { Link } from 'react-router-dom'
import { Wand2 } from 'lucide-react'
import { ScaledCard } from '../templates/CardRenderer'
import { getFestival } from '../data/festivals'

const SAMPLE = { name: 'The Sharma Family' }

export default function TemplateCard({ template, badge }) {
  const f = getFestival(template.festivalId)
  return (
    <Link to={`/create/${template.id}`} className="group block" aria-label={`Customise ${template.name}`}>
      <div className="relative overflow-hidden rounded-2xl bg-cream card-shadow transition duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
        <ScaledCard template={template} data={SAMPLE} />
        <div className="absolute inset-x-0 bottom-0 hidden justify-center bg-gradient-to-t from-black/60 to-transparent p-4 pt-16 opacity-0 transition duration-300 group-hover:opacity-100 md:flex">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink shadow-lg">
            <Wand2 className="size-4" /> Customise
          </span>
        </div>
        {badge && <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-ink shadow">{badge}</span>}
      </div>
      <div className="mt-3 flex items-start justify-between gap-2 px-1">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold">{template.name}</h3>
          <p className="text-xs text-muted">{f.name}</p>
        </div>
        <span className="shrink-0 rounded-full bg-cream px-2.5 py-1 text-[11px] font-medium text-ink/70">{template.category}</span>
      </div>
    </Link>
  )
}
