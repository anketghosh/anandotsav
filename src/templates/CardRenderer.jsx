import { forwardRef, useEffect, useRef, useState } from 'react'
import { LAYOUTS, W, H } from './layouts'
import { getFestival, SIGNOFFS } from '../data/festivals'

export { W, H }

/** Fill in defaults so a template always renders, even with partial data. */
export function resolveData(template, data = {}) {
  const f = getFestival(template.festivalId)
  return {
    title: data.title?.trim() || f.title,
    message: data.message ?? f.messages[0],
    signoff: data.signoff || SIGNOFFS[0],
    name: data.name || '',
    font: data.font || 'default',
    color: data.color || 'default',
    position: data.position || null,
    scale: data.scale || 1,
  }
}

/** Full-size 1080×1350 card. Ref points at the exportable node. */
export const CardRenderer = forwardRef(function CardRenderer({ template, data }, ref) {
  const festival = getFestival(template.festivalId)
  const Layout = LAYOUTS[template.archetype]
  return (
    <div ref={ref} style={{ width: W, height: H }}>
      <Layout festival={festival} data={resolveData(template, data)} />
    </div>
  )
})

/**
 * Card scaled to fit its container width. Lazily mounts when scrolled into
 * view so galleries with 50+ cards stay fast.
 */
export const ScaledCard = forwardRef(function ScaledCard({ template, data, lazy = true, className = '' }, ref) {
  const box = useRef(null)
  const [width, setWidth] = useState(0)
  const [visible, setVisible] = useState(!lazy)

  useEffect(() => {
    const el = box.current
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width))
    ro.observe(el)
    let io
    if (lazy) {
      io = new IntersectionObserver(([e]) => e.isIntersecting && (setVisible(true), io.disconnect()), { rootMargin: '300px' })
      io.observe(el)
    }
    return () => { ro.disconnect(); io?.disconnect() }
  }, [lazy])

  const scale = width / W
  return (
    <div ref={box} className={`relative w-full overflow-hidden ${className}`} style={{ aspectRatio: `${W} / ${H}` }}>
      {visible && width > 0 && (
        <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, transform: `scale(${scale})`, transformOrigin: '0 0' }}>
          <CardRenderer ref={ref} template={template} data={data} />
        </div>
      )}
    </div>
  )
})
