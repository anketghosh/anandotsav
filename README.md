# Anandotsav

**Celebrate · Personalise · Share**: *anand* (joy) + *utsav* (festival)

A free, no-login web app for creating personalised festival greeting cards. Pick a festival, choose a design, type your name, preview it live, then download a high-resolution PNG or share it on WhatsApp.

- 12 celebrations × 5–6 designs each = **61 templates** (Traditional, Modern, Luxury, Minimal)
- Live personalisation: name, message (4 presets per festival, or your own), heading, sign-off, 6 fonts, text colour, position and size
- **2160 × 2700 px PNG** download, no watermark
- WhatsApp sharing: mobile attaches the image through the share sheet; desktop downloads the image and opens WhatsApp with a ready-made message
- Everything runs in the browser. There's no backend, database, paid API or tracking.
- SEO: a page for each festival, per-route titles and descriptions, JSON-LD (WebApplication + FAQ), sitemap and robots.txt

## anket.ai branding, Instagram and email signup

All of it is set in **`src/config/brand.js`**:

- `instagram`: your Instagram username, without the @. Every follow button, the top strip, the customiser banner and the after-download popup link to `instagram.com/<handle>`. On phones that opens the Instagram app.
- `subscribeEndpoint`: optional email signup. **Leave it empty if you host on Netlify.** Netlify Forms catches signups automatically and you'll find them under *Site → Forms*. **On Vercel** (or anywhere else), create a free form at https://formspree.io and paste its endpoint URL here.

Where visitors are asked to follow:
1. A thin "anket.ai · Follow for AI & Tech updates" strip at the top of every page
2. A "Love free tools like this?" card on the homepage, with an Instagram button and an email field
3. A banner under the preview in the customiser
4. A popup after the first download or share in each session, with a one-tap **Follow on Instagram** button, an optional email field and "Maybe later"
5. The footer, with a follow button, an email field and "a project by anket.ai"

Following and subscribing are always optional. Nothing blocks the download.

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | React 19 + Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router |
| Card artwork | Hand-built inline SVG (no image files, so it stays crisp at any size) |
| PNG export | `html-to-image`, with self-hosted fonts embedded |
| Site fonts | **Zodiak** (headings) + **Satoshi** (UI) from [Fontshare](https://www.fontshare.com) by Indian Type Foundry, free for commercial use, self-hosted in `public/fonts` |
| Card fonts | `@fontsource/*`, self-hosted Latin subset (embedded in PNG exports) |
| Icons | `lucide-react` |
| Hosting | Vercel or Netlify free tier (static) |

## Run locally

You need **Node.js 18+**.

```bash
cd festive-wishes-studio
npm install
npm run dev
```

Open http://localhost:5173. To produce and preview a production build:

```bash
npm run build
npm run preview
```

## Project structure

```
festive-wishes-studio/
├── index.html               # SEO meta, Open Graph, JSON-LD
├── public/                  # favicon, robots.txt, sitemap.xml
├── vercel.json              # SPA rewrites for Vercel
├── netlify.toml             # build + SPA redirects for Netlify
└── src/
    ├── main.jsx / App.jsx   # entry + routes
    ├── index.css            # Tailwind theme + button/chip utilities
    ├── data/
    │   ├── festivals.js     # ← festival registry (palette, messages, dates, designs)
    │   └── templates.js     # templates generated from festivals × archetypes, "popular" logic
    ├── templates/
    │   ├── layouts.jsx      # 7 layout archetypes + GreetingText (the personalised block)
    │   ├── motifs.jsx       # SVG illustrations (diya, rakhi, crescent…) and decorations
    │   ├── fonts.js         # self-hosted card fonts
    │   └── CardRenderer.jsx # renders a 1080×1350 card; ScaledCard for previews
    ├── lib/
    │   ├── exportImage.js   # PNG render, download, native share, WhatsApp link
    │   └── useSeo.js        # per-page title/description/canonical
    ├── components/          # Header, Footer, FestivalCard, TemplateCard, TemplateGallery, Toast
    └── pages/               # Home, FestivalPage, TemplatesPage, Create (customiser), InfoPages
```

## Adding festivals and templates

The core code doesn't need to change.

**Add a festival:** add an entry to `src/data/festivals.js`:

```js
{
  id: 'onam',
  name: 'Onam',
  title: 'Happy Onam',
  tagline: 'Harvest of Kerala',
  date: '2027-09-12',
  hanging: 'marigold',            // bunting | marigold | lanterns | fanoos | baubles | stars | tricolour
  palette: { deep, rich, warm, gold, light, ink, confetti: [...] },
  archetypes: ['traditional', 'family', 'modern', 'minimal', 'burst'],
  messages: ['Wishing you and your family a very Happy Onam!', ...],
  keywords: 'onam greeting card with name',
}
```

Its templates, festival page and gallery entries are generated automatically. To give it its own illustration, add a component to `MOTIFS` in `src/templates/motifs.jsx`. Without one, it uses the generic celebration artwork. Also add the URL to `public/sitemap.xml`.

**Add a new design style:** write a layout component in `src/templates/layouts.jsx`, register it in `LAYOUTS`, describe it in `ARCHETYPES` (`src/data/templates.js`), then list its key in any festival's `archetypes`.

## Live site

**https://anandotsav.netlify.app** (Netlify free plan, project `anandotsav`). This folder is linked to it, so publishing an update takes one command:

```bash
npm run build && npx netlify-cli deploy --prod --dir dist
```

The team-wide Netlify setting protects new sites with a team login, so visitor protection was switched off for this site only. Form detection is switched on, which is what makes the email signup work. Signups appear in Netlify under **Forms → ai-updates**. On the free plan Netlify adds a small "Powered by Netlify" badge in the bottom-right corner, and the phone action bar leaves room for it.

## Deploy for free

### Vercel
1. Push the folder to a GitHub repository.
2. Go to https://vercel.com/new, import the repo and pick the **Vite** preset. The build command is `npm run build` and the output folder is `dist`. If the repo contains other projects, set the root directory to `festive-wishes-studio`.
3. Click **Deploy**. `vercel.json` already handles client-side routes such as `/festival/diwali`.

Or deploy from the command line: `npm i -g vercel && vercel`.

### Netlify
1. Push to GitHub, then go to https://app.netlify.com/start and import the repo.
2. `netlify.toml` already sets the build command (`npm run build`), the publish directory (`dist`) and the SPA redirect.
3. Click **Deploy**. You can also drag and drop the `dist/` folder at https://app.netlify.com/drop.

### Before going live
- The domain `anandotsav.com` in `public/robots.txt`, `public/sitemap.xml` and the contact email is a placeholder. Replace it with the domain you register.
- Brand assets live in `public/brand/`: the full logo, the "A" mark at 96/192/512 px and a 1200×630 social share image. The favicons are `public/favicon-48.png` and `public/apple-touch-icon.png`.
- Set your own email in `CONTACT_EMAIL` (`src/pages/InfoPages.jsx`).
- Submit the sitemap in Google Search Console.
- Festival dates in `festivals.js` cover the next occurrence after Nov 2026. Lunar festivals (Eid, Holi, Navratri, Durga Puja, Ganesh Chaturthi, Raksha Bandhan) move every year, so update them once a year. Eid and Navratri dates are approximate.

## Notes and limitations
- It's a single-page app, so search engines that don't run JavaScript only see `index.html`. Google renders JS. For stronger SEO later, add prerendering (for example `vite-plugin-prerender`) or move to a static-site framework.
- Native file sharing depends on the browser's Web Share API (Android Chrome, iOS Safari 15+). Other browsers fall back to download plus a WhatsApp text link.
