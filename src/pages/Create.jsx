import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Check, Download, Loader2, Share2, Link2, RotateCcw, Type, Palette, MoveVertical, MessageSquareText, User, LayoutTemplate } from 'lucide-react'
import { ScaledCard } from '../templates/CardRenderer'
import { FONTS } from '../templates/fonts'
import { getFestival, FESTIVALS, SIGNOFFS } from '../data/festivals'
import { getTemplate, templatesFor, recordDownload } from '../data/templates'
import { renderPng, downloadBlob, fileNameFor, canShareFiles, shareImage, whatsappUrl } from '../lib/exportImage'
import { useToast } from '../components/Toast'
import { useSeo } from '../lib/useSeo'
import { NotFound } from './InfoPages'
import { FollowModal, useFollowPrompt, InstagramIcon } from '../components/AnketBrand'
import { BRAND, instagramUrl } from '../config/brand'

const NAME_KEY = 'fws:name'
const COLORS = [
  ['default', 'Template default'],
  ['#ffffff', 'White'],
  ['#fff3d6', 'Ivory'],
  ['#e9b949', 'Gold'],
  ['#8a1538', 'Maroon'],
  ['#0f5132', 'Emerald'],
  ['#0a2463', 'Navy'],
  ['#111111', 'Black'],
]
const POSITIONS = [
  [null, 'Auto'],
  ['top', 'Top'],
  ['middle', 'Middle'],
  ['bottom', 'Bottom'],
]
const DEFAULT_STYLE = { font: 'default', color: 'default', position: null, scale: 1, signoff: SIGNOFFS[0] }

const isMobileShare = () => typeof navigator.canShare === 'function' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

function WhatsAppIcon({ className = 'size-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43a9.4 9.4 0 0 1 9.42 9.44c0 5.2-4.23 9.43-9.43 9.43m8.03-17.46A11.3 11.3 0 0 0 12.05.7C5.8.7.7 5.79.7 12.05c0 2 .52 3.95 1.52 5.67L.6 23.5l5.92-1.55a11.3 11.3 0 0 0 5.42 1.38h.01c6.26 0 11.35-5.1 11.35-11.35 0-3.03-1.18-5.88-3.32-8.02" />
    </svg>
  )
}

const Section = ({ icon: Icon, title, children, aside }) => (
  <section className="border-b border-ink/5 py-5 last:border-0">
    <div className="mb-3 flex items-center justify-between">
      <h3 className="flex items-center gap-2 text-sm font-semibold">
        <Icon className="size-4 text-brand" /> {title}
      </h3>
      {aside}
    </div>
    {children}
  </section>
)

