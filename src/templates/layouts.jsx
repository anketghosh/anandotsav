/* Layout archetypes. Each renders a 1080 × 1350 (4:5) card.
   Every festival combines these structures with its own palette,
   illustration and décor, so each template is genuinely distinct. */
import { FONTS } from './fonts'
import { Motif, Mandala, Lattice, DotGrid, Corner, Sprinkles, Rays, Hanging, rng, starPath, useUid } from './motifs'

export const W = 1080
export const H = 1350

const shade = (hex, amt) => {
  // amt < 0 darkens, > 0 lightens
  const n = parseInt(hex.slice(1), 16)
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) =>
    Math.round(amt < 0 ? c * (1 + amt) : c + (255 - c) * amt),
  )
  return `rgb(${ch.join(',')})`
}

/** Font size that keeps the longest word (or whole line if nowrap) within `width`. */
function fit(text, base, fontKey, width, wholeLine = false) {
  const k = FONTS[fontKey]?.k ?? 0.55
  const unit = wholeLine ? text.length : Math.max(...text.split(/\s+/).map((w) => w.length), 1)
  return Math.min(base, width / (unit * k))
}

const Stage = ({ bg, children }) => (
  <div style={{ width: W, height: H, position: 'relative', overflow: 'hidden', background: bg }}>{children}</div>
)

function Divider({ color, width = 320 }) {
  return (
    <svg width={width} height="24" viewBox={`0 0 ${width} 24`} style={{ display: 'block', margin: '18px auto' }}>
      <line x1="0" y1="12" x2={width / 2 - 22} y2="12" stroke={color} strokeWidth="2" />
      <line x1={width / 2 + 22} y1="12" x2={width} y2="12" stroke={color} strokeWidth="2" />
      <path d={starPath(width / 2, 12, 11, 4, 4)} fill={color} />
    </svg>
  )
}

/**
 * The personalised text block. `look` sets the template's typography;
 * the user's font / colour / size choices override it.
 */
export function GreetingText({ festival, data, look, width = 820, align = 'center', parts = ['title', 'message', 'sign'] }) {
  const userColor = data.color && data.color !== 'default' ? data.color : null
  const userFont = data.font && data.font !== 'default' ? data.font : null
  const scale = data.scale || 1
  const titleFont = userFont || look.titleFont
  const nameFont = userFont || look.nameFont
  const title = data.title
  const msg = data.message || ''
  const name = data.name?.trim() || 'Your Name'
  const titleSize = fit(look.titleUpper ? title.toUpperCase() : title, look.titleSize, titleFont, width * 0.98) * scale
  const nameSize = fit(name, look.nameSize, nameFont, width * (look.namePill ? 0.8 : 0.96), true) * scale
  const bodySize = look.bodySize * (msg.length > 110 ? 0.86 : 1) * scale
  const items = align === 'left' ? 'flex-start' : 'center'
  const pillText = userColor && userColor.toLowerCase() !== '#ffffff' ? userColor : look.nameColor

  return (
    <div style={{ width, textAlign: align, display: 'flex', flexDirection: 'column', alignItems: items }}>
      {parts.includes('title') && (
        <>
          {look.kicker && (
            <div style={{ fontFamily: FONTS.poppins.css, fontWeight: 500, fontSize: 22 * scale, letterSpacing: 9, textTransform: 'uppercase', color: userColor || look.kickerColor, marginBottom: 18 }}>
              {look.kicker}
            </div>
          )}
          <div
            style={{
              fontFamily: FONTS[titleFont].css,
              fontSize: titleSize,
              fontWeight: look.titleWeight ?? FONTS[titleFont].weight,
              fontStyle: look.titleItalic && !userFont ? 'italic' : 'normal',
              letterSpacing: look.titleSpacing ?? 0,
              textTransform: look.titleUpper ? 'uppercase' : 'none',
              lineHeight: look.titleLine ?? 1.08,
              color: userColor || look.titleColor,
              textShadow: look.titleShadow,
              padding: '0 6px',
            }}
          >
            {title}
          </div>
          {festival.subtitle && (
            <div style={{ fontFamily: FONTS.cinzel.css, fontWeight: 600, fontSize: 46 * scale, letterSpacing: 18, color: userColor || look.signoffColor, marginTop: 6 }}>
              {festival.subtitle}
            </div>
          )}
          {look.divider}
        </>
      )}
      {parts.includes('message') && msg && (
        <div
          style={{
            fontFamily: FONTS[look.bodyFont].css,
            fontSize: bodySize,
            fontWeight: look.bodyWeight ?? 400,
            lineHeight: 1.45,
            color: userColor || look.bodyColor,
            opacity: look.bodyOpacity ?? 1,
            maxWidth: look.bodyWidth ?? width,
            marginTop: look.divider ? 0 : 22,
            whiteSpace: 'pre-line',
          }}
        >
          {msg}
        </div>
      )}
      {parts.includes('sign') && (
        <div style={{ marginTop: (look.signGap ?? 34) * scale, display: 'flex', flexDirection: 'column', alignItems: items }}>
          {look.signBar && <div style={{ width: 96, height: 8, borderRadius: 4, background: look.signBar, marginBottom: 22 }} />}
          <div
            style={{
              fontFamily: FONTS[look.signoffFont || look.bodyFont].css,
              fontSize: (look.signoffSize ?? 34) * scale,
              fontStyle: look.signoffItalic ? 'italic' : 'normal',
              fontWeight: look.signoffWeight ?? 400,
              letterSpacing: look.signoffSpacing ?? 0,
              textTransform: look.signoffUpper ? 'uppercase' : 'none',
              color: userColor || look.signoffColor,
            }}
          >
            {data.signoff}
          </div>
          <div
            style={{
              fontFamily: FONTS[nameFont].css,
              fontSize: nameSize,
              fontWeight: look.nameWeight ?? FONTS[nameFont].weight,
              lineHeight: 1.25,
              whiteSpace: 'nowrap',
              marginTop: 6,
              color: look.namePill ? pillText : userColor || look.nameColor,
              opacity: data.name?.trim() ? 1 : 0.55,
              ...(look.namePill && {
                background: look.namePill,
                padding: '10px 48px 14px',
                borderRadius: 999,
                marginTop: 18,
                boxShadow: '0 12px 30px rgba(0,0,0,.25)',
              }),
            }}
          >
            {name}
          </div>
        </div>
      )}
    </div>
  )
}

