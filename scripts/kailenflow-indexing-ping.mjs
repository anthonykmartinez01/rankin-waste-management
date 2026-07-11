#!/usr/bin/env node
/**
 * KailenFlow indexing ping — after a scheduled-publish deploy, submits any
 * page whose schedule.ts date is exactly today to the KailenFlow Suite
 * indexing endpoint (Google Indexing API + PrimeIndexer). Only newly-due
 * pages are submitted (not the whole sitemap), so PrimeIndexer credits are
 * spent once per page, not once per day.
 *
 * Fully generic — this file is identical across every client repo using
 * this pattern. It reads the site's domain straight out of
 * astro.config.mjs's `site:` field, so it never needs editing.
 *
 * Required repo secret: KAILENFLOW_INDEXING_KEY.
 * Installed automatically by the "Enable Auto-Indexing" button in the
 * KailenFlow Suite app (client Settings tab) — see the enable-indexing-
 * automation Netlify function if you need to re-run onboarding by hand.
 */
import { readFileSync, existsSync } from "node:fs";

const ENDPOINT = "https://kailenflow-suite.netlify.app/api/submit-indexing";
const SCHEDULE_CANDIDATES = ["src/lib/schedule.ts", "src/lib/schedule.js"];
const CONFIG_CANDIDATES = ["astro.config.mjs", "astro.config.ts", "astro.config.js"];

const apiKey = process.env.KAILENFLOW_INDEXING_KEY;
if (!apiKey) {
  console.log("kailenflow-indexing: KAILENFLOW_INDEXING_KEY not set, skipping.");
  process.exit(0);
}

const configFile = CONFIG_CANDIDATES.find(existsSync);
if (!configFile) {
  console.error("kailenflow-indexing: no astro.config.* found.");
  process.exit(1);
}
const configSrc = readFileSync(configFile, "utf8");
const siteMatch = configSrc.match(/site:\s*['"]([^'"]+)['"]/);
if (!siteMatch) {
  console.error(`kailenflow-indexing: no site: field found in ${configFile}.`);
  process.exit(1);
}
const HOST = siteMatch[1].replace(/\/$/, "");

const scheduleFile = SCHEDULE_CANDIDATES.find(existsSync);
if (!scheduleFile) {
  console.log("kailenflow-indexing: no schedule.ts found, nothing to submit.");
  process.exit(0);
}
const src = readFileSync(scheduleFile, "utf8");

const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
const dueToday = [];
for (const line of src.split("\n")) {
  const trimmed = line.trim();
  if (trimmed.startsWith("//") || trimmed.startsWith("*")) continue;
  const m = trimmed.match(/^["']([^"']+)["']\s*:\s*["'](\d{4}-\d{2}-\d{2})["']/);
  if (m && m[2] === today) dueToday.push(m[1]);
}

if (dueToday.length === 0) {
  console.log(`kailenflow-indexing: no pages due ${today}, nothing to submit.`);
  process.exit(0);
}

for (const path of dueToday) {
  const url = HOST + (path.startsWith("/") ? path : "/" + path);
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json", "x-automation-key": apiKey },
      body: JSON.stringify({ url, label: HOST.replace(/^https?:\/\//, "") }),
    });
    const data = await res.json().catch(() => ({}));
    console.log(`kailenflow-indexing: ${url} -> google=${data.google?.ok} primeIndexer=${data.primeIndexer?.ok}`);
  } catch (e) {
    console.error(`kailenflow-indexing: failed for ${url}: ${e.message || e}`);
  }
}
