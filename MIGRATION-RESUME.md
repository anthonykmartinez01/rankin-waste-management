# Migration Resume Notes

**Last session ended:** 2026-05-03 (continued)
**Branch:** `astro-migration`
**HEAD commit:** `c97d79f` — `feat(astro): batch 3.5 — port about-us to Astro, byte-identical content`
**Status:** ✅ **Foundation Complete + Batch 3 complete (5 / 13 pages translated)**

---

## Where we are

The Astro foundation is fully built and verified. The 12 legacy React SPA page components are deleted, replaced by the Astro layout + component layer. **5 of 13 pages translated** (Batch 3 complete). Batches 4–6 cover the remaining 8 pages.

### Pages translated (Batch 3 complete)

| # | Page | Commit | Verification |
|---|---|---|---|
| 1 | `/terms-of-service` | `c8921e3` | 15/15 assertions PASS |
| 2 | `/privacy-policy` | `2eb3995` | 18/18 assertions PASS |
| 3 | `/residential` | `f49f9cd` | 16/16 assertions PASS |
| 4 | `/trash-trailer-rentals` | `201a79f` | 14/14 assertions PASS |
| 5 | `/about-us` | `c97d79f` | 19/19 assertions PASS |

Translation pattern fully locked in across Batch 3: Layout + InnerHero + data-reveal (with optional `data-reveal-delay`) + CallCTA + byte-identical content + per-page byte-level dash verification + prose word-diff vs master.

### Foundation pieces in place
- Astro 5.18 + React 19 + Tailwind v4 toolchain (Batch 1)
- `src/layouts/Layout.astro` — full `<head>` management (per-page title/description/canonical/OG/Twitter from props, 6 universal OG/Twitter tags + font preloads + favicon site-wide), reveal-animation inline script, GHL form CSS + JS site-wide, modal-trigger bridge via `CustomEvent('open-service-modal')`
- `src/components/Nav.astro` — top utility bar + main nav + mobile drawer (mobile menu spec preserved verbatim, a11y gaps logged)
- `src/components/Footer.astro`, `InnerHero.astro`, `CallCTA.astro`
- `src/components/icons/*.astro` × 7 (PhoneIcon, MailIcon, MapPinIcon, ClockIcon, StarIcon, ChevronIcon, FacebookIcon)
- 3 React islands: `ServiceRequestModal.tsx` (mounted in Layout, `client:idle`), `ReviewWidget.tsx` (per-page island, `client:idle` at consumer site), `ServiceAreaMap.tsx` (dead code, `client:visible` at consumer site)
- `src/data/business.ts` NAP single-source-of-truth
- `src/pages/index.astro` is currently a placeholder — will be replaced by the real homepage in Batch 6

### Working verifications (re-run any time)
```bash
npm run build           # → 1 page (placeholder), ~1s, clean
npx astro check         # → 0 errors, 0 warnings, 1 hint (preserved iframe deprecation)
node scripts/verify-ssg.mjs  # head-only assertions; runs against dist/<route>/index.html
```

---

## Next planned batch

**Batch 4 — port reviews + contact-us + service-areas/axtell:**

This batch introduces three new patterns not seen in Batch 3:
- **First page with a React island** (`reviews.astro` uses `<ReviewWidget client:idle />`)
- **First page with per-page JSON-LD schema** (`axtell.astro` has Organization + PostalAddress + City schema; possibly `contact-us.astro` has none, will verify)
- **First page with a third-party iframe + page-specific styling** (`contact-us.astro` embeds the GHL form iframe; the GHL CSS + JS are already site-wide via Layout, but the contact page is the only one where they have any effect)

Pages, in suggested order:
1. `src/pages/contact-us.astro` (GHL iframe — relatively simple structurally; one iframe + a few paragraphs around it)
2. `src/pages/reviews.astro` (ReviewWidget island — should be straightforward since the island is already ported and verified in 2c.ii)
3. `src/pages/service-areas/axtell.astro` (Organization schema — first per-page JSON-LD, will introduce the `<Fragment slot="head">` pattern documented in the established translation pattern below)