/** Places illustration + text according to the user's position choice. */
function Composition({ position, motif, text, motifSize, gap = 34, style, behind = 0.16 }) {
  const box = { position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }
  if (position === 'middle')
    return (
      <div style={box}>
        <div style={{ position: 'absolute', width: motifSize * 1.6, height: motifSize * 1.6, left: '50%', top: '50%', marginLeft: -motifSize * 0.8, marginTop: -motifSize * 0.8, opacity: behind }}>
          {motif}
        </div>
        <div style={{ position: 'relative' }}>{text}</div>
      </div>
    )
  const m = <div style={{ width: motifSize, height: motifSize, flexShrink: 0 }}>{motif}</div>
  return (
    <div style={{ ...box, flexDirection: 'column', gap }}>
      {position === 'top' ? (
        <>
          {text}
          {m}
        </>
      ) : (
        <>
          {m}
          {text}
        </>
      )}
    </div>
  )
}

const justify = (pos) => ({ top: 'flex-start', middle: 'center', bottom: 'flex-end' })[pos] || 'center'

/* ───────────────────────── Archetypes ───────────────────────── */

function Traditional({ festival: f, data }) {
  const p = f.palette
  const look = {
    titleFont: 'greatvibes', titleSize: 150, titleColor: p.gold, titleShadow: '0 4px 18px rgba(0,0,0,.35)', titleLine: 1.0,
    bodyFont: 'cormorant', bodySize: 42, bodyColor: '#fff6e6', bodyWeight: 500,
    signoffColor: p.gold, signoffItalic: true, signoffSize: 36,
    nameFont: 'cinzel', nameSize: 60, nameColor: p.gold, nameWeight: 700,
    divider: <Divider color={p.gold} />,
  }
  return (
    <Stage bg={`radial-gradient(120% 85% at 50% 28%, ${p.rich} 0%, ${p.deep} 72%)`}>
      <div style={{ position: 'absolute', left: 70, top: 40 }}>
        <Mandala color={p.gold} size={940} opacity={0.2} />
      </div>
      <Sprinkles colors={[p.gold, '#ffffff']} count={30} seed={11} opacity={0.65} />
      <div style={{ position: 'absolute', inset: 34, border: `3px solid ${p.gold}`, borderRadius: 10 }} />
      <div style={{ position: 'absolute', inset: 50, border: `1.5px solid ${p.gold}`, borderRadius: 6, opacity: 0.55 }} />
      <Corner color={p.gold} style={{ left: 42, top: 42 }} />
      <Corner color={p.gold} style={{ right: 42, top: 42, transform: 'scaleX(-1)' }} />
      <Corner color={p.gold} style={{ left: 42, bottom: 42, transform: 'scaleY(-1)' }} />
      <Corner color={p.gold} style={{ right: 42, bottom: 42, transform: 'scale(-1,-1)' }} />
      <Composition
        position={data.position || 'bottom'}
        motifSize={400}
        style={{ inset: '100px 110px' }}
        motif={<Motif festival={f} />}
        text={<GreetingText festival={f} data={data} look={look} width={800} />}
      />
    </Stage>
  )
}

