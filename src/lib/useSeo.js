import { useEffect } from 'react'

const SITE = 'Anandotsav'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** Per-route title / description / canonical for search engines & link previews. */
export function useSeo({ title, description, keywords }) {
  useEffect(() => {
    const full = title ? `${title} | ${SITE}` : `${SITE} – Free Personalised Festival Greeting Cards with Your Name`
    document.title = full
    if (description) {
      setMeta('name', 'description', description)
      setMeta('property', 'og:description', description)
    }
    if (keywords) setMeta('name', 'keywords', keywords)
    setMeta('property', 'og:title', full)
    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = window.location.origin + window.location.pathname
  }, [title, description, keywords])
}
