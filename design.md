# Rankin Waste Management — Design System

> Single source of truth for the visual design of **rankinwaste.com**. Captures the colors, typography, spacing, components, animations, and patterns actually shipping on the live site as of 2026-05-04.
>
> **Purpose:** if you're using a different builder, AI assistant, designer, or developer to extend or rework the site, follow this document so the look stays consistent. Every value here is real — pulled from `src/styles/global.css`, the rendered Tailwind v4 theme, and the components actually used across all 13 pages.

---

## 1. Brand essence

- **Business:** Rankin Waste Management. Family-owned residential and commercial waste service in Hubbard, TX serving rural Hill / Navarro / Limestone / McLennan County communities.
- **Owners (used as a differentiator in copy):** Tommy and Sydney Rankin.
- **Voice:** local, direct, no corporate dispatch. Emphasizes "you call Tommy and Sydney directly," "no contracts, flat-rate pricing," "700+ neighbors with 250+ five-star reviews."
- **Visual feel:** dark theme, warm orange accent, generous spacing, photography-led. Reads as professional but personal — not slick agency, not folksy clip-art.

---

## 2. Color tokens

All colors are defined as Tailwind v4 `@theme` CSS custom properties in `src/styles/global.css`. Use Tailwind utility classes (`bg-orange-500`, `text-text-muted`, etc.) — never hardcode hex values in components.

### Orange palette (brand accent)

| Token | Hex | Tailwind class | Usage |
|---|---|---|---|
| `--color-orange-50` | `#FFF3E8` | `bg-orange-50`, `text-orange-50` | Reserved (currently unused on site) |
| `--color-orange-100` | `#FDDBB3` | `bg-orange-100` | Reserved |
| `--color-orange-300` | `#F6A84E` | `text-orange-300`, `hover:text-orange-300` | Hover state on inline orange links |
| **`--color-orange-500`** | **`#E8751A`** | `bg-orange-500`, `text-orange-500` | **Primary brand color.** All CTAs, accent text, "100% Family Owned" badge, inline links, hero badge, h2 underlines |
| `--color-orange-600` | `#C45A0E` | `hover:bg-orange-600` | Hover state on filled orange buttons |
| `--color-orange-800` | `#7A3D0A` | `bg-orange-800` | Reserved |

### Dark palette (backgrounds)

Pure black / warm-black, no green undertone.

| Token | Hex | Tailwind class | Usage |
|---|---|---|---|
| `--color-dark` | `#080808` | `bg-dark` | Page background (set on `<body>`) |
| `--color-dark-card` | `#101010` | `bg-dark-card` | Card backgrounds (WhyChooseUs cards, Footer, service cards) |
| `--color-dark-elevated` | `#181818` | `bg-dark-elevated` | Elevated section backgrounds (BusinessDescription, CustomerSay, FindUs, modal dialog, GHL form) |
| `--color-dark-warm` | `#0f0c0a` | `bg-dark-warm` | Reserved (currently unused) |

### Text on dark

| Token | Value | Tailwind class | Usage |
|---|---|---|---|
| `--color-text-main` | `#ffffff` | `text-white` | All headings, primary copy |
| `--color-text-muted` | `rgba(255,255,255,0.6)` | `text-text-muted` | Body paragraphs, captions, FAQ answers |
| `--color-text-faint` | `rgba(255,255,255,0.2)` | `text-text-faint` | Tertiary copy ("+ Surrounding" in service-areas list) |
| `--color-border-subtle` | `rgba(255,255,255,0.1)` | `border-border-subtle` | Card borders, FAQ dividers, footer top border |

### Special

| Token | Hex | Tailwind class | Usage |
|---|---|---|---|
| `--color-star` | `#F59E0B` | `text-star` | 5-star rating display in Hero (slightly more yellow than orange-500 to feel like Google star color) |

### Color usage rules