function Royal({ festival: f, data }) {
  const p = f.palette
  const look = {
    titleFont: 'cinzel', titleSize: 84, titleWeight: 700, titleUpper: true, titleSpacing: 4, titleColor: p.gold, titleLine: 1.15,
    titleShadow: '0 2px 0 rgba(0,0,0,.35)',
    bodyFont: 'cormorant', bodySize: 40, bodyColor: '#f6ecd6', bodyWeight: 500,
    signoffColor: p.gold, signoffItalic: true, signoffSize: 34, signGap: 26,
    nameFont: 'greatvibes', nameSize: 104, nameColor: p.gold,
    divider: <Divider color={p.gold} width={260} />,
  }
  const arch = 'M150 1250 L150 540 Q150 320 340 236 Q470 186 540 116 Q610 186 740 236 Q930 320 930 540 L930 1250Z'
  const gid = useUid('royal')
  const inner = 'M174 1226 L174 546 Q174 340 352 260 Q476 210 540 150 Q604 210 728 260 Q906 340 906 546 L906 1226Z'
  return (
    <Stage bg={`linear-gradient(170deg, ${shade(p.deep, 0.06)} 0%, ${shade(p.deep, -0.55)} 100%)`}>
      <Lattice color={p.gold} opacity={0.07} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={p.rich} stopOpacity=".55" />
            <stop offset="1" stopColor={p.rich} stopOpacity=".08" />
          </linearGradient>
        </defs>
        <path d={arch} fill={`url(#${gid})`} stroke={p.gold} strokeWidth="5" />
        <path d={inner} fill="none" stroke={p.gold} strokeWidth="1.5" opacity=".7" />
        <circle cx="540" cy="98" r="12" fill={p.gold} />
        <path d={starPath(540, 66, 18, 6)} fill={p.gold} />
        <rect x="110" y="1250" width="860" height="10" rx="5" fill={p.gold} />
        <rect x="80" y="1270" width="920" height="4" rx="2" fill={p.gold} opacity=".6" />
      </svg>
      <Sprinkles colors={[p.gold]} count={40} seed={21} kind="dot" opacity={0.6} />
      <Composition
        position={data.position || 'bottom'}
        motifSize={330}
        style={{ left: 190, right: 190, top: 230, bottom: 110 }}
        motif={<Motif festival={f} />}
        text={<GreetingText festival={f} data={data} look={look} width={680} />}
      />
    </Stage>
  )
}

