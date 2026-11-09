import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Search, ArrowRight, Download, MessageCircle, BadgeCheck, Zap, ShieldCheck, Wand2, CalendarHeart, LayoutTemplate, PenLine, Eye, Share2 } from 'lucide-react'
import { ScaledCard } from '../templates/CardRenderer'
import FestivalCard from '../components/FestivalCard'
import TemplateCard from '../components/TemplateCard'
import TemplateGallery from '../components/TemplateGallery'
import { FESTIVALS, upcomingFestivals, whenLabel, daysUntil } from '../data/festivals'
import { TEMPLATES, getTemplate, trendingTemplates } from '../data/templates'
import { useSeo } from '../lib/useSeo'
import { FollowCard } from '../components/AnketBrand'

const HERO_SAMPLE = { name: 'The Sharma Family' }

function Hero() {
  const next = upcomingFestivals()[0]
  const center = getTemplate(`${next.id}-${next.archetypes[0]}`)
  const left = getTemplate(`${next.id}-${next.archetypes[1]}`)
  const right = getTemplate('holi-burst')
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-40 right-[-10%] size-[620px] rounded-full bg-[radial-gradient(circle,rgba(242,193,78,.35),transparent_65%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-40 size-[520px] rounded-full bg-[radial-gradient(circle,rgba(122,29,95,.16),transparent_65%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pb-24 lg:pt-20">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-ink/80 ring-1 ring-ink/10">
            <Sparkles className="size-3.5 text-gold" /> {TEMPLATES.length}+ free designs · {FESTIVALS.length} celebrations
          </span>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Make Every Festival <span className="text-gradient italic">Personal!</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Create beautiful personalised festival greetings in seconds. Add your name, download and share.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#festivals" className="btn-brand !px-7 !py-4 !text-base">
              <Wand2 className="size-5" /> Create Your Greeting
            </a>
            <Link to={`/festival/${next.id}`} className="btn-ghost !px-6 !py-4 !text-base">
              {next.name} designs <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="mt-10 grid max-w-lg grid-cols-2 gap-3 text-sm text-ink/80 sm:grid-cols-4">
            {[
              [BadgeCheck, 'Free forever'],
              [ShieldCheck, 'No sign-up'],
              [Download, 'HD PNG'],
              [Zap, 'No watermark'],
            ].map(([Icon, label]) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="size-4 text-brand" /> {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto h-[420px] w-full max-w-[520px] sm:h-[520px]" aria-label="Sample greeting cards">
          <div className="animate-float-a absolute left-0 top-12 w-[44%] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
            <ScaledCard template={left} data={HERO_SAMPLE} lazy={false} />
          </div>
          <div className="animate-float-b absolute right-0 top-16 w-[44%] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
            <ScaledCard template={right} data={HERO_SAMPLE} lazy={false} />
          </div>
          <div className="animate-float-c absolute left-1/2 top-0 z-10 w-[54%] -translate-x-1/2 overflow-hidden rounded-2xl shadow-[0_40px_80px_-20px_rgba(60,10,50,.5)] ring-1 ring-black/5">
            <ScaledCard template={center} data={HERO_SAMPLE} lazy={false} />
          </div>
          <div className="absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-2xl bg-white px-4 py-3 text-sm shadow-xl ring-1 ring-ink/5">
            <span className="grid size-9 place-items-center rounded-full bg-brand/10 text-brand">
              <PenLine className="size-4" />
            </span>
            <span>
              <span className="block text-xs text-muted">Your name, beautifully placed</span>
              <span className="font-semibold">“The Sharma Family”</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function UpcomingBanner() {
  const f = upcomingFestivals()[0]
  const d = daysUntil(f.date)
  if (d === null || d > 45) return null
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <Link
        to={`/festival/${f.id}`}
        className="group flex flex-col items-start justify-between gap-4 rounded-3xl p-6 text-white card-shadow sm:flex-row sm:items-center sm:p-8"
        style={{ background: `linear-gradient(110deg, ${f.palette.deep}, ${f.palette.rich} 60%, ${f.palette.warm})` }}
      >
        <div className="flex items-center gap-4">
          <span className="grid size-12 place-items-center rounded-2xl bg-white/15">
            <CalendarHeart className="size-6" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/70">Coming up · {whenLabel(f.date)}</p>
            <p className="font-display text-2xl font-semibold sm:text-3xl">{f.title} — send your wishes first</p>
          </div>
        </div>
        <span className="btn bg-white text-ink group-hover:-translate-y-0.5">
          Create {f.name} greeting <ArrowRight className="size-4" />
        </span>
      </Link>
    </div>
  )
}

function Festivals() {
  const [q, setQ] = useState('')
  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return upcomingFestivals().filter((f) => !s || `${f.name} ${f.tagline} ${f.title}`.toLowerCase().includes(s))
  }, [q])
  return (
    <section id="festivals" className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-20 sm:px-6">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">Step 1</p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Choose your celebration</h2>
          <p className="mt-3 max-w-lg text-muted">Every festival has its own palette, artwork and mood — sorted by what’s coming up next.</p>
        </div>
        <label className="relative w-full md:w-80">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <span className="sr-only">Search festivals</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search festivals… e.g. Holi"
            className="w-full rounded-full bg-white py-3.5 pl-11 pr-4 text-sm outline-none ring-1 ring-ink/10 focus:ring-2 focus:ring-brand/40"
          />
        </label>
      </div>
      {list.length ? (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {list.map((f) => (
            <FestivalCard key={f.id} festival={f} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-3xl bg-white p-10 text-center text-muted ring-1 ring-ink/5">
          No festival found. Try <Link className="font-semibold text-brand" to="/festival/celebrations">Other Celebrations</Link> — you can edit the heading to anything.
        </p>
      )}
    </section>
  )
}

function HowItWorks() {
  const steps = [
    [CalendarHeart, 'Select a festival', 'Pick from Diwali, Holi, Eid, Christmas and more.'],
    [LayoutTemplate, 'Pick a design', 'Traditional, Modern, Luxury or Minimal.'],
    [PenLine, 'Enter your name', 'It’s placed beautifully into the card.'],
    [Eye, 'Preview live', 'Tweak message, font, colour and position.'],
    [Share2, 'Download & share', 'HD PNG or straight to WhatsApp.'],
  ]
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-24 sm:px-6">
      <div className="rounded-[2rem] bg-ink px-6 py-14 text-white sm:px-12">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Ready in under <span className="text-gold italic">30 seconds</span>
          </h2>
          <p className="max-w-sm text-white/60">No account, no app, no payment. Everything happens privately in your browser.</p>
        </div>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map(([Icon, title, text], i) => (
            <li key={title} className="relative rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
              <span className="absolute right-4 top-4 font-display text-3xl text-white/15">{i + 1}</span>
              <Icon className="size-6 text-gold" />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-white/60">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Trending() {
  const list = useMemo(() => trendingTemplates(4), [])
  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">Trending now</p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Recently popular</h2>
        </div>
        <Link to="/templates" className="hidden items-center gap-1.5 text-sm font-semibold text-brand hover:underline sm:inline-flex">
          View all <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
        {list.map((t, i) => (
          <TemplateCard key={t.id} template={t} badge={i === 0 ? '🔥 Most loved' : null} />
        ))}
      </div>
    </section>
  )
}

const FAQ = [
  ['Is Anandotsav really free?', 'Yes. Every template, every download and every share is 100% free. There is no watermark, no subscription and no sign-up.'],
  ['How do I make a Diwali greeting card with my name?', 'Choose Diwali, pick any design, type your name and press “Download Greeting”. You get a high-resolution PNG in seconds.'],
  ['Can I share my greeting on WhatsApp?', 'Absolutely. On mobile, “Share on WhatsApp” attaches the image directly. On desktop the image downloads and WhatsApp opens with a ready-made message.'],
  ['Is my name stored anywhere?', 'No. Your card is generated entirely inside your browser. Nothing is uploaded to any server.'],
  ['What size are the downloaded images?', 'Cards download as crisp 2160 × 2700 px PNGs (4:5) — perfect for WhatsApp, Instagram, Facebook and printing.'],
]

function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-4 pt-24 sm:px-6">
      <h2 className="text-center font-display text-4xl font-semibold tracking-tight">Questions, answered</h2>
      <div className="mt-10 divide-y divide-ink/10 rounded-3xl bg-white px-6 ring-1 ring-ink/5">
        {FAQ.map(([q, a]) => (
          <details key={q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
              {q}
              <span className="text-xl text-muted transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted">{a}</p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
          }),
        }}
      />
    </section>
  )
}

export default function Home() {
  useSeo({
    title: '',
    description:
      'Free festival greeting card maker. Create personalised Diwali, Holi, Eid, Christmas, New Year and more greeting cards with your name. Download HD PNG and share on WhatsApp — no sign-up, no watermark.',
  })
  return (
    <>
      <Hero />
      <UpcomingBanner />
      <Festivals />
      <HowItWorks />
      <Trending />
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand">Template library</p>
        <h2 className="mb-8 mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Popular greeting templates</h2>
        <TemplateGallery templates={TEMPLATES} pageSize={8} />
      </section>
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-8 rounded-[2rem] bg-gradient-to-br from-[#2b0a24] via-[#5a1245] to-[#7a1d5f] p-8 text-white sm:p-12 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">Your wishes deserve better than a forwarded image.</h2>
            <p className="mt-3 text-white/70">Send a card with your own name on it — it takes less time than finding a sticker.</p>
          </div>
          <a href="#festivals" className="btn bg-white !px-7 !py-4 text-ink">
            <MessageCircle className="size-5" /> Start creating
          </a>
        </div>
      </section>
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <FollowCard source="home" />
      </section>
      <Faq />
    </>
  )
}