export default function Create() {
  const { templateId } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const template = getTemplate(templateId)
  const festival = template && getFestival(template.festivalId)

  const [name, setName] = useState(() => {
    try { return localStorage.getItem(NAME_KEY) || '' } catch { return '' }
  })
  const [message, setMessage] = useState(festival?.messages[0] ?? '')
  const [title, setTitle] = useState('')
  const [style, setStyle] = useState(DEFAULT_STYLE)
  const [busy, setBusy] = useState(null)
  const [nameError, setNameError] = useState(false)
  const nameInput = useRef(null)
  const cardRef = useRef(null)
  const cache = useRef({ key: null, blob: null })
  const [followOpen, showFollow, closeFollow] = useFollowPrompt()

  useSeo({
    title: festival ? `Customise ${template.name} – ${festival.name} Greeting with Your Name` : 'Template not found',
    description: festival ? `Add your name to the ${template.name} greeting card, preview it live and download a free HD PNG. Share on WhatsApp instantly.` : '',
  })

  // New festival → reset festival-specific text (style & name carry over).
  useEffect(() => {
    if (!festival) return
    setMessage(festival.messages[0])
    setTitle('')
  }, [festival?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    try { localStorage.setItem(NAME_KEY, name) } catch { /* ignore */ }
  }, [name])

  const data = useMemo(() => ({ name, message, title, ...style }), [name, message, title, style])
  const key = JSON.stringify([templateId, data])

  // Pre-render the PNG in the background once the user pauses, so download
  // and the mobile share sheet open instantly (share needs a fresh user gesture).
  useEffect(() => {
    if (!name.trim()) return
    const t = setTimeout(async () => {
      try {
        if (!cardRef.current) return
        const blob = await renderPng(cardRef.current)
        cache.current = { key, blob }
      } catch { /* the click handler will retry */ }
    }, 1200)
    return () => clearTimeout(t)
  }, [key, name])

  if (!template) return <NotFound />

  const filename = fileNameFor(festival.name, name)
  const shareText = `${title.trim() || festival.title}! ✨\n${message}\n— ${name.trim()}\n\nCreate your own free personalised greeting 👉 ${window.location.origin}/festival/${festival.id}`

  const getBlob = async () => {
    if (cache.current.key === key && cache.current.blob) return cache.current.blob
    const blob = await renderPng(cardRef.current)
    cache.current = { key, blob }
    return blob
  }

  const requireName = () => {
    if (name.trim()) return true
    setNameError(true)
    nameInput.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    nameInput.current?.focus({ preventScroll: true })
    toast('Please enter your name first', 'error')
    return false
  }

  async function onDownload() {
    if (!requireName()) return
    setBusy('download')
    try {
      const blob = await getBlob()
      downloadBlob(blob, filename)
      recordDownload(template.id)
      toast('Greeting downloaded in HD 🎉')
      showFollow()
    } catch (e) {
      console.error(e)
      toast('Download failed — please try again', 'error')
    } finally {
      setBusy(null)
    }
  }

  async function onWhatsApp() {
    if (!requireName()) return
    const mobile = isMobileShare()
    // Open the tab synchronously on desktop so pop-up blockers allow it.
    const win = mobile ? null : window.open('about:blank', '_blank')
    setBusy('whatsapp')
    try {
      const blob = await getBlob()
      if (mobile && canShareFiles(blob, filename) && (await shareImage(blob, filename, shareText))) {
        recordDownload(template.id)
        showFollow()
        return
      }
      downloadBlob(blob, filename)
      recordDownload(template.id)
      const url = whatsappUrl(shareText)
      if (win) win.location.href = url
      else window.location.href = url
      toast('Image saved — attach it in your WhatsApp chat 📎')
      showFollow()
    } catch (e) {
      console.error(e)
      win?.close()
      toast('Something went wrong — please try again', 'error')
    } finally {
      setBusy(null)
    }
  }

  async function onShare() {
    if (!requireName()) return
    setBusy('share')
    try {
      const blob = await getBlob()
      if (canShareFiles(blob, filename) && (await shareImage(blob, filename, shareText))) {
        showFollow()
        return
      }
      await navigator.clipboard?.writeText(shareText)
      toast('Message copied — download the image to share it')
    } catch {
      toast('Sharing is not supported here — use Download instead', 'error')
    } finally {
      setBusy(null)
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/create/${template.id}`)
      toast('Template link copied — send it so friends can add their own name')
    } catch {
      toast('Could not copy the link', 'error')
    }
  }

  const set = (k) => (v) => setStyle((s) => ({ ...s, [k]: v }))
  const siblings = templatesFor(festival.id)
  const named = !!name.trim()
  const steps = [
    ['Festival', true],
    ['Template', true],
    ['Your name', named],
    ['Preview', named],
    ['Download', false],
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 pb-48 pt-6 sm:px-6 md:pb-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link to={`/festival/${festival.id}`} className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
          <ArrowLeft className="size-4" /> {festival.name} designs
        </Link>
        <ol className="no-scrollbar flex items-center gap-1.5 overflow-x-auto text-xs font-medium" aria-label="Progress">
          {steps.map(([label, done], i) => (
            <li key={label} className="flex shrink-0 items-center gap-1.5">
              <span className={`grid size-5 place-items-center rounded-full text-[10px] ${done ? 'bg-emerald-600 text-white' : 'bg-ink/10 text-ink/60'}`}>
                {done ? <Check className="size-3" /> : i + 1}
              </span>
              <span className={done ? 'text-ink' : 'text-muted'}>{label}</span>
              {i < steps.length - 1 && <span className="mx-1 h-px w-4 bg-ink/15" />}
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-12">
        {/* ── Preview ── */}
        <div>
          <div className="lg:sticky lg:top-24">
            <h1 className="mb-4 font-display text-2xl font-semibold sm:text-3xl">
              {template.name} <span className="ml-1 align-middle text-xs font-sans font-medium text-muted">· {template.category}</span>
            </h1>
            <div className="mx-auto max-w-[480px] rounded-[1.4rem] bg-white p-2 card-shadow ring-1 ring-ink/5">
              <div className="overflow-hidden rounded-2xl">
                <ScaledCard ref={cardRef} template={template} data={data} lazy={false} />
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-muted">Live preview · downloads as 2160 × 2700 px PNG · no watermark</p>

            <div className="mx-auto mt-6 hidden max-w-[480px] gap-3 md:flex">
              <button onClick={onDownload} disabled={!!busy} className="btn-primary flex-1 !py-4">
                {busy === 'download' ? <Loader2 className="size-5 animate-spin" /> : <Download className="size-5" />} Download Greeting
              </button>
              <button onClick={onWhatsApp} disabled={!!busy} className="btn-wa flex-1 !py-4">
                {busy === 'whatsapp' ? <Loader2 className="size-5 animate-spin" /> : <WhatsAppIcon />} Share on WhatsApp
              </button>
            </div>
            <div className="mx-auto mt-3 flex max-w-[480px] justify-center gap-2">
              {typeof navigator.share === 'function' && (
                <button onClick={onShare} disabled={!!busy} className="btn-ghost !px-4 !py-2 text-xs">
                  <Share2 className="size-3.5" /> More apps
                </button>
              )}
              <button onClick={copyLink} className="btn-ghost !px-4 !py-2 text-xs">
                <Link2 className="size-3.5" /> Copy template link
              </button>
            </div>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto mt-5 flex max-w-[480px] items-center gap-3 rounded-2xl bg-[#18181b] px-4 py-3 text-sm text-white/80 transition hover:text-white"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-xl text-white" style={{ background: 'linear-gradient(45deg,#feda75,#fa7e1e 25%,#d62976 50%,#962fbf 75%,#4f5bd5)' }}>
                <InstagramIcon className="size-5" />
              </span>
              <span className="flex-1">
                Free tool by <strong className="text-white">{BRAND.name}</strong> · follow <strong className="text-white">@{BRAND.instagram}</strong> for AI & Tech updates
              </span>
              <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink">Follow</span>
            </a>
          </div>
        </div>

        {/* ── Controls ── */}
        <aside className="min-w-0 rounded-3xl bg-white px-5 py-2 card-shadow ring-1 ring-ink/5 sm:px-6 lg:self-start">
          <Section icon={User} title="Your name">
            <input
              ref={nameInput}
              value={name}
              maxLength={40}
              onChange={(e) => {
                setName(e.target.value)
                if (e.target.value.trim()) setNameError(false)
              }}
              placeholder="e.g. Anket Ghosh or The Sharma Family"
              aria-invalid={nameError}
              aria-describedby="name-help"
              autoComplete="name"
              className={`w-full rounded-2xl bg-ivory px-4 py-3.5 text-base outline-none ring-1 transition focus:ring-2 ${nameError ? 'ring-red-400 focus:ring-red-400' : 'ring-ink/10 focus:ring-brand/50'}`}
            />
            <p id="name-help" className={`mt-2 text-xs ${nameError ? 'text-red-600' : 'text-muted'}`}>
              {nameError ? 'Your name is required to create the greeting.' : 'Required · appears as the signature on your card.'}
            </p>
          </Section>

          <Section icon={MessageSquareText} title="Greeting message">
            <div className="no-scrollbar -mx-1 mb-3 flex gap-2 overflow-x-auto px-1">
              {festival.messages.map((m, i) => (
                <button key={i} onClick={() => setMessage(m)} className={`chip shrink-0 !px-3 !py-1.5 text-xs ${message === m ? 'chip-active' : ''}`}>
                  Wish {i + 1}
                </button>
              ))}
            </div>
            <textarea
              value={message}
              maxLength={180}
              rows={3}
              onChange={(e) => setMessage(e.target.value)}
              aria-label="Greeting message"
              className="w-full resize-none rounded-2xl bg-ivory px-4 py-3 text-sm leading-relaxed outline-none ring-1 ring-ink/10 focus:ring-2 focus:ring-brand/50"
            />
            <div className="mt-3 grid grid-cols-2 gap-3">
              <label className="text-xs text-muted">
                Heading
                <input
                  value={title}
                  maxLength={32}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={festival.title}
                  className="mt-1 w-full rounded-xl bg-ivory px-3 py-2.5 text-sm text-ink outline-none ring-1 ring-ink/10 focus:ring-2 focus:ring-brand/50"
                />
              </label>
              <label className="text-xs text-muted">
                Sign-off
                <select
                  value={style.signoff}
                  onChange={(e) => set('signoff')(e.target.value)}
                  className="mt-1 w-full rounded-xl bg-ivory px-3 py-2.5 text-sm text-ink outline-none ring-1 ring-ink/10 focus:ring-2 focus:ring-brand/50"
                >
                  {SIGNOFFS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
            </div>
          </Section>

          <Section
            icon={Type}
            title="Font"
            aside={
              <button onClick={() => setStyle(DEFAULT_STYLE)} className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-muted hover:text-ink">
                <RotateCcw className="size-3" /> Reset style
              </button>
            }
          >
            <div className="grid grid-cols-2 gap-2">
              {[['default', 'Template default', null], ...Object.entries(FONTS).map(([k, f]) => [k, f.label, f.css])].map(([k, label, css]) => (
                <button
                  key={k}
                  onClick={() => set('font')(k)}
                  aria-pressed={style.font === k}
                  className={`cursor-pointer truncate rounded-xl px-3 py-2.5 text-left ring-1 transition ${style.font === k ? 'bg-ink text-white ring-ink' : 'bg-ivory ring-ink/10 hover:ring-ink/30'}`}
                >
                  <span className="block truncate text-lg leading-tight" style={{ fontFamily: css || undefined }}>{css ? (name.trim() || 'Your Name') : 'Aa'}</span>
                  <span className={`block text-[11px] ${style.font === k ? 'text-white/70' : 'text-muted'}`}>{label}</span>
                </button>
              ))}
            </div>
          </Section>

          <Section icon={Palette} title="Text colour">
            <div className="flex flex-wrap items-center gap-2.5">
              {COLORS.map(([c, label]) => (
                <button
                  key={c}
                  onClick={() => set('color')(c)}
                  aria-label={label}
                  aria-pressed={style.color === c}
                  title={label}
                  className={`grid size-9 cursor-pointer place-items-center rounded-full ring-2 ring-offset-2 transition ${style.color === c ? 'ring-ink' : 'ring-transparent hover:ring-ink/20'}`}
                  style={{ background: c === 'default' ? 'conic-gradient(#f2c14e, #e0218a, #3a86ff, #138808, #f2c14e)' : c, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.12)' }}
                >
                  {style.color === c && <Check className={`size-4 ${['#ffffff', '#fff3d6', '#e9b949', 'default'].includes(c) ? 'text-ink' : 'text-white'}`} />}
                </button>
              ))}
              <label className="relative grid size-9 cursor-pointer place-items-center overflow-hidden rounded-full ring-1 ring-ink/15" title="Custom colour">
                <span className="text-xs font-bold text-muted">+</span>
                <input type="color" className="absolute inset-0 cursor-pointer opacity-0" onChange={(e) => set('color')(e.target.value)} aria-label="Custom colour" />
              </label>
            </div>
          </Section>

          <Section icon={MoveVertical} title="Text position & size">
            <div className="grid grid-cols-4 gap-1 rounded-2xl bg-ivory p-1 ring-1 ring-ink/10" role="radiogroup" aria-label="Text position">
              {POSITIONS.map(([v, label]) => (
                <button
                  key={label}
                  role="radio"
                  aria-checked={style.position === v}
                  onClick={() => set('position')(v)}
                  className={`cursor-pointer rounded-xl py-2 text-xs font-semibold transition ${style.position === v ? 'bg-white text-ink shadow' : 'text-muted hover:text-ink'}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <label className="mt-4 flex items-center gap-3 text-xs text-muted">
              <span>A</span>
              <input
                type="range"
                min="0.85"
                max="1.15"
                step="0.05"
                value={style.scale}
                onChange={(e) => set('scale')(Number(e.target.value))}
                className="flex-1 accent-[#7a1d5f]"
                aria-label="Text size"
              />
              <span className="text-base">A</span>
            </label>
          </Section>

          <Section icon={LayoutTemplate} title={`More ${festival.name} designs`}>
            <div className="no-scrollbar -mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
              {siblings.map((t) => (
                <button
                  key={t.id}
                  onClick={() => navigate(`/create/${t.id}`, { replace: true })}
                  className={`w-20 shrink-0 cursor-pointer overflow-hidden rounded-xl ring-2 ring-offset-2 transition ${t.id === template.id ? 'ring-brand' : 'ring-transparent hover:ring-ink/20'}`}
                  aria-label={`Use ${t.name}`}
                  aria-current={t.id === template.id}
                >
                  <ScaledCard template={t} data={data} />
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted">Your name stays as you switch designs.</p>
            <label className="mt-3 block text-xs text-muted">
              Switch festival
              <select
                value={festival.id}
                onChange={(e) => navigate(`/create/${templatesFor(e.target.value)[0].id}`)}
                className="mt-1 w-full rounded-xl bg-ivory px-3 py-2.5 text-sm text-ink outline-none ring-1 ring-ink/10 focus:ring-2 focus:ring-brand/50"
              >
                {FESTIVALS.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
              </select>
            </label>
          </Section>
        </aside>
      </div>

      <FollowModal open={followOpen} onClose={closeFollow} />

      {/* Mobile sticky action bar */}
      {/* Buttons sit above the bottom row, which leaves room for the host's fixed badge (bottom-right, ~64px tall) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/5 bg-white/95 backdrop-blur md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="flex gap-2 px-3 pt-3">
          <button onClick={onDownload} disabled={!!busy} className="btn-primary flex-1 !px-3 !py-3.5">
            {busy === 'download' ? <Loader2 className="size-5 animate-spin" /> : <Download className="size-5" />} Download
          </button>
          <button onClick={onWhatsApp} disabled={!!busy} className="btn-wa flex-1 !px-3 !py-3.5">
            {busy === 'whatsapp' ? <Loader2 className="size-5 animate-spin" /> : <WhatsAppIcon />} WhatsApp
          </button>
        </div>
        <p className="flex h-16 items-center px-4 text-[11px] font-medium text-muted">Free · No sign-up · No watermark</p>
      </div>
    </div>
  )
}
