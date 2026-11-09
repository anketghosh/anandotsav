// Self-hosted (latin subset) so PNG export can embed them – no Google Fonts CDN.
import '@fontsource/playfair-display/latin-400.css'
import '@fontsource/playfair-display/latin-600.css'
import '@fontsource/playfair-display/latin-700.css'
import '@fontsource/playfair-display/latin-400-italic.css'
import '@fontsource/cormorant-garamond/latin-400.css'
import '@fontsource/cormorant-garamond/latin-500.css'
import '@fontsource/cormorant-garamond/latin-600.css'
import '@fontsource/cormorant-garamond/latin-400-italic.css'
import '@fontsource/cormorant-garamond/latin-500-italic.css'
import '@fontsource/great-vibes/latin-400.css'
import '@fontsource/cinzel/latin-400.css'
import '@fontsource/cinzel/latin-600.css'
import '@fontsource/cinzel/latin-700.css'
import '@fontsource/poppins/latin-300.css'
import '@fontsource/poppins/latin-400.css'
import '@fontsource/poppins/latin-500.css'
import '@fontsource/poppins/latin-600.css'
import '@fontsource/poppins/latin-700.css'
import '@fontsource/poppins/latin-800.css'
import '@fontsource/dancing-script/latin-500.css'
import '@fontsource/dancing-script/latin-700.css'

/** k ≈ average glyph width / font-size – used to auto-fit text on one line. */
export const FONTS = {
  playfair: { label: 'Playfair Display', css: "'Playfair Display', serif", k: 0.56, weight: 600 },
  cormorant: { label: 'Cormorant Garamond', css: "'Cormorant Garamond', serif", k: 0.47, weight: 500 },
  greatvibes: { label: 'Great Vibes', css: "'Great Vibes', cursive", k: 0.42, weight: 400 },
  cinzel: { label: 'Cinzel', css: "'Cinzel', serif", k: 0.74, weight: 600 },
  poppins: { label: 'Poppins', css: "'Poppins', sans-serif", k: 0.62, weight: 600 },
  dancing: { label: 'Dancing Script', css: "'Dancing Script', cursive", k: 0.47, weight: 700 },
}
