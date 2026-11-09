import TemplateGallery from '../components/TemplateGallery'
import { TEMPLATES } from '../data/templates'
import { useSeo } from '../lib/useSeo'

export default function TemplatesPage() {
  useSeo({
    title: 'All Festival Greeting Templates',
    description: `Browse ${TEMPLATES.length}+ free festival greeting card templates — Traditional, Modern, Luxury and Minimal designs. Personalise with your name and download in HD.`,
  })
  return (
    <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
      <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">Greeting template library</h1>
      <p className="mb-10 mt-3 max-w-xl text-muted">{TEMPLATES.length} designs across every celebration. Filter by style or festival, then tap any card to personalise it.</p>
      <TemplateGallery templates={TEMPLATES} pageSize={16} />
    </section>
  )
}