After Batch 4:
- Batch 5: 4 Hubbard service pages (Service + BreadcrumbList schemas, alternating image+text grids — will reuse the schema-as-Fragment-slot pattern established in Batch 4's axtell page)
- Batch 6: `index.astro` homepage (largest single file — Hero, FAQ, Services, FindUs, etc. + the 38-`@type` JSON-LD homepage schema)
- Smoke gate: `<title>` in `<head>` for all 13 prerendered pages
- Checkpoint 4: hardened verifier + Lighthouse + visual diff matrix on 5 pages × 2 viewports
- Deploy

---

## Established page translation pattern (apply per page)

Every Batch 3–6 page follows this shape:

```astro
---
// src/pages/<route>.astro
// Byte-identical content port of pre-migration src/pages/<Component>.jsx.

import Layout from '../layouts/Layout.astro';
import InnerHero from '../components/InnerHero.astro';
import CallCTA from '../components/CallCTA.astro';
import { PHONE, PHONE_LINK } from '../data/business';
// ...other component imports as needed (icons, ReviewWidget for /reviews, etc.)
---

<Layout
  title="<exact title from migration-baseline.md §2>"
  description="<exact description from migration-baseline.md §2>"
>
  {/* Per-page schema goes in slot="head" — copy <script type="application/ld+json"> blocks
      verbatim from the corresponding pre-migration .jsx page. Wrap in:
      <Fragment slot="head">
        <script type="application/ld+json" set:html={JSON.stringify({...})} />
      </Fragment>
  */}

  <InnerHero
    title="<exact H1 from migration-baseline.md §2>"
    bgImage="/images/...webp"      // only when pre-migration set bgImage
    bgImageAlt="..."               // only when pre-migration set bgImageAlt
  />

  <section class="<exact tailwind classes from pre-migration>">
    <div class="...">
      {/* For animated sections, add data-reveal (and optional data-reveal-delay="0.1") */}
      <div data-reveal class="mb-12 md:mb-16">
        <p>...content byte-identical to pre-migration...</p>
      </div>

      <div data-reveal data-reveal-delay="0.1" class="...">
        {/* staggered second section */}
      </div>

      {/* CTA pattern */}
      <CallCTA />
    </div>
  </section>
</Layout>
```

### Key contracts to preserve

- **Layout `title` + `description` props:** copy verbatim from `migration-baseline.md` §2 (one row per route)
- **`<InnerHero title=...>`:** the H1 string is verbatim from `migration-baseline.md` §2
- **`<InnerHero bgImage=... bgImageAlt=...>`:** only set when pre-migration `.jsx` set them; otherwise the prop-less form (solid `bg-dark-elevated` hero)
- **Reveal animations:** wherever pre-migration used `useReveal()`, add `data-reveal` attribute. Wherever pre-migration passed a `delay` parameter (e.g. `useReveal(0.1)`), add `data-reveal-delay="0.1"` (string, parsed as `parseFloat(...) || 0` by the inline observer in Layout)
- **Schema scripts:** copy the `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({...}) }} />` JSX block byte-identical, translated to Astro's `<script type="application/ld+json" set:html={JSON.stringify({...})} />`. The schema object content is byte-identical. Place inside `<Fragment slot="head">...</Fragment>` for `<head>` placement (per Layout's named-slot contract)
- **`<Link to=>` → `<a href=>`:** react-router-dom is gone. Every internal navigation is a full-page `<a href>` (Astro+Netlify serve cached HTML, so navigation is instant)
- **`className=` → `class=`:** Astro syntax
- **Tailwind classes:** byte-identical to pre-migration JSX
- **`<img>` tags:** preserve raw `<img>` with existing `srcset`/`sizes`/`width`/`height`/`loading`/`fetchpriority`/`decoding`/`alt` attributes verbatim. Do NOT switch to `astro:assets <Image />` — that's a P1 follow-up (see `post-migration-improvements.md`)

### Source-of-truth lookups during translation

```bash
git show master:src/pages/Hubbard.jsx           # pre-migration page body
git show master:src/App.jsx                     # for HomePage components in Batch 6
git show master:src/shared.jsx                  # only for cross-reference (already deleted)
git show master:src/components/ReviewWidget.jsx # already ported as .tsx, but reference for data
```

