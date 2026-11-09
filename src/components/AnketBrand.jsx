import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, Loader2, Mail, X } from 'lucide-react'
import { BRAND, instagramUrl } from '../config/brand'
import { isValidEmail, subscribeEmail } from '../lib/subscribe'

export function InstagramIcon({ className = 'size-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  )
}

/** anket.ai wordmark: blue square + monochrome name (matches anket.ai site). */
export function AnketMark({ className = '', dark = false }) {
  return (
    <span className={`group/mark inline-flex items-center gap-1.5 font-semibold tracking-tight ${className}`}>
      <span aria-hidden className="inline-block size-2.5 bg-[#2563eb] transition-transform duration-200 group-hover/mark:rotate-45" />
      <span className={dark ? 'text-white' : 'text-[#18181b]'}>{BRAND.name}</span>
    </span>
  )
}

const igGradient = 'linear-gradient(45deg,#feda75,#fa7e1e 25%,#d62976 50%,#962fbf 75%,#4f5bd5)'

/** One-tap follow button – opens the Instagram app on phones, the profile on desktop. */
export function FollowButton({ className = '', label = `Follow @${BRAND.instagram}`, onClick }) {
  return (
    <a
      href={instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`btn text-white shadow-lg shadow-[#d62976]/25 hover:-translate-y-0.5 hover:brightness-105 ${className}`}
      style={{ background: igGradient }}
    >
      <InstagramIcon /> {label}
    </a>
  )
}

/** Thin top strip shown on every page. */
export function BrandStrip() {
  return (
    <div
      className="relative border-b border-brand/10"
      style={{ background: 'linear-gradient(90deg, #f6e9f1 0%, #fcf1e3 50%, #f6e9f1 100%)' }}
    >
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Follow @${BRAND.instagram} on Instagram for AI & Tech updates`}
        className="group mx-auto flex max-w-7xl items-center justify-center gap-2.5 px-4 py-2 text-[12.5px] text-ink/70"
      >
        <span className="grid size-5 shrink-0 place-items-center rounded-md text-white shadow-sm" style={{ background: igGradient }}>
          <InstagramIcon className="size-3" />
        </span>
        <span className="hidden md:inline">Crafted by</span>
        <AnketMark className="text-[12.5px]" />
        <span aria-hidden className="h-3.5 w-px bg-ink/15" />
        <span className="truncate">
          <span className="hidden sm:inline">Fresh </span>AI & Tech updates<span className="hidden sm:inline"> on Instagram</span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white px-3 py-1 text-[11.5px] font-semibold text-brand shadow-sm ring-1 ring-brand/15 transition group-hover:bg-brand group-hover:text-white group-hover:ring-brand">
          Follow<span className="hidden sm:inline"> @{BRAND.instagram}</span>
          <ArrowUpRight className="size-3 transition group-hover:-translate-y-px group-hover:translate-x-px" />
        </span>
      </a>
    </div>
  )
}

/** Optional email signup. Never required to use the site. */
export function SubscribeForm({ source, dark = false, compact = false }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle') // idle | busy | done | error | invalid

  async function submit(e) {
    e.preventDefault()
    if (!isValidEmail(email)) return setState('invalid')
    setState('busy')
    const ok = await subscribeEmail(email, source)
    setState(ok ? 'done' : 'error')
  }

  if (state === 'done')
    return (
      <p className={`flex items-center gap-2 text-sm font-medium ${dark ? 'text-emerald-300' : 'text-emerald-700'}`}>
        <Check className="size-4" /> You’re in! AI & Tech updates are headed your way.
      </p>
    )

  return (
    <form onSubmit={submit} noValidate className="w-full">
      <div className={`flex gap-2 ${compact ? '' : 'flex-col sm:flex-row'}`}>
        <label className="relative flex-1">
          <span className="sr-only">Email address (optional)</span>
          <Mail className={`pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 ${dark ? 'text-white/50' : 'text-muted'}`} />
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (state !== 'idle') setState('idle')
            }}
            placeholder="Your email"
            className={`w-full rounded-full py-3 pl-10 pr-4 text-sm outline-none ring-1 focus:ring-2 ${
              dark ? 'bg-white/10 text-white placeholder:text-white/45 ring-white/15 focus:ring-[#6c9bff]' : 'bg-white ring-ink/10 focus:ring-[#2563eb]/50'
            }`}
          />
        </label>
        <button type="submit" disabled={state === 'busy'} className="btn shrink-0 bg-[#2563eb] text-white hover:bg-[#1d4ed8]">
          {state === 'busy' ? <Loader2 className="size-4 animate-spin" /> : null} Get updates
        </button>
      </div>
      <p className={`mt-2 text-xs ${state === 'invalid' || state === 'error' ? (dark ? 'text-red-300' : 'text-red-600') : dark ? 'text-white/50' : 'text-muted'}`}>
        {state === 'invalid'
          ? 'Please enter a valid email address.'
          : state === 'error'
            ? 'Couldn’t sign you up right now — please try again later.'
            : 'Optional · no spam · unsubscribe anytime.'}
      </p>
    </form>
  )
}

/** Big follow card used on the homepage and footer. */
export function FollowCard({ source = 'home' }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-[#18181b] p-8 text-white sm:p-12">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full opacity-30 blur-3xl" style={{ background: igGradient }} />
      <div className="relative grid items-center gap-10 md:grid-cols-[1.1fr_1fr]">
        <div>
          <AnketMark dark className="text-lg" />
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">Love free tools like this? There’s more coming.</h2>
          <p className="mt-3 max-w-md text-white/65">
            Follow <strong className="text-white">@{BRAND.instagram}</strong> on Instagram for bite-sized AI & Tech updates, new free tools and tips you can use today.
          </p>
          <FollowButton className="mt-6 !px-7 !py-3.5 !text-base" />
        </div>
        <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
          <p className="font-semibold">Prefer email?</p>
          <p className="mb-4 mt-1 text-sm text-white/60">Get the occasional AI & Tech roundup in your inbox.</p>
          <SubscribeForm source={source} dark />
        </div>
      </div>
    </div>
  )
}

const SEEN_KEY = 'fws:follow-prompt'

/** Shown after a successful download/share. Once per session; never blocks anything. */
export function FollowModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="follow-title">
      <div className="animate-fade-up relative w-full max-w-md rounded-t-[2rem] bg-white p-7 shadow-2xl sm:rounded-[2rem]" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid size-9 cursor-pointer place-items-center rounded-full text-muted hover:bg-cream hover:text-ink">
          <X className="size-5" />
        </button>
        <div className="mx-auto grid size-16 place-items-center rounded-2xl text-white shadow-lg" style={{ background: igGradient }}>
          <InstagramIcon className="size-8" />
        </div>
        <p className="mt-5 text-center text-sm font-semibold text-emerald-700">🎉 Your greeting is ready!</p>
        <h2 id="follow-title" className="mt-1 text-center font-display text-2xl font-semibold">
          Enjoyed this free tool?
        </h2>
        <p className="mt-2 text-center text-sm text-muted">
          Follow <strong className="text-ink">@{BRAND.instagram}</strong> for AI & Tech updates and more free tools from <AnketMark />.
        </p>
        <FollowButton className="mt-6 w-full !py-4 !text-base" label="Follow on Instagram" onClick={onClose} />
        <div className="my-5 flex items-center gap-3 text-xs text-muted">
          <span className="h-px flex-1 bg-ink/10" /> or get updates by email <span className="h-px flex-1 bg-ink/10" />
        </div>
        <SubscribeForm source="after-download" compact />
        <button onClick={onClose} className="mt-4 w-full cursor-pointer py-2 text-sm font-medium text-muted hover:text-ink">
          Maybe later
        </button>
      </div>
    </div>
  )
}

/** Hook: returns [open, trigger, close]; trigger shows the prompt at most once per session. */
export function useFollowPrompt() {
  const [open, setOpen] = useState(false)
  const trigger = () => {
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch { /* ignore */ }
    setTimeout(() => setOpen(true), 700)
  }
  return [open, trigger, () => setOpen(false)]
}