function Modern({ festival: f, data }) {
  const p = f.palette
  const head = {
    titleFont: 'poppins', titleSize: 150, titleWeight: 800, titleColor: '#ffffff', titleLine: 0.98, titleSpacing: -3,
  }
  const body = {
    bodyFont: 'poppins', bodySize: 34, bodyWeight: 300, bodyColor: p.ink, bodyWidth: 640,
    signoffFont: 'poppins', signoffSize: 26, signoffColor: p.ink, signoffSpacing: 3, signoffUpper: true, signoffWeight: 500,
    nameFont: 'poppins', nameSize: 64, nameWeight: 700, nameColor: p.rich, signBar: p.warm, signGap: 44,
  }
  return (
    <Stage bg={p.light}>
      <div style={{ position: 'absolute', left: 0, top: 0, right: 0, height: 760, background: p.rich, borderBottomRightRadius: 320, overflow: 'hidden' }}>
        <DotGrid color="#ffffff" opacity={0.14} />
        <div style={{ position: 'absolute', right: -140, top: -160, width: 560, height: 560, borderRadius: '50%', background: p.warm, opacity: 0.85 }} />
        <div style={{ position: 'absolute', right: 230, top: 110, width: 90, height: 90, borderRadius: '50%', border: `10px solid ${p.gold}` }} />
      </div>
      <div style={{ position: 'absolute', left: 90, top: 96, fontFamily: FONTS.poppins.css, fontWeight: 500, fontSize: 26, letterSpacing: 8, color: '#ffffffcc', textTransform: 'uppercase' }}>
        — {f.tagline}
      </div>
      <div style={{ position: 'absolute', left: 84, top: 170 }}>
        <GreetingText festival={f} data={{ ...data, color: 'default' }} look={head} width={520} align="left" parts={['title']} />
      </div>
      <div style={{ position: 'absolute', right: 50, top: 440, width: 440, height: 440 }}>
        <Motif festival={f} />
      </div>
      <div style={{ position: 'absolute', left: 90, right: 90, top: 900, bottom: 90, display: 'flex', flexDirection: 'column', justifyContent: justify(data.position || 'middle') }}>
        <GreetingText festival={f} data={data} look={body} width={900} align="left" parts={['message', 'sign']} />
      </div>
    </Stage>
  )
}

function Minimal({ festival: f, data }) {
  const p = f.palette
  const look = {
    kicker: '— With warm wishes —', kickerColor: p.rich,
    titleFont: 'cormorant', titleSize: 124, titleWeight: 500, titleItalic: true, titleColor: p.ink, titleLine: 1.0,
    bodyFont: 'cormorant', bodySize: 40, bodyColor: '#5b5048', bodyWidth: 700,
    divider: <div style={{ width: 90, height: 2, background: p.rich, margin: '30px auto 26px', opacity: 0.6 }} />,
    signoffFont: 'poppins', signoffSize: 20, signoffUpper: true, signoffSpacing: 6, signoffColor: '#8a7f75', signoffWeight: 500,
    nameFont: 'playfair', nameSize: 60, nameColor: p.ink,
  }
  const motif = (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={{ position: 'absolute', inset: -34, borderRadius: '50%', background: p.gold, opacity: 0.16 }} />
      <div style={{ position: 'absolute', inset: 0 }}>
        <Motif festival={f} />
      </div>
    </div>
  )
  return (
    <Stage bg="#fbf7ef">
      <div style={{ position: 'absolute', inset: 56, border: `1.5px solid ${p.rich}`, opacity: 0.3 }} />
      <Composition
        position={data.position || 'bottom'}
        motifSize={290}
        gap={64}
        behind={0.12}
        style={{ inset: '130px 120px' }}
        motif={motif}
        text={<GreetingText festival={f} data={data} look={look} width={780} />}
      />
    </Stage>
  )
}

function Family({ festival: f, data }) {
  const p = f.palette
  const pos = data.position || 'bottom'
  const top = { top: 330, middle: 430, bottom: 520 }[pos] || 520
  const rand = rng(f.id.length * 7)
  const look = {
    titleFont: 'dancing', titleSize: 108, titleColor: p.rich, titleLine: 1.05,
    bodyFont: 'cormorant', bodySize: 40, bodyWeight: 500, bodyColor: p.ink,
    signoffColor: p.rich, signoffItalic: true, signoffSize: 34, signGap: 26,
    nameFont: 'dancing', nameSize: 84, nameColor: p.ink,
  }
  return (
    <Stage bg={`linear-gradient(180deg, ${p.warm} 0%, ${p.rich} 100%)`}>
      {Array.from({ length: 16 }, (_, i) => {
        const s = 80 + rand() * 220
        return (
          <div key={i} style={{ position: 'absolute', left: rand() * 1080 - s / 2, top: rand() * 1350 - s / 2, width: s, height: s, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,.32) 0%, rgba(255,255,255,0) 70%)' }} />
        )
      })}
      <Hanging type={f.hanging} p={p} />
      <div
        style={{
          position: 'absolute', left: 80, right: 80, top, bottom: 80, borderRadius: 56, background: 'rgba(255,253,248,.95)',
          boxShadow: '0 30px 70px rgba(0,0,0,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 120, paddingBottom: 30,
        }}
      >
        <GreetingText festival={f} data={data} look={look} width={800} />
      </div>
      <div style={{ position: 'absolute', left: 540 - 170, top: top - 230, width: 340, height: 340 }}>
        <Motif festival={f} />
      </div>
    </Stage>
  )
}

