/* Hand-built SVG illustrations. Everything is vector, so cards export
   crisp at any resolution and the bundle stays tiny (no image assets). */
import { useId } from 'react'

export const useUid = (prefix = 'u') => prefix + useId().replace(/[^a-zA-Z0-9]/g, '')
const url = (id) => `url(#${id})`

// deterministic PRNG so decorations never "jump" between renders
export function rng(seed = 1) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function blobPath(cx, cy, r, seed = 1, n = 9, jitter = 0.28) {
  const rand = rng(seed)
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2
    const rr = r * (1 - jitter / 2 + rand() * jitter)
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]
  })
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
  let d = `M${mid(pts[n - 1], pts[0]).join(' ')}`
  pts.forEach((p, i) => {
    const m = mid(p, pts[(i + 1) % n])
    d += ` Q${p[0].toFixed(1)} ${p[1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`
  })
  return d + 'Z'
}

export function starPath(cx, cy, R, r, n = 5, rot = -Math.PI / 2) {
  let d = ''
  for (let i = 0; i < n * 2; i++) {
    const rad = i % 2 ? r : R
    const a = rot + (i * Math.PI) / n
    d += `${i ? 'L' : 'M'}${(cx + Math.cos(a) * rad).toFixed(1)} ${(cy + Math.sin(a) * rad).toFixed(1)}`
  }
  return d + 'Z'
}

const Svg = ({ children, vb = '0 0 200 200', style }) => (
  <svg viewBox={vb} width="100%" height="100%" style={{ display: 'block', overflow: 'visible', ...style }} xmlns="http://www.w3.org/2000/svg">
    {children}
  </svg>
)

/* ───────────────────────── Hero motifs ───────────────────────── */

function Diya({ p }) {
  const id = useUid('diya')
  return (
    <Svg>
      <defs>
        <radialGradient id={id + 'g'}>
          <stop offset="0" stopColor="#ffe9a8" stopOpacity=".95" />
          <stop offset=".45" stopColor={p.warm} stopOpacity=".35" />
          <stop offset="1" stopColor={p.warm} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id + 'f'} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff3b0" />
          <stop offset=".5" stopColor="#ffb703" />
          <stop offset="1" stopColor="#fb5607" />
        </linearGradient>
        <linearGradient id={id + 'b'} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9894a" />
          <stop offset="1" stopColor="#7a2e12" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="74" r="70" fill={url(id + 'g')} />
      <path d="M100 28 C115 54 121 75 100 101 C79 75 85 54 100 28Z" fill={url(id + 'f')} />
      <path d="M100 60 C107 74 107 86 100 97 C93 86 93 74 100 60Z" fill="#fffbe6" />
      <rect x="98" y="97" width="4" height="10" rx="2" fill="#3b1d0e" />
      <path d="M26 108 Q100 94 174 108 Q164 158 100 162 Q36 158 26 108Z" fill={url(id + 'b')} />
      <path d="M26 108 Q100 122 174 108" fill="none" stroke={p.gold} strokeWidth="4.5" strokeLinecap="round" />
      {[52, 68, 84, 100, 116, 132, 148].map((x, i) => (
        <circle key={x} cx={x} cy={136 + Math.abs(i - 3) * -1.5} r={i % 2 ? 3 : 4.5} fill={p.gold} />
      ))}
      <path d="M58 150 Q100 162 142 150" stroke={p.gold} strokeWidth="2" fill="none" opacity=".7" />
      <ellipse cx="100" cy="174" rx="60" ry="7" fill="#000" opacity=".18" />
    </Svg>
  )
}

