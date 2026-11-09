import { Link } from 'react-router-dom'
import { Mail, ShieldCheck, Sparkles } from 'lucide-react'
import { useSeo } from '../lib/useSeo'

// Change this to your own address before going live.
export const CONTACT_EMAIL = 'hello@anandotsav.com'

const Page = ({ eyebrow, title, children }) => (
  <article className="mx-auto max-w-3xl px-4 pt-14 sm:px-6">
    <p className="text-sm font-semibold uppercase tracking-widest text-brand">{eyebrow}</p>
    <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
    <div className="mt-8 space-y-5 leading-relaxed text-ink/80 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink">
      {children}
    </div>
  </article>
)

export function About() {
  useSeo({ title: 'About', description: 'Anandotsav is a free, private festival greeting card maker for Indian and international celebrations.' })
  return (
    <Page eyebrow="About" title="Celebrate. Personalise. Share.">
      <p>
        <strong>Anandotsav</strong> — from the Sanskrit <em>anand</em> (joy) and <em>utsav</em> (festival) — began with a simple idea: the greetings we send to the people we love should feel personal — not like the same forwarded
        image everyone else received.
      </p>
      <p>
        We design premium greeting cards for Diwali, Holi, Durga Puja, Ganesh Chaturthi, Raksha Bandhan, Navratri, Christmas, Eid, New Year, Pongal,
        Independence Day and every other celebration. Add your name, preview it live and download a high-resolution image in seconds.
      </p>
      <h2>Our promises</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Free forever — no subscriptions, no premium tier.</li>
        <li>No watermark on your downloads.</li>
        <li>No sign-up, no login, no app to install.</li>
        <li>Private by design — cards are created in your browser and never uploaded.</li>
      </ul>
      <Link to="/#festivals" className="btn-brand mt-6">
        <Sparkles className="size-4" /> Create a greeting
      </Link>
    </Page>
  )
}

export function Contact() {
  useSeo({ title: 'Contact', description: 'Get in touch with Anandotsav — suggest a festival, request a design or report an issue.' })
  return (
    <Page eyebrow="Contact" title="We’d love to hear from you">
      <p>Want a festival we don’t cover yet, have a design idea, or spotted something broken? Drop us a line.</p>
      <a href={`mailto:${CONTACT_EMAIL}?subject=Anandotsav`} className="btn-primary">
        <Mail className="size-4" /> {CONTACT_EMAIL}
      </a>
      <p className="text-sm text-muted">We read every message and usually reply within a few days.</p>
    </Page>
  )
}

export function Privacy() {
  useSeo({ title: 'Privacy Policy', description: 'Anandotsav privacy policy — your name and cards never leave your device.' })
  return (
    <Page eyebrow="Privacy Policy" title="Your wishes stay yours">
      <p className="flex items-center gap-2 rounded-2xl bg-emerald-50 p-4 text-emerald-900 ring-1 ring-emerald-200">
        <ShieldCheck className="size-5 shrink-0" /> In short: we never collect your name, messages or images. Your email is only stored if you choose to subscribe.
      </p>
      <h2>What we process</h2>
      <p>
        Everything you type — your name, message and design choices — is used only inside your browser to draw your card. Images are generated on your
        device and are never uploaded to our servers.
      </p>
      <h2>Local storage</h2>
      <p>
        To save you time, your browser remembers the last name you typed and which templates you downloaded (to power “Recently popular”). This data
        stays on your device; you can clear it at any time from your browser settings.
      </p>
      <h2>Optional email updates</h2>
      <p>
        If you choose to enter your email to receive AI & Tech updates from anket.ai, we store that address with our form provider solely to send
        those updates. Subscribing is never required to create, download or share a greeting. You can unsubscribe at any time or email us to have
        your address deleted. We never sell or share it.
      </p>
      <h2>Instagram</h2>
      <p>Links to our Instagram page open Instagram directly; anything you do there is covered by Instagram’s own privacy policy.</p>
      <h2>Sharing</h2>
      <p>
        When you choose to share on WhatsApp or another app, the image and message go directly from your device to that app and are covered by its
        own privacy policy.
      </p>
      <h2>Hosting</h2>
      <p>Our static website is served by a hosting provider (such as Vercel or Netlify) that may keep standard, anonymous server logs.</p>
      <h2>Contact</h2>
      <p>
        Questions? Email <a className="font-semibold text-brand" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
      <p className="text-sm text-muted">Last updated: November 2026</p>
    </Page>
  )
}

export function NotFound() {
  useSeo({ title: 'Page not found', description: 'This page could not be found.' })
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="font-display text-7xl font-semibold text-gradient">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold">This page wandered off to a celebration</h1>
      <Link to="/" className="btn-primary mt-8">Back to home</Link>
    </div>
  )
}
