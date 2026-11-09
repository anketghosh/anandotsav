import { BRAND } from '../config/brand'

export const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.trim())

/** Sends an email to the configured free form backend. Resolves true on success. */
export async function subscribeEmail(email, source = 'site') {
  const payload = { email: email.trim(), source, list: 'AI & Tech updates' }
  try {
    if (BRAND.subscribeEndpoint) {
      const r = await fetch(BRAND.subscribeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      return r.ok
    }
    // Netlify Forms (form "ai-updates" is declared in index.html)
    const r = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ 'form-name': 'ai-updates', ...payload }).toString(),
    })
    return r.ok
  } catch {
    return false
  }
}