function Holi({ p }) {
  const c = ['#e0218a', '#ffd23f', '#2ec4b6', '#3a86ff', '#ff9f1c', '#8ac926']
  const blobs = [[66, 66, 40], [134, 62, 36], [154, 112, 32], [48, 118, 34], [100, 92, 44]]
  const rand = rng(7)
  return (
    <Svg>
      {blobs.map(([x, y, r], i) => (
        <path key={i} d={blobPath(x, y, r, i * 13 + 3, 11, 0.45)} fill={c[i]} opacity=".9" />
      ))}
      {Array.from({ length: 22 }, (_, i) => {
        const a = rand() * Math.PI * 2, d = 70 + rand() * 30
        return <circle key={i} cx={100 + Math.cos(a) * d} cy={90 + Math.sin(a) * d * 0.8} r={1.5 + rand() * 4} fill={c[i % 6]} />
      })}
      <ellipse cx="100" cy="166" rx="74" ry="17" fill={p.gold} />
      <ellipse cx="100" cy="162" rx="64" ry="12" fill="#fff4c2" />
      {[[68, '#e0218a'], [100, '#2ec4b6'], [132, '#ffd23f']].map(([x, col]) => (
        <path key={x} d={`M${x - 18} 163 Q${x} 132 ${x + 18} 163Z`} fill={col} />
      ))}
    </Svg>
  )
}

function DurgaEyes({ p }) {
  const eye = (
    <g>
      <path d="M100 136 Q132 110 176 128 Q140 146 100 136Z" fill="#fff" stroke="#1b0b08" strokeWidth="4.5" strokeLinejoin="round" />
      <path d="M176 128 Q186 124 192 114" fill="none" stroke="#1b0b08" strokeWidth="4" strokeLinecap="round" />
      <circle cx="142" cy="128" r="10" fill="#1b0b08" />
      <circle cx="145" cy="125" r="3" fill="#fff" />
      <path d="M104 112 Q140 92 182 108" fill="none" stroke="#1b0b08" strokeWidth="6" strokeLinecap="round" />
    </g>
  )
  return (
    <Svg>
      <path d="M24 82 A76 76 0 0 1 176 82 L158 82 A58 58 0 0 0 42 82Z" fill={p.gold} />
      {Array.from({ length: 9 }, (_, i) => {
        const a = Math.PI + (i / 8) * Math.PI
        return <circle key={i} cx={100 + Math.cos(a) * 67} cy={82 + Math.sin(a) * 67} r={i % 2 ? 4 : 6} fill={i % 2 ? '#fff' : p.rich} />
      })}
      <path d="M100 72 Q100 30 100 18" stroke={p.gold} strokeWidth="5" strokeLinecap="round" />
      <circle cx="100" cy="16" r="7" fill={p.rich} stroke={p.gold} strokeWidth="3" />
      <path d="M100 86 Q111 101 100 116 Q89 101 100 86Z" fill="#fff" stroke="#1b0b08" strokeWidth="3.5" />
      <circle cx="100" cy="101" r="5" fill="#1b0b08" />
      <circle cx="100" cy="124" r="6" fill={p.rich} />
      <g transform="translate(-6 0)">{eye}</g>
      <g transform="translate(206 0) scale(-1 1)">{eye}</g>
      <path d="M100 140 Q95 160 103 166" fill="none" stroke="#1b0b08" strokeWidth="3" strokeLinecap="round" opacity=".6" />
    </Svg>
  )
}

function Marigold({ cx, cy, r }) {
  return (
    <g>
      {Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2
        return <circle key={i} cx={cx + Math.cos(a) * r * 0.62} cy={cy + Math.sin(a) * r * 0.62} r={r * 0.42} fill="#f97316" />
      })}
      <circle cx={cx} cy={cy} r={r * 0.7} fill="#fb923c" />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2
        return <circle key={i} cx={cx + Math.cos(a) * r * 0.36} cy={cy + Math.sin(a) * r * 0.36} r={r * 0.26} fill="#fbbf24" />
      })}
      <circle cx={cx} cy={cy} r={r * 0.22} fill="#f59e0b" />
    </g>
  )
}

