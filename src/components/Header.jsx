import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Sparkles } from 'lucide-react'
import Logo from './Logo'

const links = [
  { to: '/#festivals', label: 'Festivals' },
  { to: '/templates', label: 'Templates' },
  { to: '/#how-it-works', label: 'How it works' },
  { to: '/about', label: 'About' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-ivory/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Logo />
          <span className="leading-tight">
            <span className="block font-display text-xl font-semibold tracking-tight text-brand">Anandotsav</span>
            <span className="block text-[9px] font-semibold uppercase tracking-[0.22em] text-muted">Celebrate · Personalise · Share</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link key={l.label} to={l.to} className="text-sm font-medium text-ink/70 transition hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/#festivals" className="btn-primary hidden !py-2.5 sm:inline-flex">
            <Sparkles className="size-4" /> Create Greeting
          </Link>
          <button className="cursor-pointer rounded-full p-2 md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="animate-fade-up border-t border-ink/5 bg-ivory px-4 py-4 md:hidden" aria-label="Mobile">
          {links.map((l) => (
            <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 text-base font-medium hover:bg-cream">
              {l.label}
            </Link>
          ))}
          <Link to="/#festivals" onClick={() => setOpen(false)} className="btn-primary mt-3 w-full">
            <Sparkles className="size-4" /> Create Your Greeting
          </Link>
        </nav>
      )}
    </header>
  )
}
