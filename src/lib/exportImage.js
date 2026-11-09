import { toBlob } from 'html-to-image'
import { W, H } from '../templates/CardRenderer'

const isIOS = () => /iP(hone|od|ad)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
const isSafari = () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

/** Render the card node to a high-resolution PNG blob (2160 × 2700 by default). */
export async function renderPng(node, pixelRatio = 2) {
  await document.fonts.ready
  const opts = { width: W, height: H, pixelRatio, cacheBust: true, backgroundColor: '#ffffff' }
  // Safari sometimes drops fonts on the very first pass – a warm-up render fixes it.
  if (isSafari() || isIOS()) await toBlob(node, { ...opts, pixelRatio: 0.2 })
  const blob = await toBlob(node, opts)
  if (!blob) throw new Error('Could not create image')
  return blob
}

export function fileNameFor(festivalName, name) {
  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return `${slug(festivalName)}-greeting-${slug(name) || 'card'}.png`
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 4000)
}

export const canShareFiles = (blob, filename) => {
  try {
    return !!navigator.canShare?.({ files: [new File([blob], filename, { type: 'image/png' })] })
  } catch {
    return false
  }
}

/** Native share sheet with the image attached (mobile). Returns true if shared. */
export async function shareImage(blob, filename, text) {
  const file = new File([blob], filename, { type: 'image/png' })
  try {
    await navigator.share({ files: [file], text })
    return true
  } catch (e) {
    if (e?.name === 'AbortError') return true // user closed the sheet
    return false
  }
}

export const whatsappUrl = (text) => `https://wa.me/?text=${encodeURIComponent(text)}`