function Modak({ p }) {
  const id = useUid('mdk')
  const one = (x, y, s) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 -62 C8 -42 40 -22 40 8 C40 30 22 42 0 42 C-22 42 -40 30 -40 8 C-40 -22 -8 -42 0 -62Z" fill={url(id)} />
      {[-30, -16, 0, 16, 30].map((x2) => (
        <path key={x2} d={`M0 -56 Q${x2 * 0.5} -4 ${x2} 38`} fill="none" stroke="#b45309" strokeOpacity=".35" strokeWidth="2.2" />
      ))}
      <ellipse cx="-14" cy="-8" rx="6" ry="14" fill="#fff" opacity=".45" />
    </g>
  )
  return (
    <Svg>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff7e0" />
          <stop offset="1" stopColor="#f6c879" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="160" rx="86" ry="20" fill={p.gold} />
      <ellipse cx="100" cy="155" rx="76" ry="13" fill="#fff1c1" />
      {one(58, 128, 0.62)}
      {one(142, 128, 0.62)}
      {one(100, 112, 0.9)}
      <ellipse cx="22" cy="150" rx="18" ry="7" fill="#4d7c0f" transform="rotate(-25 22 150)" />
      <ellipse cx="178" cy="150" rx="18" ry="7" fill="#4d7c0f" transform="rotate(25 178 150)" />
      <Marigold cx={24} cy={162} r={15} />
      <Marigold cx={176} cy={162} r={15} />
    </Svg>
  )
}

function Rakhi({ p }) {
  return (
    <Svg>
      <path d="M-6 112 C34 88 62 132 100 110 C138 88 166 132 206 108" fill="none" stroke={p.rich} strokeWidth="7" strokeLinecap="round" />
      <path d="M-6 112 C34 88 62 132 100 110 C138 88 166 132 206 108" fill="none" stroke={p.gold} strokeWidth="2" strokeDasharray="6 6" />
      {[[4, 112], [196, 108]].map(([x, y]) => (
        <g key={x}>
          <path d={`M${x} ${y} L${x} ${y + 34}`} stroke={p.rich} strokeWidth="3" />
          <circle cx={x} cy={y + 40} r="8" fill={p.gold} />
          <path d={`M${x - 6} ${y + 46} L${x - 8} ${y + 62} M${x} ${y + 48} L${x} ${y + 64} M${x + 6} ${y + 46} L${x + 8} ${y + 62}`} stroke={p.gold} strokeWidth="2" />
        </g>
      ))}
      <g transform="translate(100 110)">
        {Array.from({ length: 14 }, (_, i) => (
          <ellipse key={i} cx="0" cy="-42" rx="11" ry="26" fill={i % 2 ? p.warm : p.rich} transform={`rotate(${(i * 360) / 14})`} />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <ellipse key={i} cx="0" cy="-28" rx="8" ry="16" fill={p.gold} transform={`rotate(${(i * 36) + 18})`} />
        ))}
        <circle r="24" fill={p.rich} stroke={p.gold} strokeWidth="3" />
        {Array.from({ length: 14 }, (_, i) => {
          const a = (i / 14) * Math.PI * 2
          return <circle key={i} cx={Math.cos(a) * 18} cy={Math.sin(a) * 18} r="2.4" fill="#fff" />
        })}
        <circle r="11" fill={p.gold} />
        <circle cx="-3" cy="-4" r="3.5" fill="#fff" opacity=".8" />
      </g>
    </Svg>
  )
}

function Garba({ p }) {
  const id = useUid('grb')
  const stick = (rot) => (
    <g transform={`translate(100 110) rotate(${rot})`}>
      <rect x="-6" y="-96" width="12" height="176" rx="6" fill={p.gold} />
      {[-80, -50, -20, 10, 40, 64].map((y, i) => (
        <rect key={y} x="-6" y={y} width="12" height="10" fill={i % 2 ? p.rich : '#22c55e'} />
      ))}
    </g>
  )
  return (
    <Svg>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.warm} />
          <stop offset="1" stopColor={p.rich} />
        </linearGradient>
        <radialGradient id={id + 'g'}>
          <stop offset="0" stopColor="#fff3b0" />
          <stop offset="1" stopColor="#fff3b0" stopOpacity="0" />
        </radialGradient>
      </defs>
      {stick(-34)}
      {stick(34)}
      <circle cx="100" cy="46" r="34" fill={url(id + 'g')} />
      <path d="M100 26 C108 40 110 50 100 62 C90 50 92 40 100 26Z" fill="#ffb703" />
      <rect x="80" y="64" width="40" height="14" rx="4" fill={p.gold} />
      <path d="M62 116 Q60 76 100 76 Q140 76 138 116 Q138 166 100 168 Q62 166 62 116Z" fill={url(id)} />
      {Array.from({ length: 4 }, (_, r) =>
        Array.from({ length: 5 }, (_, c) => (
          <circle key={`${r}${c}`} cx={76 + c * 12 + (r % 2) * 6} cy={98 + r * 16} r="3.6" fill="#ffe66d" />
        )),
      )}
      <path d="M64 110 Q100 120 136 110" stroke={p.gold} strokeWidth="3" fill="none" />
      <ellipse cx="100" cy="176" rx="46" ry="6" fill="#000" opacity=".15" />
    </Svg>
  )
}

