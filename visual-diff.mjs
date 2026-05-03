// Phase 3 — Playwright visual diff (production vs Astro localhost).
// 5 routes × 2 viewports = 10 screenshot pairs. pixelmatch with
// 0.1 threshold; flag pairs with ≥1% diff.
import { chromium } from 'playwright';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import fs from 'node:fs';
import path from 'node:path';

const ROUTES = [
  '/',
  '/waste-management-service-hubbard',
  '/junk-removal-service-hubbard',
  '/contact-us',
  '/about-us',
];
const VIEWPORTS = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'mobile', width: 375, height: 667 },
];
const PROD = 'https://rankinwaste.com';
const LOCAL = 'http://127.0.0.1:4321';
const OUT = 'checkpoint-4-screenshots';
const RESULTS = 'checkpoint-4-results';

const slugify = (route) => route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-');

async function shoot(page, url, file) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000); // hydration + reveal animations + iframe load
  // Some elements (FAQ accordion, ReviewWidget chevrons) may rely on font metrics —
  // wait a bit more after fonts settle
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  await page.screenshot({ path: file, fullPage: true });
}

async function diff(prodFile, localFile, diffFile) {
  const a = PNG.sync.read(fs.readFileSync(prodFile));
  const b = PNG.sync.read(fs.readFileSync(localFile));
  // Match dimensions to the smaller of the two (full-page heights vary slightly)
  const w = Math.min(a.width, b.width);
  const h = Math.min(a.height, b.height);
  const aBuf = Buffer.alloc(w * h * 4);
  const bBuf = Buffer.alloc(w * h * 4);
  // Crop to common rect
  for (let y = 0; y < h; y++) {
    a.data.copy(aBuf, y * w * 4, y * a.width * 4, y * a.width * 4 + w * 4);
    b.data.copy(bBuf, y * w * 4, y * b.width * 4, y * b.width * 4 + w * 4);
  }
  const diff = new PNG({ width: w, height: h });
  const mismatchCount = pixelmatch(aBuf, bBuf, diff.data, w, h, { threshold: 0.1 });
  const totalPixels = w * h;
  const pct = (mismatchCount / totalPixels) * 100;
  fs.writeFileSync(diffFile, PNG.sync.write(diff));
  return { pct, mismatchCount, totalPixels, w, h, aH: a.height, bH: b.height };
}

const browser = await chromium.launch();
const results = [];

for (const route of ROUTES) {
  const slug = slugify(route);
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();

    const prodFile = path.join(OUT, `prod-${slug}-${vp.name}.png`);
    const localFile = path.join(OUT, `local-${slug}-${vp.name}.png`);
    const diffFile = path.join(OUT, `diff-${slug}-${vp.name}.png`);

    process.stdout.write(`[${slug} ${vp.name}] prod...`);
    try { await shoot(page, `${PROD}${route}`, prodFile); }
    catch (e) { console.log(` FAIL: ${e.message}`); results.push({ route, vp: vp.name, err: e.message }); await ctx.close(); continue; }

    process.stdout.write(` local...`);
    try { await shoot(page, `${LOCAL}${route}`, localFile); }
    catch (e) { console.log(` FAIL: ${e.message}`); results.push({ route, vp: vp.name, err: e.message }); await ctx.close(); continue; }

    process.stdout.write(` diffing...`);
    const r = await diff(prodFile, localFile, diffFile);
    console.log(` ${r.pct.toFixed(2)}% (prod ${r.aH}px tall, local ${r.bH}px tall)`);
    results.push({ route, vp: vp.name, ...r });

    await ctx.close();
  }
}

await browser.close();

// Save raw results JSON
fs.writeFileSync(path.join(RESULTS, 'visual-diff-results.json'), JSON.stringify(results, null, 2));

// Output summary table
console.log('\n=== Phase 3 — Visual Diff Results ===\n');
const cols = ['Route', 'VP', 'W×H', 'prod px H', 'local px H', 'Diff %', 'Flag'];
const widths = [38, 7, 12, 10, 10, 10, 10];
const pad = (s, w) => String(s).padEnd(w);
console.log(cols.map((c,i) => pad(c, widths[i])).join(' │ '));
console.log(widths.map(w => '─'.repeat(w)).join('─┼─'));
for (const r of results) {
  if (r.err) {
    console.log(`${pad(r.route, widths[0])} │ ${pad(r.vp, widths[1])} │ ERROR: ${r.err}`);
    continue;
  }
  const flag = r.pct >= 1 ? '⚠ ≥1%' : 'ok';
  const row = [
    r.route,
    r.vp,
    `${r.w}×${r.h}`,
    `${r.aH}`,
    `${r.bH}`,
    `${r.pct.toFixed(2)}%`,
    flag,
  ];
  console.log(row.map((c,i) => pad(c, widths[i])).join(' │ '));
}

const flagged = results.filter(r => !r.err && r.pct >= 1);
console.log(`\n=== ${results.length - flagged.length - results.filter(r=>r.err).length}/${results.length} pairs <1% diff ===`);
if (flagged.length) {
  console.log(`\n${flagged.length} pair(s) ≥1% diff — investigate:`);
  for (const f of flagged) {
    console.log(`  - ${f.route} (${f.vp}): ${f.pct.toFixed(2)}% — see ${OUT}/diff-${slugify(f.route)}-${f.vp}.png`);
  }
}
