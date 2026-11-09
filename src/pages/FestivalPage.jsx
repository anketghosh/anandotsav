import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Wand2 } from 'lucide-react'
import { getFestival, whenLabel, FESTIVALS } from '../data/festivals'
import { templatesFor } from '../data/templates'
import { Motif } from '../templates/motifs'
import TemplateGallery from '../components/TemplateGallery'
import { useSeo } from '../lib/useSeo'
import { NotFound } from './InfoPages'

export default function FestivalPage() {
  const { id } = useParams()
  const f = getFestival(id)
  useSeo({
    title: f ? `Free ${f.name} Greeting Cards with Name – Personalised ${f.name} Wishes` : 'Festival not found',
    description: f
      ? `Create personalised ${f.name} greeting cards with your name for free. ${templatesFor(f.id).length} premium designs, live preview, HD PNG download and WhatsApp sharing. No sign-up.`
      : '',
    keywords: f?.keywords,
  })
  if (!f) return <NotFound />
  const p = f.palette
  const templates = templatesFor(f.id)

  return (
    <>
      <section className="relative overflow-hidden text-white" style={{ background: `radial-gradient(110% 120% at 80% 30%, ${p.rich} 0%, ${p.deep} 70%)` }}>
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 sm:px-6 md:grid-cols-[1fr_320px] md:py-20">
          <div className="animate-fade-up">
            <Link to="/#festivals" className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white">
              <ArrowLeft className="size-4" /> All festivals
            </Link>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em]" style={{ color: p.gold }}>
              {f.tagline} · {whenLabel(f.date)}
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-6xl">Personalised {f.name} Greeting Cards</h1>
            <p className="mt-4 max-w-xl text-white/75">
              Choose a design below, add your name and download a beautiful {f.name} greeting in HD — free, with no watermark.
            </p>
            <Link to={`/create/${templates[0].id}`} className="btn mt-8 bg-white !px-7 !py-4 text-ink hover:-translate-y-0.5">
              <Wand2 className="size-5" /> Quick start
            </Link>
          </div>
          <div className="animate-float-c mx-auto hidden w-64 md:block">
            <Motif festival={f} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand">Step 2 · Pick a design</p>
        <h2 className="mb-8 mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {templates.length} {f.name} templates
        </h2>
        <TemplateGallery templates={templates} showFestivalFilter={false} pageSize={12} />
      </section>

      <section className="mx-auto max-w-3xl px-4 pt-20 sm:px-6">
        <h2 className="font-display text-2xl font-semibold">How to make a {f.name} greeting card with your name</h2>
        <p className="mt-3 leading-relaxed text-muted">
          Pick any of the {f.name} designs above, type your name (or your family’s name) and watch the card update instantly. You can change the
          greeting message, choose a different font or text colour, move the text and then download a high-quality PNG image — perfect for
          WhatsApp, Instagram and Facebook. Anandotsav is completely free: no login, no watermark and no app to install.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {FESTIVALS.filter((x) => x.id !== f.id).map((x) => (
            <Link key={x.id} to={`/festival/${x.id}`} className="chip">
              {x.name}
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