function Tree({ p }) {
  const id = useUid('tree')
  return (
    <Svg>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2d8a5f" />
          <stop offset="1" stopColor="#0b4a33" />
        </linearGradient>
      </defs>
      <rect x="90" y="156" width="20" height="24" rx="3" fill="#6b3f1d" />
      <path d="M100 82 L168 160 Q100 146 32 160Z" fill={url(id)} />
      <path d="M100 54 L152 118 Q100 106 48 118Z" fill={url(id)} />
      <path d="M100 30 L134 80 Q100 70 66 80Z" fill={url(id)} />
      <path d="M58 112 Q100 128 146 104" stroke={p.gold} strokeWidth="2.5" fill="none" strokeDasharray="1 6" strokeLinecap="round" />
      <path d="M44 152 Q100 168 160 144" stroke={p.gold} strokeWidth="2.5" fill="none" strokeDasharray="1 6" strokeLinecap="round" />
      {[[84, 70, p.rich], [116, 96, p.gold], [72, 104, p.gold], [128, 134, p.rich], [86, 138, '#fff'], [60, 146, p.rich], [146, 152, p.gold], [104, 118, p.rich]].map(([x, y, c], i) => (
        <circle key={i} cx={x} cy={y} r="5.5" fill={c} />
      ))}
      <path d={starPath(100, 26, 16, 7)} fill={p.gold} />
    </Svg>
  )
}

function Crescent({ p }) {
  const id = useUid('moon')
  return (
    <Svg>
      <defs>
        <mask id={id}>
          <rect width="200" height="200" fill="#fff" />
          <circle cx="118" cy="56" r="40" fill="#000" />
        </mask>
      </defs>
      <circle cx="96" cy="70" r="48" fill={p.gold} mask={url(id)} />
      <path d={starPath(140, 66, 13, 5.5)} fill={p.gold} />
      <path d={starPath(166, 30, 6, 2.5)} fill={p.gold} opacity=".8" />
      <path d={starPath(40, 28, 5, 2)} fill={p.gold} opacity=".7" />
      <g fill={p.gold}>
        <rect x="30" y="182" width="140" height="10" rx="2" />
        <path d="M68 182 Q66 140 100 130 Q134 140 132 182Z" />
        <rect x="99" y="112" width="2" height="18" />
        <path d={starPath(100, 110, 4, 1.8)} />
        <rect x="36" y="134" width="9" height="48" />
        <path d="M34 134 L40.5 116 L47 134Z" />
        <rect x="155" y="134" width="9" height="48" />
        <path d="M153 134 L159.5 116 L166 134Z" />
        <path d="M48 182 Q48 160 58 154 Q68 160 68 182Z" />
        <path d="M132 182 Q132 160 142 154 Q152 160 152 182Z" />
      </g>
    </Svg>
  )
}

function Burst({ cx, cy, r, color, n = 16 }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2
        const x1 = cx + Math.cos(a) * r * 0.3, y1 = cy + Math.sin(a) * r * 0.3
        const x2 = cx + Math.cos(a) * r, y2 = cy + Math.sin(a) * r
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2.4" strokeLinecap="round" />
            <circle cx={cx + Math.cos(a) * (r + 6)} cy={cy + Math.sin(a) * (r + 6)} r="2.6" fill={color} />
          </g>
        )
      })}
    </g>
  )
}