- **Never** use arbitrary hex values in markup (`bg-[#E8751A]`). Use `bg-orange-500`.
- **Never** introduce new accent colors for this site. If a section needs a different feel, use a different combination of the existing tokens (e.g., `bg-dark-card` instead of `bg-dark-elevated`).
- **Orange-500 fails WCAG AA contrast** when paired with white text on small font sizes (≈3.2:1 vs the 4.5:1 requirement). Logged as A11y-2 P1 in `post-migration-improvements.md`. If you're adding new orange CTAs, prefer larger weight + size (≥18px bold) which qualifies as "large text" with the more-lenient 3:1 threshold, OR coordinate a brand color shift to a darker orange.
- White on `bg-dark` and `bg-dark-elevated` passes contrast easily.

---

## 3. Typography

### Font family

- **Lato** — self-hosted at `/fonts/lato-{400,700,900}.woff2`. Preloaded in `<head>` for performance.
- Fallback stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`.
- Used everywhere via `--font-sans` token (Tailwind class: default — applied via `body` styles).
- Weights actually used on site: **400** (regular body), **700** (bold for CTAs and badges), **900** (heavy — currently unused but loaded for future use).
- Two font weights load = lato-400 + lato-700 + lato-900 (3 files, ~80KB total).

### Type scale (used on site)

Site uses Tailwind text-size utilities. No custom font-size tokens.

| Element | Mobile size | Desktop size | Tailwind |
|---|---|---|---|
| Hero `<h1>` | clamp(2rem, 6vw, 4rem) | up to 64px | `text-[clamp(2rem,6vw,4rem)] font-bold leading-[1.1] tracking-tight` |
| Inner-page `<h1>` (InnerHero) | 1.875rem (30px) | 3rem–4rem | `text-3xl md:text-5xl lg:text-6xl font-bold` |
| Section `<h2>` | 1.5rem (24px) | 2.25rem (36px) | `text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight` |
| Card `<h3>` | 1.125rem (18px) | 1.25rem (20px) | `text-lg sm:text-xl font-semibold tracking-tight` |
| Service-row `<h3>` | 1.25rem (20px) | 1.5rem (24px) | `text-xl md:text-2xl font-semibold tracking-tight mb-5` |
| Footer column `<h4>` | 0.875rem (14px) | same | `text-sm uppercase tracking-wider font-bold text-orange-500` |
| Body paragraph | 1rem (16px) | 1.125rem (18px) | `text-base sm:text-lg leading-relaxed` |
| Small body / FAQ | 1rem | same | `text-base leading-relaxed` |
| Trust badges, captions | 0.75rem–0.875rem | same | `text-xs sm:text-sm font-medium` |
| FinalCTA `<h2>` | clamp(1.75rem, 5vw, 3.5rem) | up to 56px | `text-[clamp(1.75rem,5vw,3.5rem)] font-semibold tracking-tight leading-tight` |

### Heading rules

- Use semantic levels: `<h1>` once per page (in Hero or InnerHero), then `<h2>` for top-level sections, `<h3>` inside cards or service rows.
- Footer column titles are currently `<h4>` without an ancestor `<h3>` — this is a known a11y issue (logged as A11y-3 P2). When extending the Footer, either keep the `<h4>` to match existing or fix the whole footer to `<h3>`.
- `<h2>` style is `font-medium tracking-tight` (medium weight, slightly tightened tracking). Don't use bold weight on h2 — that's reserved for hero h1.

---

## 4. Spacing scale

Use Tailwind's default spacing scale (`1` = 4px). Don't use arbitrary pixel values.

| Use case | Value | Tailwind |
|---|---|---|
| Section vertical padding (mobile) | 48–56px | `py-12` (48) or `py-14` (56) |
| Section vertical padding (desktop) | 80–112px | `md:py-20 lg:py-28` |
| Section horizontal padding | 24px (mobile), clamp 32–64px (desktop) | `px-6 lg:px-[clamp(2rem,5vw,4rem)]` |
| Tight section horizontal | 20px / 24px | `px-5 sm:px-6` |
| Container max-width — narrow content | 800px | `max-w-[800px] mx-auto` |
| Container max-width — standard | 1100px / 1200px | `max-w-[1100px] mx-auto`, `max-w-[1200px] mx-auto` |
| Container max-width — wide image+text grids | 1300px | `max-w-[1300px] mx-auto` |
| Hero content max-width | 900px | `max-w-[900px] mx-auto` |
| Subhead paragraph max-width | 600px / 700px | `max-w-[600px] mx-auto`, `max-w-[700px]` |
| Stack between paragraphs | 16–24px | `mb-4`, `mb-6` |
| Stack between sections within a section | 32–48px | `mb-8`, `mb-10`, `mb-12` |
| Card internal padding | 24–32px | `p-6 sm:p-8` |
| CTA box (large) padding | 32–48px | `p-6 sm:p-8 md:p-12` |
| Grid gap (image+text) | 24px (mobile), 64px (desktop) | `gap-6 md:gap-16` |
| Grid gap (cards stacking) | 20–24px | `gap-5 md:gap-6` |
| Min tap target | 44×44px | `min-h-[44px]` (always on interactive elements) |

### Border radius

Three radius levels used:

| Tailwind | Value | Where |
|---|---|---|
| `rounded-sm` | 2px | Photo frames (Tommy + Sydney photo, FindUs map iframe), small image cards |
| `rounded-xl` | 12px | WhyChooseUs cards |
| `rounded-2xl` | 16px | Service-row image wrappers, CTA boxes |
| `rounded-full` | 9999px | All pill buttons, trust badges |

---

## 5. Layout primitives

### Page structure

Every page uses the same scaffold from `src/layouts/Layout.astro`:

```
<html>
  <head>...</head>
  <body class="min-h-screen bg-dark text-white">
    <Nav />
    <main>
      <slot />        ← page content goes here
    </main>
    <Footer />
    <ServiceRequestModal client:idle />
    <!-- inline reveal-animation script -->
  </body>