function Corporate({ festival: f, data }) {
  const p = f.palette
  const look = {
    kicker: f.tagline, kickerColor: p.rich,
    titleFont: 'playfair', titleSize: 104, titleWeight: 700, titleColor: p.ink, titleLine: 1.05,
    divider: <div style={{ width: 120, height: 6, background: p.gold, margin: '30px 0 30px', borderRadius: 3 }} />,
    bodyFont: 'poppins', bodySize: 33, bodyColor: '#4b5563', bodyWidth: 700,
    signoffFont: 'poppins', signoffSize: 22, signoffUpper: true, signoffSpacing: 5, signoffColor: '#6b7280', signoffWeight: 500, signGap: 60,
    nameFont: 'playfair', nameSize: 62, nameColor: p.ink,
  }
  return (
    <Stage bg="#ffffff">
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 130, background: p.deep, overflow: 'hidden' }}>
        <Lattice color={p.gold} opacity={0.18} />
      </div>
      <div style={{ position: 'absolute', left: 130, top: 0, bottom: 0, width: 6, background: p.gold }} />
      <div style={{ position: 'absolute', right: -130, bottom: -110, width: 660, height: 660, opacity: 0.08 }}>
        <Motif festival={f} />
      </div>
      <div style={{ position: 'absolute', right: 90, top: 90, width: 210, height: 210, borderRadius: '50%', background: p.light, border: `2px solid ${p.gold}`, padding: 26 }}>
        <Motif festival={f} />
      </div>
      <div style={{ position: 'absolute', left: 230, right: 110, top: 330, bottom: 120, display: 'flex', flexDirection: 'column', justifyContent: justify(data.position || 'top') }}>
        <GreetingText festival={f} data={data} look={look} width={740} align="left" />
      </div>
      <div style={{ position: 'absolute', left: 136, right: 0, bottom: 0, height: 16, background: `linear-gradient(90deg, ${p.rich}, ${p.gold})` }} />
    </Stage>
  )
}

function Burst({ festival: f, data }) {
  const p = f.palette
  const look = {
    titleFont: 'poppins', titleSize: 132, titleWeight: 800, titleColor: '#ffffff', titleLine: 1.0, titleShadow: `6px 6px 0 ${shade(p.deep, -0.2)}`,
    bodyFont: 'poppins', bodySize: 34, bodyColor: '#ffffff', bodyOpacity: 0.95, bodyWidth: 760,
    signoffFont: 'poppins', signoffSize: 24, signoffUpper: true, signoffSpacing: 5, signoffColor: '#ffffff', signoffWeight: 500, signGap: 30,
    nameFont: 'poppins', nameSize: 56, nameWeight: 700, nameColor: p.rich, namePill: '#ffffff',
  }
  return (
    <Stage bg={`radial-gradient(circle at 50% 40%, ${p.warm} 0%, ${p.rich} 52%, ${p.deep} 100%)`}>
      <Rays color="#ffffff" cx={540} cy={500} opacity={0.1} />
      <Sprinkles colors={p.confetti} count={70} seed={5} kind="confetti" />
      <div style={{ position: 'absolute', left: 540 - 330, top: 120, width: 660, height: 660, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,.45) 0%, rgba(255,255,255,0) 65%)' }} />
      <Composition
        position={data.position || 'bottom'}
        motifSize={430}
        gap={20}
        behind={0.22}
        style={{ inset: '80px 70px 90px' }}
        motif={<Motif festival={f} />}
        text={<GreetingText festival={f} data={data} look={look} width={880} />}
      />
    </Stage>
  )
}

export const LAYOUTS = {
  traditional: Traditional,
  royal: Royal,
  modern: Modern,
  minimal: Minimal,
  family: Family,
  corporate: Corporate,
  burst: Burst,
}