function Fireworks({ p }) {
  const glass = (x, rot) => (
    <g transform={`translate(${x} 150) rotate(${rot})`}>
      <path d="M-14 -46 L14 -46 L10 -8 Q0 2 -10 -8Z" fill={p.gold} />
      <path d="M-12 -36 L12 -36 L10 -8 Q0 2 -10 -8Z" fill="#fff3c4" opacity=".55" />
      <rect x="-1.5" y="-6" width="3" height="34" fill={p.gold} />
      <ellipse cx="0" cy="29" rx="13" ry="3.5" fill={p.gold} />
    </g>
  )
  return (
    <Svg>
      <Burst cx={66} cy={58} r={44} color={p.gold} n={18} />
      <Burst cx={146} cy={50} r={34} color={p.warm} n={14} />
      <Burst cx={120} cy={104} r={22} color="#38bdf8" n={12} />
      {glass(86, -14)}
      {glass(114, 14)}
      <path d={starPath(100, 100, 7, 2.5, 4)} fill="#fff" />
    </Svg>
  )
}

function PongalPot({ p }) {
  const id = useUid('pot')
  const cane = (rot) => (
    <g transform={`translate(100 120) rotate(${rot})`}>
      <rect x="-5" y="-110" width="10" height="160" rx="4" fill="#4d7c0f" />
      {[-90, -66, -42, -18, 6, 30].map((y) => <rect key={y} x="-6" y={y} width="12" height="3" fill="#365314" />)}
      <path d="M0 -110 Q-30 -130 -40 -150 M0 -110 Q24 -136 30 -156 M0 -110 Q-8 -140 -2 -162" stroke="#65a30d" strokeWidth="4" fill="none" strokeLinecap="round" />
    </g>
  )
  return (
    <Svg>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8693b" />
          <stop offset="1" stopColor="#7a2e12" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="70" r="40" fill={p.gold} opacity=".9" />
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2
        return <line key={i} x1={100 + Math.cos(a) * 48} y1={70 + Math.sin(a) * 48} x2={100 + Math.cos(a) * 64} y2={70 + Math.sin(a) * 64} stroke={p.gold} strokeWidth="4" strokeLinecap="round" />
      })}
      {cane(-28)}
      {cane(28)}
      <path d="M54 124 Q48 172 100 174 Q152 172 146 124 Q144 104 100 102 Q56 104 54 124Z" fill={url(id)} />
      <path d="M62 132 Q100 144 138 132 M60 150 Q100 162 140 150" stroke="#fff" strokeWidth="2.5" fill="none" strokeDasharray="2 6" strokeLinecap="round" />
      <ellipse cx="100" cy="104" rx="38" ry="8" fill="#5c2410" />
      <path d={blobPath(100, 96, 30, 5, 10, 0.35)} fill="#fffdf5" />
      <path d="M70 104 Q66 116 72 120 Q78 116 76 104Z M128 104 Q126 118 132 122 Q138 116 132 104Z" fill="#fffdf5" />
      <ellipse cx="100" cy="180" rx="56" ry="6" fill="#000" opacity=".15" />
    </Svg>
  )
}

function Tricolour() {
  return (
    <Svg>
      <path d="M-4 60 C46 20 154 20 204 60 L204 82 C154 42 46 42 -4 82Z" fill="#ff9933" />
      <path d="M-4 160 C46 200 154 200 204 160 L204 138 C154 178 46 178 -4 138Z" fill="#138808" />
      <circle cx="100" cy="110" r="56" fill="#fff" />
      <circle cx="100" cy="110" r="44" fill="none" stroke="#0a2a8a" strokeWidth="5" />
      {Array.from({ length: 24 }, (_, i) => {
        const a = (i / 24) * Math.PI * 2
        return <line key={i} x1="100" y1="110" x2={100 + Math.cos(a) * 42} y2={110 + Math.sin(a) * 42} stroke="#0a2a8a" strokeWidth="2" />
      })}
      <circle cx="100" cy="110" r="7" fill="#0a2a8a" />
    </Svg>
  )
}