</html>
```

### Hero variants

Two hero patterns:

**1. Homepage `<Hero>`** (full-bleed photographic background, used only on `/`)
- `<header id="top">` semantic landmark (not `<section>`)
- `min-h-[70vh] sm:min-h-[65vh] md:min-h-[62vh]`
- Background `<img>` fills viewport with gradient overlay (`linear-gradient(to bottom, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.45) 40%, rgba(8,8,8,0.6) 70%, rgba(8,8,8,0.85) 100%)`)
- Hero image gets `loading="eager"` + `fetchpriority="high"` (LCP optimization)
- Five CSS keyframe animations on entrance (see §7)
- Centered content stack: H1 → orange badge → 5 stars + reviews count → subhead → 2 CTA buttons → 6 trust badges

**2. Inner pages `<InnerHero>`** (used on the other 12 pages)
- Solid dark background OR optional `bgImage` variant with image + dark overlay
- Always renders a centered `<h1>` only — no buttons, no badges, no trust strip
- Hubbard service pages and `/garbage-collection-service-hubbard` use the bgImage variant; others use solid `bg-dark-elevated`

### Section pattern

```astro
<section class="bg-dark-elevated px-6 lg:px-[clamp(2rem,5vw,4rem)] py-20 md:py-28">
  <div class="max-w-[1200px] mx-auto">
    <!-- content -->
  </div>
</section>
```

Alternate sections between `bg-dark` (default) and `bg-dark-elevated`. Don't use `bg-dark-card` for section backgrounds — that's reserved for cards/footer.

### Image+text grid (used 4× on homepage, 3-4× on Hubbard service pages)

```astro
<div class="grid md:grid-cols-2 gap-6 md:gap-16 items-center">
  <div class="rounded-2xl overflow-hidden">
    <img ... class="w-full aspect-[4/3] object-cover" />
  </div>
  <div>
    <h3>...</h3>
    <p>...</p>
    <a href="/...">Learn more &rarr;</a>
  </div>
</div>
```

For alternating image-right rows, swap with `md:order-2` on the image wrapper and `md:order-1` on the text div. On mobile (single column), image always appears above text regardless.

---

## 6. Components

### Primary CTA (orange pill button)

The single most-used component — appears in Hero, every section CTA, Footer, Nav top-bar.

```html
<a
  href={PHONE_LINK}
  class="inline-flex items-center gap-2 bg-orange-500 text-white px-7 py-3.5 rounded-full font-bold text-base hover:bg-orange-600 transition-colors duration-300 min-h-[44px]"
