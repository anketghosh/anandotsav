/**
 * Festival registry.
 * ------------------------------------------------------------------
 * To add a new festival:
 *   1. Add an entry below (id, title, palette, messages, archetypes…).
 *   2. Optionally add a hero illustration in src/templates/motifs.jsx
 *      (MOTIFS[id]) – otherwise the generic "celebration" motif is used.
 * Templates are generated automatically from `archetypes`.
 *
 * Dates are the next occurrence after Nov 2026. Lunar festivals move
 * every year – update `date` annually (approximate for Eid / Navratri / Puja).
 */

export const FESTIVALS = [
  {
    id: 'diwali',
    name: 'Diwali',
    title: 'Happy Diwali',
    tagline: 'Festival of Lights',
    date: '2026-11-08',
    hanging: 'lanterns',
    palette: { deep: '#3d0a12', rich: '#8a1538', warm: '#f08a24', gold: '#f2c14e', light: '#fff5e1', ink: '#3a0d12', confetti: ['#f2c14e', '#f08a24', '#ff5d73', '#ffe8a3'] },
    archetypes: ['traditional', 'royal', 'modern', 'family', 'corporate', 'minimal'],
    messages: [
      'Wishing you and your family a very Happy Diwali!',
      'May the light of a million diyas fill your home with joy, health and prosperity.',
      'May this Diwali bring new beginnings, bright smiles and endless happiness.',
      'Wishing you a sparkling Diwali and a prosperous year ahead.',
    ],
    keywords: 'free diwali greeting cards with name, personalised diwali wishes, happy diwali greeting download',
  },
  {
    id: 'christmas',
    name: 'Christmas',
    title: 'Merry Christmas',
    tagline: 'Joy to the World',
    date: '2026-12-25',
    hanging: 'baubles',
    palette: { deep: '#0b3d2e', rich: '#a4161a', warm: '#d97706', gold: '#e6c36a', light: '#fbf8f1', ink: '#102a22', confetti: ['#e6c36a', '#a4161a', '#ffffff', '#2d6a4f'] },
    archetypes: ['family', 'minimal', 'royal', 'modern', 'corporate'],
    messages: [
      'Wishing you and your family a very Merry Christmas!',
      'May your home be filled with love, laughter and the warmth of the season.',
      'Wishing you peace, joy and wonder this Christmas and always.',
      'Merry Christmas and a joyful, healthy New Year!',
    ],
    keywords: 'free christmas greeting cards with name, personalised christmas wishes',
  },
  {
    id: 'new-year',
    name: 'New Year',
    title: 'Happy New Year',
    subtitle: '2027',
    tagline: 'Cheers to 2027',
    date: '2027-01-01',
    hanging: 'stars',
    palette: { deep: '#0b1026', rich: '#2b2d7a', warm: '#a855f7', gold: '#f5c84b', light: '#f6f5ff', ink: '#0b1026', confetti: ['#f5c84b', '#a855f7', '#38bdf8', '#f472b6', '#ffffff'] },
    archetypes: ['burst', 'royal', 'modern', 'minimal', 'corporate'],
    messages: [
      'Wishing you and your family a very Happy New Year!',
      'May 2027 bring you new dreams, new hopes and endless happiness.',
      'Here’s to new adventures, good health and success in the year ahead.',
      'Cheers to a fresh start and a wonderful year together!',
    ],
    keywords: 'happy new year 2027 greeting card with name, free new year wishes maker',
  },
  {
    id: 'pongal',
    name: 'Pongal',
    title: 'Happy Pongal',
    tagline: 'Harvest of Happiness',
    date: '2027-01-14',
    hanging: 'marigold',
    palette: { deep: '#3f2a06', rich: '#b45309', warm: '#f59e0b', gold: '#facc15', light: '#fffbea', ink: '#3f2a06', confetti: ['#facc15', '#f59e0b', '#4d7c0f', '#ffffff'] },
    archetypes: ['traditional', 'family', 'modern', 'minimal', 'burst'],
    messages: [
      'Wishing you and your family a very Happy Pongal!',
      'May the harvest season fill your life with sweetness and abundance.',
      'Pongalo Pongal! May your home overflow with joy and prosperity.',
      'Wishing you a bountiful harvest of happiness this Pongal.',
    ],
    keywords: 'happy pongal greeting card with name, personalised pongal wishes',
  },
  {
    id: 'eid',
    name: 'Eid',
    title: 'Eid Mubarak',
    tagline: 'Blessings & Togetherness',
    date: '2027-03-10',
    hanging: 'fanoos',
    palette: { deep: '#0b2a3c', rich: '#11665c', warm: '#d4a373', gold: '#e8c56b', light: '#f7f4ea', ink: '#0b2233', confetti: ['#e8c56b', '#ffffff', '#5fb3a1'] },
    archetypes: ['royal', 'minimal', 'traditional', 'modern', 'corporate'],
    messages: [
      'Wishing you and your family a blessed Eid Mubarak!',
      'May Allah’s blessings fill your home with peace, love and happiness.',
      'May this Eid bring joy, togetherness and countless blessings.',
      'Eid Mubarak! Wishing you warmth, kindness and celebration.',
    ],
    keywords: 'eid mubarak greeting card with name, free eid wishes',
  },
  {
    id: 'holi',
    name: 'Holi',
    title: 'Happy Holi',
    tagline: 'Festival of Colours',
    date: '2027-03-22',
    hanging: 'bunting',
    palette: { deep: '#3b0d6b', rich: '#e0218a', warm: '#ff9f1c', gold: '#ffd23f', light: '#fff7fb', ink: '#2b1140', confetti: ['#e0218a', '#ffd23f', '#2ec4b6', '#3a86ff', '#ff9f1c', '#8ac926'] },
    archetypes: ['burst', 'modern', 'family', 'minimal', 'traditional'],
    messages: [
      'Wishing you and your family a very Happy Holi!',
      'May your life be as colourful and vibrant as the festival of Holi.',
      'Let the colours of joy, love and friendship brighten your day!',
      'Splash some colours and spread some smiles. Happy Holi!',
    ],
    keywords: 'personalised holi greeting cards, holi wishes with name free download',
  },
  {
    id: 'independence-day',
    name: 'Independence Day',
    title: 'Happy Independence Day',
    tagline: 'Jai Hind',
    date: '2027-08-15',
    hanging: 'tricolour',
    palette: { deep: '#0a2463', rich: '#ff9933', warm: '#ffb366', gold: '#f7c35f', light: '#fbfaf5', ink: '#0a2463', confetti: ['#ff9933', '#ffffff', '#138808', '#0a2463'] },
    archetypes: ['modern', 'minimal', 'corporate', 'burst', 'traditional'],
    messages: [
      'Wishing you and your family a very Happy Independence Day!',
      'Let us honour the spirit of freedom and the heroes who made it possible.',
      'Proud to be Indian. Wishing you a glorious Independence Day. Jai Hind!',
      'Freedom in our minds, faith in our words, pride in our hearts.',
    ],
    keywords: 'independence day greeting card with name, 15 august wishes free',
  },
  {
    id: 'raksha-bandhan',
    name: 'Raksha Bandhan',
    title: 'Happy Raksha Bandhan',
    tagline: 'A Bond of Love',
    date: '2027-08-17',
    hanging: 'bunting',
    palette: { deep: '#4c0a3a', rich: '#c2185b', warm: '#f472b6', gold: '#f6c453', light: '#fff1f5', ink: '#4a0d33', confetti: ['#f6c453', '#f472b6', '#c2185b', '#ffffff'] },
    archetypes: ['family', 'minimal', 'royal', 'modern', 'traditional'],
    messages: [
      'Wishing you and your family a very Happy Raksha Bandhan!',
      'A thread of love, a promise of care. Happy Raksha Bandhan!',
      'To the sibling who is my best friend forever – Happy Rakhi!',
      'May the bond between us grow stronger with every passing year.',
    ],
    keywords: 'raksha bandhan greeting card with name, happy rakhi wishes free',
  },
  {
    id: 'ganesh-chaturthi',
    name: 'Ganesh Chaturthi',
    title: 'Happy Ganesh Chaturthi',
    tagline: 'Ganpati Bappa Morya',
    date: '2027-09-04',
    hanging: 'marigold',
    palette: { deep: '#4a1d05', rich: '#c2410c', warm: '#f59e0b', gold: '#fcd34d', light: '#fff7ed', ink: '#431407', confetti: ['#fcd34d', '#f59e0b', '#c2410c', '#ffffff'] },
    archetypes: ['traditional', 'royal', 'family', 'minimal', 'modern'],
    messages: [
      'Wishing you and your family a very Happy Ganesh Chaturthi!',
      'May Lord Ganesha remove all obstacles and bless you with wisdom and success.',
      'Ganpati Bappa Morya! Wishing you happiness, health and prosperity.',
      'May Bappa fill your home with joy, peace and good fortune.',
    ],
    keywords: 'ganesh chaturthi greeting card with name, ganpati wishes free download',
  },
  {
    id: 'navratri',
    name: 'Navratri',
    title: 'Happy Navratri',
    tagline: 'Nine Nights of Devotion',
    date: '2027-09-30',
    hanging: 'bunting',
    palette: { deep: '#1e1b6e', rich: '#d6246e', warm: '#ff7a00', gold: '#ffc93c', light: '#fff8f0', ink: '#1f1147', confetti: ['#ffc93c', '#ff7a00', '#d6246e', '#22c55e', '#3b82f6'] },
    archetypes: ['burst', 'traditional', 'royal', 'modern', 'family'],
    messages: [
      'Wishing you and your family a very Happy Navratri!',
      'May Maa Durga bless you with strength, joy and prosperity these nine nights.',
      'Let the rhythm of garba and dandiya fill your heart with joy!',
      'Nine nights of devotion, a lifetime of blessings. Happy Navratri!',
    ],
    keywords: 'navratri greeting card with name, happy navratri wishes free',
  },
  {
    id: 'durga-puja',
    name: 'Durga Puja',
    title: 'Shubho Durga Puja',
    tagline: 'Celebrate the Divine Mother',
    date: '2027-10-14',
    hanging: 'marigold',
    palette: { deep: '#4a0606', rich: '#b3121b', warm: '#e85d04', gold: '#f4c430', light: '#fff8ee', ink: '#3b0606', confetti: ['#f4c430', '#b3121b', '#ffffff', '#e85d04'] },
    archetypes: ['traditional', 'royal', 'minimal', 'modern', 'family'],
    messages: [
      'Wishing you and your family a very Happy Durga Puja!',
      'May Maa Durga shower her blessings of strength and happiness on you.',
      'Dhaker taale, joy and celebration – Shubho Sharodiya!',
      'May the Goddess destroy all evil and bring prosperity to your home.',
    ],
    keywords: 'durga puja greeting card with name, shubho bijoya wishes free',
  },
  {
    id: 'celebrations',
    name: 'Other Celebrations',
    title: 'Warm Wishes',
    tagline: 'Birthdays, anniversaries & more',
    date: null,
    hanging: 'bunting',
    palette: { deep: '#1f2a44', rich: '#ef476f', warm: '#ffd166', gold: '#f4c95d', light: '#fffaf3', ink: '#1f2a44', confetti: ['#ef476f', '#ffd166', '#06d6a0', '#118ab2', '#ffffff'] },
    archetypes: ['burst', 'minimal', 'royal', 'modern', 'family'],
    messages: [
      'Wishing you and your family joy, love and happiness!',
      'Congratulations! Wishing you a lifetime of happiness and success.',
      'Happy Birthday! May your year be filled with wonderful moments.',
      'Happy Anniversary! Here’s to love, laughter and forever together.',
    ],
    keywords: 'free greeting card maker with name, birthday card with name, anniversary wishes',
  },
]

export const getFestival = (id) => FESTIVALS.find((f) => f.id === id)

/** Days until a festival (null if undated / passed). */
export function daysUntil(dateStr, now = new Date()) {
  if (!dateStr) return null
  const d = new Date(dateStr + 'T00:00:00')
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const diff = Math.round((d - today) / 86400000)
  return diff >= 0 ? diff : null
}

export function whenLabel(dateStr) {
  const d = daysUntil(dateStr)
  if (d === null) return dateStr ? 'Celebrate anytime' : 'Any occasion'
  if (d === 0) return 'Today!'
  if (d === 1) return 'Tomorrow'
  if (d <= 30) return `In ${d} days`
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
}

/** Festivals ordered by next date; undated go last. */
export const upcomingFestivals = () =>
  [...FESTIVALS].sort((a, b) => (daysUntil(a.date) ?? 9999) - (daysUntil(b.date) ?? 9999))

export const SIGNOFFS = ['Warm Regards,', 'With Love,', 'Best Wishes,', 'Heartfelt Wishes,', 'From,']