function Balloons({ p }) {
  const b = [[64, 70, p.rich], [104, 50, p.warm], [142, 76, '#06d6a0']]
  return (
    <Svg>
      {b.map(([x, y, c], i) => (
        <g key={i}>
          <path d={`M${x} ${y + 34} Q${x + (i - 1) * -10} ${y + 80} 100 150`} stroke="#94a3b8" strokeWidth="1.6" fill="none" />
          <ellipse cx={x} cy={y} rx="26" ry="32" fill={c} />
          <path d={`M${x - 4} ${y + 31} L${x + 4} ${y + 31} L${x} ${y + 37}Z`} fill={c} />
          <ellipse cx={x - 9} cy={y - 12} rx="5" ry="9" fill="#fff" opacity=".45" />
        </g>
      ))}
      <rect x="72" y="140" width="56" height="44" rx="5" fill={p.ink} />
      <rect x="66" y="130" width="68" height="14" rx="4" fill={p.ink} />
      <rect x="95" y="130" width="10" height="54" fill={p.gold} />
      <path d="M100 130 Q82 110 78 124 Q84 132 100 130 Q118 110 122 124 Q116 132 100 130Z" fill={p.gold} />
    </Svg>
  )
}

export const MOTIFS = {
  diwali: Diya,
  holi: Holi,
  'durga-puja': DurgaEyes,
  'ganesh-chaturthi': Modak,
  'raksha-bandhan': Rakhi,
  navratri: Garba,
  christmas: Tree,
  eid: Crescent,
  'new-year': Fireworks,
  pongal: PongalPot,
  'independence-day': Tricolour,
  celebrations: Balloons,
}

export function Motif({ festival }) {
  const C = MOTIFS[festival.id] || Balloons
  return <C p={festival.palette} />
}

/* ───────────────────────── Decorations ───────────────────────── */

export function Mandala({ color, size = 400, opacity = 1 }) {
  return (
    <svg viewBox="-200 -200 400 400" width={size} height={size} style={{ display: 'block', opacity }}>
      <g fill="none" stroke={color} strokeWidth="1.6">
        <circle r="190" strokeDasharray="2 8" strokeLinecap="round" />
        <circle r="176" />
        {Array.from({ length: 24 }, (_, i) => (
          <path key={'a' + i} d="M0 -176 Q14 -150 0 -126 Q-14 -150 0 -176Z" transform={`rotate(${i * 15})`} fill={color} fillOpacity=".18" />
        ))}
        <circle r="124" />
        {Array.from({ length: 16 }, (_, i) => (
          <ellipse key={'b' + i} cx="0" cy="-98" rx="13" ry="26" transform={`rotate(${i * 22.5})`} />
        ))}
        <circle r="70" strokeDasharray="1 6" strokeLinecap="round" strokeWidth="3" />
        {Array.from({ length: 12 }, (_, i) => (
          <path key={'c' + i} d="M0 -64 Q18 -40 0 -18 Q-18 -40 0 -64Z" transform={`rotate(${i * 30})`} fill={color} fillOpacity=".25" />
        ))}
        <circle r="14" fill={color} fillOpacity=".4" />
      </g>
    </svg>
  )
}

export function Lattice({ color, opacity = 0.08 }) {
  const id = useUid('lat')
  return (
    <svg width="1080" height="1350" style={{ position: 'absolute', inset: 0, opacity }}>
      <defs>
        <pattern id={id} width="72" height="72" patternUnits="userSpaceOnUse">
          <path d="M36 0 L72 36 L36 72 L0 36Z" fill="none" stroke={color} strokeWidth="2" />
          <circle cx="36" cy="36" r="9" fill="none" stroke={color} strokeWidth="2" />
          <circle cx="0" cy="0" r="4" fill={color} />
          <circle cx="72" cy="72" r="4" fill={color} />
          <circle cx="72" cy="0" r="4" fill={color} />
          <circle cx="0" cy="72" r="4" fill={color} />
        </pattern>
      </defs>
      <rect width="1080" height="1350" fill={url(id)} />
    </svg>
  )
}

