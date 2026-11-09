import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import Logo from './Logo'
import { AnketMark, FollowButton, SubscribeForm } from './AnketBrand'
import { FESTIVALS } from '../data/festivals'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/5 bg-cream/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo />
            <span className="font-display text-xl font-semibold text-brand">Anandotsav</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Anandotsav means “festival of joy”. Celebrate, personalise and share free greeting cards with your name — no sign-up, no watermark.
          </p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-muted">
            Built by <AnketMark className="normal-case tracking-tight" />
          </p>
          <p className="mt-2 text-sm text-muted">AI & Tech updates on Instagram:</p>
          <FollowButton className="mt-3 !py-2.5" />
          <div className="mt-5">
            <SubscribeForm source="footer" compact />
          </div>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">Popular</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {FESTIVALS.slice(0, 6).map((f) => (
              <li key={f.id}>
                <Link className="hover:text-brand" to={`/festival/${f.id}`}>{f.name} greeting cards</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">More festivals</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {FESTIVALS.slice(6).map((f) => (
              <li key={f.id}>
                <Link className="hover:text-brand" to={`/festival/${f.id}`}>{f.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">Studio</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link className="hover:text-brand" to="/about">About</Link></li>
            <li><Link className="hover:text-brand" to="/contact">Contact</Link></li>
            <li><Link className="hover:text-brand" to="/privacy">Privacy Policy</Link></li>
            <li><Link className="hover:text-brand" to="/templates">All templates</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink/5 py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} Anandotsav · Made with <Heart className="inline size-3 fill-brand text-brand" /> for every celebration · 100% free · a project by <a className="font-semibold text-ink hover:text-[#2563eb]" href="https://anket.ai" target="_blank" rel="noopener noreferrer">anket.ai</a>
      </div>
    </footer>
  )
}