>
  <PhoneIcon class="w-5 h-5" />
  Call (254) 205-6125
</a>
```

Variants:
- **Hero size:** `px-8 py-4 text-lg`
- **Standard:** `px-7 py-3.5 text-base` (most common)
- **Compact (Nav top-bar):** `px-5 py-2.5 text-sm`

**Always include the `<PhoneIcon>` for phone CTAs.** Always tel: link to `+12542056125` (constant `PHONE_LINK` in `src/data/business.ts`). Display number formatted as `(254) 205-6125` (constant `PHONE`).

### Secondary CTA (ghost button)

Used as paired button next to phone CTA in Hero + FinalCTA.

```html
<button
  type="button"
  class="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-7 py-3.5 rounded-full font-semibold text-base hover:bg-white/20 transition-all duration-300 min-h-[44px]"
>
  New Service Request
</button>
```

Opens the ServiceRequestModal via `CustomEvent('open-service-modal')` dispatch (see §9).

### Trust badge (Hero only)

```html
<span class="bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium">
  No Contracts
</span>
```

Six are rendered on homepage Hero: No Contracts / Flat-Rate Pricing / Family Owned / Weekly Pickup / 700+ Customers Served / Licensed & Insured.

### Card (WhyChooseUs)

```html
<div class="bg-dark-card border border-border-subtle rounded-xl p-6 sm:p-8 flex items-start gap-4 sm:gap-5">
  <svg class="w-6 h-6 sm:w-7 sm:h-7 text-orange-500 shrink-0 mt-1">
    <polyline points="20 6 9 17 4 12" />
  </svg>
  <div>
    <h3 class="text-lg sm:text-xl font-semibold tracking-tight mb-2">{title}</h3>
    <p class="text-text-muted text-sm sm:text-base leading-relaxed">{desc}</p>
  </div>
</div>
```

Inline checkmark SVG (no abstraction — used 4× only on homepage).

### CTA box (large, dark-elevated)

End-of-page conversion box used on every inner page.

```html
<div class="bg-dark-elevated border border-border-subtle rounded-2xl p-6 sm:p-8 md:p-12 text-center">
  <h2>Ready to Start Service?</h2>
  <p>...family-owned, no contracts, flat-rate pricing — and trusted by 700+ neighbors with 250+ five-star reviews.</p>
  <CallCTA />
</div>
```

### Inline link (orange)

Inside body copy or as a "Learn more" affordance:

```html
<a href="/..." class="inline-flex items-center gap-1 text-orange-500 hover:text-orange-300 font-semibold text-sm sm:text-base transition-colors duration-300">
  Learn more about waste management in Hubbard &rarr;
</a>
```

Uses `&rarr;` (→) HTML entity for the arrow — never literal Unicode arrow, never SVG arrow.

### FAQ accordion

Custom React island (`src/components/FaqAccordion.tsx`) — button toggles a `max-h` transition with a chevron rotation. See `src/data/faqs.ts` for question data.

### Image (page content)

Always use `<img>` with explicit attributes:

```html
<img
  src="/images/services/waste-management.webp"
  srcset="/images/services/waste-management-mobile.webp 800w, /images/services/waste-management.webp 1400w"
  sizes="(min-width: 768px) 50vw, 100vw"
  alt="Descriptive alt text"
  width="1400"
  height="933"
  loading="lazy"
  decoding="async"
  class="w-full aspect-[4/3] object-cover"