export function DotGrid({ color, opacity = 0.18, gap = 36 }) {
  const id = useUid('dg')
  return (
    <svg width="1080" height="1350" style={{ position: 'absolute', inset: 0, opacity }}>
      <defs>
        <pattern id={id} width={gap} height={gap} patternUnits="userSpaceOnUse">
          <circle cx={gap / 2} cy={gap / 2} r="2.4" fill={color} />
        </pattern>
      </defs>
      <rect width="1080" height="1350" fill={url(id)} />
    </svg>
  )
}

export function Corner({ color, size = 150, style }) {
  return (
    <svg viewBox="0 0 150 150" width={size} height={size} style={{ position: 'absolute', ...style }}>
      <g fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
        <path d="M6 6 L144 6 M6 6 L6 144" />
        <path d="M6 64 Q64 64 64 6" />
        <path d="M6 100 Q100 100 100 6" opacity=".6" />
        <path d="M20 20 Q44 30 50 54 Q30 48 20 20Z" fill={color} fillOpacity=".35" />
      </g>
      <circle cx="30" cy="30" r="6" fill={color} />
      <circle cx="124" cy="6" r="4" fill={color} />
      <circle cx="6" cy="124" r="4" fill={color} />
    </svg>
  )
}

/** Scattered sparkles / dots / confetti across the full card. */
export function Sprinkles({ colors, count = 40, seed = 3, kind = 'sparkle', area = [0, 0, 1080, 1350], opacity = 1 }) {
  const rand = rng(seed)
  const [x0, y0, w, h] = area
  return (
    <svg width="1080" height="1350" style={{ position: 'absolute', inset: 0, opacity, pointerEvents: 'none' }}>
      {Array.from({ length: count }, (_, i) => {
        const x = x0 + rand() * w, y = y0 + rand() * h, s = 0.5 + rand() * 1.2, c = colors[i % colors.length], rot = rand() * 180
        if (kind === 'confetti')
          return i % 3 === 0 ? (
            <circle key={i} cx={x} cy={y} r={5 * s} fill={c} />
          ) : (
            <rect key={i} x={x} y={y} width={22 * s} height={9 * s} rx="2" fill={c} transform={`rotate(${rot} ${x} ${y})`} />
          )
        if (kind === 'dot') return <circle key={i} cx={x} cy={y} r={3 * s} fill={c} opacity={0.4 + rand() * 0.6} />
        return <path key={i} d={starPath(x, y, 12 * s, 2.6 * s, 4)} fill={c} opacity={0.5 + rand() * 0.5} />
      })}
    </svg>
  )
}

/** Sunburst rays, centred on (cx, cy). */
export function Rays({ color, cx = 540, cy = 560, n = 32, opacity = 0.12 }) {
  return (
    <svg width="1080" height="1350" style={{ position: 'absolute', inset: 0, opacity }}>
      {Array.from({ length: n }, (_, i) => {
        if (i % 2) return null
        const a1 = (i / n) * Math.PI * 2, a2 = ((i + 1) / n) * Math.PI * 2, R = 1600
        return <path key={i} d={`M${cx} ${cy} L${cx + Math.cos(a1) * R} ${cy + Math.sin(a1) * R} L${cx + Math.cos(a2) * R} ${cy + Math.sin(a2) * R}Z`} fill={color} />
      })}
    </svg>
  )
}

/* Hanging decorations along the top edge (1080 × 320). */
const qpt = (t, p0, p1, p2) => (1 - t) ** 2 * p0 + 2 * (1 - t) * t * p1 + t ** 2 * p2

