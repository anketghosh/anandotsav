import { FESTIVALS, getFestival, daysUntil } from './festivals'

/** Design archetypes – see src/templates/layouts.jsx */
export const ARCHETYPES = {
  traditional: { label: 'Traditional', category: 'Traditional', blurb: 'Ornate gold frame, mandala and rich festive tones' },
  royal: { label: 'Royal', category: 'Luxury', blurb: 'Gold on jewel tones inside a palace arch' },
  modern: { label: 'Modern', category: 'Modern', blurb: 'Bold editorial typography and colour blocks' },
  minimal: { label: 'Minimal', category: 'Minimal', blurb: 'Airy ivory layout with refined serif type' },
  family: { label: 'Family', category: 'Traditional', blurb: 'Warm and welcoming, with hanging festive décor' },
  corporate: { label: 'Corporate', category: 'Minimal', blurb: 'Elegant greeting for colleagues and clients' },
  burst: { label: 'Festive', category: 'Modern', blurb: 'Joyful sunburst bursting with confetti' },
}

export const CATEGORIES = ['All', 'Traditional', 'Modern', 'Luxury', 'Minimal']

export const TEMPLATES = FESTIVALS.flatMap((f, fi) =>
  f.archetypes.map((a, ai) => ({
    id: `${f.id}-${a}`,
    festivalId: f.id,
    archetype: a,
    name: `${ARCHETYPES[a].label} ${f.id === 'celebrations' ? 'Celebration' : f.name}`,
    category: ARCHETYPES[a].category,
    description: ARCHETYPES[a].blurb,
    basePopularity: 100 - ai * 9 - fi * 2,
  })),
)

export const getTemplate = (id) => TEMPLATES.find((t) => t.id === id)
export const templatesFor = (festivalId) => TEMPLATES.filter((t) => t.festivalId === festivalId)

/* ── "Recently popular": seed popularity + this browser's downloads + festival proximity ── */
const KEY = 'fws:downloads'
export const getLocalCounts = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || {} } catch { return {} }
}
export function recordDownload(id) {
  const c = getLocalCounts()
  c[id] = (c[id] || 0) + 1
  try { localStorage.setItem(KEY, JSON.stringify(c)) } catch { /* private mode */ }
}
export function trendingTemplates(limit = 8) {
  const local = getLocalCounts()
  const score = (t) => {
    const d = daysUntil(getFestival(t.festivalId).date)
    const soon = d === null ? 0 : Math.max(0, 120 - d) * 1.5
    return t.basePopularity + soon + (local[t.id] || 0) * 25
  }
  return [...TEMPLATES].sort((a, b) => score(b) - score(a)).slice(0, limit)
}