/>
```

Required attributes: `alt`, `width`, `height`, `loading`, `decoding`. Use `srcset`+`sizes` whenever there's a mobile asset variant. Format is **WebP** for photos.

Note: pre-migration source preserved as-is, so a few images on the site (notably `/tommy-sydney.webp` in BusinessDescription) lack width/height. Don't introduce new images without these — use the standard above.

### Phone display (NAP)

Always import:
```ts
import { PHONE, PHONE_LINK } from '../data/business';
// PHONE       = "(254) 205-6125"
// PHONE_LINK  = "tel:+12542056125"
```

Never hardcode the phone number. Same rule for the address (`175 PR335, Hubbard, TX 76648`) and email (`rankinwaste@gmail.com`) — all in `src/data/business.ts`.

---

## 7. Animation

### Hero entrance (CSS keyframes, fires on load)

Defined in `global.css`. Five classes that animate stagger-style when the page loads. Used **only on the homepage Hero**:

| Class | Animation | Timing | Delay |
|---|---|---|---|
| `hero-image-animate` | scale(1.08) → scale(1) | 1.8s `cubic-bezier(0.16, 1, 0.3, 1)` | none |
| `hero-badge-animate` | translateX(-20px) + fade in | 0.8s | 0.3s |
| `hero-title-animate` | translateY(40px) + fade in | 1s | 0.2s |
| `hero-content-animate` | translateY(40px) + fade in | 1s | 0.5s |
| `hero-buttons-animate` | translateY(40px) + fade in | 1s | 0.7s |

Honors `prefers-reduced-motion` — animations are disabled and content shows immediately.

### Below-the-fold reveal (data-reveal pattern)

For sections below the fold, use the `data-reveal` attribute pattern. The Layout has a single inline IntersectionObserver script that animates these in when scrolled into view.

```html
<div data-reveal class="...">          <!-- fires at delay 0 -->
<div data-reveal data-reveal-delay="0.1" class="...">
<div data-reveal data-reveal-delay="0.2" class="...">
```

Delays in active use: `0.1`, `0.15`, `0.2`, `0.3`. Opacity goes 0 → 1 with a slight Y-translate.

### Hover transitions

All interactive elements use `transition-colors duration-300` (300ms), or `transition-all duration-300` on glass-style buttons. Always include a hover state — never leave a button or link without a hover affordance.

---

## 8. Responsive breakpoints

Default Tailwind breakpoints:

| Name | Min width | Common use |
|---|---|---|
| (mobile) | 0px | Default — design mobile-first |
| `sm:` | 640px | Larger phones, small tablets |
| `md:` | 768px | Tablets / small laptops — most layout shifts happen here |
| `lg:` | 1024px | Laptops, the "real" desktop |
| `xl:` / `2xl:` | 1280+ | Rarely used; container max-widths cap before this matters |

**Test every component at three sizes: 375px (iPhone SE), 768px (iPad), 1280px (laptop).** Mobile receives the most traffic, so mobile is the default — never design desktop-first.

---

## 9. Patterns / conventions

### Mobile menu

Nav has a hamburger toggle on `<md` viewports, drawer slides in from right. Currently lacks several a11y primitives (no `aria-expanded`, no focus trap, no Esc-to-close) — logged as A1 P1. If you rebuild the nav, fix these.

### Modal trigger

`<ServiceRequestModal>` is mounted globally in Layout as a React island (`client:idle`). Open it from any page by dispatching:

```js
document.dispatchEvent(new CustomEvent('open-service-modal'));
```

The modal listens for this event. Buttons that open the modal use `id="..."` + a small inline `<script>` that calls the dispatch. Don't import the modal component directly — use the event bridge.

### "Family-owned" framing

Copy emphasizes:
- "Tommy and Sydney" by name (owners, on calls personally)
- "No contracts, flat-rate pricing"
- "700+ neighbors, 250+ five-star reviews"
- "Rural" — explicit in copy, list of cities served (Hubbard, Axtell, Dawson, Malone, Mertens, Purdon)

These are repeated across nearly every page's CTA box and Hero. Keep them consistent — don't paraphrase.

### Em-dash usage

CTA boxes universally end with: *"Family-owned, no contracts, flat-rate pricing — and trusted by 700+ neighbors with 250+ five-star reviews."* The em-dash before "and trusted" is the brand cadence. Use em-dash (U+2014), not hyphen-hyphen, not en-dash.

Compound modifiers (`flat-rate`, `five-star`, `Family-owned`, `Roll-off`) all use ASCII hyphen. Don't replace these with em-dashes.

### Internal linking

Service pages should link to related services where it's natural. The homepage's 4 service rows link to each child Hubbard page. The parent `/waste-management-service-hubbard` page **doesn't** currently link down to its 3 children — that's a known gap (IL1 P1).

---

## 10. SEO conventions

- **Title:** `{Page name} | Rankin Waste Management` for service pages, `{Page name} - Rankin Waste Management` for utility pages. Homepage uses `Trash Pickup & Waste Management in Hubbard, TX | Rankin Waste`.
- **Meta description:** specific to the page, mentions Hubbard / surrounding area, includes phone number on most pages.
- **Canonical:** every page has one. Root is `https://rankinwaste.com/` (with trailing slash); inner pages omit trailing slash (`https://rankinwaste.com/contact-us`).
- **OG/Twitter:** every page has full OG + Twitter card tags. `og:image` defaults to `/truck-side.webp` (1600×1067). One page overrides: `/junk-removal-service-hubbard` uses `/junk-removal-trailer.webp`.
- **JSON-LD schema by page:**
  - Homepage: `LocalBusiness` + `FAQPage`
  - 3 child Hubbard service pages: `Service` + `BreadcrumbList`
  - Parent Hubbard page + Axtell: `Organization`
  - Other pages: no schema