export function Hanging({ type, p, height = 320 }) {
  const id = useUid('hg')
  const W = 1080
  const strands = [[110, 150], [280, 230], [800, 200], [970, 130]]

  if (type === 'bunting' || type === 'tricolour') {
    const cols = type === 'tricolour' ? ['#ff9933', '#ffffff', '#138808'] : p.confetti
    const swags = [[0, 30, 130], [0, 10, 210]]
    return (
      <svg width={W} height={height} style={{ position: 'absolute', top: 0, left: 0 }}>
        {swags.map(([, y, sag], s) => {
          const flags = 16
          return (
            <g key={s}>
              <path d={`M-20 ${y} Q540 ${y + sag * 2} 1100 ${y}`} stroke={p.gold} strokeWidth="3" fill="none" />
              {Array.from({ length: flags }, (_, i) => {
                const t = (i + 0.5) / flags
                const x = qpt(t, -20, 540, 1100), yy = qpt(t, y, y + sag * 2, y)
                return <path key={i} d={`M${x - 26} ${yy} L${x + 26} ${yy} L${x} ${yy + 58}Z`} fill={cols[(i + s) % cols.length]} stroke="rgba(0,0,0,.08)" />
              })}
            </g>
          )
        })}
      </svg>
    )
  }

  if (type === 'marigold') {
    return (
      <svg width={W} height={height} style={{ position: 'absolute', top: 0, left: 0 }}>
        {Array.from({ length: 13 }, (_, i) => {
          const x = 30 + i * 85, len = 3 + ((i * 7) % 5)
          return (
            <g key={i}>
              {Array.from({ length: len }, (_, k) => (
                <circle key={k} cx={x} cy={28 + k * 30} r="15" fill={k % 2 ? '#fbbf24' : '#f97316'} />
              ))}
              <circle cx={x} cy={34 + len * 30} r="7" fill={p.rich} />
            </g>
          )
        })}
        {Array.from({ length: 26 }, (_, i) => (
          <ellipse key={i} cx={i * 43} cy="14" rx="26" ry="11" fill={i % 2 ? '#3f6212' : '#65a30d'} transform={`rotate(${i % 2 ? 18 : -18} ${i * 43} 14)`} />
        ))}
      </svg>
    )
  }

  // lantern-like strands
  const item = (x, y, i) => {
    if (type === 'baubles')
      return (
        <g>
          <rect x={x - 8} y={y - 6} width="16" height="12" rx="2" fill={p.gold} />
          <circle cx={x} cy={y + 34} r="30" fill={i % 2 ? p.rich : p.gold} />
          <ellipse cx={x - 10} cy={y + 22} rx="8" ry="12" fill="#fff" opacity=".35" />
        </g>
      )
    if (type === 'stars') return <path d={starPath(x, y + 30, 32, 13)} fill={i % 2 ? p.gold : '#fff'} />
    if (type === 'fanoos')
      return (
        <g>
          <path d={`M${x - 22} ${y + 18} Q${x} ${y - 14} ${x + 22} ${y + 18}Z`} fill={p.gold} />
          <path d={`M${x - 26} ${y + 18} L${x + 26} ${y + 18} L${x + 20} ${y + 84} L${x - 20} ${y + 84}Z`} fill={p.gold} />
          <path d={`M${x - 14} ${y + 28} L${x + 14} ${y + 28} L${x + 11} ${y + 74} L${x - 11} ${y + 74}Z`} fill="#fff4c4" />
          <path d={`M${x - 16} ${y + 84} L${x + 16} ${y + 84} L${x} ${y + 104}Z`} fill={p.gold} />
        </g>
      )
    // diwali kandil
    return (
      <g>
        <circle cx={x} cy={y + 48} r="52" fill={`url(#${id})`} />
        <path d={`M${x} ${y} L${x + 36} ${y + 48} L${x} ${y + 96} L${x - 36} ${y + 48}Z`} fill={i % 2 ? p.rich : p.warm} stroke={p.gold} strokeWidth="3" />
        <path d={`M${x} ${y + 14} L${x + 22} ${y + 48} L${x} ${y + 82} L${x - 22} ${y + 48}Z`} fill={p.gold} opacity=".75" />
        {[-10, 0, 10].map((d) => <path key={d} d={`M${x + d} ${y + 96} L${x + d * 1.4} ${y + 140}`} stroke={p.gold} strokeWidth="2.5" />)}
      </g>
    )
  }
  return (
    <svg width={W} height={height} style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}>
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor="#ffe9a8" stopOpacity=".7" />
          <stop offset="1" stopColor="#ffe9a8" stopOpacity="0" />
        </radialGradient>
      </defs>
      {strands.map(([x, len], i) => (
        <g key={i}>
          <line x1={x} y1="0" x2={x} y2={len} stroke={p.gold} strokeWidth="2" />
          {item(x, len, i)}
        </g>
      ))}
    </svg>
  )
}
