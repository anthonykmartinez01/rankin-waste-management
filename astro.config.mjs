// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://rankinwaste.com',

  // URL convention preservation — see migration-baseline.md §5c.
  // Inner pages have NO trailing slash, root is just '/'.
  trailingSlash: 'never',

  // Emits flat dist/<route>.html files. Combined with trailingSlash:'never',
  // Netlify serves these at /<route> (NO trailing slash) with a 200 — matching
  // our canonicals — regardless of deploy method. (The old 'directory' format
  // emitted <route>/index.html, which a raw CLI artifact deploy makes Netlify
  // 301-redirect to a trailing slash; only Netlify's cloud build avoided that.
  // 'file' avoids the whole problem so the GitHub Action deploy is consistent.)
  //
  // NOTE: in 'file' mode Astro.url.pathname includes '.html'; Layout.astro
  // normalizes it (via normalizePath) before building the canonical/OG URLs.
  build: {
    format: 'file',
  },

  integrations: [
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