- **Sitemap:** hand-maintained at `public/sitemap.xml`. 13 URLs. Update `<lastmod>` when content changes.
- **Robots.txt:** `Allow: /` plus the sitemap directive. Do not Disallow anything without a clear reason.

---

## 11. What never to do

- Hardcode a hex color (`#E8751A`) — always use the `orange-500` token.
- Use an arbitrary pixel value like `w-[200px]` when a Tailwind step exists (`w-52` = 208px). Use the scale.
- Hardcode the phone number, address, or email — always import from `src/data/business.ts`.
- Add a new font weight or family without updating `global.css` and the font preload `<link>`s.
- Introduce a new accent color. The orange-500 brand mark is the only accent.
- Use `<img>` without `alt`, `width`, `height`, `loading`.
- Skip mobile design. Mobile is default.
- Use `inline style` attributes for color or layout. Use Tailwind classes.
- Ship a CTA without a 44×44px minimum tap target.
- Animate decorative elements without honoring `prefers-reduced-motion`.

---

## 12. File map (where things live)

| Concern | File |
|---|---|
| Color tokens, font, hero animations | `src/styles/global.css` |
| Brand data (phone, email, address) | `src/data/business.ts` |
| FAQ data | `src/data/faqs.ts` |
| Page layout shell | `src/layouts/Layout.astro` |
| Top nav | `src/components/Nav.astro` |
| Footer | `src/components/Footer.astro` |
| Inner-page hero (no Hero on `/`) | `src/components/InnerHero.astro` |
| End-of-page CTA | `src/components/CallCTA.astro` |
| Icons | `src/components/icons/*.astro` |
| Service request modal | `src/components/ServiceRequestModal.tsx` |
| Reviews carousel | `src/components/ReviewWidget.tsx` |
| FAQ accordion | `src/components/FaqAccordion.tsx` |
| Tailwind v4 config | inline in `global.css` `@theme` block |
| Astro config (trailing slash, integrations) | `astro.config.mjs` |
| Build + redirects | `netlify.toml` |
| Reproducibility | `package.json` (Node 22 pin in `netlify.toml`) |

---

## 13. Stack reference

- **Framework:** Astro 5.18 (static prerender, `format: 'directory'`, `trailingSlash: 'never'`)
- **UI islands:** React 19 (`@astrojs/react`)
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite`)
- **Maps:** react-leaflet (only used in the dead `ServiceAreaMap` component — currently not rendered anywhere)
- **Hosting:** Netlify (manual `netlify deploy --prod` via CLI; not yet GitHub auto-deploy)
- **Build:** `npm run build` → emits `dist/<route>/index.html` for 13 routes
- **Form embed:** GoHighLevel iframe at `go.kailenflow.com/widget/form/...` (only on `/contact-us`)

If you swap any of the stack pieces, keep the visual tokens in §2-§7 identical so the brand stays consistent across rewrites.