`migration-baseline.md` is the canonical reference for what every page must contain (H1, title, description, canonical, schema types, body sample).

---

## Migration discipline (re-read before each batch)

1. **Byte-identical content.** Page copy, schema JSON, hardcoded strings, attribute values — all preserved verbatim from pre-migration.
2. **No improvements during migration.** No new ARIA, no new schema, no new pages, no new content, no new images, no `<Image />` switch, no schema componentization, no auto-sitemap.
3. **Log, don't act.** When you spot something that should be improved (a11y, performance, dead code, inconsistency), append it to `post-migration-improvements.md` instead of fixing it.
4. **Show diffs before applying.** User reviews each batch before commit.
5. **Sanity build after each batch.** `npm run build` + `astro check` — must stay clean.

---

## Open known items (already logged in `post-migration-improvements.md`)

- **A1.** Mobile menu lacks aria-expanded, focus trap, scroll lock, Esc-to-close, backdrop-click-to-close
- **A2.** ServiceRequestModal lacks focus trap, focus return, Esc-to-close, role="dialog", aria-labelledby, explicit type="button" on close
- **7a.** NAP/hours inconsistency: Footer says "Mon–Fri 8AM–6PM" (no Saturday), `business.ts` says "7AM–6PM Mon–Fri + Sat 8AM–4PM", LocalBusiness schema says "Mo-Fr 07:00-18:00, Sa 08:00-16:00". Three sources disagree.
- **8a.** GHL form CSS + JS scoped site-wide (preserved verbatim) but only relevant on `/contact-us`. P3 follow-up to scope to that page only.
- **Vite 8 + RR 7 upgrade revisit** (no longer needed since we pivoted to Astro; the constraint that drove pinning was vite-react-ssg, which we abandoned)
- **Auto-sitemap, Partytown, `<Image />` switch** — all CLAUDE.md spec items skipped during migration, P1/P3 follow-ups

---

## Resume prompt for next session

Paste this into Claude Code when picking up:

> Resume the Astro migration on branch `astro-migration` from commit `c97d79f` (Batch 3 complete, 5/13 pages translated).
>
> Apply Batch 4 — port the 3 mid-complexity pages that introduce new patterns (React island, per-page schema, iframe embed):
> 1. `contact-us.astro` (GHL form iframe + few paragraphs)
> 2. `reviews.astro` (uses `<ReviewWidget client:idle />` island already ported in 2c.ii)
> 3. `service-areas/axtell.astro` (Organization + PostalAddress + City JSON-LD schema; introduces the `<Fragment slot="head">` schema-injection pattern)
>
> For each page: byte-identical content (verify with `git show master:src/pages/<X>.jsx`), schema preserved verbatim where present (use `<script type="application/ld+json" set:html={JSON.stringify({...})} />` inside `<Fragment slot="head">`), `data-reveal` attributes wherever pre-migration used `useReveal()`, Layout title+description copied verbatim from `migration-baseline.md` §2.
>
> Same verification discipline as Batch 3: inventory + cross-check vs migration-baseline, byte-level checks for hyphens/dashes, prose word-diff vs master, structural counts (paragraphs/h2/h3/h4/ul/li/schema/CallCTA/data-reveal/img counts), build + astro check + curl assertions.
>
> Show me each page's diff for approval before applying. After all 3 apply: hold for Batch 5 approval.
>
> Re-read `MIGRATION-RESUME.md` for the established pattern, schema-injection example for axtell, and the migration-discipline reminders.

---

## File locations cheatsheet

| File | Purpose |
|---|---|
| `migration-baseline.md` | Source-of-truth for what every page must contain (H1, title, desc, schema types) |
| `post-migration-improvements.md` | Backlog of items to address after migration |
| `MIGRATION-RESUME.md` | This file — resume notes for next session |
| `scripts/verify-ssg.mjs` | Head-only HTML assertions per route |
| `src/layouts/Layout.astro` | Base layout (head, body wrapper, modal mount, reveal script) |
| `src/data/business.ts` | NAP single-source-of-truth |
| `astro.config.mjs` | Astro config (site URL, trailingSlash:'never', build.format:'directory') |
